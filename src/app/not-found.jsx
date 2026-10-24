import Link from 'next/link';
import Icon from '@/components/Icon';

export default function NotFound() {
  return (
    <section className="container-page grid min-h-[60vh] place-items-center py-20 text-center">
      <div>
        <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-mist text-amber-600"><Icon name="bolt" className="h-9 w-9" /></span>
        <p className="mt-6 font-serif text-6xl font-bold text-navy-900 sm:text-7xl">404</p>
        <h1 className="mt-2 font-serif text-2xl font-bold text-navy-900">This page lost power</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-navy-400">
          The link you followed doesn't exist or the page moved. Let's get you back to something useful.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/" className="btn-primary">Back to home <Icon name="arrow-right" className="h-4 w-4" /></Link>
          <Link href="/products" className="btn-outline">Browse products</Link>
          <Link href="/contact" className="btn-outline">Contact us</Link>
        </div>
      </div>
    </section>
  );
}
