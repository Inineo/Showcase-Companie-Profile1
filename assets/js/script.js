document.addEventListener("DOMContentLoaded", () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!prefersReducedMotion) {
        const cursor = document.createElement("div");
        cursor.classList.add("custom-cursor");
        document.body.appendChild(cursor);

        document.addEventListener("mousemove", (e) => {
            cursor.style.left = e.clientX + "px";
            cursor.style.top = e.clientY + "px";
        });

        document.querySelectorAll("button, a").forEach((element) => {
            element.addEventListener("mouseenter", () => cursor.classList.add("active"));
            element.addEventListener("mouseleave", () => cursor.classList.remove("active"));
        });
    }

    const forwardVideo = document.getElementById("hero-video-forward");
    const reverseVideo = document.getElementById("hero-video-reverse");
    let activeZone = "left";
    let visibleVideo = forwardVideo;
    let isReady = false;
    let transitionId = 0;

    const setVisibleVideo = (activeVideo, inactiveVideo) => {
        inactiveVideo.classList.remove("is-active");
        activeVideo.classList.add("is-active");
        visibleVideo = activeVideo;
    };

    const playDirection = (zone) => {
        if (!isReady || zone === activeZone) return;

        const enteringRight = zone === "right";
        const requestedVideo = enteringRight ? forwardVideo : reverseVideo;
        const currentTransition = ++transitionId;
        activeZone = zone;

        // Jika video yang diminta sudah merupakan layer aktif, langsung play native
        if (requestedVideo === visibleVideo) {
            requestedVideo.playbackRate = 1;
            requestedVideo.play().catch(() => {});
            return;
        }

        const duration = forwardVideo.duration || 3.58;
        const frameDuration = 1001 / 60000;
        const totalFrames = 215;
        const visibleFrameIndex = Math.max(0, Math.min(
            totalFrames - 1,
            Math.round((visibleVideo === forwardVideo
                ? visibleVideo.currentTime
                : duration - frameDuration - visibleVideo.currentTime) / frameDuration)
        ));

        // Reverse asset memakai urutan frame yang berlawanan. Dengan indeks diskret,
        // frame yang ditampilkan saat swap identik, tanpa error pecahan timestamp.
        const targetFrameIndex = enteringRight
            ? visibleFrameIndex
            : totalFrames - 1 - visibleFrameIndex;
        const matchingTime = targetFrameIndex * frameDuration;

        const inactiveVideo = visibleVideo;
        const safeTargetTime = Math.max(0, Math.min(matchingTime, duration - 0.001));

        // Video tujuan harus berhenti tepat di frame pasangan terlebih dahulu.
        // Memulai play sebelum layer ditukar membuatnya maju satu frame dan menyebabkan glitch pose cube.
        requestedVideo.pause();
        requestedVideo.playbackRate = 1;

        let hasSwapped = false;
        const swapThenPlay = () => {
            if (hasSwapped || currentTransition !== transitionId || activeZone !== zone) return;
            hasSwapped = true;

            // Tampilkan frame target yang sudah didekode, lalu jalankan playback pada frame browser berikutnya.
            inactiveVideo.pause();
            setVisibleVideo(requestedVideo, inactiveVideo);
            requestAnimationFrame(() => {
                if (currentTransition === transitionId && activeZone === zone) {
                    requestedVideo.play().catch(() => {});
                }
            });
        };

        if (Math.abs(requestedVideo.currentTime - safeTargetTime) < 0.005) {
            swapThenPlay();
        } else {
            requestedVideo.addEventListener("seeked", swapThenPlay, { once: true });
            requestedVideo.currentTime = safeTargetTime;
        }
    };

    if (forwardVideo && reverseVideo) {
        forwardVideo.loop = false;
        reverseVideo.loop = false;

        // Ketika video reverse selesai mundur ke awal (sampai duration),
        // kembalikan ke layer forwardVideo di detik 0 agar siap diputar lagi
        reverseVideo.addEventListener("ended", () => {
            reverseVideo.pause();
            forwardVideo.currentTime = 0;
            setVisibleVideo(forwardVideo, reverseVideo);
        });

        forwardVideo.addEventListener("ended", () => {
            forwardVideo.pause();
        });

        let metadataCount = 0;
        const markReady = () => {
            metadataCount++;
            if (metadataCount >= 2 && !isReady) {
                isReady = true;
                // Selalu mulai di frame 0 posisi awal kubus normal
                const initialFrameDuration = 1001 / 60000;
                forwardVideo.currentTime = 0;
                reverseVideo.currentTime = (forwardVideo.duration || 3.58) - initialFrameDuration;
                setVisibleVideo(forwardVideo, reverseVideo);
            }
        };

        if (forwardVideo.readyState >= 1) markReady();
        if (reverseVideo.readyState >= 1) markReady();

        forwardVideo.addEventListener("loadedmetadata", markReady, { once: true });
        reverseVideo.addEventListener("loadedmetadata", markReady, { once: true });

        document.addEventListener("mousemove", (e) => {
            if (prefersReducedMotion || !isReady) return;
            playDirection(e.clientX < window.innerWidth / 2 ? "left" : "right");
        });
    }
});

