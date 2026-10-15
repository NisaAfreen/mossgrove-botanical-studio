import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Loader2, Lock, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import type { CustomerDetails, Order } from '../types';
import { cx, formatINR, isEmail, isPhone, isPincode, sleep } from '../utils/format';
import SmartImage from '../components/ui/SmartImage';
import { QuantityStepper } from '../components/ui/bits';

const empty: CustomerDetails = { fullName: '', email: '', phone: '', address: '', city: '', pincode: '', deliverySlot: 'Morning', notes: '' };
type Errs = Partial<Record<keyof CustomerDetails, string>>;

function validate(c: CustomerDetails): Errs {
  const e: Errs = {};
  if (c.fullName.trim().length < 2) e.fullName = 'Enter the name for delivery.';
  if (!isEmail(c.email)) e.email = 'Enter a valid email, for example name@example.com.';
  if (!isPhone(c.phone)) e.phone = 'Enter a 10-digit Indian mobile number.';
  if (c.address.trim().length < 8) e.address = 'Enter the full delivery address, including flat or house number.';
  if (c.city.trim().length < 2) e.city = 'Enter your city.';
  if (!isPincode(c.pincode)) e.pincode = 'Enter a 6-digit PIN code.';
  return e;
}

export default function CheckoutPage() {
  const { lines, subtotal, delivery, total, setQuantity, clearCart, lastOrder, setLastOrder } = useStore();
  const [c, setC] = useState<CustomerDetails>(empty);
  const [errors, setErrors] = useState<Errs>({});
  const [status, setStatus] = useState<'idle' | 'loading'>('idle');
  const [formError, setFormError] = useState('');

  const set = <K extends keyof CustomerDetails>(k: K, v: CustomerDetails[K]) => { setC((x) => ({ ...x, [k]: v })); if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined })); };

  const submit = async (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate(c);
    setErrors(e);
    if (Object.keys(e).length) {
      setFormError(`Please fix ${Object.keys(e).length} ${Object.keys(e).length === 1 ? 'field' : 'fields'} highlighted below.`);
      document.getElementById(`co-${Object.keys(e)[0]}`)?.focus();
      return;
    }
    setFormError('');
    setStatus('loading');
    await sleep(1100);
    const order: Order = { id: 'DEMO-' + Math.random().toString(36).slice(2, 7).toUpperCase(), createdAt: new Date().toISOString(), customer: c, lines, subtotal, delivery, total };
    setLastOrder(order);
    clearCart();
    setStatus('idle');
    window.scrollTo({ top: 0 });
  };

  if (lastOrder && lines.length === 0) {
    return (
      <section className="wrap py-20">
        <div className="mx-auto max-w-2xl animate-pop rounded-[32px] bg-sage-50 p-8 text-center sm:p-12">
          <CheckCircle2 className="mx-auto h-10 w-10 text-forest" />
          <p className="eyebrow mt-5">Demo order · {lastOrder.id}</p>
          <h1 className="display mt-3 text-[46px] text-forest sm:text-[58px]">Your demo order is complete</h1>
          <p className="mx-auto mt-4 max-w-md text-[16.5px] text-ink-soft">
            This was a demonstration checkout. No payment was taken and no order was sent to a real business. Here is what a confirmation would show:
          </p>
          <ul className="mx-auto mt-8 max-w-md divide-y divide-forest/10 text-left">
            {lastOrder.lines.map((l) => (
              <li key={l.productId} className="flex justify-between py-2.5 text-[15px]"><span>{l.product.name} × {l.quantity}</span><span className="tabular-nums">{formatINR(l.lineTotal)}</span></li>
            ))}
            <li className="flex justify-between py-2.5 text-[15px] text-ink-soft"><span>Delivery</span><span className="tabular-nums">{lastOrder.delivery ? formatINR(lastOrder.delivery) : 'Free'}</span></li>
            <li className="flex justify-between py-3 text-[17px] font-semibold"><span>Total</span><span className="tabular-nums">{formatINR(lastOrder.total)}</span></li>
          </ul>
          <p className="mt-4 text-[14px] text-ink-mute">Delivery to {lastOrder.customer.fullName}, {lastOrder.customer.city} · {lastOrder.customer.deliverySlot} slot</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/shop" className="btn-primary" onClick={() => setLastOrder(null)}>Keep browsing</Link>
            <Link to="/#planner" className="btn-ghost" onClick={() => setLastOrder(null)}>Plan a garden</Link>
          </div>
        </div>
      </section>
    );
  }

  if (lines.length === 0) {
    return (
      <section className="wrap py-24 text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-sage-100 text-forest"><ShoppingBag className="h-6 w-6" /></span>
        <h1 className="display mt-6 text-[48px] text-forest">Your basket is empty</h1>
        <p className="mt-3 text-ink-soft">Add a plant or two, then come back to try the demo checkout.</p>
        <Link to="/shop" className="btn-primary mt-8">Browse the shop</Link>
      </section>
    );
  }

  const input = (k: keyof CustomerDetails) => ({
    id: `co-${k}`,
    'aria-invalid': !!errors[k],
    'aria-describedby': errors[k] ? `co-${k}-err` : undefined,
    className: cx('field', errors[k] && 'field-error'),
  });
  const Err = ({ k }: { k: keyof CustomerDetails }) => (errors[k] ? <p id={`co-${k}-err`} className="mt-1.5 text-[13px] text-terracotta-600">{errors[k]}</p> : null);

  return (
    <section className="wrap pb-28 pt-10">
      <Link to="/shop" className="inline-flex items-center gap-1.5 text-[14px] font-medium text-ink-soft hover:text-forest"><ArrowLeft className="h-4 w-4" /> Continue shopping</Link>
      <h1 className="display mt-6 text-[52px] text-forest sm:text-[68px]">Checkout <em>(demo)</em></h1>
      <p className="mt-3 max-w-xl rounded-2xl border border-terracotta/30 bg-terracotta/5 px-4 py-3 text-[14.5px] text-terracotta-700">
        This checkout is a demonstration. It does not ask for payment details, and no order is placed with a real business.
      </p>

      <div className="mt-10 grid gap-12 lg:grid-cols-12">
        <form onSubmit={submit} noValidate className="space-y-8 lg:col-span-7" aria-describedby={formError ? 'co-form-error' : undefined}>
          {formError && <p id="co-form-error" role="alert" className="rounded-xl bg-terracotta/10 px-4 py-3 text-[14.5px] font-medium text-terracotta-700">{formError}</p>}
          <fieldset className="grid gap-5 sm:grid-cols-2">
            <legend className="mb-4 font-display text-[28px] text-forest">Contact</legend>
            <div className="sm:col-span-2"><label htmlFor="co-fullName" className="label">Full name *</label><input {...input('fullName')} autoComplete="name" value={c.fullName} onChange={(e) => set('fullName', e.target.value)} /><Err k="fullName" /></div>
            <div><label htmlFor="co-email" className="label">Email *</label><input {...input('email')} type="email" autoComplete="email" value={c.email} onChange={(e) => set('email', e.target.value)} /><Err k="email" /></div>
            <div><label htmlFor="co-phone" className="label">Mobile *</label><input {...input('phone')} type="tel" autoComplete="tel" placeholder="98765 43210" value={c.phone} onChange={(e) => set('phone', e.target.value)} /><Err k="phone" /></div>
          </fieldset>
          <fieldset className="grid gap-5 sm:grid-cols-2">
            <legend className="mb-4 font-display text-[28px] text-forest">Delivery</legend>
            <div className="sm:col-span-2"><label htmlFor="co-address" className="label">Address *</label><input {...input('address')} autoComplete="street-address" placeholder="Flat / house, street, area" value={c.address} onChange={(e) => set('address', e.target.value)} /><Err k="address" /></div>
            <div><label htmlFor="co-city" className="label">City *</label><input {...input('city')} autoComplete="address-level2" value={c.city} onChange={(e) => set('city', e.target.value)} /><Err k="city" /></div>
            <div><label htmlFor="co-pincode" className="label">PIN code *</label><input {...input('pincode')} inputMode="numeric" autoComplete="postal-code" maxLength={6} value={c.pincode} onChange={(e) => set('pincode', e.target.value.replace(/\D/g, ''))} /><Err k="pincode" /></div>
            <div className="sm:col-span-2">
              <p className="label" id="slot-label">Delivery slot</p>
              <div role="radiogroup" aria-labelledby="slot-label" className="flex flex-wrap gap-2">
                {(['Morning', 'Afternoon', 'Evening'] as const).map((s) => (
                  <button key={s} type="button" role="radio" aria-checked={c.deliverySlot === s} onClick={() => set('deliverySlot', s)} className="chip">{s}</button>
                ))}
              </div>
            </div>
            <div className="sm:col-span-2"><label htmlFor="co-notes" className="label">Notes for the delivery team (optional)</label><textarea id="co-notes" className="field" rows={3} value={c.notes} onChange={(e) => set('notes', e.target.value)} placeholder="Gate code, best time to call, where to leave large plants…" /></div>
          </fieldset>
          <div className="rounded-2xl border border-dashed border-forest/20 p-5">
            <p className="flex items-center gap-2 font-semibold text-forest"><Lock className="h-4 w-4" /> Payment</p>
            <p className="mt-1 text-[14.5px] text-ink-soft">No payment step in this demo. A live site would connect a payment provider here.</p>
          </div>
          <button type="submit" className="btn-primary w-full sm:w-auto" disabled={status === 'loading'}>
            {status === 'loading' ? <><Loader2 className="h-4 w-4 animate-spin" /> Placing demo order…</> : <>Place demo order · {formatINR(total)}</>}
          </button>
        </form>

        <aside className="lg:col-span-5">
          <div className="rounded-[28px] bg-ivory-50 p-6 shadow-card lg:sticky lg:top-28">
            <h2 className="font-display text-[28px] text-forest">Order summary</h2>
            <ul className="mt-4 divide-y divide-forest/10">
              {lines.map((l) => (
                <li key={l.productId} className="flex gap-4 py-4">
                  <div className="h-20 w-16 shrink-0 overflow-hidden rounded-xl bg-sage-100"><SmartImage src={l.product.image} alt={l.product.name} className="h-full w-full object-cover" /></div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex justify-between gap-3">
                      <p className="font-display text-[19px] leading-tight text-forest">{l.product.name}</p>
                      <p className="shrink-0 text-[15px] font-semibold tabular-nums">{formatINR(l.lineTotal)}</p>
                    </div>
                    <div className="mt-auto pt-2"><QuantityStepper value={l.quantity} onChange={(n) => setQuantity(l.productId, n)} max={l.product.stock} label={l.product.name} /></div>
                  </div>
                </li>
              ))}
            </ul>
            <dl className="mt-4 space-y-1.5 border-t border-forest/10 pt-4 text-[15px]">
              <div className="flex justify-between"><dt className="text-ink-soft">Subtotal</dt><dd className="tabular-nums">{formatINR(subtotal)}</dd></div>
              <div className="flex justify-between"><dt className="text-ink-soft">Delivery</dt><dd className="tabular-nums">{delivery ? formatINR(delivery) : 'Free'}</dd></div>
              <div className="flex justify-between pt-2 text-[18px] font-semibold"><dt>Total</dt><dd className="tabular-nums">{formatINR(total)}</dd></div>
            </dl>
          </div>
        </aside>
      </div>
    </section>
  );
}
