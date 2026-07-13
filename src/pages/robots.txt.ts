import type { APIContext } from 'astro';
import { site } from '../data/site';

export function GET(context: APIContext) {
  // Sitemap lives at <site><base>sitemap-index.xml. Normalize BASE_URL to a
  // trailing slash (it may be '/portfolio' without one, or '/' when no base).
  const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');
  const sitemapUrl = new URL(`${base}sitemap-index.xml`, context.site ?? site.url).href;
  const body = `User-agent: *
Allow: /

Sitemap: ${sitemapUrl}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
