import type { JSX } from 'react';
import { SiteHeader } from './components/organisms/SiteHeader';
import { Header } from './components/organisms/Header';
import { CountryGrid } from './components/organisms/CountryGrid';
import { useCountries } from './hooks/useCountries';
import { useSearch } from './hooks/useSearch';

export default function App(): JSX.Element {
 
  const { countries, isLoading, error } = useCountries();
  const { 
    query, 
    region, 
    regions, 
    filteredCountries, 
    setQuery, 
    setRegion, 
    handleClearFilters 
  } = useSearch(countries);

  const handleSelect = (code: string): void => {
    console.log("Código de país seleccionado:", code);
  };

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-slate-100 px-4 py-10 dark:bg-slate-950">
        <div className="mx-auto max-w-6xl">
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

          {}
          {isLoading && (
            <div className="flex flex-col items-center py-20 text-slate-600 dark:text-slate-400">
              <svg className="mb-4 h-10 w-10 animate-spin text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-lg font-medium">Cargando países...</p>
            </div>
          )}

          {}
          {error && !isLoading && (
            <div className="rounded-xl border-2 border-red-300 bg-red-50 py-16 text-center text-red-600 dark:border-red-800 dark:bg-red-950/30">
              <p className="text-lg font-medium">⚠️ Ocurrió un problema: {error}</p>
            </div>
          )}

          {}
          {!isLoading && !error && (
            <>
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

              {filteredCountries.length > 0 ? (
                <CountryGrid countries={filteredCountries} onSelect={handleSelect} />
              ) : (
                <div className="rounded-xl border-2 border-dashed border-slate-300 py-16 text-center dark:border-slate-700">
                  <p className="text-lg font-medium text-slate-600 dark:text-slate-400">
                    No se encontraron países que coincidan con los filtros.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </>
  );
}