'use client';

import { useState } from 'react';
import Link from 'next/link';
import Icon from './Icon';
import { useQuote } from './QuoteProvider';

export default function PurchasePanel({ product }) {
  const { add } = useQuote();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    add(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  const downloadSpec = () => {
    const lines = [
      `POWERHOUSE BUILDING SOLUTIONS — SPECIFICATION SHEET`,
      ``,
      `Product : ${product.name}`,
      `Brand   : ${product.brand}`,
      `Category: ${product.category}`,
      `Sub-cat : ${product.subcategory}`,
      ``,
      `TECHNICAL SPECIFICATIONS`,
      ...Object.entries(product.specs).map(([k, v]) => `  ${k.padEnd(16)}: ${v}`),
      ``,
      `Description`,
      product.desc,
      ``,
      `Contact: info@powerhouse.com.pk · +92 21 111 509 509 · powerhouse.com.pk`,
    ].join('\n');
    const blob = new Blob([lines], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${product.slug}-spec-sheet.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-6 space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center rounded-full border border-haze" aria-label="Quantity">
          <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-11 w-11 place-items-center text-navy-600 hover:text-navy-900" aria-label="Decrease quantity">
            <Icon name="minus" className="h-4 w-4" />
          </button>
          <span className="w-10 text-center text-sm font-bold tabular-nums text-navy-900" aria-live="polite">{qty}</span>
          <button type="button" onClick={() => setQty((q) => Math.min(99, q + 1))} className="grid h-11 w-11 place-items-center text-navy-600 hover:text-navy-900" aria-label="Increase quantity">
            <Icon name="plus" className="h-4 w-4" />
          </button>
        </div>
        <button type="button" onClick={handleAdd} className={`btn flex-1 !py-3 sm:flex-none sm:!px-8 ${added ? 'border border-amber-400 bg-amber-50 text-amber-700' : 'btn-accent'}`}>
          <Icon name={added ? 'check' : 'cart'} className="h-4 w-4" />
          {added ? 'Added to quote list' : 'Add to Quote'}
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={downloadSpec} className="btn-outline !py-2.5 text-xs">
          <Icon name="download" className="h-4 w-4" /> Spec sheet / datasheet
        </button>
        <Link href="/quote" className="btn-outline !py-2.5 text-xs">
          <Icon name="quote" className="h-4 w-4" /> View quote list
        </Link>
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-xs text-navy-400">
        <span className="flex items-center gap-1.5"><Icon name="shield" className="h-4 w-4 text-amber-500" /> Factory-certified genuine import</span>
        <span className="flex items-center gap-1.5"><Icon name="clock" className="h-4 w-4 text-amber-500" /> Priced quotation within 24 hours</span>
        <span className="flex items-center gap-1.5"><Icon name="tools" className="h-4 w-4 text-amber-500" /> Installation support available</span>
      </div>
      <p className="rounded-xl bg-mist px-4 py-3 text-sm text-navy-500">
        Price on request — final pricing depends on finish, quantity and current rates. Add to your quote list for a formal BOQ.
      </p>
    </div>
  );
}
