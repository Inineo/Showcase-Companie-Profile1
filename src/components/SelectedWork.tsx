'use client';

import { useRef, useEffect, useCallback } from 'react';

/* ─── Project Data ─── */
export interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  metric: string;
  badge: string;
  badgeBg?: string;
  glowColor?: string;
  image: string | null;
  href: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Management Armada Travel',
    category: 'Fleet & Operations',
    year: '2026',
    metric: 'Live Demo',
    badge: 'FLEET',
    badgeBg: '#2563eb',
    glowColor: '#3b82f6',
    image: '/assets/images/projects/travel-fleet-cover.jpg',
    href: 'https://dashboard-travel-chi.vercel.app/',
  },
  {
    id: 2,
    title: 'Valentine Web',
    category: 'WebGL Flagship',
    year: '2026',
    metric: '60 fps',
    badge: '3D',
    badgeBg: '#7c3aed',
    glowColor: '#ec4899',
    image: '/assets/images/projects/Valentine.png',
    href: 'https://valentine-web-1.vercel.app/',
  },
  {
    id: 3,
    title: 'Elite Gym',
    category: 'Fitness & Wellness',
    year: '2026',
    metric: 'Live Demo',
    badge: 'WEB',
    badgeBg: '#2563eb',
    glowColor: '#eab308',
    image: '/assets/images/projects/EliteGym.png',
    href: 'https://elite-gym-green.vercel.app/',
  },
  {
    id: 4,
    title: 'Fox Leap',
    category: 'Game - Jump Mechanic',
    year: '2024',
    metric: 'Play Now',
    badge: 'GAME',
    badgeBg: '#0891b2',
    glowColor: '#06b6d4',
    image: '/assets/images/projects/FoxLeap.png',
    href: 'https://devnero.itch.io/fox-leap',
  },
  {
    id: 5,
    title: 'Lintas Nusa',
    category: 'UI/UX Design',
    year: '2024',
    metric: 'View Design',
    badge: 'UI/UX',
    badgeBg: '#3336eaff',
    glowColor: '#6366f1',
    image: '/assets/images/projects/LintasNusa.png',
    href: 'https://www.figma.com/design/blnagNBuGsr9ve62bPrXDl/LintasNusa?node-id=0-1&p=f',
  },
  {
    id: 7,
    title: 'Personal Portfolio',
    category: 'Portfolio Website',
    year: '2026',
    metric: 'Live Site',
    badge: 'WEB',
    badgeBg: '#3d50ffff',
    glowColor: '#8b5cf6',
    image: '/assets/images/projects/Portofolio.png',
    href: 'https://inineo.page.gd/',
  },
  {
    id: 8,
    title: 'Saku Pay',
    category: 'UI/UX Design',
    year: '2024',
    metric: 'View Design',
    badge: 'UI/UX',
    badgeBg: '#d97706',
    glowColor: '#a855f7',
    image: '/assets/images/projects/sakupay.png',
    href: 'https://www.figma.com/design/mD8uqOq5wU3T8D19GjVIzk/Desgin-SakuPay',
  },
];

const placeholderThemes = [
  { bg: 'linear-gradient(180deg, #1e1b4b 0%, #312e81 30%, #0f172a 70%, #030712 100%)', accent: '#818cf8' },
  { bg: 'linear-gradient(180deg, #3b0764 0%, #581c87 35%, #18181b 75%, #09090b 100%)', accent: '#c084fc' },
  { bg: 'linear-gradient(180deg, #082f49 0%, #0369a1 35%, #0f172a 75%, #020617 100%)', accent: '#38bdf8' },
  { bg: 'linear-gradient(180deg, #164e63 0%, #0891b2 35%, #0f172a 75%, #020617 100%)', accent: '#22d3ee' },
  { bg: 'linear-gradient(180deg, #4c0519 0%, #831843 35%, #18181b 75%, #09090b 100%)', accent: '#f43f5e' },
  { bg: 'linear-gradient(180deg, #022c22 0%, #065f46 35%, #0f172a 75%, #020617 100%)', accent: '#34d399' },
  { bg: 'linear-gradient(180deg, #500724 0%, #831843 35%, #09090b 75%, #030712 100%)', accent: '#fb7185' },
  { bg: 'linear-gradient(180deg, #451a03 0%, #78350f 30%, #1e1b4b 70%, #030712 100%)', accent: '#f59e0b' },
];

