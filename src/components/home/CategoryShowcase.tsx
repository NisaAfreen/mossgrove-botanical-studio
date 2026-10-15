import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { categories, products } from '../../data/products';
import SmartImage from '../ui/SmartImage';
import { Reveal, SectionHeading } from '../ui/bits';

export default function CategoryShowcase() {
  return (
    <section className="paper py-24 lg:py-32" aria-labelledby="cat-title">
      <div className="wrap">
        <SectionHeading
          eyebrow="Shop by category"
          title={<span id="cat-title">What would you like <em>to grow?</em></span>}
          intro="From statement foliage to seed packets, every category is curated for Indian homes, balconies and climates."
          action={<Link to="/shop" className="btn-ghost shrink-0">Browse all plants <ArrowUpRight className="h-4 w-4" /></Link>}
        />
        <ul className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((c, i) => {
            const n = products.filter((p) => p.category === c.id).length;
            return (
              <Reveal as="li" key={c.id} className={i % 2 === 1 ? 'lg:translate-y-12' : ''}>
                <Link to={`/shop?category=${c.id}`} className="group block">
                  <div className="arch-sm relative aspect-[3/4] bg-sage-100">
                    <SmartImage src={c.image} alt={c.name} className="img-zoom h-full w-full object-cover" />
                    <span className="absolute bottom-3 right-3 grid h-10 w-10 translate-y-2 place-items-center rounded-full bg-ivory text-forest opacity-0 shadow-card transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:opacity-100">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                  <p className="mt-4 font-mono text-[10.5px] uppercase tracking-[0.16em] text-sage-600">{c.note} · {n} items</p>
                  <h3 className="mt-1 font-display text-[26px] leading-tight text-forest transition group-hover:text-terracotta">{c.name}</h3>
                  <p className="mt-1 text-[14px] leading-snug text-ink-soft">{c.blurb}</p>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
