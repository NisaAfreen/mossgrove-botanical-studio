import { useEffect, useState } from 'react';
import { Leaf } from 'lucide-react';
import type { CategoryId, Product } from '../../types';
import ProductCard from './ProductCard';
import type { SortKey } from './ProductFilters';

export function filterAndSort(list: Product[], opts: { category: CategoryId | 'all'; sort: SortKey; query?: string; inStockOnly?: boolean }) {
  const q = opts.query?.trim().toLowerCase() ?? '';
  const out = list.filter(
    (p) =>
      (opts.category === 'all' || p.category === opts.category) &&
      (!opts.inStockOnly || p.availability !== 'out-of-stock') &&
      (!q || p.name.toLowerCase().includes(q) || p.latin?.toLowerCase().includes(q) || p.tags?.some((t) => t.includes(q))),
  );
  const by: Record<SortKey, (a: Product, b: Product) => number> = {
    popular: (a, b) => b.popularity - a.popularity,
    newest: (a, b) => b.addedOn.localeCompare(a.addedOn),
    'price-asc': (a, b) => a.price - b.price,
    'price-desc': (a, b) => b.price - a.price,
    rating: (a, b) => b.rating - a.rating || b.reviews - a.reviews,
  };
  return [...out].sort(by[opts.sort]);
}

/** Grid with a brief skeleton when the filter set changes, and an empty state. */
export default function ProductGrid({ items, filterKey, onReset }: { items: Product[]; filterKey: string; onReset?: () => void }) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 260);
    return () => clearTimeout(t);
  }, [filterKey]);

  if (!loading && items.length === 0) {
    return (
      <div className="rounded-[28px] border border-dashed border-forest/20 px-6 py-16 text-center">
        <Leaf className="mx-auto h-8 w-8 text-sage-500" aria-hidden />
        <p className="mt-4 font-display text-[30px] text-forest">Nothing matches yet</p>
        <p className="mx-auto mt-2 max-w-sm text-ink-soft">Try a different search term or category. Searching for “low-maintenance” or “balcony” works too.</p>
        {onReset && <button type="button" className="btn-ghost mt-6" onClick={onReset}>Clear filters</button>}
      </div>
    );
  }

  return (
    <div aria-busy={loading}>
      <p className="sr-only" aria-live="polite">{loading ? 'Updating products' : `${items.length} products shown`}</p>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
        {loading
          ? Array.from({ length: Math.min(Math.max(items.length, 4), 8) }).map((_, i) => (
              <li key={i} className="animate-pulse">
                <div className="aspect-[4/5] rounded-[22px] bg-sage-100" />
                <div className="mt-4 h-3 w-1/3 rounded bg-sage-100" />
                <div className="mt-3 h-6 w-2/3 rounded bg-sage-100" />
                <div className="mt-6 h-9 w-full rounded-full bg-sage-100" />
              </li>
            ))
          : items.map((p) => (
              <li key={p.id} className="animate-fade">
                <ProductCard product={p} />
              </li>
            ))}
      </ul>
    </div>
  );
}
