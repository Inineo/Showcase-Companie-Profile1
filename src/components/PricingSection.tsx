'use client';

import { useState } from 'react';

type ServiceTab = 'development' | 'recurring';
type BillingCycle = 'monthly' | '6month' | '12month';

interface DevPackage {
  id: string;
  name: string;
  price: string;
  priceSub?: string;
  badge?: string;
  description: string;
  features: string[];
  note?: string;
  popular?: boolean;
  examples?: string[];
  ctaText: string;
}

interface RecurringPackage {
  id: string;
  name: string;
  priceMonthly: string;
  price6m: string;
  price12m: string;
  discount6m: string;
  discount12m: string;
  target: string;
  features: string[];
  slaResponse: string;
  slaEmergency: string;
  popular?: boolean;
  ctaText: string;
}

const DEV_PACKAGES: DevPackage[] = [
  {
    id: '01',
    name: 'Starter',
    price: 'Rp2,5',
    priceSub: 'JT+',
    badge: '5 Pages',
    description: 'Untuk UMKM, bisnis personal, dan landing company profile ringkas.',
    features: [
      'Hingga 5 halaman standar',
      'Desain responsif & ultra fluid',
      'Mobile & desktop optimized',
      'Optimasi SEO dasar terstruktur',
      'Integrasi direct WhatsApp CTA',
      'Formulir kontak & inquiry',
      'Setup & deployment ke cloud',
      '2× revisi desain arsitektur',
    ],
    ctaText: 'Pilih Starter',
  },
  {
    id: '02',
    name: 'Business',
    price: 'Rp5',
    priceSub: 'JT+',
    badge: 'Hingga 10 Pages',
    description: 'Untuk bisnis berkembang yang membutuhkan kredibilitas & konten dinamis.',
    popular: true,
    features: [
      'Hingga 10 halaman terstruktur',
      'Desain interaktif & modern UI/UX',
      'Sistem blog & publikasi artikel',
      'Katalog produk / showcase layanan',
      'Formulir inquiry terintegrasi',
      'Integrasi Google Maps & Analytics',
      'Basic Headless CMS (Kelola konten mandiri)',
      '3× revisi desain komprehensif',
    ],
    ctaText: 'Pilih Business',
  },
  {
    id: '03',
    name: 'E-Commerce',
    price: 'Rp7,5',
    priceSub: 'JT+',
    badge: 'Online Store',
    description: 'Platform toko online mandiri yang siap menerima transaksi penjualan.',
    features: [
      'Katalog & galeri detail produk',
      'Sistem keranjang belanja (cart)',
      'Alur checkout terotomatisasi',
      'Sistem manajemen pesanan',
      'Manajemen pelanggan & leads',
      'Dashboard admin komprehensif',
      'Integrasi payment gateway lokal',
      'Optimasi checkout mobile-first',
      '3× revisi desain komprehensif',
    ],
    note: 'Biaya payment gateway terpisah sesuai provider.',
    ctaText: 'Pilih E-Commerce',
  },
  {
    id: '04',
    name: 'Custom System',
    price: 'Rp10',
    priceSub: 'JT+',
    badge: 'Tailored',
    description: 'Sistem web aplikasi custom mengikuti model bisnis Anda.',
    features: [
      'Arsitektur cloud scalable',
      'Integrasi API & webhook',
      'Database & keamanan enterprise',
      'UI/UX eksklusif & mikro-interaksi',
    ],
    examples: [
      'Reservasi & Booking',
      'CRM & Pipeline Penjualan',
      'Analytics Dashboard',
      'Portal Membership',
      'Internal Management',
      'Otomatisasi Alur Bisnis',
    ],
    note: 'Biaya disesuaikan cakupan & kompleksitas.',
    ctaText: 'Konsultasi',
  },
];

