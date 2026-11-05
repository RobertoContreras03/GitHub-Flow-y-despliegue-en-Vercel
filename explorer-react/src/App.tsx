import { useState } from 'react';
import type { JSX } from 'react';
import { Header } from './components/organisms/Header';
import { CountryGrid } from './components/organisms/CountryGrid';
import { countriesDemo } from './data/countries-demo';
import { filterCountries } from './data/utils/filter';

export default function App(): JSX.Element {
  // 1. Fuente única de verdad (Estados)
  const [query, setQuery] = useState<string>('');
  const [region, setRegion] = useState<string>('');

  // 2. Datos derivados
  const regions: string[] = Array.from(
    new Set(countriesDemo.map((country) => country.region))
  )
    .filter((item) => item.trim().length > 0)
    .sort();

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
        
        {/* El Header ahora maneja el layout de los controles de búsqueda y filtros internamente */}
        <Header
          query={query}
          region={region}
          regions={regions}
          onQueryChange={setQuery}
          onRegionChange={setRegion}
        >
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Explorer App
          </h1>
        </Header>

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

        {/* Renderizado de resultados */}
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