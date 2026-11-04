import type { JSX, ReactNode } from 'react';

interface HeaderProps {
  children: ReactNode;
}

export function Header({ children }: HeaderProps): JSX.Element {
  return (
    <header className="mb-6">
      {children}
    </header>
  );
}