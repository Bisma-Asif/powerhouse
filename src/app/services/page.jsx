import Link from 'next/link';
import Icon from '@/components/Icon';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import { site } from '@/lib/data';

export const metadata = {
  title: 'Services — Planning, Installation & Maintenance',
  description: 'Powerhouse Building Solutions plans and designs electrical and lighting layouts, installs and commissions wiring, automation, security and AV systems, and maintains them long after handover.',
  alternates: { canonical: '/services' },
};

const PROCESS_ICONS = { Plan: 'book', Select: 'filter', Install: 'tools', Support: 'shield' };

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Services, End to End"
        subtitle="Planning and design, installation and wiring, maintenance and support — one accountable partner from first drawing to annual health check."
        image="https://images.unsplash.com/photo-1581094794392-952664072269?auto=format&fit=crop&w=1920&q=70"
        alt="Engineer installing electrical equipment"
        crumbs={[{ label: 'Services', href: '/services' }]}
      />

      {/* Three core services */}
      <section className="container-page py-14 lg:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">What We Do</p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-navy-900 sm:text-4xl">Three services, one promise</h2>
          <p className="mt-4 text-navy-400">Specify with us, build with us, or maintain with us — most clients do all three.</p>
        </div>

        <div className="mt-12 space-y-10">
          {site.services.map((s, i) => (
            <Reveal key={s.id} delay={40}>
              <article id={s.id} className={`card scroll-mt-36 grid gap-8 p-8 lg:grid-cols-12 lg:p-10 ${i % 2 === 1 ? 'lg:bg-mist' : ''}`}>
                <div className="lg:col-span-5">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-navy-900 text-amber-400"><Icon name={s.icon} className="h-6 w-6" /></span>
                  <p className="mt-5 font-serif text-sm font-bold uppercase tracking-widest text-amber-600">Service 0{i + 1}</p>
                  <h3 className="mt-1 font-serif text-2xl font-bold text-navy-900 sm:text-3xl">{s.title}</h3>
                  <p className="mt-2 text-navy-500">{s.tagline}</p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link href="/quote" className="btn-primary !py-2.5 text-sm">Get this service <Icon name="arrow-right" className="h-4 w-4" /></Link>
                    <Link href="/contact" className="btn-outline !py-2.5 text-sm">Ask a question</Link>
                  </div>
                </div>
                <div className="lg:col-span-7">
                  <p className="leading-relaxed text-navy-500">{s.text}</p>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 rounded-xl border border-haze bg-paper px-4 py-3 text-sm font-medium text-navy-700">
                        <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" /> {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Delivery process strip */}
      <section className="border-y border-haze bg-mist py-14 lg:py-16" aria-labelledby="delivery-heading">
        <div className="container-page">
          <h2 id="delivery-heading" className="text-center font-serif text-2xl font-bold text-navy-900 sm:text-3xl">How every engagement runs</h2>
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {site.process.map((p, i) => (
              <Reveal key={p.step} delay={i * 90}>
                <li className="relative rounded-2xl border border-haze bg-paper p-6">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-400 text-navy-950"><Icon name={PROCESS_ICONS[p.step] || 'spark'} className="h-5 w-5" /></span>
                  <h3 className="mt-4 font-serif text-lg font-bold text-navy-900">{p.step}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-navy-400">{p.text}</p>
                  {i < site.process.length - 1 && (
                    <Icon name="chevron-right" className="absolute -right-3.5 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-navy-300 lg:block" />
                  )}
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Who we serve */}
      <section className="container-page py-14 lg:py-20" aria-labelledby="audience-heading">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">Who We Serve</p>
            <h2 id="audience-heading" className="mt-3 font-serif text-3xl font-bold text-navy-900 sm:text-4xl text-balance">From a single apartment to an industrial plant</h2>
            <p className="mt-4 leading-relaxed text-navy-400">
              Architects and interior designers get lux-planned lighting and authentic products for their specifications. Homeowners get a showroom experience and crews who leave the site clean. Facility teams get spares, documentation and support contracts that actually renew.
            </p>
            <Link href="/projects" className="btn-accent mt-6">See project work <Icon name="arrow-right" className="h-4 w-4" /></Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
            {[
              { icon: 'building', title: 'Residential & Towers', text: 'Apartments, villas and gated communities — smart switching, lighting scenes and whole-home automation.' },
              { icon: 'bulb', title: 'Hospitality & Retail', text: 'Hotels, restaurants and showrooms — ambience-led lighting with DALI control and AV zoning.' },
              { icon: 'bolt', title: 'Commercial Offices', text: 'Fit-outs, panel boards, energy-metered circuits and meeting-room AV/automation.' },
              { icon: 'shield', title: 'Industrial & Switchgear', text: 'MCC/metalclad work, motor control, surge protection and site safety systems.' },
            ].map((a) => (
              <div key={a.title} className="card p-6 transition hover:shadow-card-hover">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-mist text-navy-900"><Icon name={a.icon} className="h-5 w-5" /></span>
                <h3 className="mt-4 font-serif text-lg font-bold text-navy-900">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-400">{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
