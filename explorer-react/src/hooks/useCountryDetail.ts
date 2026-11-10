import { useEffect, useState } from "react";

import { countriesDemo } from "../data/countries-demo";
import type { Country } from "../assets/types/country";

export type CountryDetailState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; data: Country };

interface DetailRequest {
  code: string;
  state: CountryDetailState;
}

interface UseCountryDetailResult {
  state: CountryDetailState;
  retry: () => void;
}

export function useCountryDetail(code: string | undefined): UseCountryDetailResult {
  const normalizedCode: string = code?.trim().toUpperCase() ?? "";
  const [attempt, setAttempt] = useState<number>(0);
  const [request, setRequest] = useState<DetailRequest>({
    code: "",
    state: { status: "loading" },
  });

  useEffect(() => {
    if (!normalizedCode) return;
    
    let active: boolean = true;
    setRequest({ code: normalizedCode, state: { status: "loading" } });

    async function loadDetail(): Promise<void> {
      try {
        await new Promise((resolve) => setTimeout(resolve, 800)); // Simula latencia
        
        const country = countriesDemo.find(
          (c) =>
            c.code?.alpha_2.toUpperCase() === normalizedCode ||
            c.cca3?.toUpperCase() === normalizedCode
        );

        if (active) {
          if (country) {
            setRequest({ code: normalizedCode, state: { status: "success", data: country } });
          } else {
            throw new Error(`No se encontró el país con el código ${normalizedCode}`);
          }
        }
      } catch (error: unknown) {
        if (active) {
          setRequest({
            code: normalizedCode,
            state: {
              status: "error",
              message: error instanceof Error ? error.message : "No fue posible cargar el detalle del país.",
            },
          });
        }
      }
    }

    void loadDetail();

    return () => {
      active = false;
    };
  }, [normalizedCode, attempt]);

  function retry(): void {
    setAttempt((previous: number): number => previous + 1);
  }

  if (!normalizedCode) {
    return { state: { status: "error", message: "No se indicó el código del país." }, retry };
  }

  const state: CountryDetailState = request.code === normalizedCode ? request.state : { status: "loading" };
  return { state, retry };
}