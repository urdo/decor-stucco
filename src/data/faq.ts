import { site } from './site';

export type FaqItem = {
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    question: 'Czy to firma od sztukaterii i tynków dekoracyjnych?',
    answer:
      'Nazwa pochodzi z rzemiosła. Publiczny portfel to roboty budowlane na obiektach publicznych. Sztukaterię salonową jako ofertę sklepową potwierdzimy tylko, jeśli właściciel tak zdecyduje.',
  },
  {
    question: 'Czy startujecie wyłącznie jako wykonawca zamówienia publicznego?',
    answer:
      'Publicznie widać wygrane postępowania. Czy firma bierze podwykonawstwo od generalnego — pytanie do właściciela. Formularz przyjmuje oba typy zapytań.',
  },
  {
    question: 'Czy macie pozwolenie konserwatorskie WKZ?',
    answer:
      'Publicznie nie znaleziono numeru pozwolenia. Na obiektach zabytkowych (dworek, sąd, PKiN, Łucznica) widać roboty w reżimie dziedzictwa. Numer i skan — po stronie właściciela, bez zgadywania.',
  },
  {
    question: 'Jaka jest gwarancja w latach?',
    answer:
      'Nie podajemy liczby, której nie ma w dokumencie. Ramka na stronie realizacji czeka na wartość z umowy / karty gwarancyjnej.',
  },
  {
    question: 'Czy podajecie doświadczenie w złotych?',
    answer:
      'Nie. Agregatory (Atlas, eGospodarka) liczą inaczej; suma z portalu nie idzie na stronę. Do SIWZ liczy się załącznik, który podpisze wykonawca.',
  },
  {
    question: 'Jaki jest zasięg?',
    answer: `${site.reachNote} Obietnica „cała Polska” pojawi się wyłącznie po decyzji właściciela.`,
  },
  {
    question: 'Jak odróżnić Decor Stucco od ARCO-BUD?',
    answer:
      'To osobne podmioty. Na tej stronie nie ma przetargów ARCO-BUD. Ten sam gmach (np. Elektronika PW) może mieć roboty obu marek w różnych latach — nie mieszamy ich w jednym portfolio.',
  },
  {
    question: 'Czy zdjęcia na stronie to Wasze budowy?',
    answer:
      'Nie. Zdjęcia z Unsplash/Pexels są ilustracyjne i tak podpisane. Realizacje mają puste ramki na fotografię obiektu od właściciela.',
  },
];
