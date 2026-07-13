<!--
  TEMPLATE — Blog post body
  Everything BELOW the frontmatter fences is the post. The title/date/tags render
  automatically from frontmatter (via PostLayout) — start the body with your
  first paragraph, not an <h1>. Copy the pieces you need.
-->

Open with the point of the post in a sentence or two — no preamble.

## A section heading

Body text. Keep paragraphs short. **Bold** and *italic* work as usual, as do
[links](https://example.com).

- A list item
- Another item

Inline image (LOCAL asset, relative to this file — Astro optimizes it):

![Descriptive alt text](../../assets/blog/my-diagram.jpg)

Fenced code block (set the language after the backticks for highlighting):

```hlsl
float3 blend = pow(abs(worldNormal), sharpness);
blend /= (blend.x + blend.y + blend.z);
```

## Another section

Wrap up with the takeaway.
