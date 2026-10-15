import { useState } from 'react';
import { articles } from '../data/content';
import PageHeader from '../components/layout/PageHeader';
import GardenPortfolio from '../components/landscaping/GardenPortfolio';
import { ArticleCard } from '../components/home/GardenJournal';
import { Reveal } from '../components/ui/bits';

export default function InspirationPage() {
  const cats = ['All', ...Array.from(new Set(articles.map((a) => a.category)))];
  const [cat, setCat] = useState('All');
  const list = cat === 'All' ? articles : articles.filter((a) => a.category === cat);
  return (
    <>
      <PageHeader
        eyebrow="Garden inspiration & community"
        title={<>Ideas for <em>greener days</em></>}
        intro="Care guides, design notes and transformation concepts to help you plan your own space."
      />
      <section className="wrap pb-24" aria-label="Garden journal">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter articles">
          {cats.map((c) => <button key={c} type="button" className="chip" aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>)}
        </div>
        <ul className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((a) => <Reveal as="li" key={a.slug}><ArticleCard a={a} /></Reveal>)}
        </ul>
      </section>
      <GardenPortfolio />
    </>
  );
}
