'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import Icon from './Icon';
import Reveal from './Reveal';
import { projects, withSize } from '@/lib/data';

const sectors = [
  { id: 'all', label: 'All Projects' },
  { id: 'residential', label: 'Residential' },
  { id: 'hospitality', label: 'Hospitality' },
  { id: 'commercial', label: 'Commercial' },
  { id: 'industrial', label: 'Industrial' },
];

export default function ProjectExplorer() {
  const [sector, setSector] = useState('all');
  const list = useMemo(() => (sector === 'all' ? projects : projects.filter((p) => p.sector === sector)), [sector]);

  return (
    <section className="container-page py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Project sectors">
          {sectors.map((s) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={sector === s.id}
              onClick={() => setSector(s.id)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${sector === s.id ? 'bg-navy-900 text-white shadow' : 'border border-haze text-navy-600 hover:border-navy-900'}`}
            >
              {s.label}
            </button>
          ))}
        </div>
        <p className="text-sm text-navy-400">{list.length} case {list.length === 1 ? 'study' : 'studies'}</p>
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {list.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 2) * 100}>
            <Link href={`/projects/${p.slug}`} className="card-hover group block overflow-hidden">
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={withSize(p.image, 1200)}
                  alt={p.title}
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                  onError={(e) => { e.currentTarget.style.opacity = '0.2'; }}
                />
                <span className="absolute left-4 top-4 rounded-full bg-navy-950/80 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-300 backdrop-blur">
                  {p.sector}
                </span>
                <span className="absolute right-4 top-4 rounded-full bg-white/85 px-3.5 py-1.5 text-[11px] font-bold text-navy-800 backdrop-blur">{p.year}</span>
              </div>
              <div className="p-6">
                <h2 className="font-serif text-xl font-bold text-navy-900 transition group-hover:text-navy-600">{p.title}</h2>
                <p className="mt-1.5 text-xs font-semibold uppercase tracking-wide text-amber-600">{p.location}</p>
                <p className="mt-3 text-sm leading-relaxed text-navy-400">{p.summary}</p>
                <p className="mt-4 flex items-center gap-1.5 text-sm font-bold text-navy-900">
                  Read case dossier <Icon name="arrow-right" className="h-4 w-4 transition group-hover:translate-x-1" />
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
