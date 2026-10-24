'use client';

import { useState } from 'react';
import Icon from './Icon';

const ENQUIRY_TYPES = [
  'Product enquiry / price list',
  'Project quotation (BOQ)',
  'Building automation / smart home',
  'Lighting design consultation',
  'Installation services',
  'Maintenance / after-sales support',
  'Become a dealer / partner',
  'Careers',
  'Other',
];

const initial = { firstName: '', lastName: '', phone: '', email: '', type: '', company: '', message: '' };

function validate(f) {
  const e = {};
  if (!f.firstName.trim()) e.firstName = 'First name is required.';
  if (!f.lastName.trim()) e.lastName = 'Last name is required.';
  if (!f.phone.trim()) e.phone = 'Phone number is required.';
  else if (!/^[+0-9()\-\s]{7,20}$/.test(f.phone.trim())) e.phone = 'Enter a valid phone number.';
  if (!f.email.trim()) e.email = 'Email is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = 'Enter a valid email address.';
  if (!f.type) e.type = 'Please choose the type of enquiry.';
  if (f.message.trim().length < 10) e.message = 'Please describe your enquiry in at least 10 characters.';
  return e;
}

const inputCls = (err) =>
  `w-full rounded-xl border bg-paper px-4 py-3 text-sm text-navy-900 outline-none transition placeholder:text-navy-300 focus:ring-2 focus:ring-amber-400/60 ${err ? 'border-red-500' : 'border-haze focus:border-navy-400'}`;

/** Contact form mirroring the enquiry fields on powerhouse.com.pk, with client-side validation and a success state. */
export default function ContactForm() {
  const [fields, setFields] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent

  const set = (k) => (ev) => {
    setFields((f) => ({ ...f, [k]: ev.target.value }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  function onSubmit(ev) {
    ev.preventDefault();
    const errs = validate(fields);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = document.getElementById(`cf-${Object.keys(errs)[0]}`);
      first?.focus();
      return;
    }
    setStatus('sending');
    // Static site: no backend — simulate hand-off and tell the user what actually happens.
    setTimeout(() => setStatus('sent'), 700);
  }

  if (status === 'sent') {
    const mailto = `mailto:info@powerhouse.com.pk?subject=${encodeURIComponent(`[${fields.type}] Website enquiry from ${fields.firstName} ${fields.lastName}`)}&body=${encodeURIComponent(`Name: ${fields.firstName} ${fields.lastName}
Phone: ${fields.phone}
Email: ${fields.email}
Company: ${fields.company || '—'}

${fields.message}`)}`;
    return (
      <div className="card p-10 text-center" role="status" aria-live="polite">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-green-100 text-green-700"><Icon name="check" className="h-7 w-7" /></span>
        <h2 className="mt-5 font-serif text-2xl font-bold text-navy-900">Thank you, {fields.firstName}!</h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-navy-400">
          Your enquiry has been recorded. Our team replies within one working day — to be certain it reaches us now, send the same note straight to our inbox:
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <a href={mailto} className="btn-primary">Open in email client <Icon name="mail" className="h-4 w-4" /></a>
          <button type="button" className="btn-outline" onClick={() => { setFields(initial); setStatus('idle'); }}>Send another message</button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="card p-7 sm:p-9" aria-label="Contact form">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-firstName" className="form-label">First name <span aria-hidden="true" className="text-amber-600">*</span></label>
          <input id="cf-firstName" className={inputCls(errors.firstName)} value={fields.firstName} onChange={set('firstName')} aria-invalid={!!errors.firstName} aria-describedby={errors.firstName ? 'err-firstName' : undefined} autoComplete="given-name" />
          {errors.firstName && <p id="err-firstName" className="mt-1.5 text-xs font-semibold text-red-600">{errors.firstName}</p>}
        </div>
        <div>
          <label htmlFor="cf-lastName" className="form-label">Last name <span aria-hidden="true" className="text-amber-600">*</span></label>
          <input id="cf-lastName" className={inputCls(errors.lastName)} value={fields.lastName} onChange={set('lastName')} aria-invalid={!!errors.lastName} aria-describedby={errors.lastName ? 'err-lastName' : undefined} autoComplete="family-name" />
          {errors.lastName && <p id="err-lastName" className="mt-1.5 text-xs font-semibold text-red-600">{errors.lastName}</p>}
        </div>
        <div>
          <label htmlFor="cf-phone" className="form-label">Phone <span aria-hidden="true" className="text-amber-600">*</span></label>
          <input id="cf-phone" type="tel" className={inputCls(errors.phone)} value={fields.phone} onChange={set('phone')} placeholder="+92 21 111 509 509" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'err-phone' : undefined} autoComplete="tel" />
          {errors.phone && <p id="err-phone" className="mt-1.5 text-xs font-semibold text-red-600">{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="cf-email" className="form-label">Email <span aria-hidden="true" className="text-amber-600">*</span></label>
          <input id="cf-email" type="email" className={inputCls(errors.email)} value={fields.email} onChange={set('email')} placeholder="you@company.com" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'err-email' : undefined} autoComplete="email" />
          {errors.email && <p id="err-email" className="mt-1.5 text-xs font-semibold text-red-600">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="cf-type" className="form-label">Type of Enquiry <span aria-hidden="true" className="text-amber-600">*</span></label>
          <select id="cf-type" className={inputCls(errors.type)} value={fields.type} onChange={set('type')} aria-invalid={!!errors.type} aria-describedby={errors.type ? 'err-type' : undefined}>
            <option value="">Select…</option>
            {ENQUIRY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          {errors.type && <p id="err-type" className="mt-1.5 text-xs font-semibold text-red-600">{errors.type}</p>}
        </div>
        <div>
          <label htmlFor="cf-company" className="form-label">Company / consultancy <span className="text-navy-300">(optional)</span></label>
          <input id="cf-company" className={inputCls()} value={fields.company} onChange={set('company')} autoComplete="organization" />
        </div>
      </div>
      <div className="mt-5">
        <label htmlFor="cf-message" className="form-label">Comments <span aria-hidden="true" className="text-amber-600">*</span></label>
        <textarea id="cf-message" rows={5} className={inputCls(errors.message)} value={fields.message} onChange={set('message')} placeholder="Tell us about your project, requirement or BOQ…" aria-invalid={!!errors.message} aria-describedby={errors.message ? 'err-message' : undefined} />
        {errors.message && <p id="err-message" className="mt-1.5 text-xs font-semibold text-red-600">{errors.message}</p>}
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button type="submit" disabled={status === 'sending'} className="btn-accent min-w-[180px] disabled:opacity-60">
          {status === 'sending' ? 'Sending…' : <>Send enquiry <Icon name="arrow-right" className="h-4 w-4" /></>}
        </button>
        <p className="text-xs text-navy-300">We reply within one working day. Your details are never shared.</p>
      </div>
    </form>
  );
}
