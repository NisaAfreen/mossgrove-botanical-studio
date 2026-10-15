import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Trash2, Truck } from 'lucide-react';
import { brand } from '../../config/brand';
import { useStore } from '../../context/StoreContext';
import { formatINR } from '../../utils/format';
import Modal, { CloseButton } from '../ui/Modal';
import SmartImage from '../ui/SmartImage';
import { QuantityStepper } from '../ui/bits';

export default function CartDrawer() {
  const { cartOpen, setCartOpen, lines, count, subtotal, delivery, total, setQuantity, removeFromCart } = useStore();
  const navigate = useNavigate();
  const close = () => setCartOpen(false);
  const remaining = Math.max(0, brand.freeDeliveryOver - subtotal);

  return (
    <Modal open={cartOpen} onClose={close} labelledBy="cart-title" variant="drawer" className="flex h-full w-full max-w-[440px] flex-col bg-ivory shadow-lift">
      <div className="flex items-center justify-between border-b border-forest/10 px-6 py-4" style={{ paddingTop: 'max(16px, env(safe-area-inset-top, 0px))' }}>
        <h2 id="cart-title" className="font-display text-[30px] text-forest">Your basket <span className="font-sans text-[15px] text-ink-mute">({count})</span></h2>
        <CloseButton onClick={close} label="Close basket" />
      </div>

      {lines.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-sage-100 text-forest"><ShoppingBag className="h-6 w-6" /></span>
          <p className="mt-5 font-display text-[28px] text-forest">Your basket is empty</p>
          <p className="mt-2 text-ink-soft">Start with an easy-care favourite like the Snake Plant or ZZ Plant.</p>
          <button type="button" className="btn-primary mt-6" onClick={() => { close(); navigate('/shop'); }}>Browse the shop</button>
        </div>
      ) : (
        <>
          <div className="border-b border-forest/10 px-6 py-3 text-[13.5px] text-ink-soft">
            <p className="flex items-center gap-2"><Truck className="h-4 w-4 text-sage-600" />
              {remaining > 0 ? <>Add <strong className="text-forest">{formatINR(remaining)}</strong> more for free delivery (demo rule)</> : <>Free delivery unlocked (demo rule)</>}
            </p>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-sage-100" aria-hidden>
              <div className="h-full rounded-full bg-forest transition-[width] duration-500" style={{ width: `${Math.min(100, (subtotal / brand.freeDeliveryOver) * 100)}%` }} />
            </div>
          </div>
          <ul className="flex-1 divide-y divide-forest/10 overflow-y-auto px-6">
            {lines.map((l) => (
              <li key={l.productId} className="flex gap-4 py-5">
                <div className="h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-sage-100">
                  <SmartImage src={l.product.image} alt={l.product.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-display text-[21px] leading-tight text-forest">{l.product.name}</p>
                      <p className="text-[12.5px] text-ink-mute">{l.product.size}</p>
                    </div>
                    <p className="shrink-0 text-[15px] font-semibold tabular-nums">{formatINR(l.lineTotal)}</p>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-3">
                    <QuantityStepper value={l.quantity} onChange={(n) => setQuantity(l.productId, n)} max={l.product.stock} label={l.product.name} />
                    <button type="button" onClick={() => removeFromCart(l.productId)} className="inline-flex items-center gap-1.5 rounded-full px-2 py-2 text-[13px] text-ink-mute hover:text-terracotta-600" aria-label={`Remove ${l.product.name}`}>
                      <Trash2 className="h-4 w-4" /> Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="border-t border-forest/10 bg-ivory-50 px-6 py-5" style={{ paddingBottom: 'max(20px, env(safe-area-inset-bottom, 0px))' }}>
            <dl className="space-y-1.5 text-[14.5px]">
              <div className="flex justify-between"><dt className="text-ink-soft">Subtotal</dt><dd className="tabular-nums">{formatINR(subtotal)}</dd></div>
              <div className="flex justify-between"><dt className="text-ink-soft">Delivery</dt><dd className="tabular-nums">{delivery === 0 ? 'Free' : formatINR(delivery)}</dd></div>
              <div className="flex justify-between border-t border-forest/10 pt-2 text-[17px] font-semibold"><dt>Total</dt><dd className="tabular-nums">{formatINR(total)}</dd></div>
            </dl>
            <Link to="/checkout" onClick={close} className="btn-primary mt-4 w-full">Checkout (demo) <ArrowRight className="h-4 w-4" /></Link>
            <button type="button" onClick={close} className="mt-2 w-full py-2 text-[14px] font-medium text-ink-soft hover:text-forest">Continue shopping</button>
          </div>
        </>
      )}
    </Modal>
  );
}
