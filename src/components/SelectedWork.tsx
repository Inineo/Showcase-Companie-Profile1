'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

/* ─── Project Data ─── */
export interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  metric: string; // Metrik performa / skor project (contoh: "60 fps", "99.9%", "4.2×", "9.8 ★")
  badge: string; // Logo/Badge lingkaran di kiri atas (contoh: "WEB", "SaaS", "AI", "ERP", "APP")
  badgeBg?: string; // Warna background badge
  image: string | null; // Path gambar poster project Anda (contoh: "/assets/images/project1.jpg")
  href: string; // Link menuju showcase project Anda
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Apex ERP Enterprise',
    category: 'Business Systems',
    year: '2024',
    metric: '4.2× Yield',
    badge: 'ERP',
    badgeBg: '#4f46e5',
    image: null,
    href: '#',
  },
  {
    id: 2,
    title: 'Nexus 3D Web Experience',
    category: 'WebGL Flagship',
    year: '2024',
    metric: '60 fps',
    badge: '3D',
    badgeBg: '#7c3aed',
    image: null,
    href: '#',
  },
  {
    id: 3,
    title: 'Chronos Cloud SaaS',
    category: 'Digital Product',
    year: '2023–2024',
    metric: '99.9% Uptime',
    badge: 'SaaS',
    badgeBg: '#2563eb',
    image: null,
    href: '#',
  },
  {
    id: 4,
    title: 'Pulse Analytics Engine',
    category: 'Data & Dashboard',
    year: '2024',
    metric: '0.1s Latency',
    badge: 'DATA',
    badgeBg: '#0891b2',
    image: null,
    href: '#',
  },
  {
    id: 5,
    title: 'Synth AI Workspace',
    category: 'Automation & AI',
    year: '2024',
    metric: '9.8 ★ Score',
    badge: 'AI',
    badgeBg: '#9333ea',
    image: null,
    href: '#',
  },
  {
    id: 6,
    title: 'Lumina Fintech Portal',
    category: 'Banking & Mobile',
    year: '2023',
    metric: '120k+ Users',
    badge: 'FIN',
    badgeBg: '#059669',
    image: null,
    href: '#',
  },
  {
    id: 7,
    title: 'Aura Design System',
    category: 'Component Library',
    year: '2023–2024',
    metric: '100% Modular',
    badge: 'UI',
    badgeBg: '#e11d48',
    image: null,
    href: '#',
  },
  {
    id: 8,
    title: 'Vortex Cloud Core',
    category: 'API & Infrastructure',
    year: '2023',
    metric: '10M+ Req/d',
    badge: 'OPS',
    badgeBg: '#d97706',
    image: null,
    href: '#',
  },
];

/* ─── Placeholder backgrounds bergaya IT & Sinematik Dark Theme ─── */
const placeholderThemes = [
  {
    bg: 'linear-gradient(180deg, #1e1b4b 0%, #312e81 30%, #0f172a 70%, #030712 100%)',
    accent: '#818cf8',
  },
  {
    bg: 'linear-gradient(180deg, #3b0764 0%, #581c87 35%, #18181b 75%, #09090b 100%)',
    accent: '#c084fc',
  },
  {
    bg: 'linear-gradient(180deg, #082f49 0%, #0369a1 35%, #0f172a 75%, #020617 100%)',
    accent: '#38bdf8',
  },
  {
    bg: 'linear-gradient(180deg, #164e63 0%, #0891b2 35%, #0f172a 75%, #020617 100%)',
    accent: '#22d3ee',
  },
  {
    bg: 'linear-gradient(180deg, #4c0519 0%, #831843 35%, #18181b 75%, #09090b 100%)',
    accent: '#f43f5e',
  },
  {
    bg: 'linear-gradient(180deg, #022c22 0%, #065f46 35%, #0f172a 75%, #020617 100%)',
    accent: '#34d399',
  },
  {
    bg: 'linear-gradient(180deg, #500724 0%, #831843 35%, #09090b 75%, #030712 100%)',
    accent: '#fb7185',
  },
  {
    bg: 'linear-gradient(180deg, #451a03 0%, #78350f 30%, #1e1b4b 70%, #030712 100%)',
    accent: '#f59e0b',
  },
];

