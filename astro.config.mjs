// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
  site: 'https://gibsontechworks.com',
  integrations: [sitemap(), vue()],
});