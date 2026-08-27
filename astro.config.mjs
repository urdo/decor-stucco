import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Domyślnie GitHub Pages (project site). Po domenie:
// SITE_URL=https://decorstucco.pl  BASE_PATH=/
const site = process.env.SITE_URL || 'https://urdo.github.io';
const base = process.env.BASE_PATH || '/decor-stucco/';

export default defineConfig({
  site,
  base,
  integrations: [sitemap()],
  trailingSlash: 'always',
});
