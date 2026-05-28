const CACHE_NAME = 'me4261-cache-v2';

const ASSETS = [
  './',
  './index.html',
  './login.html',
  './faculty_login.html',
  './SDB.html',
  './faculty.html',
  './results.html',
  './feedback.html',
  './mocktest.html',
  './test.html',
  './config.js',
  './manifest.json',
  './offline.html',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
  );

  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );

  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request)
      .then((response) => {
        return response || fetch(e.request)
          .catch(() => caches.match('./offline.html'));
      })
  );
});
