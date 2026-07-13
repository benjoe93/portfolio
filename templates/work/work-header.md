<!--
  TEMPLATE — Work item frontmatter
  Copy the block between the `---` fences into a new file in src/content/work/,
  e.g. src/content/work/my-piece.md (or .mdx). The filename (without extension)
  becomes the URL slug: src/content/work/my-piece.md -> /work/my-piece

  Schema lives in src/content.config.ts. Required: title, summary, cover,
  disciplines, date. Everything else is optional — delete lines you don't need.
-->

--- MINIMAL (the required fields only) ---
---
title: My Piece
summary: One or two sentences describing what it is and what's interesting about it.
cover: ../../assets/work/my-piece.jpg   # local asset (optimized) OR a full https:// URL
disciplines: [shader, tool]             # valid values: shader, procedural, tool, vfx, environment, rigging, code, art
date: 2026-07-13
---


--- FULL (every field, with notes) ---
---
title: My Piece
summary: One or two sentences describing what it is and what's interesting about it.

# cover: a LOCAL asset (relative path -> Astro optimizes it)…
cover: ../../assets/work/my-piece.jpg
# …OR a hotlinked ArtStation CDN URL (right-click the image on ArtStation ->
# "Copy image address"). Use only one `cover:` line.
# cover: https://cdna.artstation.com/p/assets/images/images/012/345/678/large/name.jpg
coverAlt: Short description of the cover image for screen readers

# Drives the filter chips on /work. Pick 1+ from DISCIPLINES in src/content.config.ts.
# A hybrid piece can list several (e.g. a shader that's also art).
disciplines: [shader, procedural, art]

# Links — include any combination; the card/detail page shows only what's present.
repoUrl: https://github.com/yourname/my-piece
artstationUrl: https://www.artstation.com/artwork/yourhash
liveUrl: https://example.com/my-piece-demo

date: 2026-07-13        # publish/sort date (YYYY-MM-DD)
featured: true          # show in the "Featured work" strip on the home page (default false)
draft: false            # true = hidden from the built site (default false)

# Optional image gallery — see templates/work/gallery.md for the full block.
# gallery:
#   - src: ../../assets/work/detail-01.jpg
#     alt: ...
---
