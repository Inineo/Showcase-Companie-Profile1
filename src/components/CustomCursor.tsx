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

    /* ─── Event Delegation: Satu listener di document level ─── */
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, .stack-card')) {
        cursor.classList.add('active');
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const related = e.relatedTarget as HTMLElement | null;

      // Hanya hapus 'active' jika keluar dari elemen interaktif (bukan masuk ke child-nya)
      if (target.closest('button, a, .stack-card')) {
        if (!related || !related.closest('button, a, .stack-card')) {
          cursor.classList.remove('active');
        }
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseout', onMouseOut, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" aria-hidden="true" />;
}
