import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { brand } from '../config/brand';
import { getProduct } from '../data/products';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { CartItem, CartLine, Order } from '../types';

interface Toast { id: number; message: string; tone: 'success' | 'info' | 'error' }

interface StoreValue {
  cart: CartItem[];
  lines: CartLine[];
  count: number;
  subtotal: number;
  delivery: number;
  total: number;
  addToCart: (id: string, qty?: number) => void;
  setQuantity: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  wishlist: string[];
  toggleWishlist: (id: string) => void;
  isWished: (id: string) => boolean;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  quickViewId: string | null;
  setQuickViewId: (id: string | null) => void;
  searchOpen: boolean;
  setSearchOpen: (v: boolean) => void;
  toasts: Toast[];
  notify: (message: string, tone?: Toast['tone']) => void;
  lastOrder: Order | null;
  setLastOrder: (o: Order | null) => void;
}

const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useLocalStorage<CartItem[]>('mossgrove.cart', []);
  const [wishlist, setWishlist] = useLocalStorage<string[]>('mossgrove.wishlist', []);
  const [cartOpen, setCartOpen] = useState(false);
  const [quickViewId, setQuickViewId] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  const notify = useCallback((message: string, tone: Toast['tone'] = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t.slice(-2), { id, message, tone }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
  }, []);

  const addToCart = useCallback(
    (id: string, qty = 1) => {
      const product = getProduct(id);
      if (!product || product.availability === 'out-of-stock') {
        notify('This item is out of stock right now.', 'error');
        return;
      }
      const existing = cart.find((i) => i.productId === id);
      const wanted = (existing?.quantity ?? 0) + qty;
      const nextQty = Math.min(wanted, product.stock);
      setCart(
        existing
          ? cart.map((i) => (i.productId === id ? { ...i, quantity: nextQty } : i))
          : [...cart, { productId: id, quantity: nextQty }],
      );
      notify(
        nextQty < wanted ? `Only ${product.stock} ${product.name} available in this demo stock.` : `${product.name} added to your basket.`,
        nextQty < wanted ? 'info' : 'success',
      );
    },
    [cart, notify, setCart],
  );

  const setQuantity = useCallback(
    (id: string, qty: number) => {
      const product = getProduct(id);
      if (!product) return;
      setCart((c) =>
        qty <= 0
          ? c.filter((i) => i.productId !== id)
          : c.map((i) => (i.productId === id ? { ...i, quantity: Math.min(qty, product.stock) } : i)),
      );
    },
    [setCart],
  );

  const removeFromCart = useCallback(
    (id: string) => {
      const p = getProduct(id);
      setCart((c) => c.filter((i) => i.productId !== id));
      if (p) notify(`${p.name} removed.`, 'info');
    },
    [notify, setCart],
  );

  const clearCart = useCallback(() => setCart([]), [setCart]);

  const toggleWishlist = useCallback(
    (id: string) => {
      const p = getProduct(id);
      const has = wishlist.includes(id);
      setWishlist(has ? wishlist.filter((x) => x !== id) : [...wishlist, id]);
      notify(has ? `Removed ${p?.name} from your wishlist.` : `Saved ${p?.name} to your wishlist.`, 'info');
    },
    [notify, setWishlist, wishlist],
  );

  const value = useMemo<StoreValue>(() => {
    const lines: CartLine[] = cart
      .map((i) => {
        const product = getProduct(i.productId);
        return product ? { ...i, product, lineTotal: product.price * i.quantity } : null;
      })
      .filter((l): l is CartLine => l !== null);
    const subtotal = lines.reduce((s, l) => s + l.lineTotal, 0);
    const delivery = subtotal === 0 || subtotal >= brand.freeDeliveryOver ? 0 : brand.deliveryFee;
    return {
      cart, lines, count: lines.reduce((s, l) => s + l.quantity, 0), subtotal, delivery, total: subtotal + delivery,
      addToCart, setQuantity, removeFromCart, clearCart,
      wishlist, toggleWishlist, isWished: (id) => wishlist.includes(id),
      cartOpen, setCartOpen, quickViewId, setQuickViewId, searchOpen, setSearchOpen,
      toasts, notify, lastOrder, setLastOrder,
    };
  }, [cart, wishlist, cartOpen, quickViewId, searchOpen, toasts, lastOrder, addToCart, setQuantity, removeFromCart, clearCart, toggleWishlist, notify]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used inside StoreProvider');
  return ctx;
}
