# Content templates

Copy-paste starting points for adding content. **This folder is reference-only —
it lives outside `src/` so Astro never builds or publishes it.** Nothing here
appears on the site; you copy from it into the real content folders.

## How to use

1. Open the snippet you want below.
2. Copy the relevant block into a **new file** under:
   - `src/content/work/<slug>.md` (or `.mdx`) for a work item
   - `src/content/blog/<slug>.md` (or `.mdx`) for a blog post

   The filename (without extension) becomes the URL slug.
3. Fill in your values and put any local images in `src/assets/work/` or
   `src/assets/blog/` (create the blog assets folder if it doesn't exist).
4. `npm run build` validates it — it fails loudly if a required field is missing
   or an image path is wrong.

Use `.md` for text + Markdown; use `.mdx` if you want components/JSX in the body.

## What's here

| File | What to copy |
| ---- | ------------ |
| `work/work-header.md` | Work item frontmatter — minimal and full, every field documented |
| `work/gallery.md` | The `gallery:` frontmatter block (image grid + lightbox) |
| `work/case-study-body.mdx` | Body sections, inline images, and a code block |
| `blog/blog-header.md` | Blog post frontmatter — minimal and full |
| `blog/blog-body.md` | Body sections, inline image, and a code block |

The canonical field definitions live in `src/content.config.ts` — if a template
and the schema ever disagree, the schema wins.
