import { useState } from 'react';
import type { JSX } from 'react';

export function SiteHeader(): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm dark:bg-slate-900">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        {/* Logo / Título */}
        <div className="text-xl font-bold text-slate-900 dark:text-white">
          Where in the world?
        </div>

        {/* Botón menú móvil */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="block md:hidden text-slate-900 dark:text-white"
          aria-label="Alternar menú"
        >
          {isMenuOpen ? '✖' : '☰'}
        </button>

        {/* Navegación Escritorio */}
        <div className="hidden md:flex gap-6 text-sm font-medium text-slate-700 dark:text-slate-200">
          <a href="#" className="hover:text-blue-600">Inicio</a>
          <a href="#" className="hover:text-blue-600">Favoritos</a>
        </div>
      </div>

      {/* Menú Móvil Desplegable */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col gap-4 text-sm font-medium text-slate-700 dark:text-slate-200">
            <a href="#" className="hover:text-blue-600">Inicio</a>
            <a href="#" className="hover:text-blue-600">Favoritos</a>
          </div>
        </div>
      )}
    </nav>
  );
}