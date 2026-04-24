const CACHE_NAME = 'fitness-hq-v1';

const PAGES = [
  '/fitness-hq/workout-reference-guide.html',
  '/fitness-hq/fitness-ecosystem-master-plan-v1.2.html',
  '/fitness-hq/calisthenics-master-plan-v2.0.html',
  '/fitness-hq/fitness-nutrition-systems-v3.1.html',
  '/fitness-hq/warm-up-routines-v1.2.html',
  '/fitness-hq/yoga-strap-flexibility-routine.html',
  '/fitness-hq/targeted-practice.html',
  '/fitness-hq/checkin-summary.html',
  '/fitness-hq/yoga-app-ecosystem-master-plan-v5.1.html',
  '/fitness-hq/smoothie-lab.html',
  '/fitness-hq/workout-logger.html',
  '/fitness-hq/check-in-app.html',
  '/fitness-hq/icons/icon-192.png',
  '/fitness-hq/icons/icon-512.png',
];

// Install — cache all pages
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PAGES))
  );
  self.skipWaiting();
});

// Activate — clear old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch — network first, fall back to cache
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
