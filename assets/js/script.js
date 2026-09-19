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
        const currentProgressTime = visibleVideo === forwardVideo
            ? visibleVideo.currentTime
            : (duration - visibleVideo.currentTime);

        const matchingTime = enteringRight
            ? currentProgressTime
            : (duration - currentProgressTime);

        const inactiveVideo = visibleVideo;
        const safeTargetTime = Math.max(0, Math.min(matchingTime, duration - 0.001));

        // Jangan pause layer yang sedang terlihat. Biarkan ia terus bermain sampai
        // frame pasangan dari video tujuan benar-benar siap, supaya tidak ada freeze.
        requestedVideo.pause();
        requestedVideo.playbackRate = 1;

        let hasSwapped = false;
        const doSwapAndPlay = () => {
            if (hasSwapped || currentTransition !== transitionId || activeZone !== zone) return;
            hasSwapped = true;
            inactiveVideo.pause();
            setVisibleVideo(requestedVideo, inactiveVideo);
        };

        const playThenSwap = () => {
            if (currentTransition !== transitionId || activeZone !== zone) return;

            requestedVideo.play().then(() => {
                if (currentTransition !== transitionId || activeZone !== zone) {
                    requestedVideo.pause();
                    return;
                }

                // Frame callback berjalan sesudah decoder menyerahkan frame ke compositor.
                if (typeof requestedVideo.requestVideoFrameCallback === "function") {
                    requestedVideo.requestVideoFrameCallback(doSwapAndPlay);
                } else {
                    requestAnimationFrame(doSwapAndPlay);
                }
            }).catch(() => {});
        };

        if (Math.abs(requestedVideo.currentTime - safeTargetTime) < 0.005) {
            playThenSwap();
        } else {
            requestedVideo.addEventListener("seeked", playThenSwap, { once: true });
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
                forwardVideo.currentTime = 0;
                reverseVideo.currentTime = (forwardVideo.duration || 3.58) - 0.001;
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

