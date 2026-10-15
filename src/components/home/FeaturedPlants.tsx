import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { featuredIds, products } from '../../data/products';
import type { CategoryId } from '../../types';
import ProductFilters, { type SortKey } from '../shop/ProductFilters';
import ProductGrid, { filterAndSort } from '../shop/ProductGrid';
import { SectionHeading } from '../ui/bits';

export default function FeaturedPlants() {
  const [category, setCategory] = useState<CategoryId | 'all'>('all');
  const [sort, setSort] = useState<SortKey>('popular');
  const featured = useMemo(() => products.filter((p) => featuredIds.includes(p.id)), []);
  const available = useMemo(() => Array.from(new Set(featured.map((p) => p.category))), [featured]);
  const items = useMemo(() => filterAndSort(featured, { category, sort }), [featured, category, sort]);

  return (
    <section className="py-24 lg:py-32" aria-labelledby="best-title">
      <div className="wrap">
        <SectionHeading
          eyebrow="Bestsellers · demo catalogue"
          title={<span id="best-title">Plants people <em>keep coming back for</em></span>}
          intro="Healthy, well-rooted plants with care notes written for real homes. Prices and ratings shown are sample data for this demo."
        />
        <div className="mt-10">
          <ProductFilters idPrefix="featured" category={category} onCategory={setCategory} sort={sort} onSort={setSort} available={available} />
        </div>
        <div className="mt-10">
          <ProductGrid items={items} filterKey={category + sort} onReset={() => setCategory('all')} />
        </div>
        <div className="mt-14 flex justify-center">
          <Link to="/shop" className="btn-primary">See the full plant shop <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </div>
    </section>
  );
}
