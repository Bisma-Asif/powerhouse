import Image from 'next/image';
import Breadcrumbs from './Breadcrumbs';
import { withSize } from '@/lib/data';

/** Inner-page hero: full-width image, navy wash, title + breadcrumbs. */
export default function PageHero({ title, subtitle, image, alt = '', crumbs = [], wide = false }) {
  return (
    <section className="relative overflow-hidden bg-navy-950">
      {image && (
        <Image
          src={withSize(image, wide ? 1920 : 1600)}
          alt={alt}
          fill
          priority
          sizes="100vw"
          className="h-full w-full object-cover opacity-30"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/80 to-navy-950/40" aria-hidden="true" />
      <div className="container-page relative py-16 sm:py-20 lg:py-24">
        <div className="max-w-3xl">
          <Breadcrumbs items={crumbs} />
          <h1 className="mt-4 font-serif text-4xl font-bold text-white sm:text-5xl text-balance">{title}</h1>
          {subtitle && <p className="mt-4 max-w-2xl text-base leading-relaxed text-navy-200 sm:text-lg">{subtitle}</p>}
        </div>
      </div>
    </section>
  );
}
