import Image from '@/components/Img';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import Icon from '@/components/Icon';
import Reveal from '@/components/Reveal';
import { posts } from '@/lib/data';

export const metadata = {
  title: 'News & Guides — Powerhouse Journal',
  description: 'Buying guides and technical notes from Powerhouse Building Solutions: switchline selection, layered lighting design, KNX vs Zigbee vs Wi-Fi, spotting counterfeit electricals, GRMS ROI and structured cabling audits.',
  alternates: { canonical: '/news' },
};

function fmtDate(iso) {
  return new Date(iso).toLocaleDateString('en-PK', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function NewsPage() {
  const [lead, ...rest] = posts;
  return (
    <div className="container-page py-10 lg:py-14">
      <Breadcrumbs items={[{ label: 'News', href: '/news' }]} />
      <div className="mt-6 max-w-2xl">
        <p className="eyebrow">Powerhouse Journal</p>
        <h1 className="mt-3 font-serif text-4xl font-bold text-navy-900 sm:text-5xl text-balance">News & Guides</h1>
        <p className="mt-4 text-navy-400">Practical specification knowledge from our design studio and site engineers — no fluff, written for people who build.</p>
      </div>

      {/* Lead article */}
      <Reveal className="mt-10">
        <Link href={`/news/${lead.slug}`} className="card-hover group grid overflow-hidden rounded-2xl lg:grid-cols-2">
          <div className="relative h-64 overflow-hidden lg:h-full">
            <Image src={lead.image} alt={lead.title} fill loading="lazy" sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover transition duration-700 group-hover:scale-105" />
            <span className="absolute left-4 top-4 rounded-full bg-amber-400 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-navy-950">{lead.category}</span>
          </div>
          <div className="flex flex-col justify-center p-8 lg:p-12">
            <p className="text-xs font-semibold text-navy-400">{fmtDate(lead.date)} · {lead.read}</p>
            <h2 className="mt-3 font-serif text-2xl font-bold text-navy-900 text-balance sm:text-3xl group-hover:text-amber-600">{lead.title}</h2>
            <p className="mt-4 leading-relaxed text-navy-500">{lead.excerpt}</p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-amber-600">Read article <Icon name="arrow-right" className="h-4 w-4 transition group-hover:translate-x-1" /></span>
          </div>
        </Link>
      </Reveal>

      {/* Grid */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 3) * 90}>
            <Link href={`/news/${p.slug}`} className="card-hover group flex h-full flex-col overflow-hidden rounded-2xl">
              <div className="relative h-48 overflow-hidden">
                <Image src={p.image} alt={p.title} fill loading="lazy" sizes="(max-width: 640px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" />
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-navy-800">{p.category}</span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs text-navy-400">{fmtDate(p.date)} · {p.read}</p>
                <h2 className="mt-2 font-serif text-lg font-bold leading-snug text-navy-900 group-hover:text-amber-600">{p.title}</h2>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-navy-400">{p.excerpt}</p>
                <span className="mt-auto pt-4 inline-flex items-center gap-1.5 text-xs font-bold text-amber-600">Read <Icon name="arrow-right" className="h-3.5 w-3.5 transition group-hover:translate-x-1" /></span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
