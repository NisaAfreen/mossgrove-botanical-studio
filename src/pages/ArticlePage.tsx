import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { articles } from '../data/content';
import { ArticleCard } from '../components/home/GardenJournal';
import SmartImage from '../components/ui/SmartImage';
import NotFoundPage from './NotFoundPage';

export default function ArticlePage() {
  const { slug } = useParams();
  const a = articles.find((x) => x.slug === slug);
  if (!a) return <NotFoundPage />;
  const more = articles.filter((x) => x.slug !== a.slug).slice(0, 3);

  return (
    <article>
      <header className="wrap pb-10 pt-12 lg:pt-16">
        <Link to="/inspiration" className="inline-flex items-center gap-1.5 text-[14px] font-medium text-ink-soft hover:text-forest"><ArrowLeft className="h-4 w-4" /> All articles</Link>
        <p className="eyebrow mt-8">{a.category} · {a.readTime} · {a.date}</p>
        <h1 className="display mt-4 max-w-4xl text-[48px] text-forest sm:text-[72px]">{a.title}</h1>
        <p className="mt-5 max-w-2xl text-[19px] text-ink-soft">{a.excerpt}</p>
      </header>
      <div className="wrap">
        <div className="arch-sm aspect-[16/9] overflow-hidden bg-sage-100 lg:aspect-[21/9]">
          <SmartImage src={a.image} alt="" className="h-full w-full object-cover" />
        </div>
      </div>
      <div className="wrap py-16">
        <div className="mx-auto max-w-[680px] text-[18px] leading-[1.75] text-ink">
          {a.body.map((b, i) => (
            <section key={i} className="mt-10 first:mt-0">
              {b.heading && <h2 className="mb-3 font-display text-[34px] leading-tight text-forest">{b.heading}</h2>}
              {b.paragraphs.map((p) => <p key={p} className={`mt-4 first:mt-0 ${i === 0 ? 'text-[20px] text-ink-soft' : ''}`}>{p}</p>)}
              {b.list && (
                <ul className="mt-5 space-y-2 rounded-2xl bg-sage-50 p-6 text-[16px]">
                  {b.list.map((l) => <li key={l} className="flex gap-3"><span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta" />{l}</li>)}
                </ul>
              )}
            </section>
          ))}
          <div className="mt-14 rounded-[24px] bg-forest p-7 text-ivory">
            <p className="font-display text-[28px] leading-tight">Not sure what suits your space?</p>
            <p className="mt-2 text-ivory/70">Answer five quick questions and get a sample planting plan.</p>
            <Link to="/#planner" className="btn-light mt-5">Open the garden planner <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </div>
      <section className="border-t border-forest/10 py-20" aria-labelledby="more-title">
        <div className="wrap">
          <h2 id="more-title" className="display text-[40px] text-forest">Keep reading</h2>
          <ul className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((m) => <li key={m.slug}><ArticleCard a={m} /></li>)}
          </ul>
        </div>
      </section>
    </article>
  );
}
