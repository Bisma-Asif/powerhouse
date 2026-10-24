'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { brands, categories, products } from '@/lib/data';
import Icon from './Icon';
import ProductCard from './ProductCard';

const PER_PAGE = 12;
const sorts = [
  { id: 'featured', label: 'Featured first' },
  { id: 'name-asc', label: 'Name A–Z' },
  { id: 'name-desc', label: 'Name Z–A' },
  { id: 'brand', label: 'Brand A–Z' },
];

export default function ProductsExplorer({ initialCategory = '', initialSub = '', initialQuery = '' }) {
  const router = useRouter();
  const [category, setCategory] = useState(initialCategory);
  const [subcategory, setSubcategory] = useState(initialSub);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [query, setQuery] = useState(initialQuery);
  const [sort, setSort] = useState('featured');
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const resetPage = (fn) => (v) => {
    fn(v);
    setPage(1);
  };

  const activeCategory = categories.find((c) => c.slug === category);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = products.filter((p) => {
      if (category && p.category !== category) return false;
      if (subcategory && p.subcategory !== subcategory) return false;
      if (selectedBrands.length && !selectedBrands.includes(p.brand)) return false;
      if (q && !(p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.short.toLowerCase().includes(q))) return false;
      return true;
    });
    switch (sort) {
      case 'name-asc': list = [...list].sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'name-desc': list = [...list].sort((a, b) => b.name.localeCompare(a.name)); break;
      case 'brand': list = [...list].sort((a, b) => a.brand.localeCompare(b.brand)); break;
      default: list = [...list].sort((a, b) => (b.featured === true) - (a.featured === true));
    }
    return list;
  }, [category, subcategory, selectedBrands, query, sort]);

  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const visible = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const brandOptions = useMemo(() => {
    const pool = category ? products.filter((p) => p.category === category) : products;
    return [...new Set(pool.map((p) => p.brand))].sort();
  }, [category]);

  const toggleBrand = (b) =>
    resetPage(setSelectedBrands)((prev) => (prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]));

  const clearAll = () => {
    setCategory('');
    setSubcategory('');
    setSelectedBrands([]);
    setQuery('');
    setPage(1);
    router.push('/products');
  };

  const pickCategory = (slug) => {
    resetPage(setCategory)(slug);
    setSubcategory('');
    setSelectedBrands([]);
    router.push(slug ? `/products${slug ? `/${slug}` : ''}` : '/products', { scroll: false });
  };

  const FilterPanel = (
    <div className="space-y-7">
      <div>
        <label htmlFor="product-q" className="text-xs font-bold uppercase tracking-widest text-navy-400">Search in catalogue</label>
        <div className="relative mt-2">
          <Icon name="search" className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-300" />
          <input
            id="product-q"
            value={query}
            onChange={(e) => resetPage(setQuery)(e.target.value)}
            placeholder="e.g. dimmer, MCCB, track…"
            className="field !pl-10"
          />
        </div>
      </div>

      <fieldset>
        <legend className="text-xs font-bold uppercase tracking-widest text-navy-400">Category</legend>
        <div className="mt-3 space-y-1">
          <button
            type="button"
            onClick={() => pickCategory('')}
            className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition ${!category ? 'bg-navy-900 font-semibold text-white' : 'text-navy-700 hover:bg-mist'}`}
          >
            All categories ({products.length})
          </button>
          {categories.map((c) => {
            const n = products.filter((p) => p.category === c.slug).length;
            return (
              <button
                key={c.slug}
                type="button"
                onClick={() => pickCategory(c.slug)}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition ${category === c.slug ? 'bg-navy-900 font-semibold text-white' : 'text-navy-700 hover:bg-mist'}`}
              >
                <span className="flex items-center gap-2"><Icon name={c.icon} className="h-4 w-4" /> {c.name}</span>
                <span className="text-xs opacity-60">({n})</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      {activeCategory && (
        <fieldset>
          <legend className="text-xs font-bold uppercase tracking-widest text-navy-400">Sub-category</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => resetPage(setSubcategory)('')}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${!subcategory ? 'bg-amber-400 text-navy-950' : 'border border-haze text-navy-600 hover:border-amber-400'}`}
            >
              All
            </button>
            {activeCategory.subcategories.map((s) => (
              <button
                key={s.slug}
                type="button"
                onClick={() => resetPage(setSubcategory)(subcategory === s.slug ? '' : s.slug)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${subcategory === s.slug ? 'bg-amber-400 text-navy-950' : 'border border-haze text-navy-600 hover:border-amber-400'}`}
              >
                {s.name}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      <fieldset>
        <legend className="text-xs font-bold uppercase tracking-widest text-navy-400">Brand</legend>
        <div className="mt-3 max-h-64 space-y-1.5 overflow-y-auto pr-1">
          {brandOptions.map((b) => (
            <label key={b} className="flex cursor-pointer items-center gap-2.5 text-sm text-navy-700">
              <input
                type="checkbox"
                checked={selectedBrands.includes(b)}
                onChange={() => toggleBrand(b)}
                className="h-4 w-4 rounded border-navy-300 text-amber-500 focus:ring-amber-400"
              />
              {b}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-col gap-2 border-t border-haze pt-5">
        <button type="button" onClick={clearAll} className="btn-outline !py-2.5 text-xs">Clear all filters</button>
        <Link href="/quote" className="btn-accent !py-2.5 text-xs">Go to quote list <Icon name="arrow-right" className="h-4 w-4" /></Link>
      </div>
    </div>
  );

  return (
    <div className="container-page grid gap-10 py-12 lg:grid-cols-12">
      {/* Desktop sidebar */}
      <aside className="hidden lg:col-span-3 lg:block" aria-label="Product filters">
        <div className="sticky top-32 max-h-[calc(100vh-9rem)] overflow-y-auto pr-2">{FilterPanel}</div>
      </aside>

      <div className="lg:col-span-9">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-navy-400">
            Showing <span className="font-bold text-navy-900">{visible.length}</span> of{' '}
            <span className="font-bold text-navy-900">{filtered.length}</span> products
            {activeCategory && <> in <Link className="font-semibold text-amber-600 hover:underline" href={`/products/${activeCategory.slug}`}>{activeCategory.name}</Link></>}
            {subcategory && activeCategory && <> › {activeCategory.subcategories.find((s) => s.slug === subcategory)?.name}</>}
          </p>
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => setFiltersOpen(true)} className="btn-outline !px-4 !py-2 text-xs lg:hidden">
              <Icon name="filter" className="h-4 w-4" /> Filters
            </button>
            <label htmlFor="sort" className="sr-only">Sort products</label>
            <select id="sort" value={sort} onChange={(e) => setSort(e.target.value)} className="field !w-auto !py-2 text-xs">
              {sorts.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
            </select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="card mt-8 p-14 text-center">
            <p className="font-serif text-2xl font-bold text-navy-900">No products match those filters.</p>
            <p className="mt-2 text-sm text-navy-400">Try a broader search — or ask us directly, we stock far beyond what is listed here.</p>
            <div className="mt-6 flex justify-center gap-3">
              <button type="button" onClick={clearAll} className="btn-outline">Clear filters</button>
              <Link href="/contact" className="btn-primary">Ask Powerhouse</Link>
            </div>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {visible.map((p) => <ProductCard key={p.slug} product={p} />)}
          </div>
        )}

        {pages > 1 && (
          <nav aria-label="Pagination" className="mt-12 flex items-center justify-center gap-2">
            <button
              type="button"
              disabled={page === 1}
              onClick={() => { setPage(page - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="grid h-10 w-10 place-items-center rounded-full border border-haze text-navy-600 transition enabled:hover:border-navy-900 disabled:opacity-40"
              aria-label="Previous page"
            >
              <Icon name="chevron-right" className="h-4 w-4 rotate-180" />
            </button>
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => { setPage(i + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                aria-current={page === i + 1 ? 'page' : undefined}
                className={`h-10 w-10 rounded-full text-sm font-semibold transition ${page === i + 1 ? 'bg-navy-900 text-white' : 'border border-haze text-navy-600 hover:border-navy-900'}`}
              >
                {i + 1}
              </button>
            ))}
            <button
              type="button"
              disabled={page === pages}
              onClick={() => { setPage(page + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="grid h-10 w-10 place-items-center rounded-full border border-haze text-navy-600 transition enabled:hover:border-navy-900 disabled:opacity-40"
              aria-label="Next page"
            >
              <Icon name="chevron-right" className="h-4 w-4" />
            </button>
          </nav>
        )}
      </div>

      {/* Mobile filter drawer */}
      <div className={`fixed inset-0 z-[60] lg:hidden ${filtersOpen ? '' : 'pointer-events-none'}`} aria-hidden={!filtersOpen}>
        <div className={`absolute inset-0 bg-navy-950/50 transition ${filtersOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setFiltersOpen(false)} />
        <div className={`absolute inset-y-0 left-0 w-[85%] max-w-sm overflow-y-auto bg-white p-6 shadow-card-hover transition-transform duration-300 ${filtersOpen ? 'translate-x-0' : '-translate-x-full'}`} role="dialog" aria-label="Filters">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-serif text-lg font-bold text-navy-900">Filters</h2>
            <button type="button" onClick={() => setFiltersOpen(false)} aria-label="Close filters" className="rounded-full p-2 hover:bg-mist">
              <Icon name="close" className="h-5 w-5" />
            </button>
          </div>
          {FilterPanel}
        </div>
      </div>
    </div>
  );
}
