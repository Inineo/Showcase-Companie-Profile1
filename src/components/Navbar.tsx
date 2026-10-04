'use client';

import { useState, useEffect, useRef } from 'react';

export default function Navbar() {
  const [isHidden, setIsHidden] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Hide navbar after scrolling past the hero section (100vh)
      const heroThreshold = window.innerHeight * 0.85;
      setIsHidden(window.scrollY > heroThreshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isNavVisible = !isHidden || isHovering;

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.dataset.navbarVisible = isNavVisible ? 'true' : 'false';
      window.dispatchEvent(new CustomEvent('kibi:navbar-visibility', { detail: { visible: isNavVisible } }));
    }
  }, [isNavVisible]);

  return (
    <>
      {/* Invisible hover trigger zone at the very top of the viewport */}
      <div
        ref={triggerRef}
        className="fixed top-0 left-0 w-full h-16 z-[101] pointer-events-auto"
        style={{ opacity: 0 }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      />
      <nav
        className={`fixed top-2 left-3 right-3 md:top-6 md:left-8 md:right-8 lg:left-12 lg:right-12 p-3 md:p-7 flex justify-between items-center z-[100] bg-[#030305]/65 backdrop-blur-xl border border-white/10 rounded-xl md:rounded-2xl shadow-[0_12px_40px_-16px_rgba(0,0,0,0.9),0_0_30px_rgba(168,85,247,0.08),0_0_1px_1px_rgba(168,85,247,0.3)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isHidden && !isHovering
            ? '-translate-y-[calc(100%+2rem)] opacity-0 pointer-events-none'
            : 'translate-y-0 opacity-100 pointer-events-auto'
        }`}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Illuminated rim light gradient dengan pulse animation */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse opacity-70 shadow-[0_0_8px_rgba(168,85,247,0.4)]" />
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse opacity-70 shadow-[0_0_8px_rgba(168,85,247,0.4)]" />
        </div>

        <button
          type="button"
          className="flex items-center gap-2 md:gap-3 text-[10px] md:text-sm tracking-[0.1em] uppercase hover:text-white text-gray-300 transition-colors cursor-pointer"
          aria-label="Toggle menu"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="md:w-6 md:h-6">
            <line x1="4" y1="9" x2="20" y2="9" />
            <line x1="4" y1="15" x2="14" y2="15" />
          </svg>
          <span className="hidden sm:inline">Menu</span>
        </button>

        <div className="absolute left-1/2 -translate-x-1/2 text-xs md:text-base tracking-[0.3em] font-medium text-white select-none">
          KIBI
        </div>

        <button
          type="button"
          className="flex items-center gap-1.5 md:gap-3 text-[10px] md:text-sm tracking-[0.1em] uppercase hover:text-white text-gray-300 transition-colors cursor-pointer"
        >
          <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-purple-500 animate-pulse shadow-[0_0_10px_rgba(168,85,247,0.7)]" />
          <span className="hidden sm:inline">Book a call</span>
          <span className="sm:hidden">Call</span>
        </button>
      </nav>
    </>
  );
}


