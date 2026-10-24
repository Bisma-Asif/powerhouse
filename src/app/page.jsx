import Image from '@/components/Img';
import Link from 'next/link';
import HeroCarousel from '@/components/HeroCarousel';
import Reveal from '@/components/Reveal';
import CountUp from '@/components/CountUp';
import Icon from '@/components/Icon';
import ProductCard from '@/components/ProductCard';
import BrandMarquee from '@/components/BrandMarquee';
import TestimonialSlider from '@/components/TestimonialSlider';
import { categories, featuredProducts, projects, site, testimonials, withSize } from '@/lib/data';

const heroSlides = [
  {
    image: 'https://powerhouse.elevyndesigns.com/wp-content/themes/powerhouse/assets/images/hero_switches_luxury.jpg',
    alt: 'Luxury designer switches on a modern wall',
    kicker: 'Electrical · Lighting · Automation · Security · AV',
    title: 'A home means more than ever before',
    text: 'We breathe life into homes using technology designed for an ever-changing world — from modern switches and power points to smart home and safety technology that gives you more peace of mind and control.',
    cta: { href: '/products', label: 'Explore Categories' },
    cta2: { href: '/quote', label: 'Request a Quote' },
  },
  {
    image: 'https://powerhouse.elevyndesigns.com/wp-content/themes/powerhouse/assets/images/Lighting-Control-450x450.jpg',
    alt: 'Smart lighting control panel in a modern interior',
    kicker: 'Smart Living',
    title: 'Building automation that feels effortless',
    text: 'KNX-grade panels, GRMS for hotels, motion sensing and app-controlled lighting, curtains and climate — one touch for every scene of your life.',
    cta: { href: '/products/building-automation', label: 'Discover Automation' },
    cta2: { href: '/services', label: 'How We Install' },
  },
  {
    image: 'https://powerhouse.elevyndesigns.com/wp-content/themes/powerhouse/assets/images/wiring-Devices-450x450.jpg',
    alt: 'Architectural LED lighting illuminating a space',
    kicker: 'Illumination',
    title: 'Over 500 lighting solutions for every space',
    text: 'Architectural downlights, 48V magnetic track, highbay and flood — layered light designed by our team, supplied by Coarts and trusted global brands.',
    cta: { href: '/products/lighting', label: 'Browse Lighting' },
    cta2: { href: '/projects', label: 'See It In Projects' },
  },
];

const whyItems = [
  { icon: 'shield', title: 'Zero Counterfeit Guarantee', text: 'Direct factory imports with manufacturer certificates of origin — every breaker, every plate, verified genuine.' },
  { icon: 'clock', title: '24-Hour Priced BOQ', text: 'Send your schedule or single-line diagram and receive a complete, formally priced technical quotation within 24 hours.' },
  { icon: 'building', title: 'Live Distribution Hubs', text: 'Active warehouses and display centres in Karachi and Islamabad keep genuine stock ready for your programme.' },
  { icon: 'tools', title: 'Hassle-Free Setup', text: 'Expert home installation and wiring services — layout design, safety protocols and maintenance checks by certified technicians.' },
  { icon: 'spark', title: 'Smart Home Experts', text: 'From a single Wi-Fi plug to full KNX and GRMS rollouts, our engineers design, commission and support the whole system.' },
  { icon: 'user', title: 'Free Consultation', text: 'Book a free consultation at our display centre and experience switches, lighting scenes and automation before you buy.' },
];

