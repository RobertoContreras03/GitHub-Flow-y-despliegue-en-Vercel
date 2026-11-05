import type { ChangeEvent, JSX } from 'react';

interface RegionFilterProps {
  region: string;
  regions: string[];
  onRegionChange: (value: string) => void;
}

export function RegionFilter({ region, regions, onRegionChange }: RegionFilterProps): JSX.Element {
  function handleChange(event: ChangeEvent<HTMLSelectElement>): void {
    onRegionChange(event.currentTarget.value);
  }

  return (
    <div className="flex w-full flex-col gap-2 sm:w-1/3">
      <label htmlFor="country-region" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
        Filtrar por región
      </label>
      <select
        id="country-region"
        value={region}
        onChange={handleChange}
        className="rounded-lg border border-slate-300 bg-white px-4 py-2 focus:border-blue-500 focus:outline-none dark:border-slate-600 dark:bg-slate-800 dark:text-white"
      >
        <option value="">Todas las regiones</option>
        {regions.map((item) => (
          <option key={item} value={item}>
            {/* Si tienes un mapeo en español, puedes usarlo aquí, pero el 'value' siempre será en inglés para la búsqueda */}
            {item === 'Americas' ? 'América' : item === 'Europe' ? 'Europa' : item === 'Oceania' ? 'Oceanía' : item === 'Africa' ? 'África' : item}
          </option>
        ))}
      </select>
    </div>
  );
}