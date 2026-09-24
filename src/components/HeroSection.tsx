import HeroCube from './HeroCube';

export default function HeroSection() {
  return (
    <main className="sticky top-0 w-full min-h-screen flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 pt-24 pb-16 z-0">
      {/* Left Content */}
      <div className="relative z-10 max-w-2xl flex flex-col gap-8 md:gap-10 mt-8 slide-up pointer-events-auto">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-light leading-[1.05] tracking-tight text-white drop-shadow-2xl">
          We build digital experiences that make businesses work better.
        </h1>
        <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-md font-light tracking-wide drop-shadow-lg">
          KIBI helps businesses turn ideas, problems, and opportunities into practical digital products - websites, business systems, and digital experiences.
        </p>
        <button
          type="button"
          className="group relative flex items-center justify-between w-56 px-6 py-4 border border-white/20 rounded-full hover:border-white/60 transition-all duration-500 overflow-hidden mt-2 bg-black/20 backdrop-blur-sm text-gray-200 hover:text-white cursor-pointer"
        >
          <div className="absolute inset-0 bg-white/5 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
          <span className="text-sm tracking-[0.1em] uppercase relative z-10 font-medium">Start building</span>
          <svg className="relative z-10 transform group-hover:translate-x-2 transition-transform duration-300" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* 3D Hero Canvas Background */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center z-0 pointer-events-none overflow-hidden">
        <div className="parallax-container w-full h-full flex items-center justify-center relative">
          {/* Overlay shadow for left text readability */}
          <div className="absolute left-0 top-0 w-1/2 h-full bg-gradient-to-r from-[#030305] via-[#030305]/80 to-transparent z-10 opacity-80 mix-blend-multiply" />
          
          <div className="relative w-full h-full max-w-[1400px] flex items-center justify-center">
            <HeroCube />
          </div>
        </div>
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 text-gray-400 hover:text-white transition-colors group cursor-pointer pointer-events-auto"
        aria-label="Scroll to What We Do section"
      >
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-gray-500 group-hover:text-purple-400 transition-colors">Scroll to explore</span>
        <div className="w-5 h-9 rounded-full border border-white/20 group-hover:border-purple-500/60 flex items-start justify-center p-1.5 transition-colors backdrop-blur-sm bg-white/[0.02]">
          <div className="w-1 h-2 rounded-full bg-purple-400 animate-scroll-dot" />
        </div>
      </a>
    </main>
  );
}
