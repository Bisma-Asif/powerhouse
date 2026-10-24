import BrandExplorer from '@/components/BrandExplorer';
import PageHero from '@/components/PageHero';

export const metadata = {
  title: 'Brands — Schneider, ABB, Clipsal, Himel & More',
  description: 'All brands distributed by Powerhouse Building Solutions in Pakistan, with what each brand supplies across switches, lighting, automation, switchgear, security, networking and Hi-Fi.',
  alternates: { canonical: '/brands' },
};

export default function BrandsPage() {
  return (
    <>
      <PageHero
        title="Our Brands"
        subtitle="Authorised distribution and direct factory imports across 24+ featured brands — every product line backed by certificates of origin and manufacturer warranty."
        image="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1920&q=70"
        alt="Global brand partnerships"
        crumbs={[{ label: 'Brands', href: '/brands' }]}
      />
      <BrandExplorer />
    </>
  );
}
