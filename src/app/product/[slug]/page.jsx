import { notFound } from 'next/navigation';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import Icon from '@/components/Icon';
import ProductGallery from '@/components/ProductGallery';
import PurchasePanel from '@/components/PurchasePanel';
import ProductCard from '@/components/ProductCard';
import Reveal from '@/components/Reveal';
import Script from 'next/script';
import { getCategory, getProduct, productImages, relatedProducts, products, site } from '@/lib/data';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const p = getProduct(params.slug);
  if (!p) return {};
  return {
    title: `${p.name} (${p.brand})`,
    description: p.short,
    alternates: { canonical: `/product/${p.slug}` },
    openGraph: {
      title: `${p.name} — Powerhouse Building Solutions`,
      description: p.short,
      images: [{ url: p.image }],
    },
  };
}

export default function ProductPage({ params }) {
  const product = getProduct(params.slug);
  if (!product) notFound();
  const cat = getCategory(product.category);
  const sub = cat?.subcategories.find((s) => s.slug === product.subcategory);
  const images = productImages(product);
  const related = relatedProducts(product, 4);
  const brand = product.brand;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: images,
    description: product.short,
    brand: { '@type': 'Brand', name: brand },
    category: cat?.name,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'PKR',
      price: '0',
      priceValidUntil: `${new Date().getFullYear() + 1}-12-31`,
      url: `${site.domain}/product/${product.slug}`,
      seller: { '@type': 'Organization', name: site.legalName },
    },
  };

  return (
    <div className="container-page py-10 lg:py-14">
      <Script type="application/ld+json" id={`product-schema-${product.slug}`}>{JSON.stringify(schema)}</Script>

      <Breadcrumbs
        items={[
          { label: 'Products', href: '/products' },
          { label: cat.name, href: `/products/${cat.slug}` },
          ...(sub ? [{ label: sub.name, href: `/products/${cat.slug}/${sub.slug}` }] : []),
          { label: product.name, href: `/product/${product.slug}` },
        ]}
      />

      <div className="mt-8 grid gap-12 lg:grid-cols-2">
        <ProductGallery images={images} name={product.name} />

        <div>
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">{brand}</p>
            {product.badge && (
              <span className="rounded-full bg-amber-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-amber-700">{product.badge}</span>
            )}
            <span className="flex items-center gap-1 text-xs text-navy-400"><Icon name="check" className="h-3.5 w-3.5 text-emerald-500" /> In stock — Karachi & Islamabad hubs</span>
          </div>
          <h1 className="mt-3 font-serif text-3xl font-bold leading-tight text-navy-900 sm:text-4xl text-balance">{product.name}</h1>
          <p className="mt-4 leading-relaxed text-navy-500">{product.short}</p>
          <p className="mt-3 text-sm leading-relaxed text-navy-400">{product.desc}</p>

          <PurchasePanel product={product} />

          <dl className="mt-8 overflow-hidden rounded-2xl border border-haze">
            <div className="border-b border-haze bg-mist px-5 py-3">
              <dt className="text-xs font-bold uppercase tracking-widest text-navy-500">Technical specifications</dt>
            </div>
            {Object.entries(product.specs).map(([k, v], i) => (
              <div key={k} className={`grid grid-cols-2 gap-4 px-5 py-3 text-sm ${i % 2 ? 'bg-white' : 'bg-mist/50'}`}>
                <dt className="font-semibold text-navy-500">{k}</dt>
                <dd className="text-navy-900">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <span className="text-navy-400">Looking for help?</span>
            <Link href="/contact" className="inline-flex items-center gap-1 font-semibold text-amber-600 hover:underline">
              Talk to a specialist <Icon name="arrow-right" className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20" aria-labelledby="related-heading">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="related-heading" className="section-title !text-2xl sm:!text-3xl">Related products</h2>
            <Link href={`/products/${cat.slug}`} className="btn-outline !py-2.5 text-xs">More from {cat.name} <Icon name="arrow-right" className="h-4 w-4" /></Link>
          </Reveal>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
