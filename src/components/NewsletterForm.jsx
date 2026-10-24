'use client';

import { useState } from 'react';
import Icon from './Icon';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState('idle'); // idle | error | done

  const submit = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setState('error');
      return;
    }
    setState('done');
  };

  if (state === 'done') {
    return (
      <p className="flex items-center gap-2 rounded-xl bg-navy-800 px-4 py-3 text-sm text-amber-300" role="status">
        <Icon name="check" className="h-4 w-4" /> Subscribed — welcome aboard!
      </p>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="flex gap-2">
      <div className="flex-1">
        <label htmlFor="newsletter-email" className="sr-only">Email address</label>
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => { setEmail(e.target.value); setState('idle'); }}
          placeholder="you@example.com"
          className={`w-full rounded-xl border bg-navy-900 px-4 py-2.5 text-sm text-white placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-amber-400 ${state === 'error' ? 'border-red-400' : 'border-navy-700'}`}
          aria-invalid={state === 'error'}
          aria-describedby={state === 'error' ? 'newsletter-error' : undefined}
        />
        {state === 'error' && <p id="newsletter-error" className="mt-1 text-xs text-red-300" role="alert">Please enter a valid email.</p>}
      </div>
      <button type="submit" className="btn-accent shrink-0 !px-4 !py-2.5 text-xs" aria-label="Subscribe to newsletter">
        <Icon name="arrow-right" className="h-4 w-4" />
      </button>
    </form>
  );
}
