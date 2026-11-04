import type { Country } from '../assets/types/country';

export const paisUno: Country = {
  names: { common: 'El Salvador' },
  flag: { url: 'https://flagcdn.com/sv.svg' },
  population: 6486201,
  region: 'Americas',
};

export const paisDos: Country = {
  names: { common: 'Costa Rica' },
  flag: { url: 'https://flagcdn.com/cr.svg' },
  population: 5094114,
  region: 'Americas',
};

export const paisTres: Country = {
  names: { common: 'España' },
  flag: { url: 'https://flagcdn.com/es.svg' },
  population: 48335116,
  region: 'Europe',
};
export const countriesDemo: Country[] = [paisUno, paisDos, paisTres];