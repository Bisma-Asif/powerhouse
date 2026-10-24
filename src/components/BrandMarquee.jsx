import { brands } from '@/lib/data';

/** Infinite marquee of brand wordmarks (duplicated track). */
export default function BrandMarquee({ dense = false }) {
  const row = [...brands, ...brands];
  return (
    <div className={`relative overflow-hidden ${dense ? '' : 'py-2'}`} aria-label="Brands supplied by Powerhouse">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-mist to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-mist to-transparent" />
      <div className="flex w-max animate-marquee gap-4 hover:[animation-play-state:paused] motion-reduce:flex-wrap motion-reduce:w-auto motion-reduce:animate-none">
        {row.map((b, i) => (
          <span
            key={b.slug + (i < brands.length ? '-a' : '-b')}
            className="flex h-16 w-44 shrink-0 items-center justify-center rounded-xl border border-haze bg-white px-4 font-serif text-lg font-bold text-navy-800 shadow-card transition hover:-translate-y-0.5 hover:text-amber-600"
            aria-hidden={i >= brands.length}
          >
            {b.name}
          </span>
        ))}
      </div>
    </div>
  );
}
