import { useState, type FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle2, Loader2, Mail, MapPin, Phone, Clock } from 'lucide-react';
import { brand } from '../config/brand';
import { services } from '../data/content';
import PageHeader from '../components/layout/PageHeader';
import { cx, isEmail, isPhone, sleep } from '../utils/format';

interface Form { name: string; email: string; phone: string; service: string; space: string; message: string }

export default function ContactPage() {
  const [params] = useSearchParams();
  const plan = params.get('plan');
  const [form, setForm] = useState<Form>({
    name: '', email: '', phone: '',
    service: params.get('service') ?? '',
    space: '',
    message: plan ? `I tried the garden planner and liked “${plan}”. I'd like to talk about making it real.` : '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle');

  const set = (k: keyof Form, v: string) => { setForm((f) => ({ ...f, [k]: v })); if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined })); };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const er: typeof errors = {};
    if (form.name.trim().length < 2) er.name = 'Enter your name.';
    if (!isEmail(form.email)) er.email = 'Enter a valid email, for example name@example.com.';
    if (form.phone && !isPhone(form.phone)) er.phone = 'Enter a 10-digit Indian mobile number, or leave it blank.';
    if (!form.service) er.service = 'Choose the service you are interested in.';
    if (form.message.trim().length < 10) er.message = 'Tell us a little about your space (at least 10 characters).';
    setErrors(er);
    if (Object.keys(er).length) {
      document.getElementById(`c-${Object.keys(er)[0]}`)?.focus();
      return;
    }
    setStatus('loading');
    await sleep(800);
    setStatus('done');
  };

  const field = (k: keyof Form) => ({
    id: `c-${k}`,
    value: form[k],
    'aria-invalid': !!errors[k],
    'aria-describedby': errors[k] ? `c-${k}-err` : undefined,
    className: cx('field', errors[k] && 'field-error'),
  });
  const Err = ({ k }: { k: keyof Form }) => (errors[k] ? <p id={`c-${k}-err`} className="mt-1.5 text-[13px] text-terracotta-600">{errors[k]}</p> : null);

  return (
    <>
      <PageHeader eyebrow="Contact & consultations" title={<>Let’s plan <em>your green space</em></>} intro="Ask about an order, or tell us about your balcony, terrace, garden or workplace. This is a demo form: nothing is sent." />
      <section className="wrap grid gap-14 pb-28 lg:grid-cols-12">
        <div className="lg:col-span-7">
          {status === 'done' ? (
            <div className="animate-pop rounded-[28px] bg-sage-50 p-8 sm:p-10" role="status">
              <CheckCircle2 className="h-8 w-8 text-forest" />
              <h2 className="display mt-4 text-[42px] text-forest">Thanks, {form.name.split(' ')[0]}.</h2>
              <p className="mt-3 max-w-lg text-[17px] text-ink-soft">
                Your consultation request for <strong>{services.find((s) => s.id === form.service)?.name}</strong> was captured in this demo. In the live site, the studio would reply to {form.email}. No message has actually been sent.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/shop" className="btn-primary">Browse plants meanwhile</Link>
                <button type="button" className="btn-ghost" onClick={() => setStatus('idle')}>Send another request</button>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="c-name" className="label">Full name *</label>
                <input {...field('name')} autoComplete="name" onChange={(e) => set('name', e.target.value)} />
                <Err k="name" />
              </div>
              <div>
                <label htmlFor="c-email" className="label">Email *</label>
                <input {...field('email')} type="email" autoComplete="email" onChange={(e) => set('email', e.target.value)} />
                <Err k="email" />
              </div>
              <div>
                <label htmlFor="c-phone" className="label">Phone (optional)</label>
                <input {...field('phone')} type="tel" autoComplete="tel" placeholder="98765 43210" onChange={(e) => set('phone', e.target.value)} />
                <Err k="phone" />
              </div>
              <div>
                <label htmlFor="c-service" className="label">Service *</label>
                <select {...field('service')} onChange={(e) => set('service', e.target.value)}>
                  <option value="">Choose a service…</option>
                  {services.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                  <option value="order">Question about an order</option>
                </select>
                <Err k="service" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="c-space" className="label">Approximate size of the space</label>
                <input {...field('space')} placeholder="e.g. 80 sq ft balcony, west-facing" onChange={(e) => set('space', e.target.value)} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="c-message" className="label">Tell us about it *</label>
                <textarea {...field('message')} rows={5} onChange={(e) => set('message', e.target.value)} />
                <Err k="message" />
              </div>
              <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
                <button type="submit" className="btn-clay" disabled={status === 'loading'}>
                  {status === 'loading' ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : 'Request a consultation'}
                </button>
                <p className="text-[13px] text-ink-mute">* Required. Demo form — no data leaves your browser.</p>
              </div>
            </form>
          )}
        </div>
        <aside className="lg:col-span-5">
          <div className="rounded-[28px] bg-forest p-8 text-ivory">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-terracotta-400">Placeholder contact details</p>
            <ul className="mt-6 space-y-5 text-[16px]">
              <li className="flex gap-3"><Phone className="mt-0.5 h-5 w-5 text-sage-300" /><span className="select-all">{brand.contact.phone}</span></li>
              <li className="flex gap-3"><Mail className="mt-0.5 h-5 w-5 text-sage-300" /><span className="select-all">{brand.contact.email}</span></li>
              <li className="flex gap-3"><MapPin className="mt-0.5 h-5 w-5 text-sage-300" />{brand.contact.studio}</li>
              <li className="flex gap-3"><Clock className="mt-0.5 h-5 w-5 text-sage-300" />{brand.contact.hours}</li>
            </ul>
            <p className="mt-8 border-t border-ivory/15 pt-6 text-[14px] text-ivory/65">Not ready to talk yet? The garden planner gives you a sample plan in under a minute.</p>
            <Link to="/#planner" className="btn-light mt-4">Open the planner</Link>
          </div>
        </aside>
      </section>
    </>
  );
}
