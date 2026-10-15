import { Compass, Droplet, Leaf, Recycle, Ruler, Truck } from 'lucide-react';
import { img } from '../../config/brand';
import { benefits } from '../../data/content';
import SmartImage from '../ui/SmartImage';
import { Reveal, SpecimenLabel } from '../ui/bits';

const icons = { leaf: Leaf, compass: Compass, droplet: Droplet, ruler: Ruler, recycle: Recycle, truck: Truck };

export default function BenefitsSection() {
  return (
    <section className="bg-ivory-200/60 py-24 lg:py-32" aria-labelledby="why-title">
      <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="relative lg:col-span-5">
          <div className="arch relative mx-auto aspect-[4/5] max-w-[460px] bg-sage-100">
            <SmartImage src={img('m-studio')} alt="Inside a glasshouse full of potted plants and seedlings" className="h-full w-full object-cover" />
          </div>
          <SpecimenLabel
            no="014"
            latin="The studio nursery"
            lines={['Where plants would be checked before dispatch', 'Concept imagery']}
            className="absolute -bottom-6 right-0 w-[220px] sm:right-6"
          />
        </div>

        <div className="lg:col-span-7 lg:pl-6">
          <p className="eyebrow">Why choose us · proposed brand values</p>
          <h2 id="why-title" className="display mt-3 text-[44px] text-forest sm:text-[58px]">
            Grown with care, <em>planned with intent</em>
          </h2>
          <p className="mt-4 max-w-xl text-[17px] text-ink-soft">
            These are the principles the brand would be built on. They describe intended practices for this demo, not certified claims.
          </p>
          <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {benefits.map((b) => {
              const Icon = icons[b.icon];
              return (
                <Reveal as="li" key={b.title} className="flex gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-forest/20 text-forest">
                    <Icon className="h-5 w-5" strokeWidth={1.4} />
                  </span>
                  <div>
                    <h3 className="font-display text-[24px] leading-tight text-forest">{b.title}</h3>
                    <p className="mt-1.5 text-[15px] text-ink-soft">{b.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
