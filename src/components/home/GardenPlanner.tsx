import { useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Loader2, RotateCcw, ShoppingBag, Sparkles } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { getProduct } from '../../data/products';
import { services } from '../../data/content';
import type { Budget, GardenStyle, Maintenance, PlannerPreferences, PlannerRecommendation, SpaceSize, SpaceType } from '../../types';
import { formatINR, sleep } from '../../utils/format';
import { recommend } from '../../utils/planner';
import { Sprig } from '../ui/Botanical';
import SmartImage from '../ui/SmartImage';

const options = {
  space: ['Balcony', 'Terrace', 'Backyard', 'Indoor', 'Commercial'] as SpaceType[],
  size: ['Small', 'Medium', 'Large'] as SpaceSize[],
  style: ['Minimalist', 'Tropical', 'Modern', 'Cottage', 'Low-Maintenance'] as GardenStyle[],
  budget: ['Under ₹25k', '₹25k–₹75k', '₹75k–₹2L', '₹2L+'] as Budget[],
  maintenance: ['Low', 'Moderate', 'High'] as Maintenance[],
};

const questions: { key: keyof PlannerPreferences; label: string; hint: string }[] = [
  { key: 'space', label: 'What kind of space is it?', hint: 'Space type' },
  { key: 'size', label: 'Roughly how big?', hint: 'Small ≈ under 80 sq ft · Large ≈ 500+ sq ft' },
  { key: 'style', label: 'Which style feels like you?', hint: 'Preferred style' },
  { key: 'budget', label: 'What budget are you working with?', hint: 'For plants, planters and installation' },
  { key: 'maintenance', label: 'How much care can you give?', hint: 'Maintenance preference' },
];

function ChipGroup<T extends string>({ name, values, value, onChange, label }: { name: string; values: T[]; value: T; onChange: (v: T) => void; label: string }) {
  return (
    <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-2">
      {values.map((v) => (
        <button
          key={v}
          type="button"
          role="radio"
          aria-checked={value === v}
          name={name}
          onClick={() => onChange(v)}
          onKeyDown={(e) => {
            const i = values.indexOf(value);
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); onChange(values[(i + 1) % values.length]); }
            if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); onChange(values[(i - 1 + values.length) % values.length]); }
          }}
          tabIndex={value === v ? 0 : -1}
          className="chip"
        >
          {v}
        </button>
      ))}
    </div>
  );
}

