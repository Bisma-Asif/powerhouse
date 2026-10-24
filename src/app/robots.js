import { site } from '@/lib/data';

export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${site.domain}/sitemap.xml`,
    host: site.domain,
  };
}