const RECURRING_PACKAGES: RecurringPackage[] = [
  {
    id: '01',
    name: 'Starter Care',
    priceMonthly: 'Rp750',
    price6m: 'Rp675',
    price12m: 'Rp600',
    discount6m: '10%',
    discount12m: '20%',
    target: 'Untuk website bisnis & company profile.',
    features: [
      'Hosting cloud & uptime monitoring',
      'Inspeksi keamanan & backup berkala',
      '2 jam dedicated support / bulan',
      'Dashboard manajemen konten',
    ],
    slaResponse: 'Response: Maks. 2×24 jam kerja',
    slaEmergency: 'Darurat: 1×24 jam',
    ctaText: 'Mulai Langganan',
  },
  {
    id: '02',
    name: 'Growth Care',
    priceMonthly: 'Rp1,5',
    price6m: 'Rp1,35',
    price12m: 'Rp1,2',
    discount6m: '10%',
    discount12m: '20%',
    target: 'Untuk bisnis dengan traffic aktif & pembaruan berkala.',
    popular: true,
    features: [
      'Hosting cloud & uptime monitoring',
      'Inspeksi keamanan & backup berkala',
      '5 jam dedicated support / bulan',
      'Dashboard manajemen konten',
      'Perbaikan bug minor prioritas',
    ],
    slaResponse: 'Response: Maks. 1×24 jam kerja',
    slaEmergency: 'Darurat: 12 jam',
    ctaText: 'Mulai Langganan',
  },
  {
    id: '03',
    name: 'Business Pro',
    priceMonthly: 'Rp2,5',
    price6m: 'Rp2,25',
    price12m: 'Rp2',
    discount6m: '10%',
    discount12m: '20%',
    target: 'Untuk e-commerce dan platform harian.',
    features: [
      'Hosting cloud & uptime monitoring',
      'Inspeksi keamanan & backup berkala',
      '10 jam dedicated support / bulan',
      'Admin + asistensi update produk',
      'Penanganan tiket prioritas tinggi',
    ],
    slaResponse: 'Response: Maks. 4 jam kerja',
    slaEmergency: 'Darurat: 2 jam',
    ctaText: 'Mulai Langganan',
  },
  {
    id: '04',
    name: 'Custom Retainer',
    priceMonthly: 'Custom',
    price6m: 'Custom',
    price12m: 'Custom',
    discount6m: 'Kontrak',
    discount12m: 'Kontrak',
    target: 'Infrastruktur besar & sistem kompleks.',
    features: [
      'Cloud khusus (Private Cluster)',
      'SLA spesifik sesuai kebutuhan',
      'Support fleksibel on-demand',
      'Dedicated Technical Lead',
      'Laporan performa & audit bulanan',
    ],
    slaResponse: 'SLA sesuai kontrak',
    slaEmergency: 'Eskalasi darurat 24/7',
    ctaText: 'Hubungi Tim',
  },
];

