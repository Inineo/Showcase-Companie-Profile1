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
      '1× revisi desain arsitektur',
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
      '2× revisi desain komprehensif',
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
      'Sistem keranjang belanja (cart drawer)',
      'Alur checkout terotomatisasi',
      'Sistem manajemen pesanan (orders)',
      'Manajemen pelanggan & data leads',
      'Dashboard admin komprehensif',
      'Integrasi payment gateway lokal',
      'Optimasi checkout flow mobile-first',
    ],
    note: 'Biaya payment gateway terpisah sesuai provider yang dipilih.',
    ctaText: 'Pilih E-Commerce',
  },
  {
    id: '04',
    name: 'Custom System',
    price: 'Rp10',
    priceSub: 'JT+',
    badge: 'Tailored Architecture',
    description: 'Sistem web aplikasi custom yang dibangun presisi mengikuti model bisnis Anda.',
    features: [
      'Arsitektur cloud scalable & performa tinggi',
      'Integrasi API pihak ketiga & webhook',
      'Desain database & keamanan enterprise',
      'UI/UX eksklusif dengan mikro-interaksi',
    ],
    examples: [
      'Sistem Reservasi & Booking',
      'CRM & Pipeline Penjualan',
      'Executive Analytics Dashboard',
      'Portal Membership & Autentikasi',
      'Internal Management System',
      'Otomatisasi Alur Bisnis Khusus',
    ],
    note: 'Biaya akhir disesuaikan dengan cakupan & kompleksitas kebutuhan.',
    ctaText: 'Konsultasi Kebutuhan',
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
      'Inspeksi keamanan & pencadangan berkala',
      '2 jam dedicated support / bulan',
      'Dashboard manajemen konten mandiri',
    ],
    slaResponse: 'Response: Maks. 2×24 jam kerja',
    slaEmergency: 'Kondisi darurat: 1×24 jam',
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
      'Inspeksi keamanan & pencadangan berkala',
      '5 jam dedicated support / bulan',
      'Dashboard manajemen konten mandiri',
      'Perbaikan bug minor dengan prioritas',
    ],
    slaResponse: 'Response: Maks. 1×24 jam kerja',
    slaEmergency: 'Kondisi darurat: 12 jam',
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
    target: 'Untuk e-commerce dan platform berinteraksi harian.',
    features: [
      'Hosting cloud & uptime monitoring',
      'Inspeksi keamanan & pencadangan berkala',
      '10 jam dedicated support / bulan',
      'Dashboard admin + asistensi update produk',
      'Penanganan tiket prioritas tinggi',
    ],
    slaResponse: 'Response: Maks. 4 jam kerja',
    slaEmergency: 'Kondisi darurat: 2 jam',
    ctaText: 'Mulai Langganan',
  },
  {
    id: '04',
    name: 'Custom Retainer',
    priceMonthly: 'Custom quote',
    price6m: 'Custom quote',
    price12m: 'Custom quote',
    discount6m: 'Sesuai kontrak',
    discount12m: 'Sesuai kontrak',
    target: 'Infrastruktur berskala besar & sistem digital kompleks.',
    features: [
      'Infrastruktur cloud khusus (Private Cluster)',
      'Service Level Agreement (SLA) spesifik',
      'Alokasi jam support fleksibel on-demand',
      'Dedicated Technical Lead / PIC khusus',
      'Laporan performa, audit, & analytics bulanan',
    ],
    slaResponse: 'SLA sesuai kesepakatan kontrak',
    slaEmergency: 'Jalur eskalasi darurat 24/7',
    ctaText: 'Hubungi Tim Teknis',
  },
];

