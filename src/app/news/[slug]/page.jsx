import Image from '@/components/Img';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import Icon from '@/components/Icon';
import Reveal from '@/components/Reveal';
import { posts, site } from '@/lib/data';

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const p = posts.find((x) => x.slug === params.slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.excerpt,
    alternates: { canonical: `/news/${p.slug}` },
    openGraph: { type: 'article', title: p.title, description: p.excerpt, images: [{ url: p.image }] },
  };
}

function fmtDate(iso) {
  return new Date(iso).toLocaleDateString('en-PK', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function ArticlePage({ params }) {
  const post = posts.find((x) => x.slug === params.slug);
  if (!post) notFound();
  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.date,
    author: { '@type': 'Organization', name: post.author },
    publisher: { '@type': 'Organization', name: site.name },
    mainEntityOfPage: `${site.domain}/news/${post.slug}`,
  };

  return (
    <div className="container-page py-10 lg:py-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumbs items={[{ label: 'News', href: '/news' }, { label: post.title, href: `/news/${post.slug}` }]} />

      <article className="mx-auto mt-8 max-w-3xl">
        <span className="inline-block rounded-full bg-amber-100 px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest text-amber-700">{post.category}</span>
        <h1 className="mt-4 font-serif text-3xl font-bold text-navy-900 sm:text-5xl text-balance">{post.title}</h1>
        <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-navy-400">
          <span className="flex items-center gap-1.5"><Icon name="user" className="h-4 w-4" /> {post.author}</span>
          <span className="flex items-center gap-1.5"><Icon name="clock" className="h-4 w-4" /> {fmtDate(post.date)}</span>
          <span>{post.read}</span>
        </p>
        <div className="relative mt-8 h-72 overflow-hidden rounded-2xl sm:h-96">
          <Image src={post.image} alt={post.title} fill priority sizes="(max-width: 768px) 100vw, 768px" className="object-cover" />
        </div>
        <p className="mt-8 text-lg font-medium leading-relaxed text-navy-700">{post.excerpt}</p>
        {post.body.map((para, i) => (
          <p key={i} className="mt-5 leading-relaxed text-navy-500">{para}</p>
        ))}

        <div className="mt-10 rounded-2xl border border-haze bg-mist p-7">
          <h2 className="font-serif text-lg font-bold text-navy-900">Want this solved on your project?</h2>
          <p className="mt-2 text-sm text-navy-400">Our designers and engineers offer free first consultations for specification questions like these.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary !py-2.5 text-sm">Ask Powerhouse</Link>
            <Link href="/quote" className="btn-outline !py-2.5 text-sm">Start a quote list</Link>
          </div>
        </div>
      </article>

      {more.length > 0 && (
        <section className="mt-14 border-t border-haze pt-10" aria-labelledby="more-reading">
          <h2 id="more-reading" className="section-title !text-2xl">More from the Journal</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {more.map((p) => (
              <Reveal key={p.slug}>
                <Link href={`/news/${p.slug}`} className="card-hover group flex h-full gap-4 rounded-2xl p-4">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                    <Image src={p.image} alt={p.title} fill loading="lazy" sizes="80px" className="object-cover" />
                  </div>
                  <div>
                    <h3 className="font-serif text-sm font-bold leading-snug text-navy-900 group-hover:text-amber-600">{p.title}</h3>
                    <p className="mt-1 text-xs text-navy-400">{p.read}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
