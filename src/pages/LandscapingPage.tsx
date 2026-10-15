import { Link } from 'react-router-dom';
import { ArrowRight, Check, Clock } from 'lucide-react';
import { services } from '../data/content';
import PageHeader from '../components/layout/PageHeader';
import GardenPortfolio from '../components/landscaping/GardenPortfolio';
import SmartImage from '../components/ui/SmartImage';
import { Reveal } from '../components/ui/bits';

const process = [
  { t: 'Consultation', d: 'A conversation (and site visit for larger spaces) about how you want to use the space, your budget and your timeline.' },
  { t: 'Concept & plan', d: 'Moodboard, sun study and a planting and hardscape plan, with a clear itemised quote.' },
  { t: 'Build & plant', d: 'Soil, irrigation, planters and planting, installed by one coordinated team.' },
  { t: 'Aftercare', d: 'A settling-in visit, a care calendar, and optional maintenance visits through the seasons.' },
];

export default function LandscapingPage() {
  return (
    <>
      <PageHeader
        eyebrow="The landscape studio"
        title={<>Green spaces, <em>designed and built</em></>}
        intro="Six services, from a single balcony to a commercial frontage. Every project starts with how you want to live in the space. Prices are indicative demo figures."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/contact?service=residential" className="btn-clay">Book a consultation <ArrowRight className="h-4 w-4" /></Link>
          <Link to="/#planner" className="btn-ghost">Try the garden planner</Link>
        </div>
      </PageHeader>

      <section className="wrap space-y-24 pb-28 pt-6 lg:space-y-32">
        {services.map((s, i) => (
          <Reveal as="article" key={s.id} className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <div id={s.id} className={`scroll-mt-28 lg:col-span-7 ${i % 2 ? 'lg:order-2' : ''}`}>
              <div className={`${i % 2 ? 'arch' : 'rounded-[32px]'} aspect-[4/3] overflow-hidden bg-sage-100`}>
                <SmartImage src={s.image} alt={s.name} className="h-full w-full object-cover" />
              </div>
            </div>
            <div className="lg:col-span-5">
              <p className="eyebrow">{s.from}</p>
              <h2 className="display mt-3 text-[44px] text-forest sm:text-[54px]">{s.name}</h2>
              <p className="mt-4 text-[17px] text-ink-soft">{s.description}</p>
              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {s.includes.map((x) => <li key={x} className="flex items-start gap-2 text-[15px]"><Check className="mt-1 h-4 w-4 shrink-0 text-terracotta" />{x}</li>)}
              </ul>
              <p className="mt-5 inline-flex items-center gap-2 text-[14px] text-ink-mute"><Clock className="h-4 w-4" /> Typical timeline: {s.timeline}</p>
              <div className="mt-7">
                <Link to={`/contact?service=${s.id}`} className="btn-primary">Get a quote <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </div>
          </Reveal>
        ))}
      </section>

      <section className="bg-forest py-24 text-ivory lg:py-28" aria-labelledby="process-title">
        <div className="wrap">
          <p className="eyebrow text-sage-300">How a project runs</p>
          <h2 id="process-title" className="display mt-3 text-[44px] sm:text-[58px]">Four stages, <em className="text-linen">one team</em></h2>
          <ol className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {process.map((p, i) => (
              <li key={p.t} className="border-t border-ivory/20 pt-6">
                <span className="font-mono text-[12px] text-terracotta-400">Stage {i + 1}</span>
                <h3 className="mt-2 font-display text-[30px]">{p.t}</h3>
                <p className="mt-2 text-[15px] text-ivory/70">{p.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <GardenPortfolio />
    </>
  );
}