export default function PricingSection() {
  const [activeTab, setActiveTab] = useState<ServiceTab>('development');
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');

  return (
    <section
      id="pricing"
      className="curtain-section relative z-40 w-full bg-[#030305] border-t border-purple-500/30 rounded-t-[3rem] pt-24 pb-36 select-none"
      style={{
        contain: 'paint layout',
        transform: 'translateZ(0)',
        willChange: 'auto',
      }}
    >
      {/* Illuminated Horizon Rim Light (Consistent with WhatWeDo) */}
      <div className="curtain-rim-light absolute top-0 left-0 right-0 h-[2px] rounded-t-[3rem] bg-gradient-to-r from-transparent via-purple-400 to-transparent pointer-events-none z-50" />

      {/* Lightweight GPU-friendly ambient glow (transform3d layer) */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-600/[0.06] rounded-full blur-[100px] pointer-events-none"
        style={{ transform: 'translate3d(-50%, 0, 0)', willChange: 'transform' }}
      />

      {/* Section Header */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-16 xl:px-20 mb-14">
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
        {/* Tab Switcher: Development vs Recurring */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12 pb-8 border-b border-white/10">
          <div className="flex items-center gap-2 p-1.5 rounded-full bg-[#0c0c14] border border-white/15">
            <button
              onClick={() => setActiveTab('development')}
              className={`px-6 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                activeTab === 'development'
                  ? 'bg-purple-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                  : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              Development Project
            </button>
            <button
              onClick={() => setActiveTab('recurring')}
              className={`px-6 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                activeTab === 'recurring'
                  ? 'bg-purple-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                  : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              Recurring Retainer
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

        {/* ─── TAB 1: WEBSITE DEVELOPMENT ─── */}
        {activeTab === 'development' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch mb-16">
            {DEV_PACKAGES.map((pkg) => {
              const isPopular = pkg.popular;
              return (
                <div
                  key={pkg.id}
                  className={`group relative rounded-3xl p-8 md:p-10 flex flex-col justify-between transition-colors duration-200 overflow-hidden ${
                    isPopular
                      ? 'bg-[#0e0e18] border border-purple-500/80 shadow-[0_15px_40px_rgba(168,85,247,0.12)]'
                      : 'bg-[#0c0c14] border border-white/15 hover:border-purple-500/50'
                  }`}
                  style={{
                    transform: 'translateZ(0)',
                    contain: 'layout style',
                  }}
                >
                  {/* Subtle Accent Edge */}
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent pointer-events-none" />

                  <div className="relative z-10">
                    {/* Index & Badge */}
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-xs font-mono tracking-widest text-purple-400 uppercase">
                        // {pkg.id}
                      </span>
                      {isPopular ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider text-purple-300 bg-purple-500/20 border border-purple-500/40 shadow-[0_0_10px_rgba(168,85,247,0.3)]">
                          Most Selected
                        </span>
                      ) : (
                        pkg.badge && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider text-gray-400 bg-white/[0.04] border border-white/10">
                            {pkg.badge}
                          </span>
                        )
                      )}
                    </div>

                    {/* Title & Desc */}
                    <h3 className="text-2xl font-light text-white tracking-tight leading-snug mb-2 group-hover:text-purple-300 transition-colors">
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-gray-400 font-light leading-relaxed min-h-[38px] mb-6">
                      {pkg.description}
                    </p>

                    {/* Price */}
                    <div className="pt-4 pb-6 border-t border-white/10 mb-6">
                      {pkg.id === '04' && (
                        <span className="text-[10px] uppercase tracking-widest font-mono text-gray-500 block mb-1">
                          Starting From
                        </span>
                      )}
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl sm:text-4xl font-light text-white tracking-tight font-mono">
                          {pkg.price}
                        </span>
                        {pkg.priceSub && (
                          <span className="text-sm font-mono text-purple-400 font-normal">
                            {pkg.priceSub}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="space-y-3 mb-8">
                      {pkg.features.map((feat, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs text-gray-300 font-light">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-400/80 mt-1.5 shrink-0" />
                          <span className="leading-relaxed">{feat}</span>
                        </div>
                      ))}

                      {/* Custom System Examples */}
                      {pkg.examples && (
                        <div className="mt-5 pt-4 border-t border-white/10">
                          <span className="text-[10px] uppercase tracking-widest font-mono text-purple-400 block mb-2">
                            Implementasi Contoh:
                          </span>
                          <div className="space-y-1.5">
                            {pkg.examples.map((ex, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-xs text-gray-400 font-light">
                                <span className="w-1 h-1 rounded-full bg-white/40" />
                                <span>{ex}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Note */}
                      {pkg.note && (
                        <p className="mt-4 text-[11px] text-gray-500 font-light italic leading-relaxed pt-2 border-t border-white/5">
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
                    className={`relative z-10 w-full py-3 px-4 rounded-xl text-xs font-mono uppercase tracking-wider text-center transition-all duration-300 cursor-pointer block ${
                      isPopular
                        ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]'
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
          <div className="space-y-12 mb-14">
            {/* Billing Cycle Options */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#0c0c14] border border-white/10">
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                <span className="text-xs uppercase tracking-wider font-mono text-gray-300">
                  Opsi Komitmen Retainer
                </span>
              </div>

              <div className="flex items-center gap-2 p-1 rounded-xl bg-white/[0.03] border border-white/10">
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    billingCycle === 'monthly'
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Bulanan
                </button>
                <button
                  onClick={() => setBillingCycle('6month')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                    billingCycle === '6month'
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  6 Bulan
                  <span className="text-[10px] text-purple-200 bg-black/30 px-1.5 py-0.5 rounded">
                    -10%
                  </span>
                </button>
                <button
                  onClick={() => setBillingCycle('12month')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                    billingCycle === '12month'
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  12 Bulan
                  <span className="text-[10px] text-emerald-300 bg-emerald-500/20 px-1.5 py-0.5 rounded">
                    -20%
                  </span>
                </button>
              </div>
            </div>

            {/* Recurring Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              {RECURRING_PACKAGES.map((pkg) => {
                const isPopular = pkg.popular;
                let displayPrice = pkg.priceMonthly;
                let periodLabel = '/bln';

                if (billingCycle === '6month') {
                  displayPrice = pkg.price6m;
                  periodLabel = '/bln (kontrak 6 bln)';
                } else if (billingCycle === '12month') {
                  displayPrice = pkg.price12m;
                  periodLabel = '/bln (kontrak 12 bln)';
                }

                return (
                  <div
                    key={pkg.id}
                    className={`group relative rounded-3xl p-8 md:p-10 flex flex-col justify-between transition-colors duration-200 overflow-hidden ${
                      isPopular
                        ? 'bg-[#0e0e18] border border-purple-500/80 shadow-[0_15px_40px_rgba(168,85,247,0.12)]'
                        : 'bg-[#0c0c14] border border-white/15 hover:border-purple-500/50'
                    }`}
                    style={{
                      transform: 'translateZ(0)',
                      contain: 'layout style',
                    }}
                  >
                    {/* Subtle Accent Edge */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent pointer-events-none" />

                    <div className="relative z-10">
                      {/* Index */}
                      <div className="flex items-center justify-between mb-5">
                        <span className="text-xs font-mono tracking-widest text-purple-400 uppercase">
                          // {pkg.id}
                        </span>
                        {isPopular && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider text-purple-300 bg-purple-500/20 border border-purple-500/40 shadow-[0_0_10px_rgba(168,85,247,0.3)]">
                            Recommended
                          </span>
                        )}
                      </div>

                      {/* Name & Target */}
                      <h3 className="text-2xl font-light text-white tracking-tight leading-snug mb-2 group-hover:text-purple-300 transition-colors">
                        {pkg.name}
                      </h3>
                      <p className="text-xs text-gray-400 font-light leading-relaxed min-h-[38px] mb-6">
                        {pkg.target}
                      </p>

                      {/* Price */}
                      <div className="pt-4 pb-6 border-t border-white/10 mb-6">
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl sm:text-4xl font-light text-white tracking-tight font-mono">
                            {displayPrice}
                          </span>
                          {pkg.id !== '04' && (
                            <span className="text-xs font-mono text-purple-400">
                              {periodLabel}
                            </span>
                          )}
                        </div>

                        {billingCycle !== 'monthly' && pkg.id !== '04' && (
                          <div className="mt-2 text-[10px] font-mono text-emerald-400 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            <span>Hemat {billingCycle === '6month' ? pkg.discount6m : pkg.discount12m} dari harga reguler</span>
                          </div>
                        )}
                      </div>

                      {/* Features */}
                      <div className="space-y-3 mb-6">
                        {pkg.features.map((feat, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-xs text-gray-300 font-light">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-400/80 mt-1.5 shrink-0" />
                            <span className="leading-relaxed">{feat}</span>
                          </div>
                        ))}
                      </div>

                      {/* SLA Spec */}
                      <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1 mb-8 text-[11px] font-mono text-gray-300">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                          <span>{pkg.slaResponse}</span>
                        </div>
                        <div className="text-gray-400 pl-3.5 text-[10px]">
                          {pkg.slaEmergency}
                        </div>
                      </div>
                    </div>

                    {/* CTA */}
                    <a
                      href="https://wa.me/6281234567890?text=Halo%20KIBI,%20saya%20tertarik%20paket%20Recurring%20"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`relative z-10 w-full py-3 px-4 rounded-xl text-xs font-mono uppercase tracking-wider text-center transition-all duration-300 cursor-pointer block ${
                        isPopular
                          ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                          : 'bg-white/[0.05] hover:bg-white/10 hover:border-purple-500/40 text-gray-300 hover:text-white border border-white/15'
                      }`}
                    >
                      {pkg.ctaText}
                    </a>
                  </div>
                );
              })}
            </div>

            {/* Matrix Table: Diskon Komitmen Kontrak */}
            <div className="p-7 md:p-10 rounded-3xl bg-[#0c0c14] border border-white/15">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
                <div>
                  <span className="text-xs uppercase tracking-widest font-mono text-purple-400 block mb-1">
                    Diskon Komitmen Kontrak
                  </span>
                  <h4 className="text-lg md:text-xl font-light text-white">
                    Perbandingan Durasi & Penghematan
                  </h4>
                </div>
                <p className="text-xs text-gray-400 font-light max-w-sm">
                  Dapatkan potongan hingga 20% dengan skema pembayaran di muka pada awal periode.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-white/10 text-gray-400 font-mono text-[11px] uppercase tracking-wider">
                      <th className="py-3 px-4">Durasi Kontrak</th>
                      <th className="py-3 px-4 text-center">Starter</th>
                      <th className="py-3 px-4 text-center">Growth</th>
                      <th className="py-3 px-4 text-center">Business</th>
                      <th className="py-3 px-4 text-center">Benefit Diskon</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-mono">
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3.5 px-4 font-normal text-white">
                        Bulanan <span className="text-gray-500 text-[11px] font-sans">(Tanpa komitmen)</span>
                      </td>
                      <td className="py-3.5 px-4 text-center text-gray-300">Rp750rb</td>
                      <td className="py-3.5 px-4 text-center text-gray-300">Rp1,5jt</td>
                      <td className="py-3.5 px-4 text-center text-gray-300">Rp2,5jt</td>
                      <td className="py-3.5 px-4 text-center text-gray-500">—</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3.5 px-4 font-normal text-white">
                        6 Bulan <span className="text-gray-500 text-[11px] font-sans">(Bayar di muka)</span>
                      </td>
                      <td className="py-3.5 px-4 text-center text-purple-300">Rp675rb</td>
                      <td className="py-3.5 px-4 text-center text-purple-300">Rp1,35jt</td>
                      <td className="py-3.5 px-4 text-center text-purple-300">Rp2,25jt</td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[11px]">
                          -10%
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3.5 px-4 font-normal text-white">
                        12 Bulan <span className="text-gray-500 text-[11px] font-sans">(Bayar di muka)</span>
                      </td>
                      <td className="py-3.5 px-4 text-center text-emerald-400 font-medium">Rp600rb</td>
                      <td className="py-3.5 px-4 text-center text-emerald-400 font-medium">Rp1,2jt</td>
                      <td className="py-3.5 px-4 text-center text-emerald-400 font-medium">Rp2jt</td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px]">
                          -20%
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Informational Policy */}
              <div className="mt-6 pt-5 border-t border-white/10 text-xs text-gray-400 font-light leading-relaxed">
                <span className="text-white font-medium">Catatan Layanan:</span> Bundling project baru mendapatkan diskon development khusus. Jam support tidak carry-over ke bulan berikutnya. Response time berlaku pada hari kerja (Sen–Jum 09.00–18.00 WIB); situasi darurat kritis ditangani fleksibel.
              </div>
            </div>
          </div>
        )}

        {/* ─── BOTTOM BANNER: BESPOKE INQUIRY & CHANNELS ─── */}
        <div className="p-8 md:p-12 rounded-3xl bg-[#0c0c14] border border-white/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-lg">
            <span className="text-xs uppercase tracking-widest font-mono text-purple-400 block mb-2">
              Beyond Standard Packages
            </span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-light text-white tracking-tight leading-snug mb-3">
              Ada kebutuhan di luar paket? Let&apos;s build it together.
            </h3>
            <p className="text-xs md:text-sm text-gray-400 font-light leading-relaxed">
              Diskusikan kebutuhan arsitektur custom atau integrasi khusus Anda langsung bersama technical developer kami.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            <a
              href="https://tiktok.com/@kitabikin01"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-gray-300 hover:text-white transition-colors text-center"
            >
              TikTok: @kitabikin01
            </a>
            <a
              href="https://instagram.com/kitabikin_01"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-gray-300 hover:text-white transition-colors text-center"
            >
              IG: @kitabikin_01
            </a>
            <a
              href="https://wa.me/6281234567890?text=Halo%20KIBI,%20saya%20ingin%20konsultasi%20project%20custom"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-xs font-mono uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] text-center"
            >
              Start Conversation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
