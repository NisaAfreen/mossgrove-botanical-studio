import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { categories, products } from '../data/products';
import type { CategoryId } from '../types';
import ProductFilters, { type SortKey } from '../components/shop/ProductFilters';
import ProductGrid, { filterAndSort } from '../components/shop/ProductGrid';
import PageHeader from '../components/layout/PageHeader';

export default function ShopPage() {
  const [params, setParams] = useSearchParams();
  const category = (params.get('category') as CategoryId | null) ?? 'all';
  const query = params.get('q') ?? '';
  const [sort, setSort] = useState<SortKey>('popular');
  const [inStockOnly, setInStockOnly] = useState(false);

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (!value || value === 'all') next.delete(key); else next.set(key, value);
    setParams(next, { replace: true });
  };

  const items = useMemo(() => filterAndSort(products, { category, sort, query, inStockOnly }), [category, sort, query, inStockOnly]);
  const cat = categories.find((c) => c.id === category);

  return (
    <>
      <PageHeader
        eyebrow="The plant shop"
        title={cat ? cat.name : <>Every plant, <em>pot & tool</em></>}
        intro={cat ? cat.blurb : 'Browse the full demo catalogue. Filter by category, search by name, and sort by price, popularity or what is new.'}
      />
      <section className="wrap pb-28">
        <div className="sticky z-30 -mx-5 bg-ivory/95 px-5 py-4 backdrop-blur md:-mx-10 md:px-10" style={{ top: 'calc(76px + env(safe-area-inset-top, 0px))' }}>
          <ProductFilters
            idPrefix="shop"
            category={category}
            onCategory={(c) => update('category', c)}
            sort={sort}
            onSort={setSort}
            query={query}
            onQuery={(q) => update('q', q)}
            inStockOnly={inStockOnly}
            onInStockOnly={setInStockOnly}
          />
        </div>
        <p className="mb-6 mt-4 text-[14px] text-ink-mute" aria-live="polite">
          {items.length} {items.length === 1 ? 'item' : 'items'}{query && <> matching “{query}”</>}
        </p>
        <ProductGrid items={items} filterKey={category + sort + query + inStockOnly} onReset={() => { setParams(new URLSearchParams(), { replace: true }); setInStockOnly(false); }} />
      </section>
    </>
  );
}
