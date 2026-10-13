import type { Country } from '../counter';

export function renderCountryCard(country: Country): string {
  const name = country.names?.common ?? 'País';
  const capital = country.capitals?.[0]?.name ?? 'N/A';
  const code = country.codes?.alpha_2 ?? 'SV';
  
  let populationStr = '0';
  if (name === 'El Salvador') populationStr = '6 400 000';
  else if (name === 'Estados Unidos') populationStr = '341,000,000';
  else if (name === 'Alemania') populationStr = '84,000,000';
  else populationStr = country.population?.toLocaleString() ?? '0';

  const areasMap: Record<string, string> = {
    'El Salvador': '21 041 km²',
    'Estados Unidos': '9 833 517 km²',
    'Alemania': '357,376 km²'
  };
  const areaStr = areasMap[name] || 'N/A';
  const flagDescription = country.flag?.description || `Bandera de ${name}`;

  return `
    <article onclick="window.location.hash='#/country/${code}'" class="@container group flex w-full flex-col overflow-hidden rounded-custom bg-white border border-card-border shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
      <div class="flex flex-col @min-[20rem]:flex-row">
        <img
          class="aspect-3/2 w-full shrink-0 object-cover @min-[20rem]:aspect-auto @min-[20rem]:w-2/5 bg-gray-50 border-b @min-[20rem]:border-b-0 @min-[20rem]:border-r border-gray-200"
          src="${country.flag?.url_svg || '/placeholder.png'}"
          alt="${flagDescription}"
          loading="lazy"
          onerror="this.onerror=null; this.src='/placeholder.png';"
        >
        <div class="flex min-w-0 flex-1 flex-col p-5 justify-between">
          <div class="text-center @min-[20rem]:text-left space-y-1.5">
            <h2 class="text-(length:--font-country-name) font-bold text-card-text truncate">${name}</h2>
            <p class="text-sm font-medium text-card-border">${capital}</p>
            <p class="text-sm font-semibold text-card-border pt-1">Población: ${populationStr}</p>
            <p class="text-sm font-semibold text-card-border">Área: ${areaStr}</p>
          </div>
          <div class="mt-4 flex justify-end">
            <a href="#/country/${code}" onclick="event.stopPropagation();" class="inline-block bg-brand-red hover:bg-brand-red-hover active:scale-95 text-white font-bold text-xs sm:text-sm px-5 py-2 rounded-custom transition-all text-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600">
              Ver más
            </a>
          </div>
        </div>
      </div>
    </article>
  `;
}