import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { img } from '../../config/brand';
import { useStore } from '../../context/StoreContext';
import { useCountUp } from '../../hooks/useReveal';
import { products } from '../../data/products';
import { services, projects } from '../../data/content';
import { Sprig } from '../ui/Botanical';
import { SpecimenLabel } from '../ui/bits';

function Stat({ value, label }: { value: number; label: string }) {
  const ref = useCountUp(value, true);
  return (
    <div className="border-l border-ivory/15 pl-4">
      <p className="font-display text-[44px] leading-none text-ivory tabular-nums"><span ref={ref}>{value}</span></p>
      <p className="mt-2 max-w-[16ch] text-[13px] leading-snug text-ivory/60">{label}</p>
    </div>
  );
}

export default function HeroSection() {
  const { setQuickViewId } = useStore();
  return (
    <section className="relative overflow-hidden bg-forest-900 pt-[76px] text-ivory" aria-labelledby="hero-title">
      <Sprig className="pointer-events-none absolute -left-10 top-24 hidden h-[520px] text-sage/[.12] lg:block" />
      <div className="wrap relative grid gap-12 pb-16 pt-10 lg:grid-cols-12 lg:gap-8 lg:pb-20 lg:pt-16">
        <div className="flex flex-col justify-center lg:col-span-7 lg:pr-6">
          <p className="eyebrow animate-rise text-sage-300">Plant shop · Landscape studio · Garden journal</p>
          <h1 id="hero-title" className="display mt-6 animate-rise text-[64px] sm:text-[96px] xl:text-[128px]" style={{ animationDelay: '80ms' }}>
            Bring your world <em className="text-linen">to life.</em>
          </h1>
          <p className="mt-7 max-w-[34rem] animate-rise text-[18px] leading-relaxed text-ivory/75" style={{ animationDelay: '160ms' }}>
            Discover beautiful plants, thoughtfully designed gardens, and expert landscaping solutions that bring nature closer to everyday life.
          </p>
          <div className="mt-9 flex animate-rise flex-wrap gap-3" style={{ animationDelay: '240ms' }}>
            <Link to="/shop" className="btn-light">Explore the Plant Shop <ArrowRight className="h-4 w-4" /></Link>
            <Link to="/landscaping" className="btn-outline-light">Transform Your Garden</Link>
          </div>

          <div className="mt-14 grid max-w-xl grid-cols-3 gap-4 sm:gap-8">
            <Stat value={products.length} label="Plants, pots & tools in the demo shop" />
            <Stat value={services.length} label="Landscape design services" />
            <Stat value={projects.length} label="Garden transformation concepts" />
          </div>
        </div>

        <div className="relative lg:col-span-5">
          <div className="relative mx-auto max-w-[520px]">
            <div className="arch aspect-[4/5] w-full animate-fade bg-forest-800">
              <img
                src={img('hero')}
                alt="Stone garden steps edged with lavender-blue agastache, grasses and hostas"
                className="h-full w-full object-cover object-[45%_center]"
                fetchPriority="high"
              />
            </div>
            <SpecimenLabel
              no="001"
              latin="Agastache & ornamental grasses"
              lines={['Terraced border with dry-stone steps', 'Full sun · low water once established']}
              className="absolute -left-2 bottom-10 w-[230px] sm:-left-10"
            />
            <button
              type="button"
              onClick={() => setQuickViewId('monstera-deliciosa')}
              className="group absolute -right-1 -top-2 flex items-center gap-3 rounded-full bg-ivory p-1.5 pr-4 text-left text-forest shadow-lift transition hover:-translate-y-0.5 sm:-right-6 sm:top-10"
              aria-label="Quick view: Monstera Deliciosa"
            >
              <span className="h-12 w-12 overflow-hidden rounded-full bg-sage-100">
                <img src={img('m-leaf')} alt="" className="h-full w-full object-cover" />
              </span>
              <span className="leading-tight">
                <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-sage-600">Plant of the month</span>
                <span className="block text-[14px] font-semibold">Monstera · ₹1,499</span>
              </span>
              <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
