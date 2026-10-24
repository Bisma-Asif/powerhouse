import Breadcrumbs from '@/components/Breadcrumbs';
import Icon from '@/components/Icon';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import { jobs, site } from '@/lib/data';

export const metadata = {
  title: 'Careers — Join Powerhouse',
  description: 'Current openings at Powerhouse Building Solutions Pakistan: electrical design engineers, automation commissioning, showroom consultants, warehouse operations and site supervision in Karachi and Islamabad.',
  alternates: { canonical: '/careers' },
};

function fmtDate(iso) {
  return new Date(iso).toLocaleDateString('en-PK', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function CareersPage() {
  return (
    <>
      <PageHero
        title="Careers at Powerhouse"
        subtitle="Designers, engineers, integrators and organizers — build the country's best address for electrical products, one genuine brand at a time."
        image="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1920&q=70"
        alt="The Powerhouse team"
        crumbs={[{ label: 'Careers', href: '/careers' }]}
      />

      <div className="container-page py-12 lg:py-16">
        <Breadcrumbs items={[{ label: 'Careers', href: '/careers' }]} />

        <div className="mt-8 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h2 className="font-serif text-2xl font-bold text-navy-900 sm:text-3xl">Current openings <span className="text-base font-semibold text-navy-400">({jobs.length})</span></h2>
            <div className="mt-6 space-y-4">
              {jobs.map((j, i) => (
                <Reveal key={j.id} delay={(i % 4) * 70}>
                  <article className="card p-6 transition hover:shadow-card-hover sm:p-7">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="font-serif text-lg font-bold text-navy-900">{j.title}</h3>
                        <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-amber-600">{j.department} · {j.id}</p>
                      </div>
                      <span className="rounded-full bg-mist px-3 py-1 text-xs font-bold text-navy-600">{j.type}</span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-navy-500">{j.summary}</p>
                    <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-navy-400">
                      <span className="flex items-center gap-1.5"><Icon name="pinOuter" className="h-3.5 w-3.5 text-amber-600" /> {j.location}</span>
                      <span className="flex items-center gap-1.5"><Icon name="clock" className="h-3.5 w-3.5 text-amber-600" /> Posted {fmtDate(j.posted)}</span>
                      <a
                        href={`mailto:${site.emails.general}?subject=${encodeURIComponent(`Application — ${j.title} (${j.id})`)}`}
                        className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-navy-900 px-4 py-2 font-bold text-white transition hover:bg-navy-700"
                      >
                        Apply by email <Icon name="arrow-right" className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="card sticky top-32 space-y-6 p-7">
              <div>
                <h3 className="font-serif text-xl font-bold text-navy-900">Why Powerhouse?</h3>
                <ul className="mt-4 space-y-3 text-sm text-navy-500">
                  {[
                    'Work on the country\u2019s flagship residential, hospitality and industrial projects.',
                    'Hands-on with 100+ genuine global brands and the latest automation platforms.',
                    'Engineer-led culture — mentoring from KNX certified integrators.',
                    'Salaries reviewed against market, festival bonuses and health cover.',
                  ].map((t) => (
                    <li key={t} className="flex gap-2.5"><Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" /> {t}</li>
                  ))}
                </ul>
              </div>
              <div className="border-t border-haze pt-5">
                <h3 className="font-serif text-base font-bold text-navy-900">Don't see your role?</h3>
                <p className="mt-2 text-sm text-navy-400">We hire for attitude first. Send a CV and a note about what you want to build.</p>
                <a href={`mailto:${site.emails.general}?subject=${encodeURIComponent('General application — Powerhouse careers')}`} className="btn-outline mt-4 w-full !py-2.5 text-sm">Write to us</a>
              </div>
              <div className="rounded-xl bg-mist p-4 text-xs leading-relaxed text-navy-500">
                <Icon name="pinOuter" className="mr-1 inline h-3.5 w-3.5 text-amber-600" />
                The Forum, Clifton & Bukhari Commercial, DHA Karachi · Golra Road, Islamabad
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
