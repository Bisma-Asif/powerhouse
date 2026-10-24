import Image from '@/components/Img';
import Link from 'next/link';
import Icon from '@/components/Icon';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import CountUp from '@/components/CountUp';
import { site, withSize } from '@/lib/data';

export const metadata = {
  title: 'About Us — Pakistan’s Electrical Super Store',
  description: 'Powerhouse Building Solutions is a novel concept of a super store for electrical and electronic products in Pakistan — genuine brands, consultative design and full installation support from Karachi and Islamabad.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="Elevating Your Lifestyle Since Day One"
        subtitle="One curated super store for electrical and electronic products in Pakistan — genuine brands, design-led advice and engineering support from drawing to commissioning."
        image="https://images.unsplash.com/photo-1497366216548-444310489f17?auto=format&fit=crop&w=1920&q=70"
        alt="Modern architectural interior"
        crumbs={[{ label: 'About', href: '/about' }]}
      />

      {/* Story */}
      <section className="container-page py-14 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <p className="eyebrow">Our Story</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-navy-900 sm:text-4xl text-balance">
              A novel concept, built to outlast the counterfeit market
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-navy-600">{site.story.intro}</p>
            {site.story.paragraphs.map((p, i) => (
              <p key={i} className="mt-4 leading-relaxed text-navy-400">{p}</p>
            ))}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/products" className="btn-primary">Explore products <Icon name="arrow-right" className="h-4 w-4" /></Link>
              <Link href="/contact" className="btn-outline">Visit a showroom</Link>
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="relative h-64 overflow-hidden rounded-2xl sm:h-72">
                <Image src="https://powerhouse.elevyndesigns.com/wp-content/themes/powerhouse/assets/images/hero_switches_luxury.jpg" alt="Luxury designer switch on a wall" fill loading="lazy" sizes="(max-width: 640px) 100vw, 50vw" className="object-cover" />
              </div>
              <div className="relative mt-6 h-64 overflow-hidden rounded-2xl sm:mt-10 sm:h-80">
                <Image src={withSize('https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=75', 900)} alt="Architectural lighting in a living space" fill loading="lazy" sizes="(max-width: 640px) 100vw, 50vw" className="object-cover" />
              </div>
            </div>
            <div className="mt-6 rounded-2xl bg-navy-950 p-7 text-white">
              <p className="font-serif text-xl font-bold text-amber-400">“{site.tagline}”</p>
              <p className="mt-2 text-sm leading-relaxed text-navy-200">
                Not just a slogan — it is the brief we give every lighting plan, every automation scene and every switch we put on a wall.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-haze bg-mist py-14" aria-label="Company statistics">
        <div className="container-page grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
          {site.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 90}>
              <p className="font-serif text-4xl font-bold text-navy-900 sm:text-5xl">
                <CountUp value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-sm font-bold uppercase tracking-widest text-amber-600">{s.label}</p>
              <p className="mt-1.5 hidden text-xs text-navy-400 sm:block">{s.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="container-page py-14 lg:py-20" aria-labelledby="process-heading">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">How We Work</p>
          <h2 id="process-heading" className="mt-3 font-serif text-3xl font-bold text-navy-900 sm:text-4xl">Plan · Select · Install · Support</h2>
          <p className="mt-4 text-navy-400">A single accountable partner across the whole electrical lifecycle of your building.</p>
        </div>
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {site.process.map((p, i) => (
            <Reveal key={p.step} delay={i * 100}>
              <li className="card h-full p-7">
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy-900 font-serif text-lg font-bold text-amber-400">{i + 1}</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-600">{p.step}</span>
                </div>
                <h3 className="mt-5 font-serif text-lg font-bold text-navy-900">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-400">{p.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Values */}
      <section className="bg-navy-950 py-14 lg:py-20" aria-labelledby="values-heading">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow justify-center !text-amber-400">What We Stand For</p>
              <h2 id="values-heading" className="mt-3 font-serif text-3xl font-bold text-white sm:text-4xl text-balance">Values that survive the site</h2>
              <p className="mt-4 leading-relaxed text-navy-200">
                Anyone can import a catalogue. Our job is the promise behind it — genuine goods, honest specification and a phone that gets answered years after handover.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:col-span-8">
              {site.values.map((v, i) => (
                <Reveal key={v.title} delay={(i % 2) * 100}>
                  <div className="h-full rounded-2xl border border-navy-800 bg-navy-900/60 p-7 transition hover:border-amber-400/50">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-amber-400 text-navy-950"><Icon name={v.icon} className="h-5 w-5" /></span>
                    <h3 className="mt-4 font-serif text-lg font-bold text-white">{v.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-navy-200">{v.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="container-page py-14 lg:py-20" aria-labelledby="team-heading">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">The People Behind Powerhouse</p>
          <h2 id="team-heading" className="mt-3 font-serif text-3xl font-bold text-navy-900 sm:text-4xl">Four teams, one accountable partner</h2>
          <p className="mt-4 text-navy-400">Designers, engineers, integrators and specifiers working as a single point of contact for your project.</p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {site.teams.map((t, i) => (
            <Reveal key={t.title} delay={i * 90}>
              <div className="card h-full p-7 text-center">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-mist text-navy-900"><Icon name={t.icon} className="h-6 w-6" /></span>
                <h3 className="mt-4 font-serif text-lg font-bold text-navy-900">{t.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-400">{t.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-page pb-16">
        <Reveal className="relative overflow-hidden rounded-3xl bg-navy-900 px-8 py-12 text-center sm:px-12">
          <h2 className="font-serif text-2xl font-bold text-white sm:text-3xl text-balance">Talk to Powerhouse about your project</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-navy-200">Send drawings, a BOQ or just an idea — our specifiers respond within one working day.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="/quote" className="btn-accent">Request a quote <Icon name="arrow-right" className="h-4 w-4" /></Link>
            <Link href="/contact" className="btn-outline !border-navy-600 !text-white hover:!bg-navy-800">Contact us</Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
