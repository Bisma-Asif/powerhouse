import Link from 'next/link';
import { categories, site } from '@/lib/data';
import Icon from './Icon';
import NewsletterForm from './NewsletterForm';

export default function Footer() {
  return (
    <footer className="mt-24 bg-navy-950 text-navy-200" role="contentinfo">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-400 text-navy-950">
              <Icon name="bolt" className="h-5 w-5" filled />
            </span>
            <span className="leading-none">
              <span className="block font-serif text-xl font-bold text-white">Powerhouse</span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-400">Building Solutions</span>
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed">
            {site.tagline} — Pakistan's one-stop superstore for electrical and electronic products, luxury lighting,
            building automation, switchgear, security and Hi-Fi/AV, with over 100 genuine global brands.
          </p>
          <div className="mt-6 flex gap-3">
            <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="grid h-10 w-10 place-items-center rounded-full border border-navy-700 transition hover:border-amber-400 hover:text-amber-400">
              <Icon name="facebook" className="h-4 w-4" />
            </a>
            <a href={`mailto:${site.emails.general}`} aria-label="Email us" className="grid h-10 w-10 place-items-center rounded-full border border-navy-700 transition hover:border-amber-400 hover:text-amber-400">
              <Icon name="mail" className="h-4 w-4" />
            </a>
            <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="grid h-10 w-10 place-items-center rounded-full border border-navy-700 transition hover:border-amber-400 hover:text-amber-400">
              <Icon name="whatsapp" className="h-4 w-4" />
            </a>
          </div>
        </div>

        <nav aria-label="Product categories" className="lg:col-span-3">
          <h2 className="font-serif text-lg font-bold text-white">Categories</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {categories.slice(0, 8).map((c) => (
              <li key={c.slug}>
                <Link href={`/products/${c.slug}`} className="transition hover:text-amber-400">{c.name}</Link>
              </li>
            ))}
            <li><Link href="/products" className="font-semibold text-amber-400 hover:text-amber-300">View all products →</Link></li>
          </ul>
        </nav>

        <nav aria-label="Company" className="lg:col-span-2">
          <h2 className="font-serif text-lg font-bold text-white">Company</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link href="/about" className="hover:text-amber-400 transition">About Powerhouse</Link></li>
            <li><Link href="/services" className="hover:text-amber-400 transition">Services</Link></li>
            <li><Link href="/projects" className="hover:text-amber-400 transition">Projects</Link></li>
            <li><Link href="/brands" className="hover:text-amber-400 transition">Brands</Link></li>
            <li><Link href="/news" className="hover:text-amber-400 transition">News & Events</Link></li>
            <li><Link href="/careers" className="hover:text-amber-400 transition">Careers</Link></li>
            <li><Link href="/contact" className="hover:text-amber-400 transition">Contact</Link></li>
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className="font-serif text-lg font-bold text-white">Head Office</h2>
          <address className="mt-4 space-y-3 text-sm not-italic leading-relaxed">
            <p className="flex gap-2.5"><Icon name="pinOuter" className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" /> {site.locations[0].address}</p>
            <p className="flex gap-2.5"><Icon name="phone" className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" /> <a href={`tel:${site.locations[0].phoneHref}`} className="hover:text-amber-400">{site.locations[0].phone}</a></p>
            <p className="flex gap-2.5"><Icon name="mail" className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" /> <a href={`mailto:${site.emails.general}`} className="hover:text-amber-400">{site.emails.general}</a></p>
          </address>
          <div className="mt-6">
            <h3 className="text-sm font-bold text-white">Newsletter</h3>
            <p className="mb-3 mt-1 text-xs text-navy-300">Product launches, guides and offers — monthly, never weekly.</p>
            <NewsletterForm />
          </div>
        </div>
      </div>

      <div className="border-t border-navy-800">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-5 text-xs text-navy-400 sm:flex-row">
          <p>© {new Date().getFullYear()} Powerhouse (Pvt.) Ltd. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-amber-400">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-amber-400">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
