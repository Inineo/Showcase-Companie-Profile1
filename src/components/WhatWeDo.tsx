export default function WhatWeDo() {
  return (
    <section
      id="what-we-do"
      className="curtain-section relative z-30 w-full bg-[#030305] border-t border-purple-500/40 rounded-t-[3rem] shadow-[0_-30px_90px_rgba(0,0,0,0.98)] pb-32"
    >
      {/* Clean Continuous Illuminated Horizon Rim Light */}
      <div className="curtain-rim-light absolute top-0 left-0 right-0 h-[2px] rounded-t-[3rem] bg-gradient-to-r from-transparent via-purple-400 to-transparent pointer-events-none z-50" />

      {/* Section Header Anchor (Pinned at top-[75px] beneath Navbar with z-[50]) */}
      <div className="sticky top-[75px] z-[50] w-full px-6 md:px-16 lg:px-24 xl:px-32 pt-10 pb-6 bg-[#030305] border-b border-white/10 shadow-[0_25px_45px_rgba(3,3,5,1)]">
        <div className="flex flex-col md:flex-row md:items-end justify-between max-w-6xl mx-auto">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
              <span className="text-xs uppercase tracking-[0.25em] text-purple-400 font-mono">Capabilities // 02</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-white leading-tight">
              What We Do.
            </h2>
          </div>
          <p className="text-gray-400 text-xs md:text-sm font-light max-w-sm mt-3 md:mt-0 leading-relaxed">
            Transforming complex commercial challenges into structured, intuitive, and elevated digital assets.
          </p>
        </div>
      </div>

      {/* Overlapping Cards Stack Container (Isolated z-[10] stacking context below header z-[50]) */}
      <div className="cards-stack relative z-10 max-w-6xl mx-auto flex flex-col items-center px-6 md:px-16 lg:px-24 xl:px-32 pt-10">
        
        {/* Card 01: Web Experiences */}
        <article
          className="stack-card sticky-card group w-full bg-[#0c0c14] border border-white/15 hover:border-purple-500/60 rounded-3xl p-8 md:p-12 lg:p-14 transition-all duration-300 shadow-[0_-5px_30px_rgba(168,85,247,0.08),0_20px_50px_rgba(0,0,0,0.9)] mb-16 overflow-hidden z-10"
          style={{ top: '205px' }}
        >
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-purple-600/10 rounded-full blur-2xl pointer-events-none group-hover:bg-purple-600/20 transition-colors duration-500" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row justify-between lg:items-start gap-10">
            <div className="max-w-xl flex flex-col">
              <div className="flex items-center gap-4 text-xs font-mono tracking-widest text-purple-400 uppercase mb-6">
                <span>// 01</span>
                <span className="w-8 h-[1px] bg-purple-500/40" />
                <span>Atmospheric Interfaces</span>
              </div>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-light text-white tracking-tight leading-snug mb-6">
                Web Experiences
              </h3>
              <p className="text-gray-300 text-base md:text-lg font-light leading-relaxed mb-8">
                High-impact brand flagships, immersive 3D/WebGL environments, and responsive interactive web showcases designed to evoke emotion and convert audience interest into loyalty.
              </p>

              <div className="flex flex-wrap gap-2.5">
                {['Creative Development', '3D & Canvas Motion', 'Micro-Interactions', 'Editorial Direction'].map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider text-gray-200 bg-white/[0.05] border border-white/15 group-hover:border-purple-500/40 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="w-full lg:w-80 flex flex-col gap-5 p-6 rounded-2xl bg-white/[0.03] border border-white/10 self-stretch justify-between">
              <div className="flex justify-between items-start">
                <span className="text-xs uppercase tracking-[0.2em] font-mono text-gray-400">Core Metric</span>
                <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-light text-white tracking-tight font-mono">
                  60<span className="text-purple-400 text-2xl font-sans">fps</span>
                </div>
                <p className="text-xs text-gray-400 mt-2 font-light leading-relaxed">
                  Uncompromising fluid render cycles paired with optimized asset budgets for zero-latency discovery.
                </p>
              </div>
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-400 group-hover:text-white transition-colors cursor-pointer">
                <span className="tracking-widest uppercase font-mono text-[11px]">Explore Case Studies</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </div>
            </div>
          </div>
        </article>

        {/* Card 02: Business Systems */}
        <article
          className="stack-card sticky-card group w-full bg-[#0e0e18] border border-white/15 hover:border-purple-500/60 rounded-3xl p-8 md:p-12 lg:p-14 transition-all duration-300 shadow-[0_-5px_30px_rgba(168,85,247,0.1),0_25px_60px_rgba(0,0,0,0.95)] mb-16 overflow-hidden z-20"
          style={{ top: '225px' }}
        >
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-400/50 to-transparent" />
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-purple-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-purple-500/20 transition-colors duration-500" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row justify-between lg:items-start gap-10">
            <div className="max-w-xl flex flex-col">
              <div className="flex items-center gap-4 text-xs font-mono tracking-widest text-purple-400 uppercase mb-6">
                <span>// 02</span>
                <span className="w-8 h-[1px] bg-purple-500/40" />
                <span>Architectural Rigor</span>
              </div>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-light text-white tracking-tight leading-snug mb-6">
                Business Systems
              </h3>
              <p className="text-gray-300 text-base md:text-lg font-light leading-relaxed mb-8">
                Internal operational dashboards, scalable custom ERPs, and workflow automations that replace chaotic spreadsheets with elegant, deterministic clarity.
              </p>

              <div className="flex flex-wrap gap-2.5">
                {['Custom Dashboards', 'Workflow Automation', 'API & DB Architecture', 'Enterprise Tooling'].map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider text-gray-200 bg-white/[0.05] border border-white/15 group-hover:border-purple-500/40 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="w-full lg:w-80 flex flex-col gap-5 p-6 rounded-2xl bg-white/[0.03] border border-white/10 self-stretch justify-between">
              <div className="flex justify-between items-start">
                <span className="text-xs uppercase tracking-[0.2em] font-mono text-gray-400">Efficiency Yield</span>
                <div className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.8)]" />
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-light text-white tracking-tight font-mono">
                  4.2<span className="text-purple-400 text-2xl font-sans">×</span>
                </div>
                <p className="text-xs text-gray-400 mt-2 font-light leading-relaxed">
                  Accelerated execution cycle times achieved by removing cognitive friction and manual data silos.
                </p>
              </div>
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-400 group-hover:text-white transition-colors cursor-pointer">
                <span className="tracking-widest uppercase font-mono text-[11px]">System Architecture</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </div>
            </div>
          </div>
        </article>

        {/* Card 03: Digital Products */}
        <article
          className="stack-card sticky-card group w-full bg-[#10101f] border border-white/15 hover:border-purple-500/60 rounded-3xl p-8 md:p-12 lg:p-14 transition-all duration-300 shadow-[0_-5px_30px_rgba(168,85,247,0.12),0_30px_70px_rgba(0,0,0,0.98)] mb-16 overflow-hidden z-30"
          style={{ top: '245px' }}
        >
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-400/60 to-transparent" />
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-purple-400/10 rounded-full blur-2xl pointer-events-none group-hover:bg-purple-400/20 transition-colors duration-500" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row justify-between lg:items-start gap-10">
            <div className="max-w-xl flex flex-col">
              <div className="flex items-center gap-4 text-xs font-mono tracking-widest text-purple-400 uppercase mb-6">
                <span>// 03</span>
                <span className="w-8 h-[1px] bg-purple-500/40" />
                <span>End-to-End Precision</span>
              </div>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-light text-white tracking-tight leading-snug mb-6">
                Digital Products
              </h3>
              <p className="text-gray-300 text-base md:text-lg font-light leading-relaxed mb-8">
                From strategic MVP definition to market-ready SaaS applications and mobile clients. We engineer scalable foundations designed to evolve with commercial velocity.
              </p>

              <div className="flex flex-wrap gap-2.5">
                {['SaaS Platforms', 'Design Systems', 'Rapid Prototyping', 'Product Strategy'].map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider text-gray-200 bg-white/[0.05] border border-white/15 group-hover:border-purple-500/40 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="w-full lg:w-80 flex flex-col gap-5 p-6 rounded-2xl bg-white/[0.03] border border-white/10 self-stretch justify-between">
              <div className="flex justify-between items-start">
                <span className="text-xs uppercase tracking-[0.2em] font-mono text-gray-400">Launch Velocity</span>
                <div className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.8)]" />
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-light text-white tracking-tight font-mono">
                  100<span className="text-purple-400 text-2xl font-sans">%</span>
                </div>
                <p className="text-xs text-gray-400 mt-2 font-light leading-relaxed">
                  Production-grade architecture with component resilience from day zero of deployment.
                </p>
              </div>
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-400 group-hover:text-white transition-colors cursor-pointer">
                <span className="tracking-widest uppercase font-mono text-[11px]">Product Blueprint</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </div>
            </div>
          </div>
        </article>

      </div>
    </section>
  );
}
