import './style.css';
import type { Country, CountriesResponse } from './counter';
import { filterCountries, debounce } from './utils/filters';
import { renderLoading, renderEmpty, renderError } from './render/states';
import { renderCountryDetail } from './render/detail';
import { renderCountryCard } from './render/countryCard';

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

  paisesContainer.innerHTML = countries.map(country => renderCountryCard(country)).join('');
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