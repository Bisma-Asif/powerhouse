'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Icon from './Icon';
import { useQuote } from './QuoteProvider';

const Cities = ['Karachi', 'Lahore', 'Islamabad / Rawalpindi', 'Hyderabad', 'Multan', 'Peshawar', 'Quetta', 'Sialkot / Gujranwala', 'Other (mention in notes)'];

const inputCls = (err) =>
  `w-full rounded-xl border bg-paper px-4 py-3 text-sm text-navy-900 outline-none transition placeholder:text-navy-300 focus:ring-2 focus:ring-amber-400/60 ${err ? 'border-red-500' : 'border-haze focus:border-navy-400'}`;

export default function QuoteCart() {
  const { items, count, mounted, setQty, remove, clear } = useQuote();
  const [form, setForm] = useState({ name: '', company: '', phone: '', email: '', city: '', notes: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent

  const set = (k) => (ev) => {
    setForm((f) => ({ ...f, [k]: ev.target.value }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const totalUnits = items.reduce((n, it) => n + it.qty, 0);

  function buildListText() {
    const lines = [
      'QUOTE REQUEST — Powerhouse Building Solutions',
      `Generated: ${new Date().toLocaleString()}`,
      '',
      `Name:    ${form.name}`,
      `Company: ${form.company || '—'}`,
      `Phone:   ${form.phone}`,
      `Email:   ${form.email}`,
      `City:    ${form.city}`,
      '',
      'ITEMS',
      ...items.map((it, i) => `${i + 1}. ${it.name} — ${it.brand} [${it.category}${it.subcategory ? ` / ${it.subcategory}` : ''}] × ${it.qty}`),
      '',
      `Total line items: ${items.length} · Total units: ${totalUnits}`,
      '',
      'NOTES / PROJECT DETAIL:',
      form.notes || '—',
    ];
    return lines.join('\n');
  }

  function onSubmit(ev) {
    ev.preventDefault();
    const e = {};
    if (!form.name.trim()) e.name = 'Required.';
    if (!form.phone.trim()) e.phone = 'Required.';
    else if (!/^[+0-9()\-\s]{7,20}$/.test(form.phone.trim())) e.phone = 'Invalid phone.';
    if (!form.email.trim()) e.email = 'Required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) e.email = 'Invalid email.';
    if (!form.city) e.city = 'Select a delivery city.';
    setErrors(e);
    if (Object.keys(e).length || items.length === 0) return;
    setStatus('sending');
    setTimeout(() => setStatus('sent'), 700);
  }

  function downloadList() {
    const blob = new Blob([buildListText()], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'powerhouse-quote-request.txt';
    a.click();
    URL.revokeObjectURL(url);
  }

  const mailto = `mailto:info@powerhouse.com.pk?subject=${encodeURIComponent(`Quote request — ${count} item${count === 1 ? '' : 's'} — ${form.name}`)}&body=${encodeURIComponent(buildListText())}`;

  if (!mounted) {
    return (
      <div className="container-page grid gap-10 py-14 lg:grid-cols-12" aria-busy="true">
        <div className="space-y-4 lg:col-span-7">
          {[0, 1, 2].map((i) => <div key={i} className="h-28 animate-pulse rounded-2xl bg-mist" />)}
        </div>
        <div className="lg:col-span-5"><div className="h-64 animate-pulse rounded-2xl bg-mist" /></div>
      </div>
    );
  }

  if (status === 'sent') {
    return (
      <div className="container-page py-20">
        <div className="card mx-auto max-w-2xl p-10 text-center" role="status" aria-live="polite">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-green-100 text-green-700"><Icon name="check" className="h-7 w-7" /></span>
          <h2 className="mt-5 font-serif text-2xl font-bold text-navy-900">Quote request prepared, {form.name.split(' ')[0]}!</h2>
          <p className="mx-auto mt-3 text-sm leading-relaxed text-navy-400">
            This site is static, so to guarantee delivery complete the hand-off: email the request to <span className="font-bold text-navy-700">info@powerhouse.com.pk</span> with one click, and keep a copy for your records. Our team returns formal pricing within 24 working hours.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a href={mailto} className="btn-primary">Send via email <Icon name="mail" className="h-4 w-4" /></a>
            <button type="button" onClick={downloadList} className="btn-outline"><Icon name="download" className="h-4 w-4" /> Download copy (.txt)</button>
          </div>
          <div className="mt-8 border-t border-haze pt-5 text-left">
            <pre className="max-h-56 overflow-auto whitespace-pre-wrap rounded-xl bg-mist p-4 text-xs text-navy-600">{buildListText()}</pre>
          </div>
          <button type="button" className="mt-6 text-xs font-bold text-navy-400 underline-offset-4 hover:underline" onClick={() => setStatus('idle')}>← Edit request details</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-page grid gap-10 py-12 lg:grid-cols-12 lg:py-16">
      {/* Basket */}
      <div className="lg:col-span-7">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-serif text-2xl font-bold text-navy-900">Your quote list <span className="text-base font-semibold text-navy-400">({count} item{count === 1 ? '' : 's'})</span></h2>
          {items.length > 0 && (
            <button type="button" onClick={clear} className="flex items-center gap-1.5 text-xs font-bold text-navy-400 transition hover:text-red-600">
              <Icon name="trash" className="h-4 w-4" /> Clear list
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="card mt-6 p-12 text-center">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-mist text-navy-400"><Icon name="quote" className="h-7 w-7" /></span>
            <h3 className="mt-5 font-serif text-xl font-bold text-navy-900">Your quote list is empty</h3>
            <p className="mx-auto mt-2 max-w-sm text-sm text-navy-400">Browse the catalogue and press “Add to quote” on anything you need priced — no prices are shown because project pricing is personal.</p>
            <Link href="/products" className="btn-accent mt-6">Browse products <Icon name="arrow-right" className="h-4 w-4" /></Link>
          </div>
        ) : (
          <ul className="mt-6 space-y-4">
            {items.map((it) => (
              <li key={it.slug} className="card flex gap-4 p-4 sm:gap-5 sm:p-5">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-mist sm:h-24 sm:w-24">
                  <Image src={it.image} alt={it.name} fill loading="lazy" sizes="96px" className="object-cover" onError={(e) => { e.currentTarget.style.opacity = '0.15'; }} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-widest text-amber-600">{it.brand}</p>
                      <Link href={`/product/${it.slug}`} className="mt-0.5 block font-serif text-base font-bold leading-snug text-navy-900 link-underline hover:text-amber-600">{it.name}</Link>
                      <p className="mt-1 text-xs capitalize text-navy-400">{it.category?.replace(/-/g, ' ')}{it.subcategory ? ` · ${it.subcategory.replace(/-/g, ' ')}` : ''}</p>
                    </div>
                    <button type="button" onClick={() => remove(it.slug)} aria-label={`Remove ${it.name} from quote list`} className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-navy-300 transition hover:bg-red-50 hover:text-red-600">
                      <Icon name="trash" className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-3 flex items-center gap-4">
                    <div className="flex items-center rounded-full border border-haze" role="group" aria-label={`Quantity for ${it.name}`}>
                      <button type="button" onClick={() => setQty(it.slug, it.qty - 1)} disabled={it.qty <= 1} aria-label="Decrease quantity" className="grid h-9 w-9 place-items-center rounded-l-full text-navy-600 transition hover:bg-mist disabled:opacity-40"><Icon name="minus" className="h-3.5 w-3.5" /></button>
                      <span className="w-10 text-center text-sm font-bold text-navy-900" aria-live="polite">{it.qty}</span>
                      <button type="button" onClick={() => setQty(it.slug, it.qty + 1)} disabled={it.qty >= 99} aria-label="Increase quantity" className="grid h-9 w-9 place-items-center rounded-r-full text-navy-600 transition hover:bg-mist disabled:opacity-40"><Icon name="plus" className="h-3.5 w-3.5" /></button>
                    </div>
                    <span className="text-xs font-semibold text-navy-300">Price on request</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-8">
          <h2 className="font-serif text-xl font-bold text-navy-900">Keep browsing</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/products/lighting" className="btn-outline !py-2.5 text-xs">Lighting</Link>
            <Link href="/products/switches-sockets" className="btn-outline !py-2.5 text-xs">Switches & Sockets</Link>
            <Link href="/products/building-automation" className="btn-outline !py-2.5 text-xs">Automation</Link>
            <Link href="/products/industrial-switchgear" className="btn-outline !py-2.5 text-xs">Switchgear</Link>
          </div>
        </div>
      </div>

      {/* Submit form */}
      <div className="lg:col-span-5">
        <form onSubmit={onSubmit} noValidate className="card sticky top-32 p-7" aria-label="Submit quote request">
          <h2 className="font-serif text-xl font-bold text-navy-900">Request pricing</h2>
          <p className="mt-1.5 text-xs text-navy-400">We price BOQs personally — brand, finish, quantity and live rates decide the number.</p>

          <div className="mt-5 space-y-4">
            <div>
              <label htmlFor="qf-name" className="form-label">Full name <span aria-hidden="true" className="text-amber-600">*</span></label>
              <input id="qf-name" className={inputCls(errors.name)} value={form.name} onChange={set('name')} autoComplete="name" aria-invalid={!!errors.name} />
              {errors.name && <p className="mt-1 text-xs font-semibold text-red-600">{errors.name}</p>}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="qf-phone" className="form-label">Phone <span aria-hidden="true" className="text-amber-600">*</span></label>
                <input id="qf-phone" type="tel" className={inputCls(errors.phone)} value={form.phone} onChange={set('phone')} placeholder="+92 3xx xxxxxxx" autoComplete="tel" aria-invalid={!!errors.phone} />
                {errors.phone && <p className="mt-1 text-xs font-semibold text-red-600">{errors.phone}</p>}
              </div>
              <div>
                <label htmlFor="qf-email" className="form-label">Email <span aria-hidden="true" className="text-amber-600">*</span></label>
                <input id="qf-email" type="email" className={inputCls(errors.email)} value={form.email} onChange={set('email')} autoComplete="email" aria-invalid={!!errors.email} />
                {errors.email && <p className="mt-1 text-xs font-semibold text-red-600">{errors.email}</p>}
              </div>
            </div>
            <div>
              <label htmlFor="qf-company" className="form-label">Company / consultancy <span className="text-navy-300">(optional)</span></label>
              <input id="qf-company" className={inputCls()} value={form.company} onChange={set('company')} autoComplete="organization" />
            </div>
            <div>
              <label htmlFor="qf-city" className="form-label">Delivery city <span aria-hidden="true" className="text-amber-600">*</span></label>
              <select id="qf-city" className={inputCls(errors.city)} value={form.city} onChange={set('city')} aria-invalid={!!errors.city}>
                <option value="">Select…</option>
                {Cities.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              {errors.city && <p className="mt-1 text-xs font-semibold text-red-600">{errors.city}</p>}
            </div>
            <div>
              <label htmlFor="qf-notes" className="form-label">Project detail / notes</label>
              <textarea id="qf-notes" rows={4} className={inputCls()} value={form.notes} onChange={set('notes')} placeholder="Project name, timeline, floor counts, site location…" />
            </div>
          </div>

          <dl className="mt-6 space-y-2 rounded-xl bg-mist p-4 text-sm">
            <div className="flex justify-between"><dt className="text-navy-500">Line items</dt><dd className="font-bold text-navy-900">{items.length}</dd></div>
            <div className="flex justify-between"><dt className="text-navy-500">Total units</dt><dd className="font-bold text-navy-900">{totalUnits}</dd></div>
            <div className="flex justify-between border-t border-haze pt-2"><dt className="text-navy-500">Pricing</dt><dd className="font-bold text-amber-700">On request</dd></div>
          </dl>

          <button type="submit" disabled={items.length === 0 || status === 'sending'} className="btn-accent mt-5 w-full disabled:cursor-not-allowed disabled:opacity-50">
            {status === 'sending' ? 'Preparing…' : <>Submit quote request <Icon name="arrow-right" className="h-4 w-4" /></>}
          </button>
          {items.length === 0 && <p className="mt-3 text-center text-xs font-semibold text-red-600">Add at least one product to submit a request.</p>}
          <p className="mt-3 text-center text-[11px] text-navy-300">By submitting you agree to be contacted about this enquiry. No spam, ever.</p>
        </form>
      </div>
    </div>
  );
}
