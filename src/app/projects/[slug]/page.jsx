import Image from '@/components/Img';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import Icon from '@/components/Icon';
import Reveal from '@/components/Reveal';
import ProjectGallery from '@/components/ProjectGallery';
import { getCategory, projects, projectsBySector, withSize } from '@/lib/data';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const p = projects.find((x) => x.slug === params.slug);
  if (!p) return {};
  return {
    title: `${p.title} — ${p.sector.charAt(0).toUpperCase() + p.sector.slice(1)} Project`,
    description: p.summary,
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: { images: [{ url: p.image }] },
  };
}

export default function ProjectPage({ params }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();
  const more = projectsBySector(project.sector).filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <div className="container-page py-10 lg:py-14">
      <Breadcrumbs items={[{ label: 'Projects', href: '/projects' }, { label: project.title, href: `/projects/${project.slug}` }]} />

      <div className="mt-8 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <p className="eyebrow">{project.sector} · {project.year}</p>
          <h1 className="mt-3 font-serif text-4xl font-bold text-navy-900 sm:text-5xl text-balance">{project.title}</h1>
          <p className="mt-3 flex items-center gap-2 text-sm text-navy-400">
            <Icon name="pinOuter" className="h-4 w-4 text-amber-500" /> {project.location}
          </p>
          <div className="relative mt-8 h-[320px] overflow-hidden rounded-2xl sm:h-[440px]">
            <Image
              src={withSize(project.image, 1600)}
              alt={project.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover"
            />
          </div>
        </div>

        <aside className="lg:col-span-4">
          <div className="card sticky top-32 p-7">
            <h2 className="font-serif text-xl font-bold text-navy-900">Project brief</h2>
            <dl className="mt-5 space-y-4 text-sm">
              <div>
                <dt className="text-xs font-bold uppercase tracking-widest text-navy-400">Scope</dt>
                <dd className="mt-1 text-navy-800">{project.scope}</dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-widest text-navy-400">Sector</dt>
                <dd className="mt-1 capitalize text-navy-800">{project.sector}</dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-widest text-navy-400">Brands supplied</dt>
                <dd className="mt-1.5 flex flex-wrap gap-2">
                  {project.brands.map((b) => (
                    <span key={b} className="rounded-full bg-mist px-3 py-1 text-xs font-semibold text-navy-700">{b}</span>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-widest text-navy-400">Categories</dt>
                <dd className="mt-1.5 space-y-1">
                  {project.categories.map((c) => {
                    const cat = getCategory(c);
                    return cat ? (
                      <Link key={c} href={`/products/${c}`} className="flex items-center gap-1.5 text-navy-700 hover:text-amber-600">
                        <Icon name={cat.icon} className="h-4 w-4" /> {cat.name}
                      </Link>
                    ) : null;
                  })}
                </dd>
              </div>
            </dl>
            <Link href="/quote" className="btn-accent mt-6 w-full">Quote similar scope <Icon name="arrow-right" className="h-4 w-4" /></Link>
          </div>
        </aside>
      </div>

      <div className="mt-14 grid gap-10 lg:grid-cols-2">
        <Reveal>
          <h2 className="flex items-center gap-2.5 font-serif text-2xl font-bold text-navy-900">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-navy-900 text-amber-400"><Icon name="bolt" className="h-4 w-4" filled /></span>
            The challenge
          </h2>
          <p className="mt-4 leading-relaxed text-navy-500">{project.challenge}</p>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="flex items-center gap-2.5 font-serif text-2xl font-bold text-navy-900">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-amber-400 text-navy-950"><Icon name="check" className="h-4 w-4" /></span>
            The Powerhouse solution
          </h2>
          <p className="mt-4 leading-relaxed text-navy-500">{project.solution}</p>
        </Reveal>
      </div>

      <section className="mt-16" aria-label="Project gallery">
        <h2 className="section-title !text-2xl sm:!text-3xl">Project gallery</h2>
        <div className="mt-6">
          <ProjectGallery images={project.gallery} title={project.title} />
        </div>
      </section>

      {more.length > 0 && (
        <section className="mt-16" aria-labelledby="more-projects">
          <div className="flex items-end justify-between gap-4">
            <h2 id="more-projects" className="section-title !text-2xl sm:!text-3xl">More {project.sector} projects</h2>
            <Link href="/projects" className="btn-outline !py-2.5 text-xs">All projects</Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {more.map((p) => (
              <Link key={p.slug} href={`/projects/${p.slug}`} className="card-hover group relative block h-56 overflow-hidden rounded-2xl">
                <Image src={withSize(p.image, 800)} alt={p.title} fill loading="lazy" sizes="(max-width: 640px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 to-transparent" />
                <p className="absolute inset-x-0 bottom-0 p-4 font-serif text-lg font-bold text-white">{p.title}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
