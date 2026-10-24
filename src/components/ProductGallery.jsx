'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import Icon from './Icon';
import { withSize } from '@/lib/data';

export default function ProductGallery({ images, name }) {
  const [idx, setIdx] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState('50% 50%');
  const [lightbox, setLightbox] = useState(false);
  const frameRef = useRef(null);

  const onMove = (e) => {
    const rect = frameRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin(`${x}% ${y}%`);
  };

  return (
    <div>
      <div
        ref={frameRef}
        className="card group relative aspect-square cursor-zoom-in overflow-hidden !rounded-2xl bg-mist"
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
        onMouseMove={onMove}
        onClick={() => setLightbox(true)}
        role="button"
        tabIndex={0}
        aria-label={`Zoom image of ${name}`}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setLightbox(true)}
      >
        <Image
          key={idx}
          src={withSize(images[idx], 1200)}
          alt={`${name} — view ${idx + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 45vw"
          className="object-cover transition-transform duration-200"
          style={zoom ? { transform: 'scale(1.9)', transformOrigin: origin } : undefined}
          onError={(e) => { e.currentTarget.style.opacity = '0.15'; }}
        />
        <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/85 text-navy-700 opacity-0 shadow transition group-hover:opacity-100">
          <Icon name="zoom" className="h-4 w-4" />
        </span>
      </div>

      {images.length > 1 && (
        <div className="mt-4 flex gap-3" role="listbox" aria-label="Product images">
          {images.map((src, i) => (
            <button
              key={src + i}
              type="button"
              role="option"
              aria-selected={i === idx}
              onClick={() => setIdx(i)}
              className={`relative h-20 w-20 overflow-hidden rounded-xl border-2 transition ${i === idx ? 'border-amber-400' : 'border-transparent opacity-70 hover:opacity-100'}`}
            >
              <Image src={withSize(src, 200)} alt="" fill loading="lazy" sizes="80px" className="object-cover" onError={(e) => { e.currentTarget.style.opacity = '0.15'; }} />
            </button>
          ))}
        </div>
      )}

      {lightbox && (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-navy-950/90 p-6" role="dialog" aria-modal="true" aria-label={name}>
          <button type="button" onClick={() => setLightbox(false)} className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20" aria-label="Close zoom view">
            <Icon name="close" className="h-5 w-5" />
          </button>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image src={withSize(images[idx], 1600)} alt={name} width={1200} height={1200} className="max-h-[85vh] w-auto rounded-2xl object-contain" unoptimized />
        </div>
      )}
    </div>
  );
}
