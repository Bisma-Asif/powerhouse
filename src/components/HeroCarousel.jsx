'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Icon from './Icon';
import { withSize } from '@/lib/data';

export default function HeroCarousel({ slides }) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 6500);
    return () => clearInterval(t);
  }, [slides.length, paused]);

  return (
    <section
      className="relative min-h-[540px] overflow-hidden bg-navy-950 lg:h-[640px]"
      aria-roledescription="carousel"
      aria-label="Featured solutions"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((s, i) => (
        <div
          key={s.title}
          aria-hidden={i !== idx}
          className={`absolute inset-0 transition-opacity duration-1000 ${i === idx ? 'opacity-100' : 'opacity-0'}`}
        >
          <Image
            src={withSize(s.image, 1920)}
            alt={s.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/75 to-navy-950/20" />
          <div className="container-page relative flex h-full min-h-[540px] flex-col justify-center lg:h-[640px]">
            <div className={`max-w-2xl ${i === idx ? 'animate-fade-up' : ''}`}>
              <p className="eyebrow !text-amber-300">{s.kicker}</p>
              <h1 className="mt-4 font-serif text-4xl font-bold leading-[1.08] text-white sm:text-5xl lg:text-6xl text-balance">
                {s.title}
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-navy-100 sm:text-lg">{s.text}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href={s.cta.href} className="btn-accent">{s.cta.label} <Icon name="arrow-right" className="h-4 w-4" /></Link>
                <Link href={s.cta2.href} className="btn border border-white/30 text-white hover:bg-white hover:text-navy-950">{s.cta2.label}</Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Controls */}
      <div className="container-page absolute bottom-8 left-0 right-0 z-10 flex items-center justify-between">
        <div className="flex gap-2.5" role="tablist" aria-label="Slides">
          {slides.map((s, i) => (
            <button
              key={s.title}
              role="tab"
              aria-selected={i === idx}
              aria-label={`Show slide ${i + 1}: ${s.title}`}
              onClick={() => setIdx(i)}
              className={`h-2.5 rounded-full transition-all duration-500 ${i === idx ? 'w-10 bg-amber-400' : 'w-2.5 bg-white/40 hover:bg-white/70'}`}
            />
          ))}
        </div>
        <div className="hidden gap-2 sm:flex">
          <button
            onClick={() => setIdx((i) => (i - 1 + slides.length) % slides.length)}
            aria-label="Previous slide"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/30 text-white transition hover:bg-white hover:text-navy-950"
          >
            <Icon name="chevron-right" className="h-4 w-4 rotate-180" />
          </button>
          <button
            onClick={() => setIdx((i) => (i + 1) % slides.length)}
            aria-label="Next slide"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/30 text-white transition hover:bg-white hover:text-navy-950"
          >
            <Icon name="chevron-right" className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
