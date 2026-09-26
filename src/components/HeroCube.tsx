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
    let isVisible = true;

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

      // Hentikan rendering jika hero sudah tertutup section lain
      if (!isVisible) {
        lastTimestamp = 0;
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

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
      if (!isVisible) return;
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

    /* ─── Batch Preload: Muat 20 frame per batch agar tidak block main thread ─── */
    const preloadBatch = async (startIndex: number, batchSize: number) => {
      const end = Math.min(startIndex + batchSize, frameCount);
      const batch = [];
      for (let i = startIndex; i < end; i++) {
        if (!frames[i]) {
          batch.push(preloadFrame(i));
        }
      }
      await Promise.all(batch);
    };

    const preloadAllBatched = async () => {
      const BATCH_SIZE = 20;
      for (let i = 1; i < frameCount; i += BATCH_SIZE) {
        if (!isMounted) return;
        await preloadBatch(i, BATCH_SIZE);
        await new Promise<void>((r) => setTimeout(r, 0));
      }
    };

    /* ─── Scroll-Based Visibility: Hero section sticky top-0 tidak keluar viewport,
       jadi kita deteksi apakah section curtain (#what-we-do) sudah menutupi hero ─── */
    const checkVisibility = () => {
      const whatWeDo = document.getElementById('what-we-do');
      if (!whatWeDo) {
        isVisible = true;
        return;
      }
      const rect = whatWeDo.getBoundingClientRect();
      // Jika bagian atas section WhatWeDo sudah menutup lebih dari 60% tinggi viewport,
      // artinya hero sudah sepenuhnya tertutup
      isVisible = rect.top > window.innerHeight * 0.6;
    };

    let scrollTicking = false;
    const onScroll = () => {
      if (!scrollTicking) {
        requestAnimationFrame(() => {
          checkVisibility();
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    checkVisibility(); // Initial check

    // Load frame 0 immediately for instant display
    preloadFrame(0)
      .then(() => {
        if (!isMounted) return;
        drawFrame(0);
        container.classList.add('is-ready');
        return preloadAllBatched();
      })
      .then(() => {
        if (!isMounted) return;
        window.addEventListener('mousemove', setDirectionFromMouse, { passive: true });
        animationFrameId = requestAnimationFrame(animate);
      })
      .catch((error) => {
        console.warn('Cube frames could not be loaded, using fallback:', error);
      });

    return () => {
      isMounted = false;
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', setDirectionFromMouse);
      window.removeEventListener('scroll', onScroll);
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
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        id="hero-cube-fallback"
        src="/assets/images/hero-cube.jpg"
        alt="Abstract 3D cube"
        className="hero-cube-fallback w-full h-full object-contain mix-blend-screen"
      />
    </div>
  );
}
