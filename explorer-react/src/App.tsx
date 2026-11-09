import { useState, useEffect } from 'react';
import type { JSX } from 'react';
import { SiteHeader } from './components/organisms/SiteHeader';
import { Header } from './components/organisms/Header';
import { CountryGrid } from './components/organisms/CountryGrid';
import type { Country } from './assets/types/country';
import { filterCountries } from './data/utils/filter';
import { countriesDemo } from './data/countries-demo'; // Importamos tus datos locales

export default function App(): JSX.Element {
  // 1. Estados de Interfaz (Filtros)
  const [query, setQuery] = useState<string>('');
  const [region, setRegion] = useState<string>('');

  
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
   
    const controller = new AbortController();
    const { signal } = controller;

    const fetchCountries = async () => {
      setIsLoading(true);
      setError(null);

      try {
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        
        if (signal.aborted) {
          throw new DOMException('Aborted', 'AbortError');
        }

       
        setCountries(countriesDemo);
      } catch (err: any) {
       
        if (err.name === 'AbortError') {
          console.log('Petición cancelada por limpieza (cleanup)');
        } else {
          setError('Ocurrió un error al cargar los datos');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountries();

    
    return () => {
      controller.abort();
    };
  }, []); 

 
  const regions: string[] = Array.from(
    new Set(countries.map((country) => country.region))
  )
    .filter((item) => item?.trim().length > 0)
    .sort();

  const filteredCountries = filterCountries(countries, query, region);

  const handleSelect = (code: string): void => {
    console.log("Código de país seleccionado:", code);
  };

  const handleClearFilters = (): void => {
    setQuery('');
    setRegion('');
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