import { useId, useRef, useState, type PointerEvent } from 'react';
import { ChevronsLeftRight } from 'lucide-react';

/** Accessible before/after comparison: drag, click, or use the keyboard (range input). */
export default function BeforeAfter({ before, after, label }: { before: string; after: string; label: string }) {
  const [pos, setPos] = useState(50);
  const box = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const id = useId();

  const setFromPointer = (e: PointerEvent) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100)));
  };

  return (
    <div
      ref={box}
      className="relative aspect-[16/10] w-full cursor-ew-resize select-none overflow-hidden rounded-[28px] bg-sage-100 touch-pan-y has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-terracotta has-[:focus-visible]:ring-offset-4"
      onPointerDown={(e) => { dragging.current = true; (e.target as HTMLElement).setPointerCapture?.(e.pointerId); setFromPointer(e); }}
      onPointerMove={(e) => dragging.current && setFromPointer(e)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      <img src={after} alt={`After (concept): ${label}`} className="absolute inset-0 h-full w-full object-cover" draggable={false} loading="lazy" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img src={before} alt={`Before (reference): ${label}`} className="absolute inset-0 h-full w-full object-cover saturate-[.55]" draggable={false} loading="lazy" />
      </div>

      <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-ink/70 px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.14em] text-ivory">Before</span>
      <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-ivory/90 px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.14em] text-forest">After · concept</span>

      <div className="pointer-events-none absolute inset-y-0 w-px bg-ivory shadow-[0_0_0_1px_rgba(0,0,0,.08)]" style={{ left: `${pos}%` }}>
        <span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ivory text-forest shadow-lift">
          <ChevronsLeftRight className="h-5 w-5" />
        </span>
      </div>

      <label htmlFor={id} className="sr-only">Compare before and after for {label}</label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        value={Math.round(pos)}
        onChange={(e) => setPos(Number(e.target.value))}
        className="absolute inset-x-0 bottom-0 h-full w-full cursor-ew-resize opacity-0"
        style={{ pointerEvents: 'none' }}
        aria-valuetext={`${Math.round(pos)}% before shown`}
      />
    </div>
  );
}
