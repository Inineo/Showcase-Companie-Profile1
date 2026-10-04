'use client';

import { useState } from 'react';
import Image from 'next/image';
import KibiLogo from './KibiLogo';

export default function Footer() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('hello@kibistudio.id');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    {
      name: 'Instagram',
      href: 'https://instagram.com',
      handle: '@kibistudio',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      ),
    },
    {
      name: 'X (Twitter)',
      href: 'https://twitter.com',
      handle: '@kibistudio',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com',
      handle: 'kibi-studio',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
    {
      name: 'GitHub',
      href: 'https://github.com',
      handle: 'kibi-labs',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      ),
    },
    {
      name: 'WhatsApp',
      href: 'https://wa.me/6281234567890',
      handle: '+62 812-3456-7890',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="relative z-30 w-full bg-[#020204] text-white pt-10 md:pt-16 pb-8 md:pb-12 overflow-hidden border-t border-white/[0.08]">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[450px] h-[250px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[250px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Subtle top rim light gradient */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 md:px-12 lg:px-16">
        
        {/* MAIN ROW: Brand Column + Side-by-Side Category Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 pb-8 md:pb-14 border-b border-white/[0.08]">
          
          {/* LEFT: Logo & Description (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="relative h-9 w-[130px]">
                <Image
                  src="/assets/images/kibi-logo-white.png"
                  alt="KIBI Logo"
                  fill
                  sizes="160px"
                  className="object-contain object-left drop-shadow-[0_0_15px_rgba(0,102,255,0.35)]"
                  priority
                />
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-widest uppercase bg-purple-500/10 text-purple-400 border border-purple-500/20">
                Digital Studio
              </span>
            </div>

            <p className="text-gray-400 text-sm font-light leading-relaxed max-w-sm">
              Studio perancangan & pengembangan web mutakhir. Kami membangun platform web berkinerja tinggi, WebGL interaktif, dan sistem digital terukur untuk bisnis Anda.
            </p>

            {/* Quick status pill */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs font-mono text-gray-300">
                Open for New Projects
              </span>
            </div>
          </div>

          {/* RIGHT: Essential Categories directly beside Logo (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            
            {/* 1. Policy & Legal */}
            <div className="flex flex-col gap-3.5">
              <h5 className="text-xs uppercase tracking-[0.2em] font-mono text-purple-400">
                Policy
              </h5>
              <ul className="flex flex-col gap-2.5 text-sm font-light text-gray-400">
                <li>
                  <a href="#privacy" className="hover:text-white transition-colors duration-200">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#terms" className="hover:text-white transition-colors duration-200">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#security" className="hover:text-white transition-colors duration-200">
                    Data & Security
                  </a>
                </li>
                <li>
                  <a href="#sla" className="hover:text-white transition-colors duration-200">
                    SLA & Revision
                  </a>
                </li>
              </ul>
            </div>

            {/* 2. Help & Support */}
            <div className="flex flex-col gap-3.5">
              <h5 className="text-xs uppercase tracking-[0.2em] font-mono text-purple-400">
                Help
              </h5>
              <ul className="flex flex-col gap-2.5 text-sm font-light text-gray-400">
                <li>
                  <a href="#pricing" className="hover:text-white transition-colors duration-200">
                    Paket Layanan
                  </a>
                </li>
                <li>
                  <a href="#selected-work" className="hover:text-white transition-colors duration-200">
                    Studi Kasus
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200 flex items-center gap-1.5">
                    Live WhatsApp
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="text-left hover:text-white transition-colors duration-200 cursor-pointer"
                  >
                    {copiedEmail ? 'Email Disalin ✓' : 'Salin Email'}
                  </button>
                </li>
              </ul>
            </div>

            {/* 3. Contact */}
            <div className="flex flex-col gap-3.5 col-span-2 sm:col-span-1">
              <h5 className="text-xs uppercase tracking-[0.2em] font-mono text-purple-400">
                Contact
              </h5>
              <div className="flex flex-col gap-3 text-sm font-light text-gray-400">
                <div>
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block">Email</span>
                  <a href="mailto:hello@kibistudio.id" className="text-white hover:text-purple-400 transition-colors">
                    hello@kibistudio.id
                  </a>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block">Hotline</span>
                  <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="text-white hover:text-purple-400 transition-colors">
                    +62 812-3456-7890
                  </a>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block">Lokasi</span>
                  <span className="text-gray-300">Indonesia (WIB)</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* SOCIAL MEDIA SECTION: Kategori Sosmed & Logo Sosmed */}
        <div className="py-8 border-b border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-[0.2em] font-mono text-purple-400">
              Social Media
            </span>
            <span className="text-gray-600 font-mono text-xs">//</span>
            <span className="text-xs text-gray-400 font-light">
              Ikuti kabar rilis & showcase terbaru kami
            </span>
          </div>

          {/* Social Media Buttons / Logos */}
          <div className="flex flex-wrap items-center gap-2.5">
            {socialLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.name}
                className="group flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-purple-500/40 text-gray-400 hover:text-white transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
              >
                <span className="text-gray-400 group-hover:text-purple-400 group-hover:scale-110 transition-all duration-200">
                  {item.icon}
                </span>
                <span className="text-xs font-mono tracking-wide hidden md:inline">
                  {item.name}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* BOTTOM ROW: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-light">
          <div>
            © {new Date().getFullYear()} KIBI Studio. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] font-mono text-gray-500">
              High-Performance Web Experience
            </span>

            {/* Back to Top */}
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Kembali ke atas"
              className="p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-purple-500/40 text-gray-400 hover:text-white transition-all duration-300 cursor-pointer flex items-center gap-1.5 group"
            >
              <span className="text-[10px] font-mono uppercase tracking-wider hidden sm:inline group-hover:text-purple-300">
                Top
              </span>
              <svg
                className="w-3.5 h-3.5 transform group-hover:-translate-y-0.5 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
