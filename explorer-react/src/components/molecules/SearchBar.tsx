import type { ChangeEvent, JSX } from 'react';

interface SearchBarProps {
  query: string;
  onQueryChange: (value: string) => void;
}

export function SearchBar({ query, onQueryChange }: SearchBarProps): JSX.Element {
  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    onQueryChange(event.currentTarget.value);
  }

  return (
    <div className="flex w-full flex-col gap-2 sm:w-1/2">
      <label htmlFor="country-search" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
        Buscar país
      </label>
      <input
        id="country-search"
        type="search"
        value={query}
        onChange={handleChange}
        placeholder="Ej. El Salvador..."
        className="rounded-lg border border-slate-300 bg-white px-4 py-2 focus:border-blue-500 focus:outline-none dark:border-slate-600 dark:bg-slate-800 dark:text-white"
      />
    </div>
  );
}