import type { JSX } from 'react';
import type { Country } from '../../assets/types/country';
import { CountryCard } from '../molecules/CountryCard';

interface CountryGridProps {
  countries: Country[];
  onSelect: (code: string) => void;
}

export function CountryGrid({ countries, onSelect }: CountryGridProps): JSX.Element {
  return (
    <section aria-label="Países de ejemplo" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {countries.map((country) => (
        <CountryCard
          key={country.cca3 ?? country.names.common}
          country={country}
          onSelect={onSelect}
        />
      ))}
    </section>
  );
}