'use client';

import { useState } from 'react';
import Icon from './Icon';

/** Accessible FAQ accordion (details-style, keyboard friendly). */
export default function FaqAccordion({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="divide-y divide-haze overflow-hidden rounded-2xl border border-haze bg-paper">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q}>
            <h3>
              <button
                type="button"
                id={`faq-btn-${i}`}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-sm font-bold text-navy-900 transition hover:bg-mist sm:text-base"
              >
                {f.q}
                <Icon name="chevron-down" className={`h-4 w-4 shrink-0 text-amber-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
              </button>
            </h3>
            <div
              id={`faq-panel-${i}`}
              role="region"
              aria-labelledby={`faq-btn-${i}`}
              className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-6 text-sm leading-relaxed text-navy-400">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
