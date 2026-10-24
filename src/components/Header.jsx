'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { categories, site } from '@/lib/data';
import Icon from './Icon';
import { useQuote } from './QuoteProvider';
import SearchOverlay from './SearchOverlay';

const primaryLinks = [
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Projects' },
  { href: '/brands', label: 'Brands' },
  { href: '/news', label: 'News' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(null); // category slug
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubOpen, setMobileSubOpen] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const { count, justAdded, mounted } = useQuote();
  const pathname = usePathname();
  const megaTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(null);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && (setSearchOpen(false), setMobileOpen(false), setMegaOpen(null));
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const openMega = (slug) => {
    clearTimeout(megaTimer.current);
    setMegaOpen(slug);
  };
  const closeMegaSoon = () => {
    megaTimer.current = setTimeout(() => setMegaOpen(null), 140);
  };

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-navy-900 focus:px-4 focus:py-2 focus:text-white">
        Skip to main content
      </a>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 shadow-header backdrop-blur' : 'bg-white/80 backdrop-blur'}`}>
        {/* Utility bar */}
        <div className="hidden bg-navy-950 text-navy-100 lg:block">
          <div className="container-page flex h-10 items-center justify-between text-xs">
            <div className="flex items-center gap-6">
              <a href={`tel:${site.locations[0].phoneHref}`} className="flex items-center gap-1.5 hover:text-amber-300 transition">
                <Icon name="phone" className="h-3.5 w-3.5" /> {site.locations[0].phone}
              </a>
              <a href={`mailto:${site.emails.general}`} className="flex items-center gap-1.5 hover:text-amber-300 transition">
                <Icon name="mail" className="h-3.5 w-3.5" /> {site.emails.general}
              </a>
            </div>
            <div className="flex items-center gap-5">
              <span className="flex items-center gap-1.5"><Icon name="clock" className="h-3.5 w-3.5" /> Mon – Fri 8AM – 8PM · Sat – Sun 10AM – 2PM</span>
              <Link href="/careers" className="hover:text-amber-300 transition">Careers</Link>
              <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Powerhouse on Facebook" className="hover:text-amber-300 transition">
                <Icon name="facebook" className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Main bar */}
        <div className="container-page relative flex h-[72px] items-center justify-between gap-4">
          <Link href="/" className="group flex items-center gap-2.5" aria-label="Powerhouse Building Solutions — Home">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-navy-900 text-amber-400 transition group-hover:bg-navy-700">
              <Icon name="bolt" className="h-5 w-5" filled />
            </span>
            <span className="leading-none">
              <span className="block font-serif text-xl font-bold tracking-tight text-navy-900">Powerhouse</span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-600">Building Solutions</span>
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center xl:flex" onMouseLeave={closeMegaSoon}>
            <div className="relative" onMouseEnter={() => openMega('__all')}>
              <button
                type="button"
                aria-expanded={megaOpen === '__all'}
                aria-haspopup="true"
                className={`flex items-center gap-1 px-3 py-2 text-sm font-semibold transition ${pathname.startsWith('/product') ? 'text-amber-600' : 'text-navy-800 hover:text-amber-600'}`}
              >
                Products <Icon name="chevron-down" className={`h-3.5 w-3.5 transition ${megaOpen === '__all' ? 'rotate-180' : ''}`} />
              </button>
            </div>
            {primaryLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`px-3 py-2 text-sm font-semibold transition link-underline ${pathname === l.href || pathname.startsWith(l.href + '/') ? 'text-amber-600' : 'text-navy-800 hover:text-amber-600'}`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="hidden items-center gap-2 rounded-full border border-haze px-4 py-2 text-sm text-navy-400 transition hover:border-navy-300 hover:text-navy-700 md:flex"
              aria-label="Open product search"
            >
              <Icon name="search" className="h-4 w-4" /> Search
            </button>
            <button type="button" onClick={() => setSearchOpen(true)} aria-label="Search" className="grid h-10 w-10 place-items-center rounded-full text-navy-800 transition hover:bg-mist md:hidden">
              <Icon name="search" className="h-5 w-5" />
            </button>
            <Link
              href="/quote"
              className={`relative grid h-10 w-10 place-items-center rounded-full text-navy-800 transition hover:bg-mist ${justAdded ? 'bg-amber-100' : ''}`}
              aria-label={`Quote basket, ${count} item${count === 1 ? '' : 's'}`}
            >
              <Icon name="cart" className="h-5 w-5" />
              {mounted && count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-amber-400 px-1 text-[11px] font-bold text-navy-950">
                  {count}
                </span>
              )}
            </Link>
            <Link href="/quote" className="btn-accent hidden !py-2.5 lg:inline-flex">Request a Quote</Link>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-full text-navy-800 hover:bg-mist xl:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              <Icon name={mobileOpen ? 'close' : 'menu'} className="h-6 w-6" />
            </button>
          </div>

          {/* Mega menu */}
          <div
            className={`absolute left-0 right-0 top-full hidden origin-top border-t border-haze bg-white shadow-card-hover transition-all duration-300 xl:block ${
              megaOpen === '__all' ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'
            }`}
            onMouseEnter={() => openMega('__all')}
            onMouseLeave={closeMegaSoon}
            role="region"
            aria-label="Product categories"
          >
            <div className="container-page grid grid-cols-12 gap-8 py-8">
              <div className="col-span-9 grid grid-cols-2 gap-x-8 gap-y-1 lg:grid-cols-3">
                {categories.map((c) => (
                  <div key={c.slug} className="group rounded-xl p-3 transition hover:bg-mist">
                    <Link href={`/products/${c.slug}`} className="flex items-start gap-3">
                      <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-navy-50 text-navy-700 transition group-hover:bg-navy-900 group-hover:text-amber-400">
                        <Icon name={c.icon} className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block text-sm font-bold text-navy-900">{c.name}</span>
                        <span className="mt-0.5 flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-navy-400">
                          {c.subcategories.slice(0, 3).map((s) => (
                            <span key={s.slug}>{s.name}</span>
                          ))}
                          {c.subcategories.length > 3 && <span>+{c.subcategories.length - 3} more</span>}
                        </span>
                      </span>
                    </Link>
                  </div>
                ))}
              </div>
              <div className="col-span-3 flex flex-col justify-between rounded-2xl bg-navy-950 p-6 text-white">
                <div>
                  <p className="eyebrow !text-amber-300">One-stop superstore</p>
                  <h3 className="mt-2 font-serif text-xl font-bold">100+ global brands, one trusted source.</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-200">
                    Factory-certified imports with 24-hour priced BOQs and installation support in Karachi & Islamabad.
                  </p>
                </div>
                <div className="mt-5 flex flex-col gap-2">
                  <Link href="/brands" className="btn-accent !py-2.5 text-xs">Explore Brands</Link>
                  <Link href="/projects" className="btn border border-navy-600 text-navy-100 hover:bg-navy-800 !py-2.5 text-xs">See Projects</Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          className={`xl:hidden ${mobileOpen ? 'visible' : 'pointer-events-none invisible'} transition-all duration-300`}
          aria-hidden={!mobileOpen}
        >
          <nav aria-label="Mobile" className="max-h-[calc(100vh-72px)] overflow-y-auto border-t border-haze bg-white px-5 pb-8 pt-4 shadow-card">
            <ul className="flex flex-col divide-y divide-haze">
              <li>
                <button
                  type="button"
                  onClick={() => setMobileSubOpen(mobileSubOpen === 'products' ? null : 'products')}
                  aria-expanded={mobileSubOpen === 'products'}
                  className="flex w-full items-center justify-between py-3 text-left text-sm font-bold text-navy-900"
                >
                  Products <Icon name="chevron-down" className={`h-4 w-4 transition ${mobileSubOpen === 'products' ? 'rotate-180' : ''}`} />
                </button>
                <ul className={`flex flex-col gap-1 pb-3 transition-all ${mobileSubOpen === 'products' ? '' : 'hidden'}`}>
                  {categories.map((c) => (
                    <li key={c.slug}>
                      <Link href={`/products/${c.slug}`} className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm text-navy-700 hover:bg-mist">
                        <Icon name={c.icon} className="h-4 w-4 text-amber-600" /> {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              {primaryLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="block py-3 text-sm font-bold text-navy-900 hover:text-amber-600">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/careers" className="block py-3 text-sm font-bold text-navy-900 hover:text-amber-600">Careers</Link>
              </li>
            </ul>
            <div className="mt-5 flex flex-col gap-3">
              <Link href="/quote" className="btn-accent w-full">Request a Quote{mounted && count > 0 ? ` (${count})` : ''}</Link>
              <a href={`tel:${site.locations[0].phoneHref}`} className="btn-outline w-full">
                <Icon name="phone" className="h-4 w-4" /> {site.locations[0].phone}
              </a>
            </div>
          </nav>
        </div>
      </header>
      {/* Spacer */}
      <div aria-hidden="true" className="h-[72px] lg:h-[112px]" />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
