const VERSION = '14.0.0';

function log(message) {
  console.log(VERSION, message);
}


const precachedAssets = [
  '/',
  '/offline.html',
  '/index.html',
  '/main.js',
  '/styles.js',
  '/styles.css',
  '/polyfills.js',
  '/runtime.js',
  '/vendor.js',
  '/src_app_products_products_module_ts.js',
];


self.addEventListener('install', (event) => {
  log('Service Worker Instalado');

  //event.waitUntil(installServiceWorker());
});

async function installServiceWorker() {

  log('Instalando o service workers');
  const cache = await caches.open(getCacheVersion());

  cache.addAll(precachedAssets);
}

self.addEventListener('fetch', (event) => {
  log('Fetch interceptado para: ', event.request.url);


  event.respondWith(cacheThenNetwork(event));

});

self.addEventListener('activate', (event) => {
  log('Service Worker esta ativado.');
});

async function cacheThenNetwork(event) {

  const cache = await caches.open(getCacheVersion());

  const cachedResponse = await cache.match(event.request);

  if (cachedResponse) {
    log('From cache: ', event.request.url);
    return cachedResponse;
  }

  log('From network: ', event);
  const networkResponse = await fetch(event.request);
  return fetch(networkResponse);
}


function getCacheVersion() {
  return 'app-cache-' + VERSION;
}

async function showOfflineError(event) {
  let response;

  try {
    response = await fetch(event.request);
  }
  catch(err) {
    log('Erro ao carregar o offline.html', err);
    const cache = await caches.open(getCacheVersion());
    return reponse = cache.match('/offline.html');
  }

  return response;
}
