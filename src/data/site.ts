// Central identity + SEO config. Edit these values to make the site yours.
export const site = {
  name: 'Bence Blazer',
  role: 'Senior Technical Artist',
  // One-line pitch shown in the hero and used as the default meta description.
  tagline: 'Technical artist bridging code and visuals — shaders, procedural tools, and real-time art for games.',
  // Absolute URL of the deployed site; must match `site` in astro.config.mjs.
  url: 'https://username.github.io',
  email: 'blazerbence@gmail.com',
  // Location line for the About page / structured data (optional).
  location: '',

  // Social + identity links. `rel="me"` backlinks are emitted for these in the footer.
  socials: {
    artstation: 'https://www.artstation.com/benjoe',
    github: 'https://github.com/benjoe93',
    linkedin: 'https://www.linkedin.com/in/benblazer/',
  },

  // Default Open Graph image (place a 1200x630 png/jpg in /public). Optional.
  ogImage: '/og-default.png',
} as const;

export type Site = typeof site;
