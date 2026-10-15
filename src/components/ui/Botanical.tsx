import type { SVGProps } from 'react';

/** Hand-drawn style botanical line art used as the site's signature motif. */
export function Sprig(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 120 160" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <path d="M60 156C60 110 58 70 64 8" />
      <path d="M61 128c-14-4-26-14-30-30 14 2 26 12 30 30z" />
      <path d="M61 128c-9-6-16-15-21-27" opacity=".5" />
      <path d="M60 100c15-5 26-17 28-33-14 3-25 15-28 33z" />
      <path d="M60 100c9-8 15-18 20-30" opacity=".5" />
      <path d="M61 74c-13-5-22-16-24-31 13 3 22 14 24 31z" />
      <path d="M62 50c11-5 18-14 20-27-11 3-18 13-20 27z" />
      <path d="M63 28c-7-4-11-10-12-18 7 2 11 9 12 18z" />
    </svg>
  );
}

export function Frond(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 80" fill="none" stroke="currentColor" strokeWidth={1.1} strokeLinecap="round" aria-hidden {...props}>
      <path d="M4 60C60 52 120 40 196 14" />
      {Array.from({ length: 11 }).map((_, i) => {
        const x = 18 + i * 16;
        const y = 58 - i * 4.2;
        return (
          <g key={i}>
            <path d={`M${x} ${y}c4-10 10-16 18-20`} />
            <path d={`M${x} ${y}c8 4 14 6 22 6`} opacity=".6" />
          </g>
        );
      })}
    </svg>
  );
}

export function Logo({ className = '', light = false }: { className?: string; light?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 40 40" className="h-9 w-9 shrink-0" aria-hidden>
        <path d="M4 38V20a16 16 0 0 1 32 0v18z" fill={light ? '#f8f4ec' : '#1e3a2c'} />
        <g stroke={light ? '#1e3a2c' : '#e8dcc6'} strokeWidth="1.5" fill="none" strokeLinecap="round">
          <path d="M20 34V14" />
          <path d="M20 24c-5-1-8-5-8-10 5 1 8 5 8 10z" />
          <path d="M20 28c5-1 8-5 8-10-5 1-8 5-8 10z" />
        </g>
      </svg>
      <span className="leading-none">
        <span className={`block font-display text-[26px] ${light ? 'text-ivory' : 'text-forest'}`}>Mossgrove</span>
        <span className={`mt-0.5 block font-mono text-[8.5px] uppercase tracking-[0.28em] ${light ? 'text-linen/80' : 'text-sage-600'}`}>Botanical Studio</span>
      </span>
    </span>
  );
}
