import { useState, type FormEvent } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { img } from '../../config/brand';
import { isEmail, sleep } from '../../utils/format';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle');

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return setError('Enter your email address to subscribe.');
    if (!isEmail(email)) return setError('That email address looks incomplete. Check for a missing @ or domain.');
    setError('');
    setStatus('loading');
    await sleep(700);
    setStatus('done');
  };

  return (
    <section id="newsletter" className="relative isolate overflow-hidden bg-forest-950 py-24 text-ivory lg:py-32" aria-labelledby="nl-title">
      <img src={img('m-fern')} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-45" loading="lazy" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-forest-950 via-forest-950/80 to-forest-950/30" aria-hidden />
      <div className="wrap">
        <div className="max-w-xl">
          <p className="eyebrow text-sage-300">The seasonal letter</p>
          <h2 id="nl-title" className="display mt-3 text-[52px] sm:text-[72px]">Grow something <em className="text-linen">beautiful.</em></h2>
          <p className="mt-4 text-[17px] text-ivory/75">Get seasonal gardening tips, plant-care advice, and inspiration for greener spaces.</p>

          {status === 'done' ? (
            <div className="mt-8 flex animate-pop items-start gap-3 rounded-2xl bg-ivory/10 p-5 backdrop-blur" role="status">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-sage-300" />
              <div>
                <p className="font-semibold">You are on the list (demo).</p>
                <p className="mt-1 text-[14px] text-ivory/70">This demo does not store or send emails. In the live site, {email} would receive a confirmation.</p>
                <button type="button" className="mt-3 text-[14px] font-semibold underline underline-offset-4" onClick={() => { setStatus('idle'); setEmail(''); }}>Use another email</button>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="mt-8">
              <label htmlFor="nl-email" className="sr-only">Email address</label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  id="nl-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (error) setError(''); }}
                  placeholder="you@example.com"
                  aria-invalid={!!error}
                  aria-describedby={error ? 'nl-error' : 'nl-hint'}
                  className="min-h-[52px] flex-1 rounded-full border border-ivory/25 bg-ivory/10 px-5 text-ivory placeholder:text-ivory/45 backdrop-blur focus:border-ivory focus:outline-none"
                />
                <button type="submit" className="btn-clay min-h-[52px]" disabled={status === 'loading'}>
                  {status === 'loading' ? <><Loader2 className="h-4 w-4 animate-spin" /> Subscribing…</> : 'Subscribe'}
                </button>
              </div>
              {error ? (
                <p id="nl-error" className="mt-3 text-[14px] text-[#f2b9a0]" role="alert">{error}</p>
              ) : (
                <p id="nl-hint" className="mt-3 text-[13px] text-ivory/55">One letter a season. Demo form: nothing is sent.</p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
