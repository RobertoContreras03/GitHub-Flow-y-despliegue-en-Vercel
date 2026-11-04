import { useState } from 'react';
import type { JSX } from 'react';
import { Header } from './components/organisms/Header';
import { CountryGrid } from './components/organisms/CountryGrid';
import { countriesDemo } from './data/countries-demo';
import { filterCountries } from './data/utils/filter';

export default function App(): JSX.Element {
  // 1. Declaración de estados
  const [query, setQuery] = useState<string>('');
  const [region, setRegion] = useState<string>('');

  // 2. Resultado derivado (calculado en cada render)
  const filteredCountries = filterCountries(countriesDemo, query, region);

  const handleSelect = (code: string): void => {
    console.log("Código de país seleccionado:", code);
  };

  const handleClearFilters = (): void => {
    setQuery('');
    setRegion('');
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl">
        <Header>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Explorer App
          </h1>
        </Header>

        {/* Controles de Búsqueda y Filtro */}
        <section className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex w-full flex-col gap-2 sm:w-1/2">
            <label htmlFor="search" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Buscar país
            </label>
            <input
              id="search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ej. El Salvador..."
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 focus:border-blue-500 focus:outline-none dark:border-slate-600 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div className="flex w-full flex-col gap-2 sm:w-1/3">
            <label htmlFor="region" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Filtrar por región
            </label>
            <select
              id="region"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 focus:border-blue-500 focus:outline-none dark:border-slate-600 dark:bg-slate-800 dark:text-white"
            >
              <option value="">Todas las regiones</option>
              <option value="Africa">África</option>
              <option value="Americas">América</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europa</option>
              <option value="Oceania">Oceanía</option>
            </select>
          </div>
        </section>

        {/* Indicador de resultados y limpieza */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Mostrando {filteredCountries.length} {filteredCountries.length === 1 ? 'país' : 'países'}
          </p>
          
          {(query !== '' || region !== '') && (
            <button
              onClick={handleClearFilters}
              className="text-sm font-semibold text-blue-600 hover:underline dark:text-blue-400"
            >
              Limpiar filtros
            </button>
          )}
        </div>

        {/* Renderizado Condicional: Grid o Mensaje Vacío */}
        {filteredCountries.length > 0 ? (
          <CountryGrid countries={filteredCountries} onSelect={handleSelect} />
        ) : (
          <div className="rounded-xl border-2 border-dashed border-slate-300 py-16 text-center dark:border-slate-700">
            <p className="text-lg font-medium text-slate-600 dark:text-slate-400">
              No se encontraron países que coincidan con los filtros.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}