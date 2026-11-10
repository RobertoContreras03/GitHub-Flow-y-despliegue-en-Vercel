import type { JSX } from "react";
import { Link, useParams } from "react-router-dom";
import { useCountryDetail } from "../../hooks/useCountryDetail";
import type { Country } from "../../assets/types/country";
import { getCountryRouteCode } from "../../data/utils/country-codes";

function CountryDetailContent({ country }: { country: Country }): JSX.Element {
  
  const borders: string[] = country.borders ?? [];

  return (
    <article className="mt-12 grid items-center gap-10 lg:mt-16 lg:grid-cols-2 lg:gap-16">
      <img
        src={country.flag.url}
        alt={`Bandera de ${country.names.common}`}
        className="aspect-[3/2] w-full rounded-lg object-contain shadow-sm bg-white"
      />

      <div className="min-w-0">
        <h1 className="text-3xl font-bold sm:text-4xl">{country.names.common}</h1>
        <div className="mt-8 grid gap-8 text-sm leading-6 sm:grid-cols-2">
          <dl className="space-y-2">
            <div><dt className="inline font-bold">Nombre: </dt><dd className="inline break-words">{country.names.common}</dd></div>
            <div><dt className="inline font-bold">Población: </dt><dd className="inline">{country.population.toLocaleString("en-US")}</dd></div>
            <div><dt className="inline font-bold">Región: </dt><dd className="inline">{country.region}</dd></div>
            <div><dt className="inline font-bold">Capital: </dt><dd className="inline">{country.capital?.[0] || "No disponible"}</dd></div>
          </dl>
          <dl className="space-y-2">
            <div><dt className="inline font-bold">Código: </dt><dd className="inline">{country.code?.alpha_2 ?? country.cca3 ?? "No disponible"}</dd></div>
          </dl>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <h2 className="text-sm font-semibold">Países fronterizos: </h2>
          {borders.length === 0 ? (
            <p className="text-sm">Sin fronteras terrestres.</p>
          ) : (
            borders.map((border: string): JSX.Element => {
              const routeCode: string | undefined = getCountryRouteCode(border);
              return routeCode ? (
                <Link
                  key={border}
                  to={`/country/${encodeURIComponent(routeCode.toLowerCase())}`}
                  className="inline-flex min-h-11 min-w-16 items-center justify-center rounded-lg bg-white px-4 py-2 text-sm text-neutral-900 shadow-sm border border-slate-200 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:hover:bg-slate-700"
                  aria-label={`Ver país fronterizo ${border}`}
                >
                  {border}
                </Link>
              ) : (
                <span key={border} className="rounded-lg border border-slate-200 px-4 py-2 text-sm">
                  {border} (no disponible)
                </span>
              );
            })
          )}
        </div>
      </div>
    </article>
  );
}

export function CountryDetailPage(): JSX.Element {
  const { code } = useParams<{ code: string }>();
  const { state, retry } = useCountryDetail(code);

  return (
    <div className="flex min-h-screen flex-col bg-neutral-50 text-neutral-900 dark:bg-slate-950 dark:text-white">
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex min-h-11 items-center justify-center rounded-md bg-white shadow-sm border border-slate-200 px-8 py-2 font-medium text-neutral-900 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:hover:bg-slate-700"
        >
          &larr; Atrás
        </Link>

        {state.status === "loading" && (
          <p role="status" className="mt-12 text-slate-500">Cargando información del país...</p>
        )}

        {state.status === "error" && (
          <section className="mt-12 rounded-lg border border-red-300 bg-red-50 p-6 dark:border-red-800 dark:bg-red-950/30">
            <h1 className="text-2xl font-bold text-red-600">No se pudo mostrar el país</h1>
            <p role="alert" className="mt-3 text-red-500">{state.message}</p>
            <button
              type="button"
              onClick={retry}
              className="mt-5 min-h-11 rounded-md bg-white border border-red-300 px-5 py-2 font-semibold text-red-600 hover:bg-red-50"
            >
              Reintentar
            </button>
          </section>
        )}

        {state.status === "success" && (
          <CountryDetailContent country={state.data} />
        )}
      </main>
    </div>
  );
}