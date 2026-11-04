import type { JSX } from 'react';

interface FlagProps {
  src: string;
  alt: string;
}

export function Flag({ src, alt }: FlagProps): JSX.Element {
  return (
    <img
      src={src}
      alt={alt}
      className="h-44 w-full object-contain p-4"
      loading="lazy"
    />
  );
}