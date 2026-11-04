import type { Country } from '../../assets/types/country';

export function filterCountries(countries: Country[], query: string, region: string): Country[] {
  return countries.filter(country => {
    const name = country.names.common;
    const matchesQuery = name.toLowerCase().includes(query.toLowerCase());
    const matchesRegion = region === '' || country.region === region;
    
    return matchesQuery && matchesRegion;
  });
}