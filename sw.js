const CACHE_NAME = 'me4261-cache-v1';

// 📦 1. The list of project files your app needs to function offline
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
  './icon-192.png',
  './icon-512.png'
];

// 🚀 2. Install Event: Triggered when the student adds the app to their phone
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('PWA: Caching app assets');
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting(); // Forces the waiting service worker to become active immediately
});

// 🔄 3. Activate Event: Cleans up old caches from previous versions of your course portal
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('PWA: Clearing old cache', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim(); // Takes control of all open pages immediately
});

// 🌐 4. Fetch Event: Intercepts network requests to serve assets instantly from the local cache
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      // Return the cached file if found, otherwise fetch it fresh from your GitHub backend
      return cachedResponse || fetch(e.request).catch(() => {
        // Optional fallback handling can be added here if the user is completely offline
      });
    })
  );
});
