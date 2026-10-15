import { testimonials } from '../../data/content';
import { Reveal } from '../ui/bits';

export default function Testimonials() {
  return (
    <section className="border-y border-forest/10 py-24 lg:py-28" aria-labelledby="t-title">
      <div className="wrap">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <h2 id="t-title" className="display text-[40px] text-forest sm:text-[52px]">Kind words, <em>in their own voice</em></h2>
          <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-terracotta-600">Fictional testimonials for demo purposes</p>
        </div>
        <ul className="mt-14 grid gap-12 md:grid-cols-3 md:gap-10">
          {testimonials.map((t) => (
            <Reveal as="li" key={t.id} className="flex flex-col border-t border-forest/15 pt-8">
              <span className="font-display text-[64px] leading-[0.5] text-sage-400" aria-hidden>“</span>
              <blockquote className="mt-2 font-display text-[25px] leading-[1.2] text-forest">{t.quote}</blockquote>
              <p className="mt-6 text-[15px] font-semibold text-ink">{t.name}</p>
              <p className="text-[13px] text-ink-mute">{t.context}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
