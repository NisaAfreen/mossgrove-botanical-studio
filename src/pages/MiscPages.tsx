import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { products } from '../data/products';
import PageHeader from '../components/layout/PageHeader';
import ProductCard from '../components/shop/ProductCard';
import { brand } from '../config/brand';

export function WishlistPage() {
  const { wishlist } = useStore();
  const items = products.filter((p) => wishlist.includes(p.id));
  return (
    <>
      <PageHeader eyebrow="Saved for later" title={<>Your <em>wishlist</em></>} intro="Saved in this browser, so it is still here when you come back." />
      <section className="wrap pb-28">
        {items.length === 0 ? (
          <div className="rounded-[28px] border border-dashed border-forest/20 px-6 py-16 text-center">
            <Heart className="mx-auto h-8 w-8 text-sage-500" />
            <p className="mt-4 font-display text-[30px] text-forest">Nothing saved yet</p>
            <p className="mt-2 text-ink-soft">Tap the heart on any product to keep it here.</p>
            <Link to="/shop" className="btn-primary mt-6">Browse the shop</Link>
          </div>
        ) : (
          <ul className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
            {items.map((p) => <li key={p.id}><ProductCard product={p} /></li>)}
          </ul>
        )}
      </section>
    </>
  );
}

export function LegalPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy & terms" intro={`Placeholder policies for the ${brand.fullName} demo. Replace with reviewed legal text before launch.`} />
      <section className="wrap grid gap-14 pb-28 text-[16.5px] leading-relaxed text-ink-soft md:grid-cols-2">
        <div id="privacy" className="scroll-mt-28">
          <h2 className="font-display text-[34px] text-forest">Privacy Policy</h2>
          <p className="mt-4">This demo stores your basket and wishlist only in your own browser (localStorage). Forms on this site do not send data anywhere. A production site would describe what personal data is collected at checkout, why, how long it is kept and how to request deletion.</p>
        </div>
        <div id="terms" className="scroll-mt-28">
          <h2 className="font-display text-[34px] text-forest">Terms</h2>
          <p className="mt-4">Products, prices, ratings, testimonials and projects shown here are sample content. No orders are fulfilled and no payments are taken. A production site would set out ordering, delivery, plant-health and return terms here.</p>
        </div>
      </section>
    </>
  );
}
