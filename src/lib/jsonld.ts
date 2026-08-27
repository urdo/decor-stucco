import { faqItems, type FaqItem } from '../data/faq';
import { site } from '../data/site';
import { absUrl } from './urls';

export type JsonLdNode = Record<string, unknown>;

export const DISAMBIGUATION =
  'Wykonawca robót budowlanych na obiektach publicznych (elewacje, izolacje, renowacja zabytków). Nie sklep ze sztukaterią. Osobny podmiot od ARCO-BUD.';

const areaServed = [
  { '@type': 'AdministrativeArea', name: 'województwo mazowieckie' },
  { '@type': 'AdministrativeArea', name: 'województwo świętokrzyskie' },
  { '@type': 'City', name: 'Warszawa' },
  { '@type': 'City', name: 'Kielce' },
];

export function orgId(): string {
  return `${absUrl()}#organization`;
}

export function websiteId(): string {
  return `${absUrl()}#website`;
}

export function organizationNode(): JsonLdNode {
  const node: JsonLdNode = {
    '@type': ['Organization', 'LocalBusiness', 'GeneralContractor'],
    '@id': orgId(),
    name: site.name,
    legalName: site.legalName,
    alternateName: [site.owner, site.legalName],
    description: site.tagline,
    disambiguatingDescription: DISAMBIGUATION,
    url: absUrl(),
    taxID: site.nip,
    vatID: `PL${site.nip}`,
    foundingDate: String(site.foundedYear),
    identifier: [
      { '@type': 'PropertyValue', name: 'NIP', value: site.nip },
      { '@type': 'PropertyValue', name: 'REGON', value: site.regon },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      postalCode: site.address.postal,
      addressLocality: site.address.city,
      addressCountry: 'PL',
    },
    areaServed,
    knowsAbout: [
      'elewacje obiektów publicznych',
      'izolacje i hydroizolacje',
      'renowacja zabytków',
      'roboty budowlane na obiektach użyteczności publicznej',
    ],
    slogan: 'To nie jest sklep ze sztukaterią.',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Zakres robót',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Elewacje',
            url: absUrl('uslugi/elewacje/'),
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Izolacje',
            url: absUrl('uslugi/izolacje/'),
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Zabytki',
            url: absUrl('uslugi/zabytki/'),
          },
        },
      ],
    },
  };

  if (site.email) node.email = site.email;
  if (site.phone) node.telephone = site.phone;

  return node;
}

export function websiteNode(): JsonLdNode {
  return {
    '@type': 'WebSite',
    '@id': websiteId(),
    url: absUrl(),
    name: site.legalName,
    description: site.tagline,
    inLanguage: 'pl-PL',
    publisher: { '@id': orgId() },
  };
}

export function webPageNode(opts: {
  canonical: string;
  title: string;
  description: string;
  pageType?: string;
  mainEntity?: JsonLdNode | JsonLdNode[];
}): JsonLdNode {
  const node: JsonLdNode = {
    '@type': opts.pageType || 'WebPage',
    '@id': `${opts.canonical}#webpage`,
    url: opts.canonical,
    name: opts.title,
    description: opts.description,
    inLanguage: 'pl-PL',
    isPartOf: { '@id': websiteId() },
    about: { '@id': orgId() },
    publisher: { '@id': orgId() },
  };
  if (opts.mainEntity) node.mainEntity = opts.mainEntity;
  return node;
}

export function faqQuestions(items: FaqItem[] = faqItems): JsonLdNode[] {
  return items.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  }));
}

export function serviceNode(opts: {
  name: string;
  description: string;
  url: string;
}): JsonLdNode {
  return {
    '@type': 'Service',
    '@id': `${opts.url}#service`,
    name: opts.name,
    description: opts.description,
    url: opts.url,
    serviceType: opts.name,
    provider: { '@id': orgId() },
    areaServed,
    audience: {
      '@type': 'Audience',
      audienceType: 'Zamawiający publiczny',
    },
  };
}

export function realizationNode(opts: {
  url: string;
  object: string;
  client: string;
  year: number;
  location: string;
  scope: string;
  pillar: string;
}): JsonLdNode {
  return {
    '@type': 'Service',
    '@id': `${opts.url}#realizacja`,
    name: opts.object,
    description: `${opts.year}. ${opts.scope} Zamawiający: ${opts.client}.`,
    url: opts.url,
    serviceType: opts.pillar,
    provider: { '@id': orgId() },
    areaServed: {
      '@type': 'Place',
      name: opts.location,
    },
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'Obiekt', value: opts.object },
      { '@type': 'PropertyValue', name: 'Zamawiający', value: opts.client },
      { '@type': 'PropertyValue', name: 'Rok', value: String(opts.year) },
      { '@type': 'PropertyValue', name: 'Lokalizacja', value: opts.location },
      { '@type': 'PropertyValue', name: 'Zakres', value: opts.scope },
    ],
  };
}

export function itemListNode(opts: {
  url: string;
  name: string;
  items: { name: string; url: string }[];
}): JsonLdNode {
  return {
    '@type': 'ItemList',
    '@id': `${opts.url}#list`,
    name: opts.name,
    numberOfItems: opts.items.length,
    itemListElement: opts.items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: item.url,
    })),
  };
}

export function breadcrumbNode(items: { name: string; url: string }[]): JsonLdNode {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function graphDocument(nodes: JsonLdNode[]): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [organizationNode(), websiteNode(), ...nodes],
  }).replace(/</g, '\\u003c');
}
