<!--
  TEMPLATE — Blog post frontmatter
  Copy the block between the `---` fences into a new file in src/content/blog/,
  e.g. src/content/blog/my-post.md (or .mdx). The filename (without extension)
  becomes the URL slug: src/content/blog/my-post.md -> /blog/my-post

  Schema lives in src/content.config.ts. Required: title, description, date.
  `description` is also the meta description / RSS summary — keep it useful.
-->

--- MINIMAL (the required fields only) ---
---
title: My Post Title
description: One-sentence summary used on the blog index, in search results, and in the RSS feed.
date: 2026-07-13
---


--- FULL (every field, with notes) ---
---
title: My Post Title
description: One-sentence summary used on the blog index, in search results, and in the RSS feed.
date: 2026-07-13       # publish/sort date (YYYY-MM-DD)
updated: 2026-07-20    # optional — shows "updated …" when the post changes
tags: [shaders, technical-art]   # optional — shown as chips and used as RSS categories
draft: false           # true = hidden from the built site (default false)
---
