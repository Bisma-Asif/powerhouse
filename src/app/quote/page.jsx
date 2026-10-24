import QuoteCart from '@/components/QuoteCart';
import Breadcrumbs from '@/components/Breadcrumbs';
import Icon from '@/components/Icon';

export const metadata = {
  title: 'Request a Quote — Your Quote List',
  description: 'Review your Powerhouse Building Solutions quote list and request formal project pricing. Add products from switches, lighting, automation, switchgear, security and Hi-Fi categories and our team returns pricing within 24 working hours.',
  alternates: { canonical: '/quote' },
};

export default function QuotePage() {
  return (
    <>
      <section className="bg-navy-950">
        <div className="container-page py-12 sm:py-14">
          <Breadcrumbs items={[{ label: 'Request a Quote', href: '/quote' }]} />
          <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
            <div>
              <h1 className="font-serif text-4xl font-bold text-white sm:text-5xl">Request a Quote</h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-navy-200 sm:text-base">
                Everything you need priced in one list — power points to panel boards. We return formal, brand-verified pricing within 24 working hours.
              </p>
            </div>
            <a href="tel:+9221111509509" className="flex items-center gap-3 rounded-2xl border border-navy-800 px-5 py-4 text-white transition hover:border-amber-400">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-400 text-navy-950"><Icon name="phone" className="h-5 w-5" /></span>
              <span>
                <span className="block text-xs uppercase tracking-widest text-navy-300">Rather talk?</span>
                <span className="block text-sm font-bold">+92 21 111 509 509</span>
              </span>
            </a>
          </div>
        </div>
      </section>
      <QuoteCart />
    </>
  );
}
