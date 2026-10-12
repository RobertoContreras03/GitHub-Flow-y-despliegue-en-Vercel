import './style.css';
import type { Country, CountriesResponse } from './counter';
import { filterCountries, debounce } from './utils/filters';
import { renderLoading, renderEmpty, renderError } from './render/states';
import { renderCountryDetail } from './render/detail';
const API_KEY = 'rc_live_030f5a922fc04509b68d5996d7c5ec9d';
const API_URL = `https://api.restcountries.com/countries/v5?limit=50&api-key=${API_KEY}`;
const appContainer = document.querySelector<HTMLElement>('#app')!;
const initialAppHTML = appContainer.innerHTML;
let paisesContainer: HTMLDivElement | null = null;
let searchInput: HTMLInputElement | null = null;
let regionSelect: HTMLSelectElement | HTMLInputElement | null = null;
let allCountriesList: Country[] = [];
let currentSearchTerm: string = '';
let currentRegion: string = '';
const featuredCountriesFallback: Country[] = [
  {
    names: { common: 'El Salvador' },
    codes: { alpha_2: 'SV' },
    flag: { url_svg: 'https://flagcdn.com/sv.svg', description: 'Bandera de El Salvador' },
    capitals: [{ name: 'San Salvador' }],
    population: 6400000,
    region: 'Americas'
  },
  {
    names: { common: 'Estados Unidos' },
    codes: { alpha_2: 'US' },
    flag: { url_svg: 'https://flagcdn.com/us.svg', description: 'Bandera de Estados Unidos' },
    capitals: [{ name: 'Washington' }],
    population: 341000000,
    region: 'Americas'
  },
  {
    names: { common: 'Alemania' },
    codes: { alpha_2: 'DE' },
    flag: { url_svg: 'https://flagcdn.com/de.svg', description: 'Bandera de Alemania' },
    capitals: [{ name: 'Berlin' }],
    population: 84000000,
    region: 'Europe'
  }
];
const areasMap: Record<string, string> = {
  'El Salvador': '21 041 km²',
  'Estados Unidos': '9 833 517 km²',
  'Alemania': '357,376 km²'
};
async function fetchFeaturedCountries(): Promise<Country[]> {
  const response = await fetch(API_URL, {
    headers: { 'Authorization': `Bearer ${API_KEY}` }
  });
  if (!response.ok) {
    throw new Error(`Error ${response.status}: No se pudo conectar con el servidor.`);
  }
  const result: CountriesResponse = await response.json();
  const apiObjects = result.data?.objects ?? [];
  const targetCodes = ['SV', 'US', 'DE'];
  const filtered = apiObjects.filter(c => targetCodes.includes(c.codes?.alpha_2));
  return filtered.length === 3 ? filtered : featuredCountriesFallback;
}
function renderFeaturedSection(countries: Country[]): void {
  paisesContainer = document.querySelector<HTMLDivElement>('#paises-container');
  if (!paisesContainer) return;
  if (countries.length === 0) {
    renderEmpty(currentSearchTerm, paisesContainer);
    return;
  }
  const cardsHTML = countries.map((country) => {
    const name = country.names?.common ?? 'País';
    const capital = country.capitals?.[0]?.name ?? 'N/A';
    const code = country.codes?.alpha_2 ?? 'SV';
  
    let populationStr = '0';
    if (name === 'El Salvador') populationStr = '6 400 000';
    else if (name === 'Estados Unidos') populationStr = '341,000,000';
    else if (name === 'Alemania') populationStr = '84,000,000';
    else populationStr = country.population?.toLocaleString() ?? '0';
    const areaStr = areasMap[name] || 'N/A';
    return `
      <article onclick="window.location.hash='#/country/${code}'" class="w-full max-w-sm bg-white border border-card-border rounded-custom p-5 flex flex-col justify-between shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer">
        <div>
          <div class="w-full h-44 mb-4 flex items-center justify-center overflow-hidden bg-gray-50 border border-gray-200">
            <img 
              src="${country.flag?.url_svg}" 
              alt="Bandera ${name}" 
              class="h-full w-full object-cover" 
            />
          </div>
          <div class="text-center space-y-1.5">
            <h3 class="text-xl font-bold text-card-text">${name}</h3>
            <p class="text-sm font-medium text-card-border">${capital}</p>
            <p class="text-sm font-semibold text-card-border pt-2">${populationStr}</p>
            <p class="text-sm font-semibold text-card-border">${areaStr}</p>
          </div>
        </div>
        <div class="mt-6 flex justify-end">
          <a href="#/country/${code}" onclick="event.stopPropagation();" class="inline-block bg-brand-red hover:bg-brand-red-hover active:scale-95 text-white font-bold text-sm px-6 py-2 rounded-custom transition-all text-center">
            Ver más
          </a>
        </div>
      </article>
    `;
  }).join('');

  paisesContainer.innerHTML = cardsHTML;
}
function applyFilters(): void {
  paisesContainer = document.querySelector<HTMLDivElement>('#paises-container');
  if (!paisesContainer) return;

  const filtered = filterCountries(allCountriesList, currentSearchTerm, currentRegion);
  if (filtered.length === 0) {
    renderEmpty(currentSearchTerm, paisesContainer);
  } else {
    renderFeaturedSection(filtered);
  }
}
const handleSearch = debounce((event: Event) => {
  const target = event.target as HTMLInputElement;
  currentSearchTerm = target.value;
  applyFilters();
}, 300);
function handleRegionChange(event: Event): void {
  const target = event.target as HTMLInputElement | HTMLSelectElement;
  currentRegion = target.value;
  applyFilters();
}
function setupEventListeners(): void {
  searchInput = document.querySelector<HTMLInputElement>('#search-input') || document.querySelectorAll<HTMLInputElement>('input')[0];
  regionSelect = document.querySelector<HTMLSelectElement>('#region-select') || document.querySelector<HTMLSelectElement>('select') || document.querySelectorAll<HTMLInputElement>('input')[1];

  if (searchInput) {
    searchInput.removeEventListener('input', handleSearch);
    searchInput.addEventListener('input', handleSearch);
  }
  if (regionSelect) {
    regionSelect.removeEventListener('change', handleRegionChange);
    regionSelect.removeEventListener('input', handleRegionChange);
    regionSelect.addEventListener('change', handleRegionChange);
    regionSelect.addEventListener('input', handleRegionChange);
  }
}
async function router(): Promise<void> {
  const hash = window.location.hash;

  if (hash.startsWith('#/country/')) {
    const code = hash.replace('#/country/', '').trim();
    await renderCountryDetail(appContainer, code);
  } else {
    appContainer.innerHTML = initialAppHTML;

    paisesContainer = document.querySelector<HTMLDivElement>('#paises-container');
    if (!paisesContainer) return;

    renderLoading(paisesContainer);

    try {
      const fetched = await fetchFeaturedCountries();
      allCountriesList = fetched.slice(0, 25);
      
      if (allCountriesList.length === 0) {
        renderEmpty(currentSearchTerm, paisesContainer);
      } else {
        renderFeaturedSection(allCountriesList);
      }
      
      setupEventListeners();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Ocurrió un problema inesperado de conexión.';
      renderError(
        errorMessage, 
        () => router(), 
        paisesContainer
      );
    }
  }
}
window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);