import { Search, SlidersHorizontal } from 'lucide-react';
import { categories } from '../../data/products';
import type { CategoryId } from '../../types';

export type SortKey = 'popular' | 'newest' | 'price-asc' | 'price-desc' | 'rating';

export const sortLabels: Record<SortKey, string> = {
  popular: 'Most popular',
  newest: 'Newest',
  'price-asc': 'Price: low to high',
  'price-desc': 'Price: high to low',
  rating: 'Top rated (demo data)',
};

interface Props {
  category: CategoryId | 'all';
  onCategory: (c: CategoryId | 'all') => void;
  sort: SortKey;
  onSort: (s: SortKey) => void;
  query?: string;
  onQuery?: (q: string) => void;
  available?: CategoryId[];
  inStockOnly?: boolean;
  onInStockOnly?: (v: boolean) => void;
  idPrefix: string;
}

export default function ProductFilters({ category, onCategory, sort, onSort, query, onQuery, available, inStockOnly, onInStockOnly, idPrefix }: Props) {
  const cats = available ? categories.filter((c) => available.includes(c.id)) : categories;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        {onQuery && (
          <div className="relative w-full lg:max-w-sm">
            <label htmlFor={`${idPrefix}-q`} className="sr-only">Search products by name</label>
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-mute" aria-hidden />
            <input
              id={`${idPrefix}-q`}
              type="search"
              value={query}
              onChange={(e) => onQuery(e.target.value)}
              placeholder="Search plants, pots, tools…"
              className="field rounded-full pl-11"
            />
          </div>
        )}
        <div className="flex flex-wrap items-center gap-3 lg:ml-auto">
          {onInStockOnly && (
            <label className="inline-flex cursor-pointer items-center gap-2 text-[14px] text-ink-soft">
              <input type="checkbox" checked={inStockOnly} onChange={(e) => onInStockOnly(e.target.checked)} className="h-4 w-4 accent-forest" />
              In stock only
            </label>
          )}
          <div className="relative">
            <label htmlFor={`${idPrefix}-sort`} className="sr-only">Sort products</label>
            <SlidersHorizontal className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-forest" aria-hidden />
            <select
              id={`${idPrefix}-sort`}
              value={sort}
              onChange={(e) => onSort(e.target.value as SortKey)}
              className="field min-w-[220px] cursor-pointer appearance-none rounded-full py-2.5 pl-11 pr-8"
            >
              {Object.entries(sortLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </div>
        </div>
      </div>
      <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:flex-wrap md:px-0" role="group" aria-label="Filter by category">
        <button type="button" className="chip shrink-0" aria-pressed={category === 'all'} onClick={() => onCategory('all')}>All</button>
        {cats.map((c) => (
          <button key={c.id} type="button" className="chip shrink-0" aria-pressed={category === c.id} onClick={() => onCategory(c.id)}>
            {c.name}
          </button>
        ))}
      </div>
    </div>
  );
}
