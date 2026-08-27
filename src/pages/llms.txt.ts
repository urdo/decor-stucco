import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { faqItems } from '../data/faq';
import { fullAddress, site } from '../data/site';
import { DISAMBIGUATION } from '../lib/jsonld';
import { absUrl, siteOrigin } from '../lib/urls';

export const GET: APIRoute = async ({ site: siteUrl }) => {
  const origin = siteOrigin(siteUrl);
  const uslugi = (await getCollection('uslugi')).sort((a, b) => a.data.order - b.data.order);
  const realizacje = (await getCollection('realizacje')).sort((a, b) => b.data.year - a.data.year);

  const lines = [
    `# ${site.legalName}`,
    '',
    `> ${site.tagline}`,
    `> ${DISAMBIGUATION}`,
    '',
    'Teksty na stronie są opracowaniem redakcyjnym na podstawie publicznych ogłoszeń o zamówieniach; nie zastępują dokumentów oferty.',
    '',
    '## Dane rejestrowe',
    '',
    `- Nazwa: ${site.legalName}`,
    `- Właściciel: ${site.owner}`,
    '- Forma: jednoosobowa działalność gospodarcza (JDG). Brak KRS.',
    `- NIP: ${site.nip}`,
    `- REGON: ${site.regon}`,
    `- VAT czynny od: ${site.vatSince}`,
    `- Siedziba: ${fullAddress()}, Polska`,
    `- Zasięg: ${site.reach}. ${site.reachNote}`,
    `- Rok w stopce: ${site.foundedYear} (CEIDG / katalogi). Nie używać roku 1999 z katalogów WeNet.`,
    '',
    '## Czym jest ta firma',
    '',
    'Wykonawca robót budowlanych na obiektach publicznych: elewacje, izolacje i hydroizolacje, remont i renowacja zabytków. Klient to przede wszystkim zamawiający publiczny (gmina, uczelnia, urząd, sąd, instytucja kultury).',
    '',
    '## Czym nie jest',
    '',
    '- Nie sklep ze sztukaterią, listwami ani tynkami dekoracyjnymi do mieszkań.',
    '- Nie ARCO-BUD. To osobny podmiot; przetargów ARCO-BUD nie ma na tej stronie. Ten sam gmach może mieć roboty obu marek w różnych latach — nie mieszać portfolio.',
    '- Nie publikujemy kwot umów ani sum z Atlasa Przetargów / eGospodarki.',
    '- Nie publikujemy telefonu ani e-maila z katalogów firm bez zgody właściciela.',
    '- Nie podajemy numeru pozwolenia WKZ, ISO, sumy polisy OC ani gwarancji w latach, dopóki nie ma skanu.',
    '- Zdjęcia na stronie są ilustracyjne (Pexels / Wikimedia), nie dokumentacją robót. Realizacje mają puste ramki na fotografię obiektu.',
    '',
    '## Zakres',
    '',
    ...uslugi.map(
      (item) =>
        `- [${item.data.title}](${absUrl(`uslugi/${item.id}/`, origin)}): ${item.data.summary}`,
    ),
    '',
    '## Realizacje (z ogłoszeń publicznych)',
    '',
    'Format: rok — obiekt — zamawiający — lokalizacja — zakres. Pełna lista: ' +
      absUrl('realizacje/', origin),
    '',
    ...realizacje.map(
      (item) =>
        `- [${item.data.year} — ${item.data.object}](${absUrl(`realizacje/${item.id}/`, origin)}): ${item.data.client}; ${item.data.location}; ${item.data.scope}`,
    ),
    '',
    '## FAQ',
    '',
    ...faqItems.flatMap((item) => [`### ${item.question}`, '', item.answer, '']),
    '## Kontakt',
    '',
    `- Formularz: ${absUrl('kontakt/', origin)}`,
    '- Telefon i e-mail do publikacji: niepotwierdzone przez właściciela (puste w danych strony).',
    `- Informacje dla zamawiającego: ${absUrl('dla-zamawiajacego/', origin)}`,
    '',
    '## Strona',
    '',
    `- Start: ${absUrl('', origin)}`,
    `- llms.txt: ${absUrl('llms.txt', origin)}`,
    `- Sitemap: ${absUrl('sitemap-index.xml', origin)}`,
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
