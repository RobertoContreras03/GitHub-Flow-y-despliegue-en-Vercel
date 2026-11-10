import type { JSX } from 'react';
import { Routes, Route } from 'react-router-dom';
import { SiteHeader } from './components/organisms/SiteHeader';
import { HomePage } from './components/pages/HomePage';
import { CountryDetailPage } from './components/pages/CountryDetailPage';

export default function App(): JSX.Element {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-slate-100 px-4 py-10 dark:bg-slate-950">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/country/:code" element={<CountryDetailPage />} />
        </Routes>
      </main>
    </>
  );
}