import type { APIContext } from 'astro';
import { site } from '../data/site';

export function GET(context: APIContext) {
  const origin = (context.site ?? new URL(site.url)).toString().replace(/\/$/, '');
  const body = `User-agent: *
Allow: /

Sitemap: ${origin}/sitemap-index.xml
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
