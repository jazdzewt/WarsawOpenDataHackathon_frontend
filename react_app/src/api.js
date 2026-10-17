const API_URL = import.meta.env.VITE_API_URL || '/api';

// Używane, dopóki backend nie jest dostępny
const FALLBACK_BOISKA = [
  {
    id: 1,
    nazwa: 'LXIV LO im. S.I. Witkiewicza',
    adres: 'ul. Elbląska 51',
    dzielnica: 'Żoliborz',
    typ: 'boiska uniwersalne',
    lat: 52.2662,
    lon: 20.9701,
  },
  {
    id: 2,
    nazwa: 'Przykładowe Boisko Praga',
    adres: 'ul. Szwedzka 20',
    dzielnica: 'Praga-Północ',
    typ: 'boisko do koszykówki',
    lat: 52.2619,
    lon: 21.0425,
  },
  {
    id: 3,
    nazwa: 'OSiR Śródmieście',
    adres: 'ul. Polna 7',
    dzielnica: 'Śródmieście',
    typ: 'boisko do piłki nożnej',
    lat: 52.2165,
    lon: 21.0183,
  },
];

// GET /api/boiska -> [{ id, nazwa, adres, dzielnica, typ, przeznaczenie, godziny, uwagi, lat, lon }]
export async function getBoiska() {
  try {
    const res = await fetch(`${API_URL}/boiska`);
    if (!res.ok) throw new Error(`Błąd API: ${res.status}`);
    return { data: await res.json(), fallback: false };
  } catch (e) {
    console.warn('Backend niedostępny, używam danych zapasowych.', e);
    return { data: FALLBACK_BOISKA, fallback: true };
  }
}
