import { Link } from 'react-router-dom';
import { brand } from '../../config/brand';
import { categories } from '../../data/products';
import { services } from '../../data/content';
import { Logo, Sprig } from '../ui/Botanical';

export default function Footer() {
  const col = 'space-y-2.5 text-[14.5px] text-ivory/70';
  const head = 'mb-4 font-mono text-[10.5px] uppercase tracking-[0.18em] text-sage-300';
  return (
    <footer className="relative overflow-hidden bg-forest-900 text-ivory" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
      <Sprig className="pointer-events-none absolute -right-8 bottom-0 h-[420px] text-sage/[.1]" />
      <div className="wrap relative py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo light />
            <p className="mt-6 max-w-sm text-[15px] text-ivory/70">{brand.statement}</p>
            <div className="mt-8 space-y-1.5 text-[14px] text-ivory/70">
              <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-terracotta-400">Demo contact details</p>
              <p className="select-all">{brand.contact.phone}</p>
              <p className="select-all">{brand.contact.email}</p>
              <p>{brand.contact.studio}</p>
              <p>{brand.contact.hours}</p>
            </div>
          </div>
          <nav className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:col-span-8" aria-label="Footer">
            <div>
              <p className={head}>Shop</p>
              <ul className={col}>
                {categories.map((c) => <li key={c.id}><Link className="link-u hover:text-ivory" to={`/shop?category=${c.id}`}>{c.name}</Link></li>)}
              </ul>
            </div>
            <div>
              <p className={head}>Landscaping</p>
              <ul className={col}>
                {services.map((s) => <li key={s.id}><Link className="link-u hover:text-ivory" to={`/landscaping#${s.id}`}>{s.name}</Link></li>)}
              </ul>
            </div>
            <div>
              <p className={head}>Company</p>
              <ul className={col}>
                <li><Link className="link-u hover:text-ivory" to="/about">About us</Link></li>
                <li><Link className="link-u hover:text-ivory" to="/inspiration">Garden inspiration</Link></li>
                <li><Link className="link-u hover:text-ivory" to="/contact">Contact</Link></li>
                <li><Link className="link-u hover:text-ivory" to="/#planner">Garden planner</Link></li>
                <li><Link className="link-u hover:text-ivory" to="/#newsletter">Newsletter</Link></li>
              </ul>
            </div>
            <div>
              <p className={head}>Follow</p>
              <ul className={col}>
                {brand.social.map((s) => <li key={s.label}><a className="link-u hover:text-ivory" href={s.href} onClick={(e) => e.preventDefault()}>{s.label}</a></li>)}
              </ul>
              <p className="mt-3 text-[12px] text-ivory/45">Placeholder links</p>
            </div>
          </nav>
        </div>
        <div className="mt-16 flex flex-col gap-4 border-t border-ivory/10 pt-8 text-[13px] text-ivory/50 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {brand.fullName} — a demo concept. Product photography via Unsplash.</p>
          <div className="flex gap-6">
            <Link to="/legal#privacy" className="hover:text-ivory">Privacy Policy</Link>
            <Link to="/legal#terms" className="hover:text-ivory">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
