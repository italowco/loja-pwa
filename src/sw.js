const VERSION = '7.0.0';

function log(message) {
  console.log(VERSION, message);
}

log('Instalando o service workers');

self.addEventListener('install', (event) => {
  log('Service Worker Instalado');

  event.waitUntil(installServiceWorker());
});

async function installServiceWorker() {
  log('Instalando o service workers');

  const request = new Request('/offline.html');

  const response = await fetch(request);

  if (response.status !== 200) {
    throw new Error('Offline page not found');
  }

  log('Carragando o offline.html', response);

  const cache = await caches.open('app-cache');

  cache.put(request, response);

  log('Cache criado');

}

self.addEventListener('fetch', (event) => event.respondWith(showOfflineError(event)));

async function showOfflineError(event) {
  let response;

  try {
    response = await fetch(event.request);
  }
  catch(err) {
    log('Erro ao carregar o offline.html', err);
    const cache = await caches.open('app-cache');
    return reponse = cache.match('/offline.html');
  }

  return response;
}


self.addEventListener('activate', (event) => {
  log('Service Worker esta ativado.');
});
