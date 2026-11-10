import { useState, useEffect } from 'react';
import type { Country } from '../assets/types/country';
import { countriesDemo } from '../data/countries-demo';
export interface UseCountriesReturn {
  countries: Country[];
  isLoading: boolean;
  error: string | null;
}
export function useCountries(): UseCountriesReturn {
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
  return { countries, isLoading, error };
}