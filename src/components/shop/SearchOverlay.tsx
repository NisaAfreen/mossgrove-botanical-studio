import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { categoryName, products } from '../../data/products';
import { formatINR } from '../../utils/format';
import Modal, { CloseButton } from '../ui/Modal';
import SmartImage from '../ui/SmartImage';

const suggestions = ['Snake plant', 'Low-maintenance', 'Balcony', 'Orchid', 'Terracotta'];

export default function SearchOverlay() {
  const { searchOpen, setSearchOpen, setQuickViewId } = useStore();
  const [q, setQ] = useState('');
  const navigate = useNavigate();
  useEffect(() => { if (!searchOpen) setQ(''); }, [searchOpen]);

  const results = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return [];
    return products.filter((p) => p.name.toLowerCase().includes(t) || p.latin?.toLowerCase().includes(t) || p.tags?.some((x) => x.includes(t))).slice(0, 6);
  }, [q]);

  const close = () => setSearchOpen(false);
  const goShop = () => { close(); navigate(`/shop?q=${encodeURIComponent(q.trim())}`); };

  return (
    <Modal open={searchOpen} onClose={close} labelledBy="search-title" variant="top" className="w-full max-w-2xl rounded-[28px] bg-ivory p-5 shadow-lift sm:p-7">
      <div className="flex items-center justify-between">
        <h2 id="search-title" className="font-display text-[28px] text-forest">Search the shop</h2>
        <CloseButton onClick={close} label="Close search" />
      </div>
      <form onSubmit={(e) => { e.preventDefault(); if (q.trim()) goShop(); }} className="relative mt-3" role="search">
        <label htmlFor="global-search" className="sr-only">Search products by name</label>
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-mute" aria-hidden />
        <input id="global-search" data-autofocus type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Try “monstera” or “pet-friendly”…" className="field h-14 rounded-full pl-12 text-[17px]" autoComplete="off" />
      </form>

      {!q.trim() ? (
        <div className="mt-5 flex flex-wrap gap-2">
          <span className="w-full font-mono text-[10.5px] uppercase tracking-[0.16em] text-sage-600">Popular searches</span>
          {suggestions.map((s) => <button key={s} type="button" className="chip" onClick={() => setQ(s.toLowerCase())}>{s}</button>)}
        </div>
      ) : results.length === 0 ? (
        <p className="mt-6 text-ink-soft">No products match “{q}”. Try a plant name, or a word like “balcony”.</p>
      ) : (
        <>
          <ul className="mt-5 divide-y divide-forest/10" aria-label="Search results">
            {results.map((p) => (
              <li key={p.id}>
                <button type="button" onClick={() => { close(); setQuickViewId(p.id); }} className="flex w-full items-center gap-4 rounded-xl py-3 text-left hover:bg-forest/[.03]">
                  <span className="h-14 w-12 shrink-0 overflow-hidden rounded-lg bg-sage-100"><SmartImage src={p.image} alt="" className="h-full w-full object-cover" /></span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-[20px] leading-tight text-forest">{p.name}</span>
                    <span className="block text-[13px] text-ink-mute">{categoryName(p.category)}</span>
                  </span>
                  <span className="text-[14px] font-semibold tabular-nums">{formatINR(p.price)}</span>
                </button>
              </li>
            ))}
          </ul>
          <button type="button" onClick={goShop} className="btn-ghost mt-4 w-full">See all results in the shop <ArrowRight className="h-4 w-4" /></button>
        </>
      )}
    </Modal>
  );
}
