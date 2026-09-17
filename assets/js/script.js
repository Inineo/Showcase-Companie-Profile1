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

    const parallaxContainer = document.querySelector(".parallax-container");
    const video = document.getElementById("hero-video");
    
    let targetTime = 0;
    let currentVideoTime = 0;
    let isVideoLoaded = false;
    let isSeeking = false;

    if (video) {
        video.preload = "auto";
        
        video.addEventListener("play", () => {
            video.pause();
        });
        
        const initVideo = () => {
            if (!isVideoLoaded) {
                isVideoLoaded = true;
                video.pause();
                if (video.duration) {
                    targetTime = video.duration / 2;
                    currentVideoTime = video.duration / 2;
                    video.currentTime = currentVideoTime;
                }
            }
        };

        video.addEventListener("loadedmetadata", initVideo);
        if (video.readyState >= 1) initVideo();

        video.addEventListener("seeked", () => {
            isSeeking = false;
        });
    }

    document.addEventListener("mousemove", (e) => {
        if (prefersReducedMotion) return;
        
        // 1. Parallax
        if (parallaxContainer) {
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;
            
            const moveX = x * -20; 
            const moveY = y * -20;
            const rotateX = y * 5;
            const rotateY = x * -5;
            
            parallaxContainer.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }

        // 2. Pembagian Layar menjadi 5 Bagian (Discrete Scrubbing)
        if (isVideoLoaded && video && video.duration) {
            const numSections = 5; // Layar dibagi 5
            
            // Tentukan posisi mouse berada di blok/bagian ke berapa (0 sampai 4)
            const rawIndex = Math.floor((e.clientX / window.innerWidth) * numSections);
            const sectionIndex = Math.max(0, Math.min(numSections - 1, rawIndex));
            
            // Konversi index ke persentase durasi video (0%, 25%, 50%, 75%, 100%)
            const scrubProgress = sectionIndex / (numSections - 1);
            
            // Set target waktu (dikunci aman agar tidak kena glitch ujung durasi)
            targetTime = Math.max(0.01, Math.min(scrubProgress * video.duration, video.duration - 0.05));
        }
    });

    function updateVideo() {
        if (isVideoLoaded && video && video.duration && !prefersReducedMotion) {
            if (!video.paused) {
                video.pause();
            }

            const diff = targetTime - currentVideoTime;
            
            if (Math.abs(diff) > 0.01) {
                // Kecepatan putaran antar 5 titik (agak cepat agar transisinya tegas tapi tetap mulus)
                currentVideoTime += diff * 0.04;
                
                if (!isSeeking) {
                    isSeeking = true;
                    video.currentTime = currentVideoTime;
                }
            }
        }
        requestAnimationFrame(updateVideo);
    }
    
    if (!prefersReducedMotion) {
        updateVideo();
    }
});
