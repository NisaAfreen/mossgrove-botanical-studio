import { useEffect, useState } from 'react';
import { Droplets, Heart, PawPrint, ShoppingBag, Sun, Sprout } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { categoryName, getProduct } from '../../data/products';
import { formatINR } from '../../utils/format';
import Modal, { CloseButton } from '../ui/Modal';
import SmartImage from '../ui/SmartImage';
import { AvailabilityTag, QuantityStepper, Stars } from '../ui/bits';

export default function QuickViewModal() {
  const { quickViewId, setQuickViewId, addToCart, toggleWishlist, isWished, setCartOpen } = useStore();
  const p = quickViewId ? getProduct(quickViewId) : undefined;
  const [qty, setQty] = useState(1);
  useEffect(() => setQty(1), [quickViewId]);
  const close = () => setQuickViewId(null);
  if (!p) return null;
  const out = p.availability === 'out-of-stock';

  const facts = [
    p.light && { icon: Sun, label: 'Light', value: p.light },
    p.water && { icon: Droplets, label: 'Water', value: p.water },
    p.care && { icon: Sprout, label: 'Care', value: p.care },
    p.petSafe !== undefined && { icon: PawPrint, label: 'Pets', value: p.petSafe ? 'Pet-friendly' : 'Keep away from pets' },
  ].filter(Boolean) as { icon: typeof Sun; label: string; value: string }[];

  return (
    <Modal open onClose={close} labelledBy="qv-title" className="max-h-[94vh] w-full max-w-[980px] overflow-y-auto rounded-t-[28px] bg-ivory shadow-lift sm:rounded-[28px]">
      <div className="grid md:grid-cols-2">
        <div className="relative aspect-[5/4] bg-sage-100 md:aspect-auto md:min-h-[600px]">
          <SmartImage src={p.image} alt={p.name} className="absolute inset-0 h-full w-full object-cover" />
        </div>
        <div className="relative flex flex-col p-6 sm:p-9">
          <CloseButton onClick={close} label="Close quick view" className="absolute right-3 top-3" />
          <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-sage-600">{categoryName(p.category)}</p>
          <h2 id="qv-title" className="display mt-2 pr-10 text-[44px] text-forest">{p.name}</h2>
          {p.latin && <p className="font-display text-[19px] italic text-ink-mute">{p.latin}</p>}
          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
            <Stars rating={p.rating} reviews={p.reviews} />
            <AvailabilityTag product={p} />
          </div>
          <p className="mt-5 text-[16px] text-ink-soft">{p.description}</p>

          {facts.length > 0 && (
            <dl className="mt-6 grid grid-cols-2 gap-3">
              {facts.map((f) => (
                <div key={f.label} className="rounded-2xl border border-forest/10 bg-ivory-50 p-3">
                  <dt className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-sage-600"><f.icon className="h-3.5 w-3.5" />{f.label}</dt>
                  <dd className="mt-1 text-[14px] font-medium text-ink">{f.value}</dd>
                </div>
              ))}
            </dl>
          )}

          <ul className="mt-5 space-y-1.5 text-[14.5px]">
            {p.highlights.map((h) => <li key={h} className="flex gap-2.5"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta" />{h}</li>)}
          </ul>
          <p className="mt-4 text-[13px] text-ink-mute">Size: {p.size}</p>

          <div className="mt-auto pt-8">
            <p className="text-[28px] font-semibold tabular-nums">
              {formatINR(p.price)}
              {p.compareAt && <s className="ml-3 text-[16px] font-normal text-ink-mute">{formatINR(p.compareAt)}</s>}
              <span className="ml-2 align-middle text-[12px] font-normal text-ink-mute">demo price</span>
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              {!out && <QuantityStepper value={qty} onChange={(n) => setQty(Math.max(1, n))} max={p.stock} label={p.name} />}
              <button
                type="button"
                disabled={out}
                onClick={() => { addToCart(p.id, qty); close(); setCartOpen(true); }}
                className="btn-primary min-w-0 flex-1 whitespace-nowrap px-4"
                data-autofocus
              >
                <ShoppingBag className="h-4 w-4" /> {out ? 'Out of stock' : <>Add<span className="hidden min-[420px]:inline">&nbsp;to basket</span></>}
              </button>
              <button
                type="button"
                onClick={() => toggleWishlist(p.id)}
                aria-pressed={isWished(p.id)}
                aria-label={isWished(p.id) ? 'Remove from wishlist' : 'Save to wishlist'}
                className="grid h-12 w-12 place-items-center rounded-full border border-forest/20 text-forest hover:border-forest"
              >
                <Heart className={`h-5 w-5 ${isWished(p.id) ? 'fill-terracotta text-terracotta' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
