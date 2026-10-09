import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://jonathanodriscoll.com',
  integrations: [
    tailwind(),
    mdx(),
    // @astrojs/sitemap was already a dependency and had never been added here,
    // so the build emitted no sitemap at all and /sitemap.xml 404'd.
    sitemap({
      // 404 is a real page in src/pages and would otherwise be listed.
      // /blog is excluded while src/content/blog/ is EMPTY (Jonathan, 2026-10-09:
      // not adding content right now). Submitting an empty listing page is a weak
      // signal. Delete '/blog' from this list the day a post ships, and remove the
      // noindex prop on src/pages/blog/index.astro in the same edit.
      filter: (page) => !['/404', '/blog'].some((p) => page.includes(p)),
    }),
  ],
});
