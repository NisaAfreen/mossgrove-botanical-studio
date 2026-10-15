import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Heart, Menu, Search, ShoppingBag, X, ArrowUpRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { brand } from '../../config/brand';
import { Logo } from '../ui/Botanical';

export const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/shop', label: 'Shop Plants' },
  { to: '/landscaping', label: 'Landscaping' },
  { to: '/inspiration', label: 'Garden Inspiration' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const { count, wishlist, setCartOpen, setSearchOpen } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const overHero = pathname === '/' && !scrolled && !menuOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const iconBtn = `relative grid h-11 w-11 place-items-center rounded-full transition ${overHero ? 'text-ivory hover:bg-ivory/10' : 'text-forest hover:bg-forest/5'}`;

  return (
    <>
      <div className="relative z-50 bg-forest-950 text-center font-mono text-[10.5px] uppercase tracking-[0.16em] text-linen/80">
        <p className="wrap py-2">{brand.demoNotice}</p>
      </div>
      <header
        className={`sticky z-50 transition-[background,box-shadow,color] duration-500 ${
          overHero ? 'bg-transparent' : 'bg-ivory/90 shadow-[0_1px_0_rgba(30,58,44,.08)] backdrop-blur-md'
        } ${pathname === '/' ? '-mb-[76px]' : ''}`}
        style={{ top: 'env(safe-area-inset-top, 0px)' }}
      >
        <nav className="wrap flex h-[76px] items-center justify-between gap-4" aria-label="Main">
          <Link to="/" aria-label={`${brand.fullName} home`} className="shrink-0">
            <Logo light={overHero} />
          </Link>

          <ul className="hidden items-center gap-1 xl:flex">
            {navLinks.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.end}
                  className={({ isActive }) =>
                    `rounded-full px-3.5 py-2 text-[14.5px] font-medium transition ${
                      overHero
                        ? isActive ? 'bg-ivory/15 text-ivory' : 'text-ivory/85 hover:text-ivory'
                        : isActive ? 'bg-forest/[.07] text-forest' : 'text-ink-soft hover:text-forest'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-0.5 sm:gap-1">
            <button type="button" className={iconBtn} onClick={() => setSearchOpen(true)} aria-label="Search plants">
              <Search className="h-[19px] w-[19px]" />
            </button>
            <Link to="/wishlist" className={`${iconBtn} hidden sm:grid`} aria-label={`Wishlist, ${wishlist.length} items`}>
              <Heart className="h-[19px] w-[19px]" />
              {wishlist.length > 0 && <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-terracotta" aria-hidden />}
            </Link>
            <button type="button" className={iconBtn} onClick={() => setCartOpen(true)} aria-label={`Open basket, ${count} items`}>
              <ShoppingBag className="h-[19px] w-[19px]" />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-terracotta px-1 text-[11px] font-bold tabular-nums text-ivory">
                  {count}
                </span>
              )}
            </button>
            <Link
              to="/#planner"
              className={`ml-2 hidden items-center gap-1.5 rounded-full px-5 py-2.5 text-[14px] font-semibold transition md:inline-flex ${
                overHero ? 'bg-ivory text-forest hover:bg-white' : 'bg-forest text-ivory hover:bg-forest-700'
              }`}
            >
              Design My Garden <ArrowUpRight className="h-4 w-4" />
            </Link>
            <button
              type="button"
              className={`${iconBtn} xl:hidden`}
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </header>

      {menuOpen && (
        <div id="mobile-menu" className="fixed inset-0 z-40 animate-fade overflow-y-auto bg-ivory pt-[120px] xl:hidden">
          <div className="wrap flex min-h-full flex-col pb-10">
            <ul className="divide-y divide-forest/10 border-y border-forest/10">
              {navLinks.map((l, i) => (
                <li key={l.to} className="animate-rise" style={{ animationDelay: `${i * 45}ms` }}>
                  <NavLink to={l.to} end={l.end} className={({ isActive }) => `flex items-baseline justify-between py-4 ${isActive ? 'text-terracotta' : 'text-forest'}`}>
                    <span className="font-display text-[34px] leading-none">{l.label}</span>
                  </NavLink>
                </li>
              ))}
              <li>
                <NavLink to="/wishlist" className="flex items-baseline justify-between py-4 text-forest">
                  <span className="font-display text-[34px] leading-none">Wishlist</span>
                  <span className="font-mono text-[11px] text-ink-mute">{wishlist.length} saved</span>
                </NavLink>
              </li>
            </ul>
            <Link to="/#planner" className="btn-primary mt-8 w-full">
              Design My Garden <ArrowUpRight className="h-4 w-4" />
            </Link>
            <p className="mt-6 text-center font-mono text-[11px] uppercase tracking-[0.16em] text-ink-mute">{brand.demoNotice}</p>
          </div>
        </div>
      )}
    </>
  );
}
