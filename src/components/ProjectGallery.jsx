'use client';

import Image from 'next/image';
import { useState } from 'react';
import Icon from './Icon';

export default function ProjectGallery({ images, title }) {
  const [box, setBox] = useState(-1);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-3">
        {images.map((g, i) => (
          <button
            key={g.src}
            type="button"
            onClick={() => setBox(i)}
            className="group relative h-52 overflow-hidden rounded-2xl focus-visible:outline-amber-500"
            aria-label={`Enlarge image ${i + 1} of ${title}`}
          >
            <Image
              src={g.src}
              alt={g.alt}
              fill
              loading="lazy"
              sizes="(max-width: 640px) 100vw, 33vw"
              className="object-cover transition duration-700 group-hover:scale-105"
              onError={(e) => { e.currentTarget.style.opacity = '0.2'; }}
            />
            <span className="absolute inset-0 grid place-items-center bg-navy-950/0 text-transparent transition group-hover:bg-navy-950/40 group-hover:text-white">
              <Icon name="zoom" className="h-6 w-6" />
            </span>
          </button>
        ))}
      </div>

      {box >= 0 && (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-navy-950/90 p-6" role="dialog" aria-modal="true" aria-label={`${title} gallery`}>
          <button
            type="button"
            className="absolute left-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
            onClick={() => setBox((b) => (b - 1 + images.length) % images.length)}
            aria-label="Previous image"
          >
            <Icon name="chevron-right" className="h-5 w-5 rotate-180" />
          </button>
          <figure className="max-h-[85vh]">
            <Image src={images[box].src} alt={images[box].alt} width={1400} height={900} className="max-h-[78vh] w-auto rounded-xl object-contain" unoptimized />
            <figcaption className="mt-3 text-center text-sm text-navy-200">{images[box].alt}</figcaption>
          </figure>
          <button
            type="button"
            className="absolute right-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
            onClick={() => setBox((b) => (b + 1) % images.length)}
            aria-label="Next image"
          >
            <Icon name="chevron-right" className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => setBox(-1)}
            className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
            aria-label="Close gallery"
          >
            <Icon name="close" className="h-5 w-5" />
          </button>
        </div>
      )}
    </>
  );
}
