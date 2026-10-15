import { Minus, Plus, Star } from 'lucide-react';
import type { ReactNode } from 'react';
import { useReveal } from '../../hooks/useReveal';
import type { Availability, Product } from '../../types';

export function SectionHeading({
  eyebrow, title, intro, align = 'left', light = false, action,
}: { eyebrow: string; title: ReactNode; intro?: string; align?: 'left' | 'center'; light?: boolean; action?: ReactNode }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`flex flex-col gap-6 md:flex-row md:items-end md:justify-between ${align === 'center' ? 'items-center text-center md:flex-col md:items-center' : ''}`}>
      <div className={`max-w-2xl ${align === 'center' ? 'mx-auto' : ''}`}>
        <p className={`eyebrow ${light ? 'text-sage-300' : ''}`}>{eyebrow}</p>
        <h2 className={`display mt-3 text-[42px] sm:text-[56px] lg:text-[64px] ${light ? 'text-ivory' : 'text-forest'}`}>{title}</h2>
        {intro && <p className={`mt-4 max-w-xl text-[17px] ${light ? 'text-ivory/75' : 'text-ink-soft'} ${align === 'center' ? 'mx-auto' : ''}`}>{intro}</p>}
      </div>
      {action}
    </div>
  );
}

export function Reveal({ children, className = '', as: Tag = 'div' }: { children: ReactNode; className?: string; as?: 'div' | 'section' | 'li' | 'article' }) {
  const ref = useReveal<HTMLDivElement>();
  return <Tag ref={ref as never} className={className}>{children}</Tag>;
}

export function Stars({ rating, reviews, small = false }: { rating: number; reviews: number; small?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1.5 ${small ? 'text-[12px]' : 'text-[13px]'} text-ink-soft`}>
      <span className="inline-flex" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={`h-3.5 w-3.5 ${i < Math.round(rating) ? 'fill-terracotta text-terracotta' : 'text-linen-500'}`} />
        ))}
      </span>
      <span>
        <span className="sr-only">Rated </span>{rating.toFixed(1)}
        <span className="text-ink-mute"> ({reviews} demo reviews)</span>
      </span>
    </span>
  );
}

const availabilityCopy: Record<Availability, { label: string; dot: string }> = {
  'in-stock': { label: 'In stock', dot: 'bg-sage-500' },
  'low-stock': { label: 'Only a few left', dot: 'bg-terracotta' },
  'out-of-stock': { label: 'Out of stock', dot: 'bg-ink-mute' },
};

export function AvailabilityTag({ product }: { product: Product }) {
  const a = availabilityCopy[product.availability];
  const label = product.availability === 'low-stock' ? `Only ${product.stock} left` : a.label;
  return (
    <span className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-ink-soft">
      <span className={`h-1.5 w-1.5 rounded-full ${a.dot}`} aria-hidden /> {label}
    </span>
  );
}

export function QuantityStepper({ value, onChange, max, label }: { value: number; onChange: (n: number) => void; max: number; label: string }) {
  return (
    <div className="inline-flex items-center rounded-full border border-forest/15 bg-white/60" role="group" aria-label={`Quantity for ${label}`}>
      <button type="button" className="grid h-10 w-10 place-items-center rounded-full text-forest hover:bg-forest/5" onClick={() => onChange(value - 1)} aria-label={`Decrease quantity of ${label}`}>
        <Minus className="h-4 w-4" />
      </button>
      <span className="w-8 text-center text-[15px] font-semibold tabular-nums" aria-live="polite">{value}</span>
      <button type="button" className="grid h-10 w-10 place-items-center rounded-full text-forest hover:bg-forest/5 disabled:opacity-40" onClick={() => onChange(value + 1)} disabled={value >= max} aria-label={`Increase quantity of ${label}`}>
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}

/** Herbarium-style specimen label — the site's signature detail. */
export function SpecimenLabel({ no, latin, lines, className = '' }: { no: string; latin: string; lines: string[]; className?: string }) {
  return (
    <div className={`specimen ${className}`}>
      <div className="flex items-baseline justify-between gap-4 border-b border-forest/15 pb-1">
        <span className="uppercase tracking-[0.16em]">Specimen</span>
        <span className="tabular-nums">No. {no}</span>
      </div>
      <p className="mt-1.5 font-display text-[17px] italic leading-tight text-forest">{latin}</p>
      {lines.map((l) => (
        <p key={l} className="mt-0.5">{l}</p>
      ))}
    </div>
  );
}
