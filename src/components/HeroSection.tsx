import HeroCube from './HeroCube';

export default function HeroSection() {
  return (
    <main className="sticky top-0 w-full min-h-screen min-h-[100dvh] flex flex-col sm:flex-row items-center justify-between sm:justify-between px-4 md:px-16 lg:px-24 xl:px-32 pt-20 pb-8 sm:pt-24 sm:pb-16 z-0 bg-black">
      {/* Top / Left Content */}
      <div className="relative z-10 max-w-2xl flex flex-col gap-2.5 sm:gap-4 md:gap-10 slide-up pointer-events-auto text-center sm:text-left items-center sm:items-start shrink-0">
        {/* Subtle pill tag for mobile studio branding */}
        <div className="inline-flex sm:hidden items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-purple-300">Digital Product Studio</span>
        </div>

        <h1 className="text-xl sm:text-3xl md:text-5xl lg:text-5xl font-light leading-[1.2] sm:leading-[1.25] tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
          We build digital<br className="hidden sm:inline" /> experiences that make<br className="hidden sm:inline" /> businesses work better.
        </h1>
        <p className="text-gray-400 text-[11px] sm:text-sm md:text-base leading-relaxed max-w-[280px] sm:max-w-md font-light tracking-wide drop-shadow-lg">
          KIBI helps businesses turn ideas, problems, and opportunities into practical digital products.
        </p>

        {/* Desktop CTA Button */}
        <button
          type="button"
          className="hidden sm:flex group relative items-center justify-between w-44 sm:w-56 px-4 py-2.5 sm:px-6 sm:py-4 border border-white/20 rounded-full hover:border-white/60 transition-all duration-500 overflow-hidden bg-black/20 backdrop-blur-sm text-gray-200 hover:text-white cursor-pointer"
        >
          <div className="absolute inset-0 bg-white/5 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
          <span className="text-xs sm:text-sm tracking-[0.1em] uppercase relative z-10 font-medium">Start building</span>
          <svg className="relative z-10 transform group-hover:translate-x-2 transition-transform duration-300" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* 3D Hero Canvas Background */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center z-0 pointer-events-none overflow-hidden bg-black">
        <div className="parallax-container w-full h-full flex items-center justify-center relative">
          {/* Mobile vs Desktop gradient overlay: on mobile, center has transparent gradient so cube shines through clearly */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-black/85 via-transparent to-black/90 sm:bg-gradient-to-r sm:from-black sm:via-black/80 sm:to-transparent z-10" />

          <div className="relative w-full h-full max-w-[1400px] flex items-center justify-center">
            <HeroCube />
          </div>
        </div>
      </div>

      {/* Mobile CTA Button - Positioned in the bottom zone above scroll indicator */}
      <div className="sm:hidden relative z-10 w-full flex flex-col items-center gap-3 shrink-0 pointer-events-auto mb-10">
        <button
          type="button"
          className="group relative flex items-center justify-between w-60 px-5 py-3 rounded-full border border-purple-500/40 bg-[#090912]/85 backdrop-blur-xl text-white shadow-[0_0_24px_rgba(168,85,247,0.25),0_4px_16px_rgba(0,0,0,0.8)] active:scale-95 transition-all duration-300 overflow-hidden cursor-pointer"
        >
          {/* Subtle sweep glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
          <div className="flex items-center gap-2 relative z-10">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
            <span className="text-xs tracking-[0.14em] uppercase font-medium text-gray-200 group-hover:text-white">Start building</span>
          </div>
          <div className="w-7 h-7 rounded-full bg-purple-500/20 border border-purple-400/40 flex items-center justify-center relative z-10 group-hover:bg-purple-500/30 transition-colors">
            <svg className="w-3.5 h-3.5 text-purple-300 transform group-hover:translate-x-0.5 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </button>
      </div>

      {/* Right Floating Philosophy Panel */}
      <div className="relative z-10 hidden lg:flex flex-col w-80 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-7 self-end mb-16 fade-in pointer-events-auto shadow-2xl">
        <div className="flex justify-between items-end border-b border-white/10 pb-4 mb-5">
          <span className="text-lg font-light text-white tracking-wide">Philosophy</span>
          <span className="text-xs text-gray-500 font-mono tracking-widest">//01</span>
        </div>

        <div className="flex flex-col gap-5">
          <div className="group cursor-default">
            <h2 className="text-sm text-gray-300 font-medium mb-2 tracking-wide group-hover:text-white transition-colors">Design + Technology</h2>
            <p className="text-xs text-gray-500 leading-relaxed group-hover:text-gray-300 transition-colors">
              We take complex business problems and assemble them into beautiful, usable systems.
            </p>
          </div>
          <div className="group pt-5 border-t border-white/5 cursor-default">
            <h2 className="text-sm text-gray-300 font-medium mb-2 tracking-wide group-hover:text-white transition-colors">Systems Thinking</h2>
            <p className="text-xs text-gray-500 leading-relaxed group-hover:text-gray-300 transition-colors">
              Every element serves a purpose. Aesthetics and functionality working in perfect synchronization.
            </p>
          </div>

          {/* Sine wave graph */}
          <div className="mt-6 h-12 w-full border-t border-b border-white/5 flex items-center relative overflow-hidden">
            <svg viewBox="0 0 200 40" className="w-full h-full stroke-purple-500/50 fill-none" preserveAspectRatio="none">
              <path className="sine-wave" d="M0 20 Q 10 5, 20 20 T 40 20 T 60 20 T 80 20 T 100 20 T 120 20 T 140 20 T 160 20 T 180 20 T 200 20" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <a
        href="#what-we-do"
        className="absolute bottom-2.5 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 sm:gap-3 text-gray-400 hover:text-white transition-colors group cursor-pointer pointer-events-auto"
        aria-label="Scroll to What We Do section"
      >
        <span className="text-[8px] sm:text-[10px] font-mono tracking-[0.25em] sm:tracking-[0.3em] uppercase text-gray-500 group-hover:text-purple-400 transition-colors">Scroll to explore</span>
        <div className="w-3.5 h-6 sm:w-5 sm:h-9 rounded-full border border-white/20 group-hover:border-purple-500/60 flex items-start justify-center p-0.5 sm:p-1.5 transition-colors backdrop-blur-sm bg-white/[0.02]">
          <div className="w-1 h-1.5 sm:h-2 rounded-full bg-purple-400 animate-scroll-dot" />
        </div>
      </a>
    </main>
  );
}
