import type { CountryDetail } from '../types/country-detail';
const API_KEY = 'rc_live_030f5a922fc04509b68d5996d7c5ec9d';
const fallbackDetails: Record<string, CountryDetail> = {
  'SV': {
    names: { common: 'El Salvador', official: 'Republic of El Salvador' },
    codes: { alpha_2: 'SV', alpha_3: 'SLV' },
    flag: { url_svg: 'https://flagcdn.com/sv.svg', description: 'Bandera de El Salvador' },
    capitals: [{ name: 'San Salvador' }],
    population: 6400000,
    region: 'Americas',
    subregion: 'Central America',
    area: 21041,
    languages: { spa: 'Spanish' },
    currencies: { USD: { name: 'United States dollar', symbol: '$' } }
  },
  'US': {
    names: { common: 'Estados Unidos', official: 'United States of America' },
    codes: { alpha_2: 'US', alpha_3: 'USA' },
    flag: { url_svg: 'https://flagcdn.com/us.svg', description: 'Bandera de Estados Unidos' },
    capitals: [{ name: 'Washington' }],
    population: 341000000,
    region: 'Americas',
    subregion: 'North America',
    area: 9833517,
    languages: { eng: 'English' },
    currencies: { USD: { name: 'United States dollar', symbol: '$' } }
  },
  'DE': {
    names: { common: 'Alemania', official: 'Federal Republic of Germany' },
    codes: { alpha_2: 'DE', alpha_3: 'DEU' },
    flag: { url_svg: 'https://flagcdn.com/de.svg', description: 'Bandera de Alemania' },
    capitals: [{ name: 'Berlin' }],
    population: 84000000,
    region: 'Europe',
    subregion: 'Western Europe',
    area: 357376,
    languages: { deu: 'German' },
    currencies: { EUR: { name: 'Euro', symbol: '€' } }
  }
};
export async function fetchCountryByCode(code: string): Promise<CountryDetail | null> {
  const upperCode = code.toUpperCase();
  if (fallbackDetails[upperCode]) {
    return fallbackDetails[upperCode];
  }
  try {
    const response = await fetch(`https://api.restcountries.com/countries/v5?limit=250&api-key=${API_KEY}`, {
      headers: { 'Authorization': `Bearer ${API_KEY}` }
    });
    if (!response.ok) throw new Error('Error al conectar con la API');
    const result = await response.json();
    const apiObjects: CountryDetail[] = result.data?.objects ?? [];
    const country = apiObjects.find(
      c => c.codes?.alpha_2?.toUpperCase() === upperCode
    );
    return country || null;
  } catch (error) {
    console.error('Error en fetchCountryByCode:', error);
    return fallbackDetails[upperCode] || null;
  }
}