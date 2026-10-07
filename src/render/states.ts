export function renderLoading(container: HTMLElement): void {
  const skeletonCard = `
    <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-200 animate-pulse flex flex-col gap-3">
      <div class="w-full h-36 bg-gray-300 rounded-lg"></div>
      <div class="h-5 bg-gray-300 rounded w-3/4"></div>
      <div class="h-4 bg-gray-200 rounded w-1/2"></div>
      <div class="h-4 bg-gray-200 rounded w-2/3"></div>
    </div>
  `;

  container.innerHTML = `
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
      ${skeletonCard.repeat(8)}
    </div>
  `;
}
export function renderEmpty(query: string, container: HTMLElement): void {
  container.innerHTML = `
    <div class="flex flex-col items-center justify-center py-16 px-4 text-center w-full">
      <div class="w-20 h-20 bg-sky-100 rounded-full flex items-center justify-center mb-4 text-sky-600">
        <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </div>
      <h3 class="text-2xl font-bold text-gray-800 mb-2">País no encontrado</h3>
      <p class="text-gray-600 max-w-md mb-2">
        No encontramos ningún resultado que coincida con <span class="font-semibold text-sky-600">"${query}"</span>.
      </p>
      <p class="text-sm text-gray-400">Verifica la ortografía o intenta buscar por región o capital.</p>
    </div>
  `;
}
export function renderError(message: string, onRetry: () => void, container: HTMLElement): void {
  container.innerHTML = `
    <div class="flex flex-col items-center justify-center py-12 px-6 text-center w-full bg-red-50 border border-red-200 rounded-2xl max-w-2xl mx-auto my-8">
      <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4 text-red-600">
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
        </svg>
      </div>
      <h3 class="text-xl font-bold text-red-800 mb-2">Ocurrió un error al cargar la información</h3>
      <p class="text-red-600 mb-6 max-w-md">${message || 'No fue posible conectar con el servidor.'}</p>
      <button id="btn-retry" class="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200 flex items-center gap-2 cursor-pointer">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.01M20 20v-5h-.01M4 9a9 9 0 0115.357-2m1.3 7a9 9 0 01-15.357 2"></path>
        </svg>
        Reintentar
      </button>
    </div>
  `;
  const retryBtn = container.querySelector('#btn-retry');
  if (retryBtn) {
    retryBtn.addEventListener('click', onRetry);
  }
}