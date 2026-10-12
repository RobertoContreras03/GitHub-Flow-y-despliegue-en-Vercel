import { fetchCountryByCode } from '../api/countries';
import type { CountryDetail } from '../types/country-detail';

export async function renderCountryDetail(container: HTMLElement, code: string): Promise<void> {
  container.innerHTML = `
    <div class="flex flex-col items-center justify-center py-20 space-y-4">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-red"></div>
      <p class="text-gray-600 font-medium">Cargando detalles del país...</p>
    </div>
  `;
  const country: CountryDetail | null = await fetchCountryByCode(code);
  if (!country) {
    container.innerHTML = `
      <div class="max-w-md mx-auto text-center py-16 space-y-4 bg-white p-8 rounded-custom shadow-sm border border-gray-200">
        <h2 class="text-2xl font-bold text-red-600">País no encontrado</h2>
        <p class="text-gray-600 text-sm">No pudimos encontrar información para el código <span class="font-semibold uppercase">${code}</span>.</p>
        <div class="pt-4">
          <a href="#" class="inline-block bg-brand-red hover:bg-brand-red-hover text-white font-bold text-sm px-6 py-2.5 rounded-custom transition-all">
            Volver a países
          </a>
        </div>
      </div>
    `;
    return;
  }
  const name = country.names?.common ?? 'Desconocido';
  const officialName = country.names?.official ?? name;
  const capital = country.capitals?.[0]?.name ?? 'No registra';
  const population = country.population?.toLocaleString() ?? '0';
  const region = country.region ?? 'N/A';
  const subregion = country.subregion ?? 'N/A';
  let area = 'No disponible';
  if (country.area) {
    if (typeof country.area === 'object') {
      const firstVal = Object.values(country.area)[0];
      area = typeof firstVal === 'number' ? `${firstVal.toLocaleString()} km²` : `${firstVal} km²`;
    } else {
      area = `${Number(country.area).toLocaleString()} km²`;
    }
  }
  let languagesList = 'No especificado';
  if (country.languages) {
    if (typeof country.languages === 'object') {
      languagesList = Object.values(country.languages)
        .map((lang: any) => (typeof lang === 'object' && lang !== null ? lang.name || Object.values(lang)[0] : lang))
        .join(', ');
    }
  }
  let currenciesList = 'No especificado';
  if (country.currencies) {
    if (typeof country.currencies === 'object') {
      currenciesList = Object.values(country.currencies)
        .map((c: any) => `${c.name || ''} ${c.symbol ? `(${c.symbol})` : ''}`)
        .join(', ');
    }
  }
  container.innerHTML = `
    <div class="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      <div>
        <a href="#" class="inline-block bg-brand-red hover:bg-brand-red-hover text-white font-bold text-sm px-6 py-2.5 rounded-custom shadow-sm transition-all">
          ← Volver a países
        </a>
      </div>

      <div class="bg-white border border-card-border rounded-custom p-6 md:p-10 shadow-md grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div class="w-full h-64 flex items-center justify-center bg-gray-50 border border-gray-200 rounded-custom overflow-hidden p-4">
          <img src="${country.flag?.url_svg}" alt="Bandera de ${name}" class="max-h-full max-w-full object-contain shadow-sm" />
        </div>
        <div class="space-y-4">
          <div>
            <h1 class="text-3xl font-bold text-card-text">${name}</h1>
            <p class="text-sm text-gray-500 italic">${officialName}</p>
          </div>
          <div class="grid grid-cols-2 gap-4 text-sm text-gray-700 border-t border-b border-gray-100 py-4">
            <div>
              <p><strong class="text-gray-900">Capital:</strong> ${capital}</p>
              <p class="pt-2"><strong class="text-gray-900">Población:</strong> ${population}</p>
              <p class="pt-2"><strong class="text-gray-900">Área:</strong> ${area}</p>
            </div>
            <div>
              <p><strong class="text-gray-900">Región:</strong> ${region}</p>
              <p class="pt-2"><strong class="text-gray-900">Subregión:</strong> ${subregion}</p>
            </div>
          </div>
          <div class="space-y-2 text-sm">
            <p><strong class="text-gray-900">Idiomas:</strong> <span class="text-card-border font-medium">${languagesList}</span></p>
            <p><strong class="text-gray-900">Monedas:</strong> <span class="text-card-border font-medium">${currenciesList}</span></p>
          </div>
        </div>
      </div>
    </div>
  `;
}