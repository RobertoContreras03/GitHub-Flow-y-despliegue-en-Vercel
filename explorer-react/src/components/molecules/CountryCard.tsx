import type { JSX } from 'react';
import type { Country } from '../../assets/types/country';
import { Flag } from '../atoms/Flag';
import { Badge } from '../atoms/badge';

interface CountryCardProps {
  country: Country;
  onSelect: (code: string) => void;
}

export function CountryCard({ country, onSelect }: CountryCardProps): JSX.Element {
  const imageUrl = country.flag.url;
  const countryName = country.names.common;

  return (
    <article className="overflow-hidden rounded-xl bg-white shadow-md transition-shadow hover:shadow-xl dark:bg-slate-800">
      <Flag src={imageUrl} alt={`Bandera de ${countryName}`} />
      
      <div className="p-5">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          {countryName}
        </h2>
        <p className="mt-3 text-slate-700 dark:text-slate-200">
          Población: {new Intl.NumberFormat('es-SV').format(country.population || 0)}
        </p>
        
        <div className="mt-2">
          Región: <Badge region={country.region} />
        </div>

        <button
          type="button"
          onClick={() => onSelect(country.cca3 ?? country.names.common)}
          className="mt-4 w-full cursor-pointer rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
        >
          Seleccionar país
        </button>
      </div>
    </article>
  );
}