import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { site } from '../data/site';

export async function GET(context: APIContext) {
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );

  // Include the deploy base path (e.g. /portfolio/) so item links are correct
  // on a project-repo deploy. Normalize to a trailing slash — BASE_URL may be
  // '/portfolio' (no slash) or '/', and URL resolution needs the trailing slash.
  const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');
  const siteRoot = new URL(base, context.site ?? site.url).href;

  return rss({
    title: `${site.name} — Blog`,
    description: site.tagline,
    site: siteRoot,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      categories: post.data.tags,
      link: `blog/${post.id}/`,
    })),
  });
}
