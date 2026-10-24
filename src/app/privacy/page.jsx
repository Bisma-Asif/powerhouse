import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import Icon from '@/components/Icon';
import { site } from '@/lib/data';

export const metadata = {
  title: 'Privacy Policy',
  description: 'How Powerhouse Building Solutions collects, uses and protects personal data submitted through enquiry and quote forms on this website.',
  alternates: { canonical: '/privacy' },
};

const sections = [
  {
    h: 'What we collect',
    p: ['Enquiry and quote forms on this website collect only what you type into them: your name, company (optional), phone, email, enquiry type and message. Your quote list is stored in your own browser (localStorage) and is only transmitted to us when you choose to send it.', 'Newsletter signups collect your email address for the sole purpose of sending the newsletter.'],
  },
  {
    h: 'How we use it',
    p: ['Your details are used to answer your enquiry, prepare quotations, and support projects you have engaged us on. We do not sell, rent or trade personal information. Communications are limited to your enquiry, related project matters and (with consent) our newsletter, which you can exit at any time.'],
  },
  {
    h: 'Hosting & third parties',
    p: ['This site is hosted on Vercel, which may log standard technical data such as IP address and request metadata for security and performance. Embedded Google Maps loads map tiles from Google under its own policy. No tracking pixels or advertising networks are used.'],
  },
  {
    h: 'Retention',
    p: ['Enquiry emails and quotations are retained on our business systems for as long as needed for the engagement and statutory record-keeping, then archived. Browser-stored quote lists remain on your device until you clear them or submit the request.'],
  },
  {
    h: 'Your rights',
    p: ['You may request a copy, correction or deletion of any personal data we hold about you by emailing ' + site.emails.general + '. We respond within 14 days.'],
  },
  {
    h: 'Security',
    p: ['Data travels over TLS/HTTPS. Internal access to enquiry mailboxes is restricted to the sales and project teams who need it to answer you.'],
  },
];

export default function PrivacyPage() {
  return (
    <div className="container-page py-10 lg:py-14">
      <Breadcrumbs items={[{ label: 'Privacy Policy', href: '/privacy' }]} />
      <div className="mx-auto mt-8 max-w-3xl">
        <h1 className="font-serif text-4xl font-bold text-navy-900 text-balance">Privacy Policy</h1>
        <p className="mt-3 text-sm text-navy-400">{site.name} · Last reviewed: September 2026</p>
        <p className="mt-6 rounded-2xl bg-mist p-5 text-sm leading-relaxed text-navy-600">
          <Icon name="shield" className="mr-2 inline h-4 w-4 text-amber-600" />
          Short version: forms collect only what you enter, quote lists stay in your browser, and we never sell your data.
        </p>
        {sections.map((s) => (
          <section key={s.h} className="mt-9">
            <h2 className="font-serif text-xl font-bold text-navy-900">{s.h}</h2>
            {s.p.map((para, i) => <p key={i} className="mt-3 leading-relaxed text-navy-500">{para}</p>)}
          </section>
        ))}
        <p className="mt-10 text-sm text-navy-400">
          Questions? Write to <a href={`mailto:${site.emails.general}`} className="font-bold text-amber-600 link-underline">{site.emails.general}</a> or see our <Link href="/terms" className="font-bold text-amber-600 link-underline">terms of use</Link>.
        </p>
      </div>
    </div>
  );
}
