
import type { JSX } from 'react';
import type { Country } from '../assets/types/country';

interface CountryCardProps {
  country: Country;
}

export function CountryCard({ country }: CountryCardProps): JSX.Element {
  return (
    <article className="overflow-hidden rounded-xl bg-white shadow-md transition-shadow hover:shadow-xl dark:bg-slate-800">
      <img
        src={country.flag.url} 
        alt={`Bandera de ${country.names.common}`}
        className="h-44 w-full object-contain p-4"
        loading="lazy"
      />
      <div className="p-5">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          {country.names.common}
        </h2>
        <p className="mt-3 text-slate-700 dark:text-slate-200">
          Población: {new Intl.NumberFormat('es-SV').format(country.population)}
        </p>
        <p className="text-slate-700 dark:text-slate-200">
          Región: {country.region}
        </p>
      </div>
    </article>
  );
}