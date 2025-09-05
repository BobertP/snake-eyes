// service-worker.js
const CACHE_NAME = 'se-v3'; // bump this on every deploy that changes assets
const PRECACHE_URLS = [
  // Don't pre-cache '/' or '/index.html' to avoid serving stale HTML
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
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_URLS))
  );
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

// Network-first for HTML; cache-first for other GETs
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const isHTML = req.headers.get('accept')?.includes('text/html');

  if (isHTML) {
    // Always try network first for HTML to get the latest deploy
    event.respondWith(
      fetch(req).catch(() => caches.match('/index.html'))
    );
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

// Optional: allow page to tell SW to update immediately
self.addEventListener('message', event => {
  if (event.data === 'skip-waiting') self.skipWaiting();
});
