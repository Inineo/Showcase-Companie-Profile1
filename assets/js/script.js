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

        const interactables = document.querySelectorAll("button, a");
        interactables.forEach(el => {
            el.addEventListener("mouseenter", () => cursor.classList.add("active"));
            el.addEventListener("mouseleave", () => cursor.classList.remove("active"));
        });
    }

    const video = document.getElementById("hero-video");
    
    let isVideoLoaded = false;
    let activeZone = null;
    let reverseFrameId = null;
    let isReverseSeeking = false;
    let lastReverseFrameAt = 0;

    const stopReversePlayback = () => {
        if (reverseFrameId !== null) {
            cancelAnimationFrame(reverseFrameId);
            reverseFrameId = null;
        }
        isReverseSeeking = false;
    };

    const playReverse = () => {
        const reverseStep = (now) => {
            if (!video || activeZone !== "left" || video.currentTime <= 0) {
                reverseFrameId = null;
                return;
            }

            // Browser tidak mendukung playbackRate negatif secara konsisten.
            // Seek mundur hanya dilakukan 30 FPS dan tidak pernah bertumpuk.
            if (!isReverseSeeking && now - lastReverseFrameAt >= 33) {
                isReverseSeeking = true;
                lastReverseFrameAt = now;
                video.currentTime = Math.max(0, video.currentTime - 0.045);
            }
            reverseFrameId = requestAnimationFrame(reverseStep);
        };

        reverseFrameId = requestAnimationFrame(reverseStep);
    };

    if (video) {
        video.preload = "auto";
        video.loop = false;
        video.playbackRate = 1;
        
        const initVideo = () => {
            if (!isVideoLoaded) {
                isVideoLoaded = true;
                video.pause();
                video.currentTime = 0;
            }
        };

        video.addEventListener("loadedmetadata", initVideo);
        video.addEventListener("seeked", () => {
            isReverseSeeking = false;
        });
        if (video.readyState >= 1) initVideo();
    }

    document.addEventListener("mousemove", (e) => {
        if (prefersReducedMotion || !isVideoLoaded || !video || !video.duration) return;

        // Dua area: kanan memainkan video maju, kiri memainkan video mundur sampai 0 detik.
        const nextZone = e.clientX < window.innerWidth / 2 ? "left" : "right";
        if (nextZone === activeZone) return;
        activeZone = nextZone;

        if (activeZone === "left") {
            // Hentikan forward playback sebelum reverse loop dimulai agar tidak saling bentrok.
            video.pause();
            stopReversePlayback();
            playReverse();
            return;
        }

        // Hentikan reverse loop sebelum memutar video secara normal ke arah kanan.
        stopReversePlayback();
        if (video.currentTime >= video.duration - 0.05) {
            video.currentTime = 0;
        }
        video.playbackRate = 1;
        video.play().catch(() => {});
    });
});