export default function GardenPlanner() {
  const { addToCart } = useStore();
  const [prefs, setPrefs] = useState<PlannerPreferences>({ space: 'Balcony', size: 'Small', style: 'Tropical', budget: '₹25k–₹75k', maintenance: 'Low' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle');
  const [result, setResult] = useState<PlannerRecommendation | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    await sleep(650);
    setResult(recommend(prefs));
    setStatus('done');
    if (window.innerWidth < 1024) resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    resultRef.current?.focus({ preventScroll: true });
  };

  const svcId = services.find((s) => s.name === result?.service)?.id ?? 'balcony-terrace';
  const recProducts = (result?.productIds ?? []).map(getProduct).filter(Boolean);

  return (
    <section id="planner" className="scroll-mt-20 py-24 lg:py-32" aria-labelledby="planner-title">
      <div className="wrap">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">Garden planner · signature tool</p>
            <h2 id="planner-title" className="display mt-3 text-[46px] text-forest sm:text-[60px] lg:text-[68px]">
              Five questions to <em>your garden plan</em>
            </h2>
            <p className="mt-4 max-w-md text-[17px] text-ink-soft">
              Tell us about your space and we will suggest a style, a layout and the plants that suit it. It runs right here in your browser: no sign-up, no AI service.
            </p>

            <form onSubmit={submit} className="mt-10 space-y-7" aria-describedby="planner-note">
              {questions.map((q) => (
                <fieldset key={q.key}>
                  <legend className="mb-3 flex w-full items-baseline justify-between gap-4">
                    <span className="font-display text-[23px] text-forest">{q.label}</span>
                  </legend>
                  <ChipGroup
                    name={q.key}
                    label={q.hint}
                    values={options[q.key] as string[]}
                    value={prefs[q.key]}
                    onChange={(v) => setPrefs((p) => ({ ...p, [q.key]: v }))}
                  />
                  <p className="mt-2 text-[12.5px] text-ink-mute">{q.hint}</p>
                </fieldset>
              ))}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button type="submit" className="btn-clay" disabled={status === 'loading'}>
                  {status === 'loading' ? <><Loader2 className="h-4 w-4 animate-spin" /> Drawing up your plan…</> : <><Sparkles className="h-4 w-4" /> Show my garden plan</>}
                </button>
                <p id="planner-note" className="text-[12.5px] text-ink-mute">Suggestions are illustrative and based on predefined rules.</p>
              </div>
            </form>
          </div>

          <div className="lg:col-span-7">
            <div
              ref={resultRef}
              tabIndex={-1}
              aria-live="polite"
              className="paper relative min-h-[380px] lg:min-h-[560px] scroll-mt-24 overflow-hidden rounded-[32px] border border-forest/10 p-6 outline-none sm:p-10 lg:sticky lg:top-28"
            >
              {status !== 'done' || !result ? (
                <div className="flex h-full min-h-[320px] flex-col lg:min-h-[480px] items-center justify-center text-center">
                  <Sprig className={`h-40 text-sage-400 ${status === 'loading' ? 'animate-pulse' : ''}`} />
                  <p className="mt-6 font-display text-[32px] text-forest">{status === 'loading' ? 'Sketching your planting plan…' : 'Your plan appears here'}</p>
                  <p className="mt-2 max-w-sm text-ink-soft">
                    A suggested style, a layout for your space, four plants from the shop, an indicative budget and a care rhythm.
                  </p>
                </div>
              ) : (
                <div className="animate-rise">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-sage-600">
                      Planting sheet · {prefs.space} · {prefs.size} · {prefs.maintenance} care
                    </p>
                    <button type="button" onClick={() => { setStatus('idle'); setResult(null); }} className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-soft hover:text-forest">
                      <RotateCcw className="h-3.5 w-3.5" /> Start over
                    </button>
                  </div>
                  <h3 className="display mt-4 text-[38px] text-forest sm:text-[48px]">{result.title}</h3>
                  <p className="mt-3 max-w-xl text-[16.5px] text-ink-soft">{result.styleNote}</p>

                  <div className="mt-8 grid gap-8 sm:grid-cols-2">
                    <div>
                      <p className="eyebrow">Suggested layout</p>
                      <ul className="mt-3 space-y-2.5">
                        {result.layout.map((l) => (
                          <li key={l} className="flex gap-3 text-[15px]"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta" />{l}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="eyebrow">Indicative budget</p>
                        <p className="mt-1 font-display text-[34px] leading-none text-forest">{result.estimate}</p>
                        <p className="mt-1 text-[12.5px] text-ink-mute">Sample range for plants, planters & installation</p>
                      </div>
                      <div>
                        <p className="eyebrow">Care rhythm</p>
                        <p className="mt-1 text-[15px]">{result.careRhythm}</p>
                      </div>
                    </div>
                  </div>

                  <p className="eyebrow mt-10">Recommended from the shop</p>
                  <ul className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
                    {recProducts.map((p) => p && (
                      <li key={p.id} className="rounded-2xl bg-ivory-50 p-2 shadow-card">
                        <div className="aspect-square overflow-hidden rounded-xl bg-sage-100">
                          <SmartImage src={p.image} alt={p.name} className="h-full w-full object-cover" />
                        </div>
                        <p className="mt-2 px-1 font-display text-[18px] leading-tight text-forest">{p.name}</p>
                        <div className="flex items-center justify-between px-1 pb-1">
                          <span className="text-[13px] tabular-nums text-ink-soft">{formatINR(p.price)}</span>
                          <button type="button" onClick={() => addToCart(p.id)} disabled={p.availability === 'out-of-stock'} className="grid h-9 w-9 place-items-center rounded-full bg-forest text-ivory hover:bg-forest-700 disabled:opacity-40" aria-label={`Add ${p.name} to basket`}>
                            <ShoppingBag className="h-4 w-4" />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10 flex flex-col gap-3 rounded-2xl bg-forest p-5 text-ivory sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-[15px]"><span className="text-ivory/60">Recommended service</span><br /><span className="font-display text-[24px]">{result.service}</span></p>
                    <Link to={`/contact?service=${svcId}&plan=${encodeURIComponent(result.title)}`} className="btn-light shrink-0">
                      Request a consultation <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
