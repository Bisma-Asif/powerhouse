'use client';

import Image from 'next/image';
import Link from 'next/link';
import Icon from './Icon';
import { useQuote } from './QuoteProvider';
import { getCategory } from '@/lib/data';

export default function ProductCard({ product }) {
  const { add, has, mounted } = useQuote();
  const cat = getCategory(product.category);
  const inList = mounted && has(product.slug);

  return (
    <article className="card-hover group flex flex-col overflow-hidden">
      <Link href={`/product/${product.slug}`} className="relative block aspect-square overflow-hidden bg-mist" aria-label={product.name}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => { e.currentTarget.style.opacity = '0.15'; }}
        />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-amber-400 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-navy-950">
            {product.badge}
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-amber-600">{product.brand}</p>
        <h3 className="mt-1.5 text-[15px] font-bold leading-snug text-navy-900">
          <Link href={`/product/${product.slug}`} className="hover:text-navy-600 transition">{product.name}</Link>
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-navy-400">{product.short}</p>
        {cat && <p className="mt-3 text-xs text-navy-300">{cat.name}</p>}
        <div className="mt-4 flex items-center gap-2">
          <button
            type="button"
            onClick={() => add(product)}
            className={`btn flex-1 !px-3 !py-2 text-xs ${inList ? 'border border-amber-400 bg-amber-50 text-amber-700' : 'bg-navy-900 text-white hover:bg-navy-700'}`}
            aria-label={`Add ${product.name} to quote list`}
          >
            <Icon name={inList ? 'check' : 'cart'} className="h-4 w-4" />
            {inList ? 'In quote list' : 'Add to Quote'}
          </button>
          <Link
            href={`/product/${product.slug}`}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-haze text-navy-500 transition hover:border-navy-900 hover:bg-navy-900 hover:text-white"
            aria-label={`View details of ${product.name}`}
          >
            <Icon name="arrow-right" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
