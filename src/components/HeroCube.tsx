'use client';

import { useEffect, useRef } from 'react';

export default function HeroCube() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container || prefersReducedMotion) return;

    const context = canvas.getContext('2d', { alpha: true });
    if (!context) return;

    const frameCount = 215;
    const frameRate = 60000 / 1001;
    const frames: HTMLImageElement[] = new Array(frameCount);
    let currentFrame = 0;
    let direction = 0;
    let lastTimestamp = 0;
    let animationFrameId: number | null = null;
    let isMounted = true;

    const framePath = (index: number) =>
      `/assets/frames/cube-${String(index + 1).padStart(3, '0')}.webp`;

    const drawFrame = (index: number) => {
      const image = frames[index];
      if (!image || !context || !canvas) return;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
    };

    const animate = (timestamp: number) => {
      if (!isMounted) return;
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

    const setDirectionFromMouse = (event: MouseEvent) => {
      direction = event.clientX < window.innerWidth / 2 ? -1 : 1;
      if ((direction < 0 && currentFrame <= 0) || (direction > 0 && currentFrame >= frameCount - 1)) {
        direction = 0;
      }
    };

    const preloadFrame = (index: number) =>
      new Promise<void>((resolve, reject) => {
        const image = new Image();
        image.decoding = 'async';
        image.addEventListener(
          'load',
          async () => {
            try {
              await image.decode();
              if (isMounted) frames[index] = image;
              resolve();
            } catch (error) {
              reject(error);
            }
          },
          { once: true }
        );
        image.addEventListener(
          'error',
          () => reject(new Error(`Cube frame failed to load: ${framePath(index)}`)),
          { once: true }
        );
        image.src = framePath(index);
      });

    Promise.all(Array.from({ length: frameCount }, (_, index) => preloadFrame(index)))
      .then(() => {
        if (!isMounted) return;
        drawFrame(0);
        container.classList.add('is-ready');
        window.addEventListener('mousemove', setDirectionFromMouse, { passive: true });
        animationFrameId = requestAnimationFrame(animate);
      })
      .catch((error) => {
        console.warn('Cube frames could not be loaded, using fallback video:', error);
      });

    return () => {
      isMounted = false;
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', setDirectionFromMouse);
    };
  }, []);

  return (
    <div ref={containerRef} className="hero-canvas-stack w-[105vh] h-[105vh] lg:w-[82vw] lg:h-[82vh] relative">
      <canvas
        ref={canvasRef}
        id="hero-cube-canvas"
        className="hero-cube-canvas w-full h-full object-contain mix-blend-screen"
        width={720}
        height={720}
        aria-label="Interactive 3D animated cube"
      />
      <video
        className="hero-cube-fallback w-full h-full object-contain mix-blend-screen opacity-90 pointer-events-none"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/assets/videos/cube.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