export default function PricingSection() {
  const [activeTab, setActiveTab] = useState<ServiceTab>('development');
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');

  return (
    <section
      id="pricing"
      className="curtain-section relative z-40 w-full bg-[#030305] border-t border-purple-500/30 rounded-t-[3rem] pt-20 pb-0 select-none overflow-hidden"
      style={{
        contain: 'paint layout',
        transform: 'translateZ(0)',
        willChange: 'auto',
      }}
    >
      {/* Illuminated Horizon Rim Light */}
      <div className="curtain-rim-light absolute top-0 left-0 right-0 h-[2px] rounded-t-[3rem] bg-gradient-to-r from-transparent via-purple-400 to-transparent pointer-events-none z-50" />

        {/* Ambient glow */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full pointer-events-none opacity-60"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(168, 85, 247, 0.12) 0%, rgba(147, 51, 234, 0.04) 50%, transparent 70%)',
            transform: 'translate3d(-50%, 0, 0)',
          }}
        />

        {/* Section Header */}
        <div className="relative z-10 w-full px-6 md:px-12 lg:px-16 xl:px-20 mb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between max-w-7xl mx-auto">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                <span className="text-xs uppercase tracking-[0.25em] text-purple-400 font-mono">
                  Investment // 04
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-white leading-tight">
                Transparent Pricing.
              </h2>
            </div>
            <p className="text-gray-400 text-xs md:text-sm font-light max-w-md mt-3 md:mt-0 leading-relaxed">
              Paket transparan terstruktur tanpa biaya tersembunyi. Disesuaikan untuk akselerasi kehadiran digital dan keandalan sistem Anda.
            </p>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 xl:px-20">
          {/* Tab Switcher */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
            <div className="flex items-center gap-2 p-1 rounded-full bg-[#0c0c14] border border-white/15">
              <button
                onClick={() => setActiveTab('development')}
                className={`px-5 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  activeTab === 'development'
                    ? 'bg-purple-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                    : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                Development
              </button>
              <button
                onClick={() => setActiveTab('recurring')}
                className={`px-5 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  activeTab === 'recurring'
                    ? 'bg-purple-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                    : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                Recurring
              </button>
            </div>

            <div className="text-xs text-gray-400 font-light text-center sm:text-right">
              {activeTab === 'development' ? (
                <span>
                  <strong className="text-white font-medium">One-Time Project:</strong> Hak milik kode penuh, deployment siap pakai.
                </span>
              ) : (
                <span>
                  <strong className="text-white font-medium">Ongoing Support:</strong> Pemeliharaan berkala, hosting & backup terjamin.
                </span>
              )}
            </div>
          </div>

          {/* ─── BUNDLE SPECIAL OFFER PROMO BANNER ─── */}
          <div className="mb-8 p-4 md:p-5 rounded-2xl bg-gradient-to-r from-purple-950/40 via-purple-900/20 to-black/60 border border-purple-500/40 shadow-[0_0_25px_rgba(168,85,247,0.15)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start md:items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(168,85,247,0.4)]">
                <span className="text-sm font-mono font-bold text-purple-300">20%</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase tracking-widest font-mono text-purple-300 font-semibold">
                    Special Bundle Offer
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Hemat Biaya Dev
                  </span>
                </div>
                <p className="text-xs md:text-sm text-gray-300 font-light mt-0.5">
                  Dapatkan <strong className="text-white font-medium">Diskon 20% untuk Biaya Development</strong> jika Anda mengambil paket <strong className="text-purple-300 font-medium">Recurring Retainer</strong> bersamaan dengan kontrak pembangunan selama <strong className="text-white font-medium">6 atau 12 bulan</strong>.
                </p>
              </div>
            </div>
            <a
              href="https://wa.me/6282349239232?text=Halo%20KIBI,%20saya%20tertarik%20dengan%20promo%20diskon%2020%25%20development%20bundling%20recurring%206/12%20bulan"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-all duration-200 shadow-[0_0_15px_rgba(168,85,247,0.4)] shrink-0 self-stretch md:self-auto text-center"
            >
              Klaim Promo Bundling
            </a>
          </div>

          {/* ─── TAB 1: WEBSITE DEVELOPMENT ─── */}
          {activeTab === 'development' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 items-stretch">
              {DEV_PACKAGES.map((pkg) => {
                const isPopular = pkg.popular;
                return (
                  <div
                    key={pkg.id}
                    className={`group relative rounded-2xl p-6 flex flex-col transition-all duration-300 overflow-hidden ${
                      isPopular
                        ? 'bg-[#0e0e18] border border-purple-500/80 shadow-[0_12px_40px_-10px_rgba(168,85,247,0.3)]'
                        : 'bg-[#0c0c14] border border-white/15 hover:border-purple-500/60 hover:shadow-[0_12px_35px_-10px_rgba(168,85,247,0.2)]'
                    }`}
                    style={{
                      transform: 'translateZ(0)',
                      contain: 'layout style',
                    }}
                  >
                    {/* Hover glow */}
                    <div
                      className="absolute -top-16 -right-16 w-60 h-60 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"
                      style={{
                        background: 'radial-gradient(circle, rgba(168, 85, 247, 0.25) 0%, rgba(147, 51, 234, 0.1) 45%, transparent 70%)',
                        transform: 'translateZ(0)',
                      }}
                    />

                    {/* Top accent */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-400/30 to-transparent group-hover:via-purple-400/80 transition-all duration-500 pointer-events-none" />

                    <div className="relative z-10 flex flex-col flex-1">
                      {/* Header: Index & Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-mono tracking-widest text-purple-400 uppercase">
                          // {pkg.id}
                        </span>
                        {isPopular ? (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider text-purple-300 bg-purple-500/20 border border-purple-500/40 shadow-[0_0_8px_rgba(168,85,247,0.3)]">
                            Popular
                          </span>
                        ) : (
                          pkg.badge && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider text-gray-400 bg-white/[0.04] border border-white/10">
                              {pkg.badge}
                            </span>
                          )
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-light text-white tracking-tight leading-snug mb-1.5 group-hover:text-purple-300 transition-colors">
                        {pkg.name}
                      </h3>
                      <p className="text-xs text-gray-400 font-light leading-relaxed mb-5 line-clamp-2">
                        {pkg.description}
                      </p>

                      {/* Price */}
                      <div className="pt-3 pb-4 border-t border-white/10 mb-5">
                        {pkg.id === '04' && (
                          <span className="text-[10px] uppercase tracking-widest font-mono text-gray-500 block mb-0.5">
                            Starting From
                          </span>
                        )}
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl md:text-3xl font-light text-white tracking-tight font-mono">
                            {pkg.price}
                          </span>
                          {pkg.priceSub && (
                            <span className="text-xs font-mono text-purple-400 font-normal">
                              {pkg.priceSub}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Features */}
                      <div className="space-y-2.5 mb-5 flex-1">
                        {pkg.features.map((feat, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-gray-300 font-light">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-400/80 mt-1.5 shrink-0" />
                            <span className="leading-relaxed">{feat}</span>
                          </div>
                        ))}

                        {/* Custom System Examples */}
                        {pkg.examples && (
                          <div className="mt-3 pt-3 border-t border-white/10">
                            <span className="text-[10px] uppercase tracking-widest font-mono text-purple-400 block mb-1.5">
                              Contoh Implementasi:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {pkg.examples.map((ex, idx) => (
                                <span key={idx} className="text-[11px] text-gray-400 bg-white/[0.03] border border-white/10 rounded-full px-2.5 py-0.5">
                                  {ex}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Note */}
                        {pkg.note && (
                          <p className="mt-2 text-[11px] text-gray-500 font-light italic leading-relaxed pt-2 border-t border-white/5">
                            *{pkg.note}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* CTA */}
                    <a
                      href="https://wa.me/6281234567890?text=Halo%20KIBI,%20saya%20tertarik%20dengan%20layanan%20Website%20"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`relative z-10 w-full py-3 px-4 rounded-xl text-xs font-mono uppercase tracking-wider text-center transition-all duration-300 cursor-pointer block mt-auto ${
                        isPopular
                          ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_16px_rgba(168,85,247,0.4)]'
                          : 'bg-white/[0.05] hover:bg-white/10 hover:border-purple-500/40 text-gray-300 hover:text-white border border-white/15'
                      }`}
                    >
                      {pkg.ctaText}
                    </a>
                  </div>
                );
              })}
            </div>
          )}

          {/* ─── TAB 2: RECURRING RETAINER ─── */}
          {activeTab === 'recurring' && (
            <div className="space-y-8">
              {/* Billing Cycle Options */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3 rounded-2xl bg-[#0c0c14] border border-white/10">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                  <span className="text-xs uppercase tracking-wider font-mono text-gray-300">
                    Opsi Retainer
                  </span>
                  <span className="text-[10px] font-mono text-purple-300 bg-purple-500/20 border border-purple-500/30 px-2 py-0.5 rounded-full">
                    Bundling 6/12 Bln: Diskon 20% Biaya Dev
                  </span>
                </div>

                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.03] border border-white/10">
                  <button
                    onClick={() => setBillingCycle('monthly')}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-mono transition-all cursor-pointer ${
                      billingCycle === 'monthly'
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Bulanan
                  </button>
                  <button
                    onClick={() => setBillingCycle('6month')}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-mono transition-all cursor-pointer flex items-center gap-1 ${
                      billingCycle === '6month'
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    6 Bln
                    <span className="text-[9px] text-purple-200 bg-black/30 px-1 py-0.5 rounded">
                      -10%
                    </span>
                  </button>
                  <button
                    onClick={() => setBillingCycle('12month')}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-mono transition-all cursor-pointer flex items-center gap-1 ${
                      billingCycle === '12month'
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    12 Bln
                    <span className="text-[9px] text-emerald-300 bg-emerald-500/20 px-1 py-0.5 rounded">
                      -20%
                    </span>
                  </button>
                </div>
              </div>

              {/* Recurring Cards - compact 4-column */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 items-stretch">
                {RECURRING_PACKAGES.map((pkg) => {
                  const isPopular = pkg.popular;
                  let displayPrice = pkg.priceMonthly;
                  let periodLabel = '/bln';

                  if (billingCycle === '6month') {
                    displayPrice = pkg.price6m;
                    periodLabel = '/bln';
                  } else if (billingCycle === '12month') {
                    displayPrice = pkg.price12m;
                    periodLabel = '/bln';
                  }

                  return (
                    <div
                      key={pkg.id}
                      className={`group relative rounded-2xl p-6 flex flex-col transition-all duration-300 overflow-hidden ${
                        isPopular
                          ? 'bg-[#0e0e18] border border-purple-500/80 shadow-[0_12px_40px_-10px_rgba(168,85,247,0.3)]'
                          : 'bg-[#0c0c14] border border-white/15 hover:border-purple-500/60 hover:shadow-[0_12px_35px_-10px_rgba(168,85,247,0.2)]'
                      }`}
                      style={{
                        transform: 'translateZ(0)',
                        contain: 'layout style',
                      }}
                    >
                      {/* Hover glow */}
                      <div
                        className="absolute -top-16 -right-16 w-60 h-60 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"
                        style={{
                          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.25) 0%, rgba(147, 51, 234, 0.1) 45%, transparent 70%)',
                          transform: 'translateZ(0)',
                        }}
                      />

                      {/* Top accent */}
                      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-400/30 to-transparent group-hover:via-purple-400/80 transition-all duration-500 pointer-events-none" />

                      <div className="relative z-10 flex flex-col flex-1">
                        {/* Index */}
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xs font-mono tracking-widest text-purple-400 uppercase">
                            // {pkg.id}
                          </span>
                          {isPopular && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider text-purple-300 bg-purple-500/20 border border-purple-500/40 shadow-[0_0_8px_rgba(168,85,247,0.3)]">
                              Recommended
                            </span>
                          )}
                        </div>

                        {/* Name & Target */}
                        <h3 className="text-xl font-light text-white tracking-tight leading-snug mb-1.5 group-hover:text-purple-300 transition-colors">
                          {pkg.name}
                        </h3>
                        <p className="text-xs text-gray-400 font-light leading-relaxed mb-5 line-clamp-2">
                          {pkg.target}
                        </p>

                        {/* Price */}
                        <div className="pt-3 pb-3 border-t border-white/10 mb-5">
                          <div className="flex items-baseline gap-1">
                            <span className="text-2xl md:text-3xl font-light text-white tracking-tight font-mono">
                              {displayPrice}
                            </span>
                            {pkg.id !== '04' && (
                              <span className="text-xs font-mono text-purple-400">
                                {periodLabel}
                              </span>
                            )}
                          </div>

                          {billingCycle !== 'monthly' && pkg.id !== '04' && (
                            <div className="mt-1.5 text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                              <span className="w-1 h-1 rounded-full bg-emerald-400" />
                              <span>Hemat {billingCycle === '6month' ? pkg.discount6m : pkg.discount12m}</span>
                            </div>
                          )}
                        </div>

                        {/* Features */}
                        <div className="space-y-2.5 mb-5 flex-1">
                          {pkg.features.map((feat, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs text-gray-300 font-light">
                              <span className="w-1.5 h-1.5 rounded-full bg-purple-400/80 mt-1.5 shrink-0" />
                              <span className="leading-relaxed">{feat}</span>
                            </div>
                          ))}
                        </div>

                        {/* SLA compact */}
                        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-1 mb-5 text-[11px] font-mono text-gray-300">
                          <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                            <span>{pkg.slaResponse}</span>
                          </div>
                          <div className="text-gray-500 pl-3 text-[10px]">
                            {pkg.slaEmergency}
                          </div>
                        </div>
                      </div>

                      {/* CTA */}
                      <a
                        href="https://wa.me/6281234567890?text=Halo%20KIBI,%20saya%20tertarik%20paket%20Recurring%20"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`relative z-10 w-full py-3 px-4 rounded-xl text-xs font-mono uppercase tracking-wider text-center transition-all duration-300 cursor-pointer block mt-auto ${
                          isPopular
                            ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_16px_rgba(168,85,247,0.4)]'
                            : 'bg-white/[0.05] hover:bg-white/10 hover:border-purple-500/40 text-gray-300 hover:text-white border border-white/15'
                        }`}
                      >
                        {pkg.ctaText}
                      </a>
                    </div>
                  );
                })}
              </div>

              {/* Discount Matrix Table - Compact */}
              <div className="p-5 md:p-7 rounded-2xl bg-[#0c0c14] border border-white/15">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4 pb-4 border-b border-white/10">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest font-mono text-purple-400 block mb-1">
                      Diskon Komitmen Kontrak
                    </span>
                    <h4 className="text-base md:text-lg font-light text-white">
                      Perbandingan Durasi & Penghematan
                    </h4>
                  </div>
                  <p className="text-[11px] text-gray-400 font-light max-w-xs">
                    Potongan hingga 20% dengan pembayaran di muka pada awal periode.
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-[11px] text-left">
                    <thead>
                      <tr className="border-b border-white/10 text-gray-400 font-mono text-[10px] uppercase tracking-wider">
                        <th className="py-2.5 px-3">Durasi</th>
                        <th className="py-2.5 px-3 text-center">Starter</th>
                        <th className="py-2.5 px-3 text-center">Growth</th>
                        <th className="py-2.5 px-3 text-center">Business</th>
                        <th className="py-2.5 px-3 text-center">Diskon</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-mono">
                      <tr className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-2.5 px-3 font-normal text-white">
                          Bulanan
                        </td>
                        <td className="py-2.5 px-3 text-center text-gray-300">Rp750rb</td>
                        <td className="py-2.5 px-3 text-center text-gray-300">Rp1,5jt</td>
                        <td className="py-2.5 px-3 text-center text-gray-300">Rp2,5jt</td>
                        <td className="py-2.5 px-3 text-center text-gray-500">—</td>
                      </tr>
                      <tr className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-2.5 px-3 font-normal text-white">
                          6 Bulan
                        </td>
                        <td className="py-2.5 px-3 text-center text-purple-300">Rp675rb</td>
                        <td className="py-2.5 px-3 text-center text-purple-300">Rp1,35jt</td>
                        <td className="py-2.5 px-3 text-center text-purple-300">Rp2,25jt</td>
                        <td className="py-2.5 px-3 text-center">
                          <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px]">
                            -10%
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-2.5 px-3 font-normal text-white">
                          12 Bulan
                        </td>
                        <td className="py-2.5 px-3 text-center text-emerald-400 font-medium">Rp600rb</td>
                        <td className="py-2.5 px-3 text-center text-emerald-400 font-medium">Rp1,2jt</td>
                        <td className="py-2.5 px-3 text-center text-emerald-400 font-medium">Rp2jt</td>
                        <td className="py-2.5 px-3 text-center">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px]">
                            -20%
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10 text-[11px] text-gray-400 font-light leading-relaxed flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-white font-medium">Bundling Spesial:</span> Mengambil paket Recurring 6 atau 12 bulan bersamaan dengan pembuatan website memberikan <strong className="text-emerald-300 font-medium">potongan 20% langsung pada biaya development</strong>.
                  </div>
                  <div className="text-[10px] text-gray-500 font-mono shrink-0">
                    *Jam support tidak carry-over. Response time hari kerja.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ─── CONTACT SUBSECTION (Fully integrated into the same curtain surface) ─── */}
        <div
          id="contact"
          className="relative w-full min-h-[90vh] flex items-center pt-24 pb-20 mt-16 border-t border-white/[0.06]"
        >
          {/* Full-width ambient glow */}
          <div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full pointer-events-none opacity-50"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(168, 85, 247, 0.15) 0%, rgba(147, 51, 234, 0.05) 50%, transparent 70%)',
              transform: 'translate3d(-50%, 0, 0)',
            }}
          />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 xl:px-20 py-20">
          {/* Contact Container - full width, no rounded card */}
          <div className="relative overflow-hidden">
            {/* Top accent line */}
            {/* Background glows */}
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-purple-600/8 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Left - Contact Info */}
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                  <span className="text-xs uppercase tracking-[0.25em] text-purple-400 font-mono">
                    Contact // 05
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight leading-tight mb-5">
                  Let&apos;s Build<br />
                  <span className="text-purple-400">Something Great.</span>
                </h2>
                <p className="text-base text-gray-400 font-light leading-relaxed mb-10 max-w-lg">
                  Ada kebutuhan custom di luar paket? Diskusikan langsung bersama developer kami untuk solusi yang tepat.
                </p>

                {/* Contact Methods */}
                <div className="space-y-4 mb-10">
                  <a
                    href="https://wa.me/6282349239232?text=Halo%20KIBI,%20saya%20ingin%20konsultasi%20project"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-purple-500/40 hover:bg-white/[0.06] transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
                      <svg className="w-6 h-6 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-base text-white font-light group-hover:text-purple-300 transition-colors">WhatsApp</div>
                      <div className="text-xs text-gray-500 font-mono">+62 823-4923-9232</div>
                    </div>
                    <svg className="w-4 h-4 text-gray-500 ml-auto group-hover:text-purple-400 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </a>

                  <a
                    href="mailto:hello@kitabikin.dev"
                    className="group flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-purple-500/40 hover:bg-white/[0.06] transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center shrink-0">
                      <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-base text-white font-light group-hover:text-purple-300 transition-colors">Email</div>
                      <div className="text-xs text-gray-500 font-mono">hello@kitabikin.dev</div>
                    </div>
                    <svg className="w-4 h-4 text-gray-500 ml-auto group-hover:text-purple-400 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </a>
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-4">
                  <span className="text-xs uppercase tracking-widest font-mono text-gray-500 mr-2">Follow</span>
                  <a
                    href="https://tiktok.com/@kitabikin01"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-lg bg-white/[0.04] border border-white/10 hover:border-purple-500/40 hover:bg-white/[0.08] flex items-center justify-center transition-all group"
                  >
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.88-2.88 2.89 2.89 0 012.88-2.89c.28 0 .55.04.81.11v-3.5a6.37 6.37 0 00-.81-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.82a8.28 8.28 0 004.76 1.5V6.87a4.84 4.84 0 01-1-.18z" />
                    </svg>
                  </a>
                  <a
                    href="https://instagram.com/kitabikin_01"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-lg bg-white/[0.04] border border-white/10 hover:border-purple-500/40 hover:bg-white/[0.08] flex items-center justify-center transition-all group"
                  >
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Right - Contact Form */}
              <div className="p-8 md:p-12 lg:p-16 rounded-2xl bg-[#0c0c14] border border-white/10">
                <h3 className="text-2xl font-light text-white mb-2">Kirim Pesan</h3>
                <p className="text-sm text-gray-500 font-light mb-8">
                  Kami akan merespon dalam 1×24 jam kerja.
                </p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const name = formData.get('name') || '';
                    const company = formData.get('company') || '';
                    const message = formData.get('message') || '';
                    const waText = encodeURIComponent(
                      `Halo KIBI, saya ${name}${company ? ` dari ${company}` : ''}.\n\n${message}`
                    );
                    window.open(`https://wa.me/6282349239232?text=${waText}`, '_blank');
                  }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs uppercase tracking-widest font-mono text-gray-500 block mb-2">
                        Nama
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder-gray-600 font-light focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30 transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-widest font-mono text-gray-500 block mb-2">
                        Perusahaan
                      </label>
                      <input
                        type="text"
                        name="company"
                        placeholder="Opsional"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder-gray-600 font-light focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-widest font-mono text-gray-500 block mb-2">
                      Layanan yang Diminati
                    </label>
                    <select
                      name="service"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-gray-400 font-light focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30 transition-all appearance-none cursor-pointer"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280' stroke-width='1.5'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 14px center',
                        backgroundSize: '18px',
                      }}
                    >
                      <option value="">Pilih layanan...</option>
                      <option value="starter">Website Starter</option>
                      <option value="business">Website Business</option>
                      <option value="ecommerce">E-Commerce</option>
                      <option value="custom">Custom System</option>
                      <option value="retainer">Recurring Retainer</option>
                      <option value="other">Lainnya</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-widest font-mono text-gray-500 block mb-2">
                      Pesan
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      placeholder="Ceritakan kebutuhan project Anda..."
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder-gray-600 font-light focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-mono uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] cursor-pointer flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Kirim via WhatsApp
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
