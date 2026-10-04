import React from 'react';
import Image from 'next/image';

interface KibiLogoProps {
  className?: string;
  showText?: boolean;
  lightText?: boolean;
}

export default function KibiLogo({
  className = 'h-8 w-auto',
  showText = true,
  lightText = true,
}: KibiLogoProps) {
  return (
    <div className={`inline-flex items-center gap-3.5 select-none ${className}`}>
      {/* KIBI Emblem PNG directly extracted from provided logo */}
      <div className="relative h-full aspect-[115/104] shrink-0 drop-shadow-[0_0_16px_rgba(0,102,255,0.4)]">
        <Image
          src="/assets/images/kibi-icon.png"
          alt="KIBI Emblem"
          fill
          sizes="64px"
          className="object-contain"
          priority
        />
      </div>

      {/* Brand Typography */}
      {showText && (
        <span
          className={`font-black tracking-[0.14em] text-2xl md:text-3xl font-sans transition-colors duration-300 ${
            lightText ? 'text-white' : 'text-slate-900'
          }`}
          style={{ letterSpacing: '0.12em' }}
        >
          KIBI
        </span>
      )}
    </div>
  );
}
