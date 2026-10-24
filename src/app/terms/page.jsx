import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import Icon from '@/components/Icon';
import { site } from '@/lib/data';

export const metadata = {
  title: 'Terms of Use',
  description: 'Terms governing use of the Powerhouse Building Solutions website — product information, quotations, pricing, intellectual property and liability.',
  alternates: { canonical: '/terms' },
};

const sections = [
  {
    h: 'Product information',
    p: ['Specifications, images and availability on this website are provided for guidance. Manufacturers change product details without notice; final technical data is confirmed on the quotation and packing list. Images may differ slightly from delivered goods (finish, accessories).'],
  },
  {
    h: 'Quotations & pricing',
    p: ['Powerhouse operates on a request-a-quote model — listed products show no price because project pricing depends on brand, finish, quantity and live exchange rates. Any formal quotation we issue is valid for the period stated on it and is the binding price basis. Orders are subject to stock confirmation at time of dispatch.'],
  },
  {
    h: 'Use of the website',
    p: ['You may browse, print and share content for personal and project-evaluation purposes. Scraping product data, republishing our catalogue imagery commercially, or misusing enquiry forms is prohibited.'],
  },
  {
    h: 'Intellectual property',
    p: ['Brand names, logos and product marks belong to their respective owners and are used to identify the goods we distribute. Site design and written content belong to ' + site.legalName + '.'],
  },
  {
    h: 'Installation & warranty',
    p: ['Manufacturer warranty terms apply per product and are passed through in full. Installation work by our technicians carries the warranty stated on the job order. Claims require authentic purchase documentation.'],
  },
  {
    h: 'Liability',
    p: ['To the maximum extent permitted by Pakistani law, our liability for website content is limited to reissuing corrected information. Nothing in these terms limits liability for death, personal injury or fraud.'],
  },
];

export default function TermsPage() {
  return (
    <div className="container-page py-10 lg:py-14">
      <Breadcrumbs items={[{ label: 'Terms of Use', href: '/terms' }]} />
      <div className="mx-auto mt-8 max-w-3xl">
        <h1 className="font-serif text-4xl font-bold text-navy-900 text-balance">Terms of Use</h1>
        <p className="mt-3 text-sm text-navy-400">{site.name} · Last reviewed: September 2026</p>
        <p className="mt-6 rounded-2xl bg-mist p-5 text-sm leading-relaxed text-navy-600">
          <Icon name="book" className="mr-2 inline h-4 w-4 text-amber-600" />
          Plain-language terms: catalogue data is guidance, formal quotations are the binding pricing, and warranties pass through from the manufacturer.
        </p>
        {sections.map((s) => (
          <section key={s.h} className="mt-9">
            <h2 className="font-serif text-xl font-bold text-navy-900">{s.h}</h2>
            {s.p.map((para, i) => <p key={i} className="mt-3 leading-relaxed text-navy-500">{para}</p>)}
          </section>
        ))}
        <p className="mt-10 text-sm text-navy-400">
          These terms are read alongside our <Link href="/privacy" className="font-bold text-amber-600 link-underline">privacy policy</Link>. Contact: <a href={`mailto:${site.emails.general}`} className="font-bold text-amber-600 link-underline">{site.emails.general}</a>.
        </p>
      </div>
    </div>
  );
}
