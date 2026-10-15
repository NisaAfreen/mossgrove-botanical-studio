import { Eye, Heart, ShoppingBag } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { categoryName } from '../../data/products';
import type { Product } from '../../types';
import { formatINR } from '../../utils/format';
import SmartImage from '../ui/SmartImage';
import { AvailabilityTag, Stars } from '../ui/bits';

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isWished, setQuickViewId } = useStore();
  const wished = isWished(product.id);
  const out = product.availability === 'out-of-stock';

  return (
    <article className="group flex h-full flex-col">
      <div className="relative overflow-hidden rounded-[22px] bg-sage-100">
        <button
          type="button"
          onClick={() => setQuickViewId(product.id)}
          className="block aspect-[4/5] w-full"
          aria-label={`Quick view ${product.name}`}
        >
          <SmartImage src={product.image} alt={product.name} className={`img-zoom h-full w-full object-cover ${out ? 'grayscale-[.6]' : ''}`} />
        </button>
        {product.compareAt && (
          <span className="absolute left-3 top-3 rounded-full bg-terracotta px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ivory">
            Demo offer
          </span>
        )}
        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-pressed={wished}
          aria-label={wished ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-ivory/90 text-forest backdrop-blur transition hover:scale-105"
        >
          <Heart className={`h-[18px] w-[18px] transition ${wished ? 'fill-terracotta text-terracotta' : ''}`} />
        </button>
        <button
          type="button"
          onClick={() => setQuickViewId(product.id)}
          className="absolute inset-x-3 bottom-3 hidden translate-y-3 items-center justify-center gap-2 rounded-full bg-ivory/95 py-2.5 text-[13.5px] font-semibold text-forest opacity-0 backdrop-blur transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100 md:flex"
          tabIndex={-1}
          aria-hidden
        >
          <Eye className="h-4 w-4" /> Quick view
        </button>
      </div>

      <div className="flex flex-1 flex-col pt-4">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-sage-600">{categoryName(product.category)}</p>
          <AvailabilityTag product={product} />
        </div>
        <h3 className="mt-1.5 font-display text-[25px] leading-[1.05] text-forest">
          <button type="button" className="text-left hover:text-terracotta" onClick={() => setQuickViewId(product.id)}>{product.name}</button>
        </h3>
        {product.latin && <p className="font-display text-[15px] italic text-ink-mute">{product.latin}</p>}
        <div className="mt-2"><Stars rating={product.rating} reviews={product.reviews} small /></div>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-2 pt-4">
          <p className="leading-none">
            <span className="text-[19px] font-semibold tabular-nums text-ink">{formatINR(product.price)}</span>
            {product.compareAt && <s className="ml-2 hidden text-[13px] text-ink-mute tabular-nums sm:inline">{formatINR(product.compareAt)}</s>}
          </p>
          <button
            type="button"
            onClick={() => addToCart(product.id)}
            disabled={out}
            className="inline-flex min-h-[42px] min-w-[42px] items-center justify-center gap-2 rounded-full bg-forest px-3 text-[13.5px] sm:px-4 font-semibold text-ivory transition hover:bg-forest-700 active:scale-[.97] disabled:bg-ink-mute/40"
            aria-label={out ? `${product.name} is out of stock` : `Add ${product.name} to basket`}
          >
            <ShoppingBag className="h-4 w-4" /> <span className={out ? '' : 'hidden min-[400px]:inline'}>{out ? 'Sold out' : 'Add'}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
