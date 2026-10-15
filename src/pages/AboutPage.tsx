import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { brand, img } from '../config/brand';
import PageHeader from '../components/layout/PageHeader';
import BenefitsSection from '../components/home/BenefitsSection';
import SmartImage from '../components/ui/SmartImage';
import { SpecimenLabel } from '../components/ui/bits';

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About the studio" title={<>Part nursery, <em>part design studio</em></>} intro={brand.statement} />
      <section className="wrap grid gap-14 pb-24 lg:grid-cols-12">
        <div className="relative lg:col-span-6">
          <div className="arch aspect-[4/5] max-w-[520px] bg-sage-100">
            <SmartImage src={img('m-planner')} alt="Potted plants arranged on wooden shelves in a bright room" className="h-full w-full object-cover" />
          </div>
          <SpecimenLabel no="027" latin="Brand concept" lines={['Placeholder story for client review', 'Replace with the real founding story']} className="absolute bottom-8 right-0 w-[220px] lg:right-10" />
        </div>
        <div className="space-y-6 text-[17.5px] leading-relaxed text-ink-soft lg:col-span-6 lg:pt-10">
          <p className="font-display text-[32px] leading-[1.15] text-forest">The idea is simple: the people who sell you a plant should be able to help you design the space it lives in.</p>
          <p>{brand.name} brings an online plant shop and a landscape design studio under one roof. Shop for a single plant, or plan a full terrace with the same team and the same care notes.</p>
          <p>This page is placeholder copy for the demo. It is written to show tone and structure; the final version would tell the real story of the business, its founders and its nursery.</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link to="/shop" className="btn-primary">Visit the shop <ArrowRight className="h-4 w-4" /></Link>
            <Link to="/landscaping" className="btn-ghost">Explore landscaping</Link>
          </div>
        </div>
      </section>
      <BenefitsSection />
    </>
  );
}
