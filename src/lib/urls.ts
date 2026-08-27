export function siteOrigin(site?: URL | string | null): string {
  if (site instanceof URL) return site.origin;
  if (typeof site === 'string' && site) return new URL(site).origin;
  if (typeof import.meta.env.SITE === 'string' && import.meta.env.SITE) {
    return new URL(import.meta.env.SITE).origin;
  }
  return 'https://urdo.github.io';
}

/** Absolute URL under the project base path (`/decor-stucco/` on GitHub Pages). */
export function absUrl(path = '', origin?: string): string {
  const root = new URL(import.meta.env.BASE_URL || '/', `${siteOrigin(origin)}/`);
  if (!path || path === '/') return root.href;
  return new URL(path.replace(/^\//, ''), root).href;
}
