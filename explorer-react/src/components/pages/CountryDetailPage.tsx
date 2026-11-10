import type { JSX } from 'react';
import { useParams, Link } from 'react-router-dom';

export function CountryDetailPage(): JSX.Element {
  
  const { code } = useParams<{ code: string }>();

  return (
    <div className="mx-auto max-w-6xl py-10">
      <Link 
        to="/" 
        className="mb-8 inline-flex items-center gap-2 rounded-md bg-white px-6 py-2 text-sm font-medium shadow-sm hover:bg-slate-50 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
      >
        <span>&larr;</span> Volver al inicio
      </Link>
      
      <div className="rounded-xl bg-white p-10 text-center shadow-sm dark:bg-slate-800">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Página de detalle en construcción
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Has navegado correctamente a la ruta del país con código:{' '}
          <span className="font-mono text-xl font-bold text-blue-600">{code?.toUpperCase()}</span>
        </p>
      </div>
    </div>
  );
}