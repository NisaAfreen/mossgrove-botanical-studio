import { Link } from 'react-router-dom';
import { Sprig } from '../components/ui/Botanical';

export default function NotFoundPage() {
  return (
    <section className="wrap flex flex-col items-center py-28 text-center">
      <Sprig className="h-40 text-sage-400" />
      <h1 className="display mt-6 text-[56px] text-forest">This path is overgrown</h1>
      <p className="mt-3 max-w-md text-ink-soft">The page you were looking for isn’t here. Try the shop or head back to the start.</p>
      <div className="mt-8 flex gap-3">
        <Link to="/" className="btn-primary">Back home</Link>
        <Link to="/shop" className="btn-ghost">Visit the shop</Link>
      </div>
    </section>
  );
}
