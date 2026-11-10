import { useState } from 'react';
import type { Country } from '../assets/types/country';
import { filterCountries } from '../data/utils/filter';
export interface UseSearchReturn {
  query: string;
  region: string;
  regions: string[];
  filteredCountries: Country[];
  setQuery: (query: string) => void;
  setRegion: (region: string) => void;
  handleClearFilters: () => void;
}
export function useSearch(countries: Country[]): UseSearchReturn {
  const [query, setQuery] = useState<string>('');
  const [region, setRegion] = useState<string>('');
  const regions: string[] = Array.from(
    new Set(countries.map((country) => country.region))
  )
    .filter((item) => item?.trim().length > 0)
    .sort();

  const filteredCountries = filterCountries(countries, query, region);

  const handleClearFilters = (): void => {
    setQuery('');
    setRegion('');
  };

  return {
    query,
    region,
    regions,
    filteredCountries,
    setQuery,
    setRegion,
    handleClearFilters
  };
}