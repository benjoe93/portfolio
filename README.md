# Portfolio

A static portfolio website for a **technical artist** — one home that unifies
**code** (GitHub) and **art** (ArtStation) plus a **blog**. It's built so hybrid
tech-art work (shaders, procedural tools, VFX) lives on a single, filterable
**Work** page where each piece can link out to both its GitHub repo *and* its
ArtStation showcase.

ArtStation stays the host for images (covers hotlink its CDN); GitHub stays the
home for code. This site is the front door that links back to both, so their
discoverability is preserved.

- **Framework:** [Astro](https://astro.build) (static output, ships ~zero JS)
- **Content:** Markdown/MDX collections — `src/content/work/` and `src/content/blog/`
- **Hosting:** GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`)
- **SEO:** sitemap, RSS feed, `robots.txt`, Open Graph/Twitter cards, JSON-LD

## Requirements

- **Node.js** 18.20.8+ / 20.3+ / 22+ (built and tested on Node 25)
- **npm** (bundled with Node)

## Build & run

```bash
npm install        # install dependencies (first time only)

npm run dev        # start dev server with hot reload → http://localhost:4321
npm run build      # build the production site to ./dist
npm run preview    # serve the built ./dist locally to verify it
```

| Command           | What it does                                              |
| ----------------- | -------------------------------------------------------- |
| `npm install`     | Installs dependencies into `node_modules/`.              |
| `npm run dev`     | Dev server at `http://localhost:4321` with live reload.  |
| `npm run build`   | Generates the static site into `dist/`.                  |
| `npm run preview` | Serves the built `dist/` locally to check before deploy. |
| `npm run astro`   | Runs the Astro CLI directly (e.g. `npm run astro check`).|

## Project structure

```
src/
  content/
    work/            # work items (code / art / hybrid) — one .md or .mdx each
    blog/            # blog posts — one .md or .mdx each
  content.config.ts  # collection schemas + the DISCIPLINES filter list
  data/site.ts       # your identity, socials, and SEO defaults
  components/         # WorkCard, FilterBar, SEO, Nav, Footer, ThemeToggle
  layouts/           # BaseLayout, PostLayout
  pages/             # index, work/, blog/, about, rss.xml, robots.txt
  assets/            # local images (optimized by Astro at build)
public/              # favicon, resume.pdf, og-default.png, CNAME (static, copied as-is)
templates/           # copy-paste content snippets — NOT built/published (see below)
astro.config.mjs     # site URL + integrations
```

## Make it yours

1. **Identity & SEO** — edit `src/data/site.ts` (name, role, tagline, email, social URLs, OG image).
2. **Deploy URL** — set `site` in `astro.config.mjs` to your final URL. Keep `base`
   unset for a `<username>.github.io` repo or a custom domain; set `base: '/<repo>'`
   only for a project-repo deploy.
3. **Add work** — drop a `.md`/`.mdx` file in `src/content/work/` (or copy a template — see below). Schema:
   `title, summary, cover, coverAlt, disciplines[], repoUrl?, artstationUrl?, liveUrl?, date, featured?, draft?, gallery?`.
   - `cover` is either a local asset path (optimized by Astro) or a hotlinked
     ArtStation CDN URL. To feature an ArtStation piece: right-click its image →
     **Copy image address** → paste as `cover`; paste the project page URL as `artstationUrl`.
   - `disciplines` drives the filter on `/work`; valid values are in `DISCIPLINES` in `src/content.config.ts`.
   - `gallery` (optional) is an array of `{ src, alt, caption? }` images rendered under the
     case study as a grid; clicking a thumbnail opens a **lightbox** with prev/next slideshow
     navigation. `src` is a local asset or a hotlinked ArtStation CDN URL, like `cover`.
4. **Add posts** — drop a `.md`/`.mdx` file in `src/content/blog/` (`title, description, date, updated?, tags[], draft?`).
5. **About/CV** — edit `src/pages/about.astro` (bio, skills, experience) and drop your `resume.pdf` in `public/`.
6. **Assets** — replace `public/favicon.svg` and add a 1200×630 `public/og-default.png` for social cards.

## Content templates

The `templates/` folder holds copy-paste snippets for new content (work headers,
the gallery block, blog headers, body sections). It lives **outside `src/`, so
Astro never builds or publishes it** — it's reference only. To add content, copy
a snippet into `src/content/work/` or `src/content/blog/` and fill it in. See
`templates/README.md` for the index.

## Deploy (GitHub Pages)

Push to `main`. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
The workflow in `.github/workflows/deploy.yml` builds and publishes on every push.
For a custom domain, add a `public/CNAME` file containing the domain and configure DNS.
