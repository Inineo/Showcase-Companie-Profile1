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

    const canvas = document.getElementById("hero-cube-canvas");
    const canvasStack = document.querySelector(".hero-canvas-stack");

    if (!canvas || !canvasStack || prefersReducedMotion) return;

    const context = canvas.getContext("2d", { alpha: true });
    const frameCount = 215;
    const frameRate = 60000 / 1001;
    const frames = Array.from({ length: frameCount });
    let loadedFrames = 0;
    let currentFrame = 0;
    let direction = 0;
    let lastTimestamp = 0;
    let animationFrameId = null;

    const framePath = (index) => `assets/frames/cube-${String(index + 1).padStart(3, "0")}.webp`;

    const drawFrame = (index) => {
        const image = frames[index];
        if (!image) return;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
    };

    const animate = (timestamp) => {
        if (!lastTimestamp) lastTimestamp = timestamp;
        const elapsed = timestamp - lastTimestamp;
        const frameStep = (elapsed * frameRate) / 1000;
        lastTimestamp = timestamp;

        if (direction !== 0) {
            const previousFrameIndex = Math.round(currentFrame);
            currentFrame = Math.max(0, Math.min(frameCount - 1, currentFrame + direction * frameStep));
            const nextFrameIndex = Math.round(currentFrame);

            if (nextFrameIndex !== previousFrameIndex) {
                drawFrame(nextFrameIndex);
            }

            if (currentFrame <= 0 || currentFrame >= frameCount - 1) {
                currentFrame = Math.round(currentFrame);
                direction = 0;
                drawFrame(currentFrame);
            }
        }

        animationFrameId = requestAnimationFrame(animate);
    };

    const setDirectionFromMouse = (event) => {
        direction = event.clientX < window.innerWidth / 2 ? -1 : 1;

        if ((direction < 0 && currentFrame <= 0) || (direction > 0 && currentFrame >= frameCount - 1)) {
            direction = 0;
        }
    };

    const preloadFrame = (index) => new Promise((resolve, reject) => {
        const image = new Image();
        image.decoding = "async";
        image.addEventListener("load", async () => {
            try {
                await image.decode();
                frames[index] = image;
                resolve();
            } catch (error) {
                reject(error);
            }
        }, { once: true });
        image.addEventListener("error", () => reject(new Error(`Cube frame gagal dimuat: ${framePath(index)}`)), { once: true });
        image.src = framePath(index);
    });

    Promise.all(Array.from({ length: frameCount }, (_, index) => preloadFrame(index)))
        .then(() => {
            drawFrame(0);
            canvasStack.classList.add("is-ready");
            document.addEventListener("mousemove", setDirectionFromMouse);
            animationFrameId = requestAnimationFrame(animate);
        })
        .catch((error) => {
            console.error(error);
        });

    window.addEventListener("pagehide", () => {
        if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
    }, { once: true });
});

