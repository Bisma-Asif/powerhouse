'use client';

import { useEffect, useState } from 'react';
import Icon from './Icon';

export default function TestimonialSlider({ items }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % items.length), 7000);
    return () => clearInterval(t);
  }, [items.length]);

  return (
    <div className="relative" onMouseEnter={() => undefined}>
      <div className="overflow-hidden">
        <div className="flex transition-transform duration-700 ease-out" style={{ transform: `translateX(-${idx * 100}%)` }}>
          {items.map((t, i) => (
            <figure key={t.name} className="w-full shrink-0 px-1" aria-hidden={i !== idx}>
              <div className="card mx-auto max-w-3xl p-8 sm:p-10 text-center">
                <div className="flex justify-center gap-1 text-amber-400" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Icon key={s} name="star" className={`h-4 w-4 ${s < t.rating ? '' : 'text-haze'}`} filled />
                  ))}
                </div>
                <blockquote className="mt-5 font-serif text-xl leading-relaxed text-navy-800 sm:text-2xl text-balance">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 text-sm">
                  <span className="font-bold text-navy-900">{t.name}</span>
                  <span className="mx-2 text-navy-300">·</span>
                  <span className="text-navy-400">{t.role}</span>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>
      <div className="mt-7 flex items-center justify-center gap-2.5">
        {items.map((t, i) => (
          <button
            key={t.name}
            onClick={() => setIdx(i)}
            aria-label={`Show testimonial from ${t.name}`}
            aria-current={i === idx}
            className={`h-2.5 rounded-full transition-all duration-300 ${i === idx ? 'w-8 bg-amber-400' : 'w-2.5 bg-navy-200 hover:bg-navy-300'}`}
          />
        ))}
      </div>
    </div>
  );
}
