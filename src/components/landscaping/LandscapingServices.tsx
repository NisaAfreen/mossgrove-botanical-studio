import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check } from 'lucide-react';
import { services } from '../../data/content';
import { Frond } from '../ui/Botanical';
import SmartImage from '../ui/SmartImage';
import { SectionHeading } from '../ui/bits';

/**
 * Editorial "service index": a list on one side, a large preview on the other.
 * Hover or focus a service to swap the preview; on mobile every service shows its own image.
 */
export default function LandscapingServices() {
  const [active, setActive] = useState(0);
  const s = services[active];

  return (
    <section id="landscaping" className="relative overflow-hidden bg-forest text-ivory" aria-labelledby="svc-title">
      <Frond className="pointer-events-none absolute -right-16 top-10 w-[520px] text-sage/[.14]" />
      <div className="wrap relative py-24 lg:py-32">
        <SectionHeading
          light
          eyebrow="The landscape studio"
          title={<span id="svc-title">Gardens designed around <em className="text-linen">how you live</em></span>}
          intro="Beyond the shop, the studio plans and builds green spaces of every size, from a single balcony to a full commercial frontage."
          action={<Link to="/landscaping" className="btn-outline-light shrink-0">All landscaping services <ArrowUpRight className="h-4 w-4" /></Link>}
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Large preview (desktop) */}
          <div className="relative hidden lg:col-span-6 lg:block">
            <div className="sticky top-28">
              <div className="arch relative aspect-[4/5] bg-forest-800">
                {services.map((sv, i) => (
                  <img
                    key={sv.id}
                    src={sv.image}
                    alt={i === active ? sv.name : ''}
                    aria-hidden={i !== active}
                    loading="lazy"
                    className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-700 ${i === active ? 'scale-100 opacity-100' : 'scale-105 opacity-0'}`}
                  />
                ))}
              </div>
              <div className="absolute -bottom-6 left-8 right-8 rounded-2xl bg-ivory p-5 text-ink shadow-lift">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-sage-600">Includes · {s.timeline}</p>
                <ul className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1.5 text-[14px]">
                  {s.includes.map((x) => (
                    <li key={x} className="flex items-start gap-2"><Check className="mt-1 h-3.5 w-3.5 shrink-0 text-terracotta" />{x}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Index */}
          <ul className="lg:col-span-6">
            {services.map((sv, i) => (
              <li key={sv.id} className="border-t border-ivory/15 last:border-b">
                <div
                  className={`group grid gap-5 py-7 transition lg:py-8 ${i === active ? 'lg:opacity-100' : 'lg:opacity-60 lg:hover:opacity-100'}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                >
                  <div className="arch-sm aspect-[16/10] lg:hidden">
                    <SmartImage src={sv.image} alt={sv.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <h3 className="font-display text-[32px] leading-[1.05] sm:text-[38px]">{sv.name}</h3>
                      <p className="mt-2 max-w-md text-[15.5px] text-ivory/70">{sv.short}</p>
                      <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-linen/80">{sv.from}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link to={`/landscaping#${sv.id}`} className="inline-flex min-h-[42px] items-center gap-1.5 rounded-full border border-ivory/30 px-4 text-[14px] font-semibold hover:bg-ivory hover:text-forest">
                      Explore service <ArrowUpRight className="h-4 w-4" />
                    </Link>
                    <Link to={`/contact?service=${sv.id}`} className="inline-flex min-h-[42px] items-center gap-1.5 rounded-full bg-terracotta px-4 text-[14px] font-semibold text-ivory hover:bg-terracotta-600">
                      Get a quote
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
