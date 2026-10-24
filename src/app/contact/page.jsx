import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import ContactForm from '@/components/ContactForm';
import FaqAccordion from '@/components/FaqAccordion';
import Icon from '@/components/Icon';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import { faqs, site } from '@/lib/data';

export const metadata = {
  title: 'Contact — Karachi & Islamabad Offices, Showroom',
  description: 'Contact Powerhouse Building Solutions: head office at The Forum Clifton Karachi, exclusive showroom at Bukhari Commercial DHA Phase VI, and Islamabad office on Golra Road. Phone, email, hours, map and FAQ.',
  alternates: { canonical: '/contact' },
};

const TYPE_LABEL = { headquarters: 'Head Office', showroom: 'Showroom', office: 'Office' };

export default function ContactPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Powerhouse Building Solutions',
    url: `${site.domain}/contact`,
    description: 'Addresses, phone numbers, working hours and enquiry form for Powerhouse Building Solutions Pakistan.',
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        title="Talk to Powerhouse"
        subtitle="Three locations across Karachi and Islamabad, phones answered by engineers during working hours, and a reply to every web enquiry within one working day."
        image="https://images.unsplash.com/photo-1497366811353-9140558a4a8c?auto=format&fit=crop&w=1920&q=70"
        alt="Powerhouse head office"
        crumbs={[{ label: 'Contact', href: '/contact' }]}
      />

      <div className="container-page py-12 lg:py-16">
        <Breadcrumbs items={[{ label: 'Contact', href: '/contact' }]} />

        {/* Quick contact strip */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: 'phone', label: 'Call Head Office', value: site.locations[0].phone, href: `tel:${site.locations[0].phoneHref}` },
            { icon: 'mail', label: 'Email Us', value: site.emails.general, href: `mailto:${site.emails.general}` },
            { icon: 'clock', label: 'Working Hours', value: 'Mon–Fri 8AM–8PM · Sat–Sun 10AM–2PM' },
            { icon: 'whatsapp', label: 'WhatsApp', value: 'Message us', href: `https://wa.me/${site.whatsapp}` },
          ].map((c) => (
            <Reveal key={c.label}>
              <div className="card h-full p-5">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-mist text-navy-900"><Icon name={c.icon} className="h-5 w-5" /></span>
                <p className="mt-3 text-xs font-bold uppercase tracking-widest text-navy-400">{c.label}</p>
                {c.href ? (
                  <a href={c.href} className="mt-1 block text-sm font-bold text-navy-900 link-underline hover:text-amber-600" {...(c.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{c.value}</a>
                ) : (
                  <p className="mt-1 text-sm font-bold text-navy-900">{c.value}</p>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        {/* Form + locations */}
        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="font-serif text-2xl font-bold text-navy-900 sm:text-3xl">Send an enquiry</h2>
            <p className="mt-2 text-sm text-navy-400">Fields marked with <span className="font-bold text-amber-600">*</span> are required.</p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>

          <div className="lg:col-span-5">
            <h2 className="font-serif text-2xl font-bold text-navy-900 sm:text-3xl">Visit us</h2>
            <div className="mt-6 space-y-5">
              {site.locations.map((l, i) => (
                <Reveal key={l.type} delay={i * 80}>
                  <article className="card p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-widest text-amber-600">{TYPE_LABEL[l.type]}</p>
                        <h3 className="mt-1 font-serif text-lg font-bold text-navy-900">{l.name}</h3>
                      </div>
                      <Icon name="pinOuter" className="h-5 w-5 shrink-0 text-navy-300" />
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-navy-500">{l.address}</p>
                    <ul className="mt-4 space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <Icon name="phone" className="h-4 w-4 text-amber-600" />
                        <a href={`tel:${l.phoneHref}`} className="font-semibold text-navy-800 hover:text-amber-600">{l.phone}</a>
                      </li>
                      <li className="flex items-center gap-2">
                        <Icon name="mail" className="h-4 w-4 text-amber-600" />
                        <a href={`mailto:${l.email}`} className="text-navy-600 hover:text-amber-600">{l.email}</a>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="clock" className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                        <span className="text-navy-500">{l.hours}</span>
                      </li>
                    </ul>
                  </article>
                </Reveal>
              ))}
            </div>

            {/* Map: showroom */}
            <Reveal className="card mt-5 overflow-hidden">
              <div className="border-b border-haze px-6 py-4">
                <h3 className="flex items-center gap-2 font-serif text-base font-bold text-navy-900">
                  <Icon name="pinOuter" className="h-4 w-4 text-amber-600" /> Showroom location — DHA Phase VI, Karachi
                </h3>
              </div>
              <iframe
                title="Map showing Powerhouse showroom at Bukhari Commercial, Phase VI DHA, Karachi"
                src={`https://www.google.com/maps?q=${encodeURIComponent(site.locations[1].mapQuery)}&output=embed`}
                className="block h-72 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </Reveal>
          </div>
        </div>

        {/* FAQ */}
        <section className="mt-16 lg:mt-20" aria-labelledby="faq-heading">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow justify-center">Before You Call</p>
            <h2 id="faq-heading" className="mt-3 font-serif text-3xl font-bold text-navy-900 sm:text-4xl">Frequently asked questions</h2>
            <p className="mt-3 text-navy-400">Straight answers about authenticity, quotations, installation and delivery.</p>
          </div>
          <div className="mx-auto mt-10 max-w-3xl">
            <FaqAccordion items={faqs} />
          </div>
          <p className="mt-6 text-center text-sm text-navy-400">
            Still unresolved? <Link href="/quote" className="font-bold text-amber-600 link-underline">Build a quote list</Link> and we will price it.
          </p>
        </section>
      </div>
    </>
  );
}
