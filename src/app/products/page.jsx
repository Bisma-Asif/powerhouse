import PageHero from '@/components/PageHero';
import ProductsExplorer from '@/components/ProductsExplorer';
import { withSize } from '@/lib/data';
import { site } from '@/lib/data';

export const metadata = {
  title: 'Products — All Categories',
  description: `Browse Powerhouse's full catalogue of switches, lighting, automation, switchgear, security, networking, cable management, Hi-Fi AV and accessories. ${site.tagline}.`,
  alternates: { canonical: '/products' },
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        title="Product Catalogue"
        subtitle="Ten departments, 100+ global brands and hundreds of certified products — filter, search and build your quote list in one place."
        image={withSize('https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1920&q=70')}
        alt="Smart building control panel"
        crumbs={[{ label: 'Products', href: '/products' }]}
      />
      <ProductsExplorer />
    </>
  );
}
