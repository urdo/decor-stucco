export const site = {
  name: 'Decor Stucco',
  legalName: 'Decor Stucco Zenon Szczygieł',
  owner: 'Zenon Szczygieł',
  tagline:
    'Wykonawca robót elewacyjnych, izolacyjnych i renowacyjnych na obiektach publicznych.',
  foundedYear: 2009,
  nip: '7931359959',
  regon: '260267919',
  vatSince: '19.12.2008',
  address: {
    street: 'ul. Słoneczna 15A',
    postal: '26-085',
    city: 'Miedziana Góra',
  },
  /** Puste do zgody właściciela. Nie wstawiamy numeru z katalogów. */
  phone: '',
  /** Puste do zgody właściciela. Nie wstawiamy azszczygiel@wp.pl. */
  email: '',
  /** Klucz Web3Forms; można też podać PUBLIC_WEB3FORMS_KEY w env. */
  web3formsKey: '',
  contactPerson: '',
  reach: 'Mazowsze i województwo świętokrzyskie',
  reachNote:
    'Siedziba w Miedzianej Górze. Publiczny portfel zamówień koncentruje się na Warszawie, Kielcach i gminach Mazowsza.',
} as const;

export const nav = [
  { href: '/uslugi/', label: 'Usługi' },
  { href: '/realizacje/', label: 'Realizacje' },
  { href: '/o-firmie/', label: 'O firmie' },
  { href: '/dla-zamawiajacego/', label: 'Dla zamawiającego' },
  { href: '/kontakt/', label: 'Kontakt' },
] as const;

export function fullAddress(): string {
  const { street, postal, city } = site.address;
  return `${street}, ${postal} ${city}`;
}

export function web3formsKey(): string {
  const fromEnv =
    typeof import.meta.env.PUBLIC_WEB3FORMS_KEY === 'string'
      ? import.meta.env.PUBLIC_WEB3FORMS_KEY
      : '';
  return fromEnv || site.web3formsKey;
}
