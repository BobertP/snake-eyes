// Bump this to invalidate old caches
const CACHE_NAME = 'se-v5';

const PRECACHE_URLS = [
  // Do NOT precache '/' or '/index.html' (avoid stale HTML)
  '/style.css',
  '/script.js',
  '/manifest.webmanifest',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/dice-six-faces-one.svg',
  '/icons/dice-six-faces-two.svg',
  '/icons/dice-six-faces-three.svg',
  '/icons/dice-six-faces-four.svg',
  '/icons/dice-six-faces-five.svg',
  '/icons/dice-six-faces-six.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_URLS)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const isHTML = req.headers.get('accept')?.includes('text/html');
  if (isHTML) {
    // Network-first for HTML
    event.respondWith(fetch(req).catch(() => caches.match('/index.html')));
    return;
  }

  // Cache-first for static assets
  event.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;
      return fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
        return res;
      });
    })
  );
});
