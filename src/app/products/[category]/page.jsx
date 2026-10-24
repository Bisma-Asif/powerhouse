import { notFound } from 'next/navigation';
import PageHero from '@/components/PageHero';
import ProductsExplorer from '@/components/ProductsExplorer';
import { categories, getCategory, productsByCategory, site, withSize } from '@/lib/data';

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }) {
  const cat = getCategory(params.category);
  if (!cat) return {};
  return {
    title: `${cat.name} — Products`,
    description: `${cat.blurb} Shop and request quotes for ${cat.name.toLowerCase()} from Powerhouse Building Solutions, Karachi & Islamabad.`,
    alternates: { canonical: `/products/${cat.slug}` },
  };
}

export default function CategoryPage({ params }) {
  const cat = getCategory(params.category);
  if (!cat) notFound();
  const count = productsByCategory(cat.slug).length;

  return (
    <>
      <PageHero
        title={cat.name}
        subtitle={cat.blurb}
        image={withSize(cat.image, 1600)}
        alt={`${cat.name} by Powerhouse`}
        crumbs={[{ label: 'Products', href: '/products' }, { label: cat.name, href: `/products/${cat.slug}` }]}
      />
      <div className="border-b border-haze bg-white">
        <div className="container-page flex flex-wrap items-center gap-x-8 gap-y-2 py-4 text-sm">
          <span className="font-bold text-navy-900">{count} listed products</span>
          <span className="text-navy-400">Brands supplied:</span>
          <span className="text-navy-700">{[...new Set(productsByCategory(cat.slug).map((p) => p.brand))].join(' · ')}</span>
          <span className="ml-auto hidden text-navy-400 sm:block">Prices on request · {site.tagline}</span>
        </div>
      </div>
      <ProductsExplorer initialCategory={cat.slug} />
    </>
  );
}
