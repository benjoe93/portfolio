# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A static Astro portfolio for a technical artist that unifies **code** (GitHub) and **art** (ArtStation) plus a **blog** into one site. The defining idea: tech-art work is code *and* visuals, so Projects and Art are **one collection and one page** (`/work`), not two — each item can carry both a `repoUrl` and an `artstationUrl`. Images stay hosted on ArtStation (covers hotlink its CDN); the site links back out to preserve each platform's discoverability.

## Commands

```bash
npm install        # install deps (first run)
npm run dev        # dev server + HMR → http://localhost:4321
npm run build      # static build → dist/  (also the CI/typecheck gate)
npm run preview    # serve built dist/ locally
npm run astro check   # type-check .astro / content (no dedicated test suite)
```

There is **no test runner and no separate lint step** — `npm run build` is the correctness gate (it fails on content-schema violations and broken image refs). Run it before considering a change done.

## Architecture

**Content Layer collections (Astro 5+ API).** Both collections are defined in `src/content.config.ts` using the `glob()` loader — schemas live there, not alongside the files. Entry `id` = filename without extension, and that `id` is the URL slug (`src/content/work/foo.md` → `/work/foo`).

**The unified `work` schema is the heart of the app.** One model for code, art, and hybrid pieces: any combination of `repoUrl` / `artstationUrl` / `liveUrl` is allowed, and `WorkCard`/`work/[...slug].astro` render only the links that exist. When changing what a work item can be, edit the zod schema in `src/content.config.ts` first.

**`DISCIPLINES` is a single source of truth** exported from `src/content.config.ts`. It is (a) the zod `enum` that validates each item's `disciplines[]`, and (b) the canonical order for the `/work` filter chips. The Work page intersects `DISCIPLINES` with disciplines actually present, so adding a new discipline means editing this one array.

**Dual cover handling — the main gotcha.** `cover` is a union of `image()` (local asset, optimized) and a plain string (hotlinked ArtStation CDN URL). Anywhere a cover is rendered (`WorkCard.astro`, `work/[...slug].astro`), code branches on `typeof cover === 'string'`: remote strings use a plain `<img>`, local assets use `<Image>` from `astro:assets`. Preserve this branch when touching cover rendering.

**`Gallery.astro` — per-work image grid + lightbox.** Work items may set an optional `gallery` array (`{ src, alt, caption? }`); it renders under the case study. Clicking a thumbnail opens a full-screen lightbox built on the native `<dialog>` element, driven by a small vanilla-JS island (same pattern as `ThemeToggle`/`FilterBar`) with prev/next slideshow nav, arrow-key/swipe support, and focus return. The enlarged (full-size) source is the original optimized asset for local images and the pasted URL for remote ArtStation images — it reuses the same `typeof src === 'string'` local-vs-remote branch as the cover.

**`/work` filtering is client-side and DOM-attribute driven.** Each card renders `data-disciplines="tag1 tag2"`; `FilterBar.astro`'s inline script shows/hides `.work-grid [data-disciplines]` by toggling `style.display`. The FilterBar must be rendered inside/near a `.work-grid` for its selectors to match — it is not a data prop pipeline.

**Base-path awareness.** All internal links compute `const base = import.meta.env.BASE_URL.replace(/\/$/, '')` and prefix hrefs with it. This exists so a project-repo deploy (`base: '/repo'` in `astro.config.mjs`) works without rewriting links. When adding internal links, follow this pattern rather than hardcoding `/`.

**Config is centralized in two files.** `src/data/site.ts` holds identity/socials/SEO defaults (imported by `SEO.astro`, `Footer.astro`, `rss.xml.ts`, etc.); `astro.config.mjs` holds the deploy `site` URL and optional `base`. `site.url` and `astro.config.mjs`'s `site` must stay in sync. `rss.xml.ts` and `robots.txt.ts` are dynamic endpoints that prefer `context.site` and fall back to `site.url`.

**Theming.** CSS custom-property tokens in `src/styles/global.css` define light + dark (`:root` / `:root[data-theme="dark"]` / a `prefers-color-scheme` block for the no-explicit-choice case). An `is:inline` script in `BaseLayout.astro`'s `<head>` applies the saved theme before paint (no FOUC); `ThemeToggle.astro` only flips and persists to `localStorage`.

**SEO.** `SEO.astro` (rendered via `BaseLayout`) emits title/description/canonical/OG/Twitter for every page; pass `person` on the home page to also emit `Person` JSON-LD. Sitemap comes from `@astrojs/sitemap`; the blog RSS feed is `src/pages/rss.xml.ts`.

**`templates/` is reference-only, excluded from the build.** Root-level copy-paste content snippets (work/blog frontmatter, gallery block, body sections). It sits outside `src/pages` and the `src/content` globs, so Astro never routes or publishes it. **Do not move it into `src/content`** — the glob loader would try to parse the snippets as real content and fail schema validation.

## Deploy

`.github/workflows/deploy.yml` builds via `withastro/action` and publishes to GitHub Pages on push to `main` (repo setting: Pages → Source: GitHub Actions). For a project-repo deploy, set `base` in `astro.config.mjs`; for `<user>.github.io` or a custom domain, leave `base` unset.
