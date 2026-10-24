import { notFound } from 'next/navigation';
import PageHero from '@/components/PageHero';
import ProductsExplorer from '@/components/ProductsExplorer';
import { categories, getCategory, getSubcategory, productsByCategory, withSize } from '@/lib/data';

export function generateStaticParams() {
  const out = [];
  for (const c of categories) {
    for (const s of c.subcategories) {
      out.push({ category: c.slug, subcategory: s.slug });
    }
  }
  return out;
}

export async function generateMetadata({ params }) {
  const cat = getCategory(params.category);
  const sub = getSubcategory(params.category, params.subcategory);
  if (!cat || !sub) return {};
  return {
    title: `${sub.name} — ${cat.name}`,
    description: `${sub.name} from ${cat.name}, supplied and installed by Powerhouse Building Solutions, Pakistan. Genuine brands, quotes within 24 hours.`,
    alternates: { canonical: `/products/${cat.slug}/${sub.slug}` },
  };
}

export default function SubcategoryPage({ params }) {
  const cat = getCategory(params.category);
  const sub = getSubcategory(params.category, params.subcategory);
  if (!cat || !sub) notFound();
  const count = productsByCategory(cat.slug).filter((p) => p.subcategory === sub.slug).length;

  return (
    <>
      <PageHero
        title={sub.name}
        subtitle={`${sub.name} within ${cat.name} — ${count} listed products, factory-certified and ready to quote. ${cat.blurb}`}
        image={withSize(cat.image, 1600)}
        alt={`${sub.name} products`}
        crumbs={[
          { label: 'Products', href: '/products' },
          { label: cat.name, href: `/products/${cat.slug}` },
          { label: sub.name, href: `/products/${cat.slug}/${sub.slug}` },
        ]}
      />
      <ProductsExplorer initialCategory={cat.slug} initialSub={sub.slug} />
    </>
  );
}
