import type { APIRoute } from 'astro';
import { absUrl, siteOrigin } from '../lib/urls';

export const GET: APIRoute = ({ site }) => {
  const origin = siteOrigin(site);
  const sitemap = absUrl('sitemap-index.xml', origin);
  const llms = absUrl('llms.txt', origin);
  const body = [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${sitemap}`,
    '',
    `# Machine-readable facts for language models`,
    `# ${llms}`,
    '',
  ].join('\n');
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