export default function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const virtualIndexRef = useRef(0);
  const targetIndexRef = useRef<number | null>(null);
  const isVisibleRef = useRef(false);
  const isDraggingRef = useRef(false);
  const pointerStartX = useRef(0);
  const dragStartIndex = useRef(0);
  const dragDistanceRef = useRef(0);
  const animFrameId = useRef<number | null>(null);

  const total = projects.length;

  /* ─── Hitung transform per card (pure math, no React state) ─── */
  const computeCardProps = useCallback(
    (index: number, vIndex: number) => {
      let diff = (index - vIndex) % total;
      if (diff > total / 2) diff -= total;
      if (diff < -total / 2) diff += total;

      const sign = Math.sign(diff);
      const absD = Math.abs(diff);

      // Responsive spread: tighter on mobile, wider on desktop
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
      const spreadPrimary = isMobile ? 135 : 375;
      const spreadSecondary = isMobile ? 100 : 295;

      let translateX = 0;
      if (absD <= 1) {
        translateX = sign * absD * spreadPrimary;
      } else {
        translateX = sign * (spreadPrimary + (absD - 1) * spreadSecondary);
      }

      const scale = Math.max(0.62, 1.0 - Math.min(1, absD / 2.6) * 0.32);
      const zIndex = Math.round((3.5 - Math.min(3.5, absD)) * 25);
      const isCenter = absD < 0.28;
      const brightness = isCenter ? 1 : Math.max(0.35, 1.0 - (absD / 2.6) * 0.62);
      const opacity = absD > 2.85 ? 0 : absD <= 2.35 ? 1 : Math.max(0, 1 - (absD - 2.35) / 0.5);

      return { translateX, scale, zIndex, brightness, opacity, isCenter };
    },
    [total],
  );

  /* ─── Direct DOM update: bypass React re-render entirely (GPU accelerated) ─── */
  const applyTransforms = useCallback(
    (vIndex: number) => {
      for (let i = 0; i < total; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;

        const { translateX, scale, zIndex, brightness, opacity, isCenter } = computeCardProps(i, vIndex);

        // Hardware-accelerated 3D transform without triggering layout recalculations
        el.style.transform = `translate3d(${translateX}px, 0, 0) scale(${scale})`;
        el.style.opacity = String(opacity);
        el.style.zIndex = String(zIndex);
        el.style.pointerEvents = opacity > 0.3 ? 'auto' : 'none';

        // Update brightness overlay element rather than costly CSS filter: brightness() on whole container
        const dimEl = el.querySelector<HTMLDivElement>('.card-dim-overlay');
        if (dimEl) {
          dimEl.style.opacity = String(Math.max(0, 1 - brightness));
        }

        // Toggle shadow/ring classes via dataset flag
        if (isCenter && el.dataset.center !== '1') {
          el.dataset.center = '1';
          el.classList.add('selected-card-active');
          el.classList.remove('selected-card-idle');
        } else if (!isCenter && el.dataset.center !== '0') {
          el.dataset.center = '0';
          el.classList.remove('selected-card-active');
          el.classList.add('selected-card-idle');
        }
      }
    },
    [total, computeCardProps],
  );

  /* ─── Bring to Front: klik kartu samping untuk membawanya ke tengah ─── */
  const bringToFront = useCallback(
    (index: number) => {
      const current = virtualIndexRef.current;
      const currentNorm = ((current % total) + total) % total;

      let diff = index - currentNorm;
      if (diff > total / 2) diff -= total;
      if (diff < -total / 2) diff += total;

      targetIndexRef.current = current + diff;
    },
    [total],
  );

  /* ─── Main Animation Loop (Strictly locked to 60 FPS on 175Hz+ monitors) ─── */
  useEffect(() => {
    const TARGET_FPS = 60;
    const FRAME_DURATION = 1000 / TARGET_FPS;
    const SPEED_PER_FRAME = 0.0018;

    let lastFrameTime = performance.now();

    const loop = (currentTime: number) => {
      // Hentikan scheduling jika section sudah tidak terlihat (misal user masuk ke PricingSection)
      if (!isVisibleRef.current) {
        animFrameId.current = null;
        return;
      }

      animFrameId.current = requestAnimationFrame(loop);

      const elapsed = currentTime - lastFrameTime;

      if (elapsed >= FRAME_DURATION) {
        lastFrameTime = currentTime - (elapsed % FRAME_DURATION);

        // 1. Bring-to-front lerp (locked 60fps)
        if (targetIndexRef.current !== null) {
          const diff = targetIndexRef.current - virtualIndexRef.current;
          if (Math.abs(diff) > 0.002) {
            virtualIndexRef.current += diff * 0.12;
          } else {
            virtualIndexRef.current = targetIndexRef.current;
            targetIndexRef.current = null;
          }
          applyTransforms(virtualIndexRef.current);
        }
        // 2. Auto-scroll mulus terkunci 60fps
        else if (!isDraggingRef.current) {
          virtualIndexRef.current += SPEED_PER_FRAME;
          applyTransforms(virtualIndexRef.current);
        }
      }
    };

    // IntersectionObserver mendeteksi kapan harus start / stop loop
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isNowVisible = entry.isIntersecting;
        isVisibleRef.current = isNowVisible;

        if (isNowVisible && !animFrameId.current) {
          lastFrameTime = performance.now();
          animFrameId.current = requestAnimationFrame(loop);
        } else if (!isNowVisible && animFrameId.current) {
          cancelAnimationFrame(animFrameId.current);
          animFrameId.current = null;
        }
      },
      { threshold: 0.01, rootMargin: '0px 0px -50px 0px' },
    );
    observer.observe(section);

    return () => {
      observer.disconnect();
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
        animFrameId.current = null;
      }
    };
  }, [applyTransforms]);

  /* ─── Global Pointer Release ─── */
  useEffect(() => {
    const handleRelease = () => {
      isDraggingRef.current = false;
    };
    window.addEventListener('pointerup', handleRelease);
    window.addEventListener('pointercancel', handleRelease);
    return () => {
      window.removeEventListener('pointerup', handleRelease);
      window.removeEventListener('pointercancel', handleRelease);
    };
  }, []);

  /* ─── Initial transform on mount ─── */
  useEffect(() => {
    applyTransforms(0);
  }, [applyTransforms]);

  /* ─── Drag Handlers ─── */
  const onPointerDown = (e: React.PointerEvent) => {
    targetIndexRef.current = null;
    isDraggingRef.current = true;
    dragDistanceRef.current = 0;
    pointerStartX.current = e.clientX;
    dragStartIndex.current = virtualIndexRef.current;
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - pointerStartX.current;
    dragDistanceRef.current = Math.abs(deltaX);

    if (dragDistanceRef.current > 6) {
      const dragDivisor = (typeof window !== 'undefined' && window.innerWidth < 640) ? 135 : 360;
      const deltaIndex = deltaX / dragDivisor;
      virtualIndexRef.current = dragStartIndex.current - deltaIndex;
      applyTransforms(virtualIndexRef.current);
    }
  };

  const onPointerUp = () => {
    isDraggingRef.current = false;
  };

  /* ─── Click Handler (per card) ─── */
  const handleCardClick = (index: number, href: string) => {
    if (dragDistanceRef.current > 12) return;

    const { isCenter } = computeCardProps(index, virtualIndexRef.current);

    if (!isCenter) {
      bringToFront(index);
      return;
    }

    if (href && href !== '#') {
      window.location.href = href;
    }
  };

  return (
    <section
      ref={sectionRef}
      id="selected-work"
      className="relative z-40 w-full bg-[#030305] pt-16 pb-20 sm:pt-32 sm:pb-44 overflow-hidden select-none"
      onMouseLeave={() => { isDraggingRef.current = false; }}
    >
      {/* Section Header */}
      <div className="relative z-10 w-full px-6 md:px-16 lg:px-24 xl:px-32 mb-8 sm:mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between max-w-6xl mx-auto">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
              <span className="text-xs uppercase tracking-[0.25em] text-purple-400 font-mono">
                Selected Work // 03
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-white leading-tight">
              Selected Work.
            </h2>
          </div>
          <p className="text-gray-400 text-xs md:text-sm font-light max-w-sm mt-3 md:mt-0 leading-relaxed">
            A curated gallery of our most impactful digital products, enterprise systems, and web experiences.
          </p>
        </div>
      </div>

      {/* Atmospheric Ambient Glow (Hardware-accelerated Radial Gradient Shader - zero blur cost) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] rounded-full pointer-events-none opacity-70"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(168, 85, 247, 0.22) 0%, rgba(120, 20, 50, 0.1) 45%, transparent 70%)',
          transform: 'translate3d(-50%, -50%, 0)',
        }}
      />

      {/* Card Viewport */}
      <div
        className="relative w-full max-w-[1700px] mx-auto flex items-center justify-center cursor-grab active:cursor-grabbing px-4 h-[290px] sm:h-[500px] md:h-[580px]"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        {projects.map((project, index) => {
          const theme = placeholderThemes[index % placeholderThemes.length];

          return (
            <div
              key={project.id}
              ref={(el) => { cardRefs.current[index] = el; }}
              onClick={() => handleCardClick(index, project.href)}
              className="selected-card-idle group block w-[175px] sm:w-[290px] md:w-[320px] cursor-pointer absolute rounded-[18px] sm:rounded-[26px] overflow-hidden bg-black"
              style={{ 
                willChange: 'transform, opacity',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'translateZ(0)',
                WebkitFontSmoothing: 'subpixel-antialiased',
              }}
            >
              {/* Gradient Glow Background */}
              <div
                className="absolute -inset-2 rounded-[18px] sm:rounded-[26px] blur-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none -z-10"
                style={{
                  background: project.glowColor
                    ? `radial-gradient(ellipse at center, ${project.glowColor}60 0%, ${project.glowColor}20 50%, transparent 100%)`
                    : 'transparent',
                }}
              />
              
              <div
                className="relative w-full aspect-[1/1.4] sm:aspect-[1/1.45]"
                style={{ background: project.image ? undefined : theme.bg }}
              >
                {project.image && (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    draggable={false}
                  />
                )}

                {!project.image && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none">
                    <div className="w-36 h-36 rounded-full blur-2xl" style={{ background: theme.accent }} />
                  </div>
                )}

                {/* Lightweight Black Dim Overlay (Zero layout-cost brightness dimming) */}
                <div
                  className="card-dim-overlay absolute inset-0 bg-black pointer-events-none transition-opacity duration-150"
                  style={{ opacity: 0, willChange: 'opacity' }}
                />

                <div className="absolute top-3 left-3 right-3 sm:top-5 sm:left-5 sm:right-5 flex items-center justify-between z-10">
                  <div
                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-lg backdrop-blur-md"
                    style={{ background: project.badgeBg || '#4f46e5' }}
                  >
                    <span className="text-[8px] sm:text-[10px] font-bold text-white tracking-tighter font-mono">{project.badge}</span>
                  </div>
                  <div className="flex items-center gap-1 text-white font-semibold text-[10px] sm:text-xs md:text-sm drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] font-mono">
                    <span>{project.metric}</span>
                  </div>
                </div>

                <div className="absolute -left-1 -right-1 -bottom-1 h-32 sm:h-48 bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none" />

                <div className="absolute bottom-0 left-0 right-0 p-3.5 sm:p-6 z-10">
                  <h3 className="text-sm sm:text-xl md:text-2xl font-medium text-white tracking-tight leading-snug drop-shadow-md mb-1 sm:mb-1.5 group-hover:text-purple-300 transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-1.5 sm:gap-2.5 text-[10px] sm:text-xs md:text-sm text-gray-300/90 font-light drop-shadow">
                    <span>{project.year}</span>
                    <span className="w-1 h-1 rounded-full bg-purple-400/60" />
                    <span>{project.category}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
