import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Po podłączeniu domeny: SITE_URL=https://decorstucco.pl i BASE_PATH=/
// Przy GitHub project pages: SITE_URL=https://<user>.github.io i BASE_PATH=/<repo>/
const site = process.env.SITE_URL || 'https://decorstucco.pl';
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  integrations: [sitemap()],
  trailingSlash: 'always',
});
