// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// NOTE: set `site` to your final URL.
//  - GitHub user site:   https://<username>.github.io   (keep `base` unset)
//  - GitHub project repo: https://<username>.github.io  + base: '/<repo>'
//  - Custom domain:      https://yourname.dev           (keep `base` unset)
export default defineConfig({
  site: 'https://benjoe93.github.io',
  base: '/portfolio', // project-repo deploy: site is served at /portfolio
  integrations: [mdx(), sitemap()],
});
