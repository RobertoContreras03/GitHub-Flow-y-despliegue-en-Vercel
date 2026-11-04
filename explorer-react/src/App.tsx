import type { JSX } from 'react';
import { Header } from './components/organisms/Header';
import { CountryGrid } from './components/organisms/CountryGrid';
import { countriesDemo } from './data/countries-demo';

export default function App(): JSX.Element {
  // Manejador que recibe el código del país desde el botón de la tarjeta
  const handleSelect = (code: string): void => {
    console.log("Código de país seleccionado:", code);
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl">
        
        <Header>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Explorer App
          </h1>
        </Header>

        <CountryGrid 
          countries={countriesDemo} 
          onSelect={handleSelect} 
        />

      </div>
    </main>
  );
}