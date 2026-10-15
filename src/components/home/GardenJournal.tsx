import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { articles } from '../../data/content';
import type { Article } from '../../types';
import SmartImage from '../ui/SmartImage';
import { Reveal, SectionHeading } from '../ui/bits';

export function ArticleCard({ a, large = false }: { a: Article; large?: boolean }) {
  return (
    <Link to={`/journal/${a.slug}`} className="group flex h-full flex-col">
      <div className={`overflow-hidden rounded-[24px] bg-sage-100 ${large ? 'aspect-[4/3] lg:aspect-[5/4]' : 'aspect-[4/3]'}`}>
        <SmartImage src={a.image} alt="" className="img-zoom h-full w-full object-cover" />
      </div>
      <p className="mt-4 font-mono text-[10.5px] uppercase tracking-[0.16em] text-sage-600">{a.category} · {a.readTime}</p>
      <h3 className={`mt-2 font-display leading-[1.05] text-forest transition group-hover:text-terracotta ${large ? 'text-[38px] sm:text-[44px]' : 'text-[26px]'}`}>{a.title}</h3>
      <p className={`mt-2 text-ink-soft ${large ? 'max-w-lg text-[16.5px]' : 'text-[15px]'}`}>{a.excerpt}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-forest">
        <span className="link-u">Read article</span> <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

export default function GardenJournal() {
  const [first, ...rest] = articles;
  return (
    <section className="py-24 lg:py-32" aria-labelledby="journal-title">
      <div className="wrap">
        <SectionHeading
          eyebrow="Plant care & garden journal"
          title={<span id="journal-title">Notes from <em>the potting bench</em></span>}
          intro="Practical, climate-aware guides to keep plants healthy and gardens easy to live with."
          action={<Link to="/inspiration" className="btn-ghost shrink-0">All articles <ArrowUpRight className="h-4 w-4" /></Link>}
        />
        <div className="mt-14 grid gap-x-8 gap-y-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-6"><ArticleCard a={first} large /></Reveal>
          <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:col-span-6">
            {rest.slice(0, 4).map((a) => (
              <Reveal as="li" key={a.slug}><ArticleCard a={a} /></Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
