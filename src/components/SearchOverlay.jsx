'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { searchAll } from '@/lib/data';
import Icon from './Icon';

const suggestions = ['Clipsal socket', 'ABB MCB', 'Magnetic track', 'Smart switch', 'Tiandy camera', 'Floor box', 'Speaker', 'Patch panel'];

export default function SearchOverlay({ open, onClose }) {
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);
  const router = useRouter();

  const results = useMemo(() => searchAll(q), [q]);
  const flat = useMemo(() => {
    const rows = [];
    results.pages.forEach((p) => rows.push({ type: 'page', label: p.title, sub: 'Page', href: p.href }));
    results.categories.forEach((c) => rows.push({ type: 'category', label: c.name, sub: 'Category', href: `/products/${c.slug}` }));
    results.brands.forEach((b) => rows.push({ type: 'brand', label: b.name, sub: `Brand · ${b.country}`, href: `/brands#${b.slug}` }));
    results.products.forEach((p) => rows.push({ type: 'product', label: p.name, sub: p.brand, href: `/product/${p.slug}`, image: p.image }));
    return rows;
  }, [results]);

  useEffect(() => {
    if (open) {
      setActive(0);
      const t = setTimeout(() => inputRef.current?.focus(), 60);
      document.body.style.overflow = 'hidden';
      return () => {
        clearTimeout(t);
        document.body.style.overflow = '';
      };
    }
    document.body.style.overflow = '';
  }, [open]);

  useEffect(() => setActive(0), [q]);

  if (!open) return null;

  const go = (href) => {
    onClose();
    router.push(href);
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, flat.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === 'Enter' && flat[active]) {
      e.preventDefault();
      go(flat[active].href);
    }
  };

  return (
    <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label="Product search">
      <div className="absolute inset-0 bg-navy-950/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div className="relative mx-auto mt-[10vh] w-full max-w-2xl px-4">
        <div className="card overflow-hidden !rounded-2xl">
          <div className="flex items-center gap-3 border-b border-haze px-5 py-4">
            <Icon name="search" className="h-5 w-5 shrink-0 text-navy-400" />
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Search products, categories, brands…"
              className="w-full bg-transparent text-base text-ink outline-none placeholder:text-navy-300"
              aria-label="Search"
              role="combobox"
              aria-expanded="true"
              aria-controls="search-results"
            />
            <button onClick={onClose} className="rounded-full p-1 text-navy-400 hover:bg-mist hover:text-navy-800" aria-label="Close search">
              <Icon name="close" className="h-5 w-5" />
            </button>
          </div>

          <div id="search-results" className="max-h-[52vh] overflow-y-auto" role="listbox">
            {q.trim().length < 2 ? (
              <div className="px-5 py-6">
                <p className="text-xs font-bold uppercase tracking-widest text-navy-400">Try searching for</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {suggestions.map((s) => (
                    <button key={s} onClick={() => setQ(s)} className="rounded-full border border-haze px-3.5 py-1.5 text-sm text-navy-700 transition hover:border-amber-400 hover:bg-amber-50">
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : flat.length === 0 ? (
              <p className="px-5 py-10 text-center text-sm text-navy-400">
                No matches for “{q}”. <button className="font-semibold text-amber-600 underline" onClick={() => go('/products')}>Browse all products</button>
              </p>
            ) : (
              <ul>
                {flat.map((r, i) => (
                  <li key={r.href + r.label} role="option" aria-selected={i === active}>
                    <button
                      onClick={() => go(r.href)}
                      onMouseEnter={() => setActive(i)}
                      className={`flex w-full items-center gap-3 px-5 py-3 text-left transition ${i === active ? 'bg-mist' : ''}`}
                    >
                      {r.image ? (
                        <Image src={r.image} alt="" width={40} height={40} className="h-10 w-10 shrink-0 rounded-lg object-cover" unoptimized />
                      ) : (
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-navy-50 text-navy-700">
                          <Icon name={r.type === 'product' ? 'quote' : r.type === 'category' ? 'grid' : r.type === 'brand' ? 'globe' : 'arrow-right'} className="h-4 w-4" />
                        </span>
                      )}
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold text-navy-900">{r.label}</span>
                        <span className="block text-xs capitalize text-navy-400">{r.type}{r.sub ? ` · ${r.sub}` : ''}</span>
                      </span>
                      <Icon name="arrow-right" className="h-4 w-4 shrink-0 text-navy-300" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="flex items-center justify-between border-t border-haze px-5 py-2.5 text-[11px] text-navy-400">
            <span>↑ ↓ to navigate · Enter to open · Esc to close</span>
            <Link href="/products" onClick={onClose} className="font-semibold text-amber-600 hover:underline">Full product catalogue →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