export default function HomePage() {
  const featured = featuredProducts(8);
  const previewProjects = projects.slice(0, 3);

  return (
    <>
      <HeroCarousel slides={heroSlides} />

      {/* Stats band */}
      <section aria-label="Powerhouse in numbers" className="border-b border-haze bg-white">
        <div className="container-page grid grid-cols-2 gap-y-10 py-12 lg:grid-cols-4">
          {site.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 100} className="px-2 text-center lg:border-r lg:border-haze lg:last:border-r-0">
              <p className="font-serif text-4xl font-bold text-navy-900 sm:text-5xl">
                <CountUp to={s.value} suffix={s.suffix} className="tabular-nums" />
              </p>
              <p className="mt-1.5 text-sm font-bold uppercase tracking-wider text-amber-600">{s.label}</p>
              <p className="mx-auto mt-2 max-w-[26ch] text-xs leading-relaxed text-navy-400">{s.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Category showcase */}
      <section className="bg-mist py-20">
        <div className="container-page">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Divisional architecture</p>
              <h2 className="section-title mt-2">Ten departments. One trusted source.</h2>
            </div>
            <Link href="/products" className="btn-outline">All products <Icon name="arrow-right" className="h-4 w-4" /></Link>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {categories.map((c, i) => (
              <Reveal key={c.slug} delay={(i % 5) * 80}>
                <Link href={`/products/${c.slug}`} className="card-hover group relative block h-72 overflow-hidden">
                  <Image
                    src={withSize(c.image, 700)}
                    alt={`${c.name} products supplied by Powerhouse`}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/35 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <span className="mb-2 grid h-10 w-10 place-items-center rounded-lg bg-amber-400/95 text-navy-950 shadow transition group-hover:-translate-y-1">
                      <Icon name={c.icon} className="h-5 w-5" />
                    </span>
                    <h3 className="font-serif text-lg font-bold leading-tight text-white">{c.name}</h3>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-navy-200">{c.blurb}</p>
                    <p className="mt-2 flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-amber-300 opacity-0 transition-all duration-300 group-hover:opacity-100">
                      Browse {c.subcategories.length} sub-categories <Icon name="arrow-right" className="h-3 w-3" />
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Powerhouse */}
      <section className="py-20">
        <div className="container-page">
          <div className="grid items-start gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-4 lg:sticky lg:top-32">
              <p className="eyebrow">Why Powerhouse</p>
              <h2 className="section-title mt-2">No one tries harder for the customer than Powerhouse.</h2>
              <p className="mt-4 leading-relaxed text-navy-400">
                A superstore concept in electricals — an interactive environment where customers buy electrical,
                electronic and building products at the lowest competitive prices with the best service behind them.
              </p>
              <Link href="/about" className="btn-primary mt-7">Our story <Icon name="arrow-right" className="h-4 w-4" /></Link>
            </Reveal>
            <div className="grid gap-6 sm:grid-cols-2 lg:col-span-8">
              {whyItems.map((w, i) => (
                <Reveal key={w.title} delay={i * 70}>
                  <div className="card h-full p-6 transition hover:shadow-card-hover">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy-50 text-navy-800">
                      <Icon name={w.icon} className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 font-serif text-lg font-bold text-navy-900">{w.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-navy-400">{w.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="bg-mist py-20">
        <div className="container-page">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Curated inventory</p>
              <h2 className="section-title mt-2">Featured products, ready to quote</h2>
            </div>
            <Link href="/products" className="btn-outline">View catalogue <Icon name="arrow-right" className="h-4 w-4" /></Link>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 4) * 80}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="py-20">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow justify-center">100+ global brands</p>
            <h2 className="section-title mt-2">Authorised for the brands that matter</h2>
            <p className="mt-3 text-navy-400">Schneider Electric · Clipsal · ABB · Himel · Coarts · BlueDot · Tiandy · Lockly · KEF · Dynaudio and more.</p>
          </Reveal>
        </div>
        <div className="container-page mt-10">
          <BrandMarquee />
        </div>
        <div className="container-page mt-8 text-center">
          <Link href="/brands" className="btn-primary">Explore all brands <Icon name="arrow-right" className="h-4 w-4" /></Link>
        </div>
      </section>

      {/* Projects preview */}
      <section className="bg-navy-950 py-20 text-white">
        <div className="container-page">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow !text-amber-300">National case dossiers</p>
              <h2 className="mt-2 font-serif text-3xl font-bold sm:text-4xl">Landmark fit-outs across Pakistan</h2>
            </div>
            <Link href="/projects" className="btn border border-navy-600 text-navy-100 hover:bg-white hover:text-navy-950">All projects <Icon name="arrow-right" className="h-4 w-4" /></Link>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {previewProjects.map((pr, i) => (
              <Reveal key={pr.slug} delay={i * 100}>
                <Link href={`/projects/${pr.slug}`} className="group relative block h-96 overflow-hidden rounded-2xl">
                  <Image
                    src={withSize(pr.image, 900)}
                    alt={pr.title}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                    fallbackOpacity={0.25}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-300">{pr.sector} · {pr.year}</p>
                    <h3 className="mt-1.5 font-serif text-xl font-bold">{pr.title}</h3>
                    <p className="mt-1.5 line-clamp-2 text-sm text-navy-200">{pr.summary}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow justify-center">Customer voices</p>
            <h2 className="section-title mt-2">Trusted by homeowners, designers and contractors</h2>
          </Reveal>
          <Reveal className="mt-10">
            <TestimonialSlider items={testimonials} />
          </Reveal>
        </div>
      </section>

      {/* Quote CTA */}
      <section className="container-page pb-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-navy-900 px-8 py-14 text-center sm:px-14">
            <Image
              src="https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1920&q=70"
              alt=""
              fill
              loading="lazy"
              sizes="100vw"
              className="object-cover opacity-15"
              aria-hidden="true"
            />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl text-balance">Planning a build, renovation or fit-out?</h2>
              <p className="mt-4 text-navy-100 sm:text-lg">
                Send us your BOQ or add products to a quote list — a complete priced quotation lands in your inbox within 24 hours.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link href="/quote" className="btn-accent">Start a quote list <Icon name="arrow-right" className="h-4 w-4" /></Link>
                <a href={`tel:${site.locations[0].phoneHref}`} className="btn border border-navy-500 text-white hover:bg-white hover:text-navy-950">
                  <Icon name="phone" className="h-4 w-4" /> {site.locations[0].phone}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
