import { categories, posts, products, projects, site } from '@/lib/data';

const base = site.domain;

function entry(path, lastMod, priority, changeFreq = 'monthly') {
  return {
    url: `${base}${path === '/' ? '' : path}`,
    lastModified: lastMod,
    priority: String(priority),
    changeFrequency: changeFreq,
  };
}

export default function sitemap() {
  const now = new Date().toISOString();
  const statics = [
    entry('/', now, 1, 'weekly'),
    entry('/products', now, 0.9),
    entry('/projects', now, 0.8),
    entry('/brands', now, 0.8),
    entry('/about', now, 0.7),
    entry('/services', now, 0.7),
    entry('/contact', now, 0.8),
    entry('/quote', now, 0.7),
    entry('/news', now, 0.6, 'weekly'),
    entry('/careers', now, 0.5, 'weekly'),
    entry('/privacy', now, 0.2, 'yearly'),
    entry('/terms', now, 0.2, 'yearly'),
  ];
  const cats = categories.map((c) => entry(`/products/${c.slug}`, now, 0.8));
  const subs = categories.flatMap((c) => c.subcategories.map((s) => entry(`/products/${c.slug}/${s.slug}`, now, 0.6)));
  const prods = products.map((p) => entry(`/product/${p.slug}`, now, 0.6));
  const proj = projects.map((p) => entry(`/projects/${p.slug}`, now, 0.6));
  const blog = posts.map((p) => entry(`/news/${p.slug}`, p.date, 0.5));
  return [...statics, ...cats, ...subs, ...prods, ...proj, ...blog];
}
