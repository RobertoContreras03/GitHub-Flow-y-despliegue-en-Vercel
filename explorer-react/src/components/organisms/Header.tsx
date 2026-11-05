import type { JSX, ReactNode } from 'react';
import { SearchBar } from '../molecules/SearchBar';
import { RegionFilter } from '../molecules/RegionFilter';

interface HeaderProps {
  children: ReactNode;
  query: string;
  region: string;
  regions: string[];
  onQueryChange: (value: string) => void;
  onRegionChange: (value: string) => void;
}

export function Header({
  children,
  query,
  region,
  regions,
  onQueryChange,
  onRegionChange,
}: HeaderProps): JSX.Element {
  return (
    <header className="mb-8">
      {/* Título de la app recibido desde App.tsx */}
      <div className="mb-6">{children}</div>

      {/* Contenedor de controles */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <SearchBar query={query} onQueryChange={onQueryChange} />
        <RegionFilter
          region={region}
          regions={regions}
          onRegionChange={onRegionChange}
        />
      </div>
    </header>
  );
}