const VERSION = '14.0.0';

function log(message) {
  console.log(VERSION, message);
}


const precachedAssets = [
  '',
  '/offline.html',
  '/index.html',
  '/main.js',
  '/styles.js',
  '/styles.css',
  '/polyfills.js',
  '/runtime.js',
  '/vendor.js',
  '/src_app_products_products_module_ts.js'
];


self.addEventListener('install', (event) => {
  log('Service Worker Instalado');

  event.waitUntil(installServiceWorker());

});

async function installServiceWorker() {

  self.skipWaiting();

  log('Instalando o service workers');
  const cache = await caches.open(getCacheVersion());
  return cache.addAll(precachedAssets);
}

self.addEventListener('fetch', (event) => {
  log('Fetch interceptad: ' + event.request.url);
});

self.addEventListener('activate', (event) => activateSW());

async function activateSW() {
  const cacheKeys = await caches.keys();
  cacheKeys.forEach(cacheKey => {
    if (cacheKey !== getCacheVersion()) {
      caches.delete(cacheKey);
    }
  });

  return clients.claim();
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
