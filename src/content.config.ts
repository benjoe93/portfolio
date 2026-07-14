import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Canonical list of disciplines used by the Work filter. Extend as needed.
export const DISCIPLINES = [
  'shader',
  'procedural',
  'tool',
  'vfx',
  'environment',
  'rigging',
  'code',
  'art',
] as const;

// Unified Work collection: one model for code, art, and hybrid pieces.
// Any combination of the link fields is allowed, so a shader tool with both a
// GitHub repo and an ArtStation showcase renders as one card exposing both.
const work = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/work' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      // Cover image: either a local asset (relative path -> optimized by Astro)
      // or a hotlinked ArtStation CDN URL (string).
      cover: z.union([image(), z.string().url()]),
      coverAlt: z.string().default(''),
      disciplines: z.array(z.enum(DISCIPLINES)).nonempty(),
      repoUrl: z.string().url().optional(),
      artstationUrl: z.string().url().optional(),
      date: z.coerce.date(),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
      // Suppress the large cover image on the work detail page. The cover is
      // still required and still used for the /work card and the OG/social image.
      hideCover: z.boolean().default(false),
      // Optional image gallery rendered under the case study. Each item's `src`
      // is either a local asset (optimized) or a hotlinked ArtStation CDN URL,
      // mirroring how `cover` works.
      gallery: z
        .array(
          z.object({
            src: z.union([image(), z.string().url()]),
            alt: z.string().default(''),
            caption: z.string().optional(),
          }),
        )
        .optional(),
    }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { work, blog };
