import type { Country } from '../counter';
export function filterCountries(
  countries: Country[],
  searchTerm: string,
  selectedRegion: string
): Country[] {
  const cleanSearch = searchTerm.trim().toLowerCase();
  const cleanRegion = selectedRegion.trim().toLowerCase();

  return countries.filter((country) => {
    const countryName = country.names?.common ?? '';
    const countryRegion = country.region ?? '';
    const matchesName =
      cleanSearch === '' || countryName.toLowerCase().includes(cleanSearch);
    const matchesRegion =
      cleanRegion === '' ||
      cleanRegion === 'all' ||
      cleanRegion === 'todas' ||
      countryRegion.toLowerCase() === cleanRegion;
    return matchesName && matchesRegion;
  });
}
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number = 300
) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function (this: any, ...args: Parameters<T>) {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}