import type { Country } from '../assets/types/country';

export const paisUno: Country = {
  names: { common: "El Salvador" },
  flag: { url: "https://flagcdn.com/sv.svg" },
    population: 6486201,
    capital: ["San Salvador"],
  region: "Americas",
  code: { alpha_2: "SV" }
};

export const paisDos: Country = {
  names: { common: "Japan" },
  flag: { url: "https://flagcdn.com/jp.svg" },
  population: 12583602,
  capital: ["Tokyo"],   
  region: "Asia",
  code: { alpha_2: "JP" }
};

export const paisTres: Country = {
  names: { common: "Canada" },
  flag: { url: "https://flagcdn.com/ca.svg" },
  population: 38005238,
  capital: ["Ottawa"],
region: "Americas",
  code: { alpha_2: "CA" }
};

export const countriesDemo: Country[] = [paisUno, paisDos, paisTres];