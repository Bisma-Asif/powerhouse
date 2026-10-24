import categories from '@/data/categories.json';
import products from '@/data/products.json';
import brands from '@/data/brands.json';
import projects from '@/data/projects.json';
import testimonials from '@/data/testimonials.json';
import posts from '@/data/blog.json';
import jobs from '@/data/careers.json';
import faqs from '@/data/faqs.json';
import site from '@/data/site.json';

export { categories, products, brands, projects, testimonials, posts, jobs, faqs, site };

export function getCategory(slug) {
  return categories.find((c) => c.slug === slug) || null;
}

export function getSubcategory(categorySlug, subSlug) {
  const cat = getCategory(categorySlug);
  if (!cat) return null;
  return cat.subcategories.find((s) => s.slug === subSlug) || null;
}

export function getProduct(slug) {
  return products.find((p) => p.slug === slug) || null;
}

export function productsByCategory(categorySlug) {
  return products.filter((p) => p.category === categorySlug);
}

export function featuredProducts(limit = 8) {
  return products.filter((p) => p.featured).slice(0, limit);
}

export function relatedProducts(product, limit = 4) {
  const sameCat = products.filter((p) => p.category === product.category && p.slug !== product.slug);
  const sameBrand = products.filter((p) => p.brand === product.brand && p.slug !== product.slug);
  const pool = [...sameCat, ...sameBrand, ...products.filter((p) => p.slug !== product.slug)];
  const seen = new Set();
  return pool.filter((p) => !seen.has(p.slug) && seen.add(p.slug)).slice(0, limit);
}

export function brandByName(name) {
  return brands.find((b) => b.name === name) || null;
}

export function projectsBySector(sector) {
  return sector === 'all' ? projects : projects.filter((p) => p.sector === sector);
}

/** Simple relevance-weighted search across products, categories, brands, pages. */
export function searchAll(query) {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return { products: [], categories: [], brands: [], pages: [] };
  const score = (text, q, weight) => {
    const t = (text || '').toLowerCase();
    if (t === q) return weight * 3;
    if (t.startsWith(q)) return weight * 2;
    if (t.includes(q)) return weight;
    return 0;
  };
  const prods = products
    .map((p) => ({ item: p, s: Math.max(score(p.name, q, 6), score(p.brand, q, 4), score(p.short, q, 2)) }))
    .filter((r) => r.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, 6)
    .map((r) => r.item);
  const cats = categories
    .map((c) => ({ item: c, s: Math.max(score(c.name, q, 8), score(c.blurb, q, 1)) }))
    .filter((r) => r.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, 4)
    .map((r) => r.item);
  const brds = brands
    .map((b) => ({ item: b, s: score(b.name, q, 7) }))
    .filter((r) => r.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, 4)
    .map((r) => r.item);
  const pages = [
    { title: 'About Powerhouse', href: '/about', keywords: 'about story team values company' },
    { title: 'Services', href: '/services', keywords: 'installation wiring maintenance design planning' },
    { title: 'Contact', href: '/contact', keywords: 'contact address phone hours map faq' },
    { title: 'Projects', href: '/projects', keywords: 'projects residential hospitality commercial industrial case studies' },
    { title: 'Brands', href: '/brands', keywords: 'brands distributors' },
    { title: 'Request a Quote', href: '/quote', keywords: 'quote boq price basket' },
    { title: 'News & Blog', href: '/news', keywords: 'news blog articles guides' },
    { title: 'Careers', href: '/careers', keywords: 'jobs careers hiring' },
  ]
    .map((p) => ({ item: p, s: Math.max(score(p.title, q, 5), score(p.keywords, q, 1)) }))
    .filter((r) => r.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, 4)
    .map((r) => r.item);
  return { products: prods, categories: cats, brands: brds, pages };
}

export function productImages(product) {
  const cat = getCategory(product.category);
  const pool = [product.image, cat ? cat.image : null, ...products.filter((p) => p.category === product.category).map((p) => p.image)];
  const seen = new Set();
  return pool.filter((u) => u && !seen.has(u) && seen.add(u)).slice(0, 4);
}

export function withSize(url, w = 900) {
  if (!url || !url.includes('images.unsplash.com')) return url;
  const u = new URL(url);
  u.searchParams.set('w', String(w));
  u.searchParams.set('q', '75');
  u.searchParams.set('auto', 'format');
  return u.toString();
}
