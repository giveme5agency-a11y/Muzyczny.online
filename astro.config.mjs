import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://muzyczny.online',
  integrations: [sitemap()],
  build: {
    format: 'directory',
  },
});
