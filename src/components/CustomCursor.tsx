'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !cursorRef.current) return;

    const cursor = cursorRef.current;
    let mouseX = -100;
    let mouseY = -100;
    let cursorTicking = false;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!cursorTicking) {
        requestAnimationFrame(() => {
          cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
          cursorTicking = false;
        });
        cursorTicking = true;
      }
    };

    const onMouseEnter = () => cursor.classList.add('active');
    const onMouseLeave = () => cursor.classList.remove('active');

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const attachHoverListeners = () => {
      document.querySelectorAll('button, a, .stack-card').forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnter);
        el.addEventListener('mouseleave', onMouseLeave);
      });
    };

    attachHoverListeners();

    // Re-attach if DOM changes
    const observer = new MutationObserver(attachHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      observer.disconnect();
      document.querySelectorAll('button, a, .stack-card').forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnter);
        el.removeEventListener('mouseleave', onMouseLeave);
      });
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" aria-hidden="true" />;
}
