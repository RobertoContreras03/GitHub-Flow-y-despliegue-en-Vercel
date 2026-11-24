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

    const fetchCountries = async (): Promise<void> => {
      setIsLoading(true);
      setError(null);

      try {
        await new Promise((resolve) => setTimeout(resolve, 800));

        if (signal.aborted) {
          return;
        }

        setCountries(countriesDemo);
      } catch (err: unknown) {
        if (!signal.aborted) {
          setError(
            err instanceof Error
              ? err.message
              : 'Ocurrió un error al cargar los datos de países.'
          );
        }
      } finally {
        if (!signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    void fetchCountries();

    return () => {
      controller.abort();
    };
  }, []);

  return { countries, isLoading, error };
}