export default function SelectedWork() {
  const [virtualIndex, setVirtualIndex] = useState(0);
  const virtualIndexRef = useRef(0);
  const targetIndexRef = useRef<number | null>(null);

  const isHovered = useRef(false);
  const isDragging = useRef(false);
  const pointerStartPos = useRef({ x: 0, y: 0 });
  const dragStartIndex = useRef(0);
  const dragDistance = useRef(0);
  const animFrameId = useRef<number | null>(null);

  const total = projects.length;

  /* ─── Fungsi untuk Membawa Kartu Pilihan Tepat ke Posisi Tengah Depan ─── */
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

  /* ─── Main Animation Loop: Bergerak Mulus Flat dari Kanan ke Kiri ─── */
  useEffect(() => {
    const SPEED = 0.0018; // Kecepatan gerak kontinu yang halus

    const loop = () => {
      // 1. Jika ada target kartu yang diklik untuk dibawa ke depan
      if (targetIndexRef.current !== null) {
        const diff = targetIndexRef.current - virtualIndexRef.current;
        if (Math.abs(diff) > 0.005) {
          virtualIndexRef.current += diff * 0.1; // Smooth snappy interpolation
          setVirtualIndex(virtualIndexRef.current);
        } else {
          virtualIndexRef.current = targetIndexRef.current;
          targetIndexRef.current = null;
          setVirtualIndex(virtualIndexRef.current);
        }
      }
      // 2. Pergerakan kontinu flat ke kiri (saat tidak di-drag dan tidak di-hover)
      else if (!isDragging.current && !isHovered.current) {
        virtualIndexRef.current += SPEED;
        setVirtualIndex(virtualIndexRef.current);
      }

      animFrameId.current = requestAnimationFrame(loop);
    };

    animFrameId.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  /* ─── Global Pointer Release Listener ─── */
  useEffect(() => {
    const handleGlobalRelease = () => {
      isDragging.current = false;
    };

    window.addEventListener('pointerup', handleGlobalRelease);
    window.addEventListener('pointercancel', handleGlobalRelease);

    return () => {
      window.removeEventListener('pointerup', handleGlobalRelease);
      window.removeEventListener('pointercancel', handleGlobalRelease);
    };
  }, []);

  /* ─── Drag & Swipe Handlers ─── */
  const onPointerDown = (e: React.PointerEvent) => {
    targetIndexRef.current = null;
    isDragging.current = true;
    dragDistance.current = 0;
    pointerStartPos.current = { x: e.clientX, y: e.clientY };
    dragStartIndex.current = virtualIndexRef.current;
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - pointerStartPos.current.x;
    const deltaY = e.clientY - pointerStartPos.current.y;
    dragDistance.current = Math.hypot(deltaX, deltaY);

    if (dragDistance.current > 6) {
      // 1 unit index = ~360px drag
      const deltaIndex = deltaX / 360;
      const newIndex = dragStartIndex.current - deltaIndex;
      virtualIndexRef.current = newIndex;
      setVirtualIndex(newIndex);
    }
  };

  const onPointerUp = () => {
    isDragging.current = false;
  };

  /* ─── Transform Layered Flat Depth dengan Komposisi Seimbang ─── */
  const getCardTransform = (index: number) => {
    // Selisih indeks relatif terhadap posisi tengah (-total/2 sampai +total/2)
    let diff = (index - virtualIndex) % total;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    const sign = Math.sign(diff);
    const absD = Math.abs(diff);

    // Komposisi Seimbang:
    // d = 0 -> x = 0 (tengah)
    // d = 1 -> x = ±375px (memberikan ruang lega dengan kartu tengah)
    // d = 2 -> x = ±670px (tidak terlalu jauh dari kartu samping)
    // d > 2 -> berjejer proporsional dan memudar
    let translateX = 0;
    if (absD <= 1) {
      translateX = sign * absD * 375;
    } else {
      translateX = sign * (375 + (absD - 1) * 295);
    }

    // Scale: Tengah (1.0), Samping Dekat (~0.85), Samping Jauh (~0.72)
    const scale = Math.max(0.62, 1.0 - Math.min(1, absD / 2.6) * 0.32);

    // Z-Index: Bertingkat rapi dari depan ke belakang
    const zIndex = Math.round((3.5 - Math.min(3.5, absD)) * 25);

    // Brightness: Tengah terang (1.0), samping dekat (~0.72), samping jauh (~0.46)
    const isCenter = absD < 0.28;
    const brightness = isCenter ? 1 : Math.max(0.36, 1.0 - (absD / 2.6) * 0.62);

    // Opacity: 5 kartu di tengah (absD <= 2.35) terlihat jelas, di luar itu memudar halus
    const opacity = absD > 2.85 ? 0 : absD <= 2.35 ? 1 : Math.max(0, 1 - (absD - 2.35) / 0.5);

    return {
      style: {
        transform: `translateX(${translateX}px) scale(${scale})`, // FLAT! Tanpa rotateY
        opacity,
        zIndex,
        position: 'absolute' as const,
        filter: `brightness(${brightness})`,
        pointerEvents: opacity > 0.3 ? ('auto' as const) : ('none' as const),
      },
      isCenter,
    };
  };

  return (
    <section
      id="selected-work"
      className="relative z-40 w-full bg-[#030305] pt-32 pb-44 overflow-hidden select-none"
      onMouseEnter={() => {
        isHovered.current = true;
      }}
      onMouseLeave={() => {
        isHovered.current = false;
        isDragging.current = false;
      }}
    >
      {/* Section Header */}
      <div className="relative z-10 w-full px-6 md:px-16 lg:px-24 xl:px-32 mb-16">
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

      {/* Atmospheric Ambient Red/Purple Glow di belakang kartu */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[600px] bg-gradient-to-r from-red-950/15 via-purple-600/30 to-red-950/15 rounded-full blur-[150px] pointer-events-none" />

      {/* 5-Card Layered Viewport (Layar Penuh, Flat, Komposisi Seimbang) */}
      <div
        className="relative w-full max-w-[1700px] mx-auto flex items-center justify-center cursor-grab active:cursor-grabbing px-4"
        style={{ height: '580px' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        {projects.map((project, index) => {
          const { style, isCenter } = getCardTransform(index);
          const theme = placeholderThemes[index % placeholderThemes.length];

          return (
            <div
              key={project.id}
              onClick={(e) => {
                // Jika gerakan drag lebih dari 12px, jangan trigger klik
                if (dragDistance.current > 12) {
                  return;
                }

                // Jika kartu BUKAN di tengah (di samping/belakang), geser kartu meluncur maju ke tengah depan
                if (!isCenter) {
                  e.preventDefault();
                  e.stopPropagation();
                  bringToFront(index);
                  return;
                }

                // Jika sudah berada di depan tengah dan link valid, buka link
                if (project.href && project.href !== '#') {
                  window.location.href = project.href;
                }
              }}
              className={`
                group block w-[260px] sm:w-[290px] md:w-[320px] rounded-[26px] overflow-hidden
                transition-shadow duration-300 cursor-pointer
                ${
                  isCenter
                    ? 'shadow-[0_30px_90px_rgba(0,0,0,0.98),0_0_60px_rgba(168,85,247,0.3)] ring-1 ring-white/25'
                    : 'shadow-[0_20px_50px_rgba(0,0,0,0.85)] ring-1 ring-white/10 hover:ring-purple-400/40'
                }
              `}
              style={style}
            >
              {/* Full-bleed Poster Container (Rasio 1 : 1.45) */}
              <div
                className="relative w-full aspect-[1/1.45] overflow-hidden rounded-[26px]"
                style={{
                  background: project.image ? undefined : theme.bg,
                }}
              >
                {/* Poster Image (Jika dimasukkan) */}
                {project.image && (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    draggable={false}
                  />
                )}

                {/* Placeholder Ambient Graphic saat belum ada gambar */}
                {!project.image && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none">
                    <div
                      className="w-36 h-36 rounded-full blur-2xl"
                      style={{ background: theme.accent }}
                    />
                  </div>
                )}

                {/* Top Overlay Bar */}
                <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
                  {/* Left Circle Tech/Category Badge */}
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg border border-white/20 backdrop-blur-md"
                    style={{ background: project.badgeBg || '#4f46e5' }}
                  >
                    <span className="text-[10px] font-bold text-white tracking-tighter font-mono">
                      {project.badge}
                    </span>
                  </div>

                  {/* Right IT Metric / Benchmark Score */}
                  <div className="flex items-center gap-1 text-white font-semibold text-xs md:text-sm drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] font-mono">
                    <span>{project.metric}</span>
                  </div>
                </div>

                {/* Bottom Dark Vignette Gradient */}
                <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/95 via-black/60 to-transparent pointer-events-none" />

                {/* Bottom Title & IT Subtitle Info */}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 z-10">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-medium text-white tracking-tight leading-snug drop-shadow-md mb-1.5 group-hover:text-purple-300 transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2.5 text-xs md:text-sm text-gray-300/90 font-light drop-shadow">
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
