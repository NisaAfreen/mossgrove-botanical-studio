import { CheckCircle2, Info, AlertCircle } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export default function Toaster() {
  const { toasts } = useStore();
  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-[calc(88px+env(safe-area-inset-top,0px))] z-[80] flex flex-col items-center gap-2 px-4 sm:bottom-[calc(20px+env(safe-area-inset-bottom,0px))] sm:top-auto"
      role="status"
      aria-live="polite"
    >
      {toasts.map((t) => {
        const Icon = t.tone === 'success' ? CheckCircle2 : t.tone === 'error' ? AlertCircle : Info;
        return (
          <div key={t.id} className="pointer-events-auto flex max-w-md animate-pop items-center gap-3 rounded-full bg-forest-900 py-3 pl-4 pr-5 text-[14px] text-ivory shadow-lift">
            <Icon className={`h-4 w-4 shrink-0 ${t.tone === 'error' ? 'text-terracotta-400' : 'text-sage-300'}`} aria-hidden />
            <span>{t.message}</span>
          </div>
        );
      })}
    </div>
  );
}
