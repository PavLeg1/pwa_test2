// self.addEventListener("install", ...); // Кэширует файлы
// self.addEventListener("activate", ...); // Удаляет старые кэши
// self.addEventListener("fetch", ...); // Обслуживает запросы из кэша или интернета

const CACHE_NAME = 'pwa-visitka-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/manifest.json',
  '/icons/github_icon.png',
  '/icons/photo.png'
  '/images/phone_qr.png',
  '/images/tg_qr.png',
  '/images/wechat_qr.png',
  '/offline.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        
        return fetch(event.request).catch(() => {
          // Если запрос не удался и это HTML-страница, показываем offline.html
          if (event.request.headers.get('accept').includes('text/html')) {
            return caches.match('/offline.html');
          }
        });
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});