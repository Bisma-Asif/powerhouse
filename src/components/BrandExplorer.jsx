'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import BrandMark from './BrandMark';
import Icon from './Icon';
import Reveal from './Reveal';
import { brands, categories, products } from '@/lib/data';

export default function BrandExplorer() {
  const [filter, setFilter] = useState('');
  const list = useMemo(() => (filter ? brands.filter((b) => b.categories.includes(filter)) : brands), [filter]);

  return (
    <section className="container-page py-12">
      <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Filter brands by category">
        <button
          type="button"
          role="tab"
          aria-selected={filter === ''}
          onClick={() => setFilter('')}
          className={`rounded-full px-4 py-2 text-xs font-bold transition ${filter === '' ? 'bg-navy-900 text-white' : 'border border-haze text-navy-600 hover:border-navy-900'}`}
        >
          All brands ({brands.length})
        </button>
        {categories.map((c) => {
          const n = brands.filter((b) => b.categories.includes(c.slug)).length;
          if (!n) return null;
          return (
            <button
              key={c.slug}
              type="button"
              role="tab"
              aria-selected={filter === c.slug}
              onClick={() => setFilter(c.slug)}
              className={`rounded-full px-4 py-2 text-xs font-bold transition ${filter === c.slug ? 'bg-navy-900 text-white' : 'border border-haze text-navy-600 hover:border-navy-900'}`}
            >
              {c.name} ({n})
            </button>
          );
        })}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((b, i) => {
          const count = products.filter((p) => p.brand === b.name).length;
          return (
            <Reveal key={b.slug} delay={(i % 3) * 80}>
              <article id={b.slug} className="card h-full scroll-mt-36 p-6 transition hover:shadow-card-hover">
                <BrandMark brand={b} size="sm" />
                <div className="mt-5 flex items-center justify-between gap-3 text-xs text-navy-400">
                  <span className="flex items-center gap-1.5"><Icon name="globe" className="h-3.5 w-3.5" /> {b.country}</span>
                  <span className="font-bold text-navy-600">{count > 0 ? `${count} listed product${count === 1 ? '' : 's'}` : 'Available on order'}</span>
                </div>
                <h2 className="mt-3 font-serif text-lg font-bold text-navy-900">{b.name}</h2>
                <p className="mt-2 text-sm leading-relaxed text-navy-400">{b.supplies}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {b.categories.map((cs) => {
                    const c = categories.find((x) => x.slug === cs);
                    return c ? (
                      <Link key={cs} href={`/products/${cs}`} className="rounded-full bg-mist px-3 py-1 text-[11px] font-semibold text-navy-600 transition hover:bg-amber-100 hover:text-amber-700">
                        {c.name}
                      </Link>
                    ) : null;
                  })}
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>

      <Reveal className="mt-14 rounded-2xl border border-haze bg-mist p-8 text-center">
        <p className="font-serif text-xl font-bold text-navy-900">Looking for a brand that isn't listed?</p>
        <p className="mx-auto mt-2 max-w-xl text-sm text-navy-400">
          Powerhouse represents over 100 global brands — this page features our flagship lines. Tell us what you need and we will source it, genuinely.
        </p>
        <Link href="/contact" className="btn-primary mt-5">Ask Powerhouse <Icon name="arrow-right" className="h-4 w-4" /></Link>
      </Reveal>
    </section>
  );
}
