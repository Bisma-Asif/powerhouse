import './globals.css';
import { Inter, Playfair_Display } from 'next/font/google';
import Script from 'next/script';
import { QuoteProvider } from '@/components/QuoteProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWidgets from '@/components/FloatingWidgets';
import { site } from '@/lib/data';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap' });

export const metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: `${site.name} | Electrical, Lighting, Automation & Security Solutions in Pakistan`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: ['Powerhouse Building Solutions', 'electrical Pakistan', 'lighting Karachi', 'building automation', 'switchgear', 'CCTV surveillance', 'Hi-Fi audio', 'Schneider Electric Pakistan', 'Clipsal', 'ABB'],
  openGraph: {
    type: 'website',
    locale: 'en_PK',
    url: site.domain,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [{ url: 'https://powerhouse.elevyndesigns.com/wp-content/themes/powerhouse/assets/images/hero_switches_luxury.jpg', width: 1200, height: 630, alt: site.name }],
  },
  twitter: { card: 'summary_large_image', title: `${site.name} — ${site.tagline}`, description: site.description, images: ['https://powerhouse.elevyndesigns.com/wp-content/themes/powerhouse/assets/images/hero_switches_luxury.jpg'] },
  robots: { index: true, follow: true },
  category: 'Electrical & Building Materials',
};

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.legalName,
  alternateName: site.name,
  url: site.domain,
  logo: `${site.domain}/icon.svg`,
  description: site.description,
  email: site.emails.general,
  telephone: site.locations[0].phone,
  sameAs: [site.social.facebook],
  address: [
    {
      '@type': 'PostalAddress',
      streetAddress: 'Suite # 611, 6th Floor, The Forum, G-20, Block-9, Khayaban-e-Jami, Clifton',
      addressLocality: 'Karachi',
      addressCountry: 'PK',
    },
    {
      '@type': 'PostalAddress',
      streetAddress: 'Building No. 34-C, Lane No. 12, Bukhari Commercial, Phase-VI, DHA',
      addressLocality: 'Karachi',
      addressCountry: 'PK',
    },
    {
      '@type': 'PostalAddress',
      streetAddress: '47, Furniture Market, Golra Road',
      addressLocality: 'Islamabad',
      addressCountry: 'PK',
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <Script id="org-schema" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(orgSchema)}
        </Script>
        <QuoteProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <FloatingWidgets />
        </QuoteProvider>
      </body>
    </html>
  );
}
