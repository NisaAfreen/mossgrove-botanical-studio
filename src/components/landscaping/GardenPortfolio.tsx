import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, MapPin } from 'lucide-react';
import { projects } from '../../data/content';
import BeforeAfter from './BeforeAfter';
import { SectionHeading } from '../ui/bits';

export default function GardenPortfolio({ showHeading = true }: { showHeading?: boolean }) {
  const [active, setActive] = useState(0);
  const p = projects[active];

  return (
    <section className="bg-linen-300/60 py-24 lg:py-32" aria-labelledby="pf-title">
      <div className="wrap">
        {showHeading && (
          <SectionHeading
            eyebrow="Garden transformations"
            title={<span id="pf-title">From bare to <em>lived-in green</em></span>}
            intro="Four illustrative demo projects showing the kind of change the studio could deliver. Drag the slider to compare."
          />
        )}

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <div role="tablist" aria-label="Demo projects" className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 lg:col-span-4 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0">
            {projects.map((pr, i) => (
              <button
                key={pr.id}
                role="tab"
                id={`tab-${pr.id}`}
                aria-selected={i === active}
                aria-controls={`panel-${pr.id}`}
                onClick={() => setActive(i)}
                className={`shrink-0 rounded-full border px-4 py-2.5 text-left transition lg:rounded-none lg:border-0 lg:border-t lg:px-0 lg:py-5 ${
                  i === active ? 'border-forest bg-forest text-ivory lg:bg-transparent lg:text-forest' : 'border-forest/15 text-ink-soft hover:text-forest lg:border-forest/15'
                }`}
              >
                <span className="hidden font-mono text-[10.5px] uppercase tracking-[0.14em] text-sage-600 lg:block">{pr.space}</span>
                <span className="font-display text-[19px] lg:mt-1 lg:block lg:text-[30px] lg:leading-tight">{pr.title}</span>
                {i === active && <span className="mt-3 hidden h-0.5 w-12 bg-terracotta lg:block" aria-hidden />}
              </button>
            ))}
          </div>

          <div id={`panel-${p.id}`} role="tabpanel" aria-labelledby={`tab-${p.id}`} className="min-w-0 lg:col-span-8">
            <BeforeAfter key={p.id} before={p.before} after={p.after} label={p.title} />
            <div className="mt-6 grid gap-6 md:grid-cols-[1fr_auto]">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full border border-terracotta/40 px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.14em] text-terracotta-600">
                  Illustrative demo project
                </p>
                <p className="mt-3 max-w-xl text-[16.5px] text-ink-soft">{p.summary}</p>
                <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[13.5px] text-ink-mute">
                  <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{p.location}</span>
                  <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{p.duration}</span>
                </p>
              </div>
              <ul className="flex flex-wrap content-start gap-2 md:max-w-[260px]">
                {p.plants.map((x) => <li key={x} className="rounded-full bg-ivory px-3 py-1.5 text-[13px] text-forest">{x}</li>)}
              </ul>
            </div>
            <p className="mt-4 text-[12.5px] text-ink-mute">Before and after photos are stock images of different spaces, used to illustrate the type of transformation.</p>
          </div>
        </div>

        <div className="mt-14 flex justify-center">
          <Link to="/contact?service=residential" className="btn-clay">Plan Your Garden Transformation <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </div>
    </section>
  );
}
