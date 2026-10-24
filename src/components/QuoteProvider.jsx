'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'ph-quote-v1';
const QuoteCtx = createContext(null);

export function QuoteProvider({ children }) {
  const [items, setItems] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      } catch {}
    }
  }, [items, mounted]);

  const add = useCallback((product, qty = 1) => {
    setItems((prev) => {
      const found = prev.find((i) => i.slug === product.slug);
      if (found) return prev.map((i) => (i.slug === product.slug ? { ...i, qty: Math.min(99, i.qty + qty) } : i));
      return [
        ...prev,
        {
          slug: product.slug,
          name: product.name,
          brand: product.brand,
          image: product.image,
          category: product.category,
          subcategory: product.subcategory,
          qty,
        },
      ];
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  }, []);

  const setQty = useCallback((slug, qty) => {
    setItems((prev) => prev.map((i) => (i.slug === slug ? { ...i, qty: Math.max(1, Math.min(99, qty)) } : i)));
  }, []);

  const remove = useCallback((slug) => setItems((prev) => prev.filter((i) => i.slug !== slug)), []);
  const clear = useCallback(() => setItems([]), []);

  const count = useMemo(() => items.reduce((s, i) => s + i.qty, 0), [items]);
  const has = useCallback((slug) => items.some((i) => i.slug === slug), [items]);

  return (
    <QuoteCtx.Provider value={{ items, count, mounted, justAdded, add, setQty, remove, clear, has }}>
      {children}
    </QuoteCtx.Provider>
  );
}

export function useQuote() {
  const ctx = useContext(QuoteCtx);
  if (!ctx) throw new Error('useQuote must be used inside QuoteProvider');
  return ctx;
}
