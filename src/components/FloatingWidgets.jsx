'use client';

import { useEffect, useState } from 'react';
import { site } from '@/lib/data';
import Icon from './Icon';

export default function FloatingWidgets() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        className={`grid h-11 w-11 place-items-center rounded-full bg-navy-900 text-white shadow-card-hover transition-all duration-300 hover:bg-navy-700 ${showTop ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-3 opacity-0'}`}
      >
        <Icon name="arrow-up" className="h-5 w-5" />
      </button>
      <a
        href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent('Hello Powerhouse, I would like to enquire about your products.')}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Powerhouse on WhatsApp"
        className="group relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-card-hover transition hover:scale-105"
      >
        <Icon name="whatsapp" className="h-7 w-7" />
        <span className="pointer-events-none absolute right-16 whitespace-nowrap rounded-lg bg-navy-950 px-3 py-1.5 text-xs text-white opacity-0 shadow transition group-hover:opacity-100">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
}
