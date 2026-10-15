import type { ReactNode } from 'react';
import { Sprig } from '../ui/Botanical';

export default function PageHeader({ eyebrow, title, intro, children }: { eyebrow: string; title: ReactNode; intro?: string; children?: ReactNode }) {
  return (
    <header className="relative overflow-hidden">
      <Sprig className="pointer-events-none absolute -right-6 top-6 h-[300px] text-sage/25" />
      <div className="wrap relative pb-12 pt-14 lg:pb-16 lg:pt-20">
        <p className="eyebrow animate-rise">{eyebrow}</p>
        <h1 className="display mt-4 max-w-4xl animate-rise text-[52px] text-forest sm:text-[76px] lg:text-[92px]" style={{ animationDelay: '70ms' }}>{title}</h1>
        {intro && <p className="mt-5 max-w-2xl animate-rise text-[17.5px] text-ink-soft" style={{ animationDelay: '140ms' }}>{intro}</p>}
        {children}
      </div>
    </header>
  );
}
