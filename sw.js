/* Offline support: keeps the page, fonts and icons on the device. Bump VERSION when index.html changes. */
const VERSION = 'knizhki-2';
const CORE = ['./', './index.html', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png', './icons/icon-maskable-512.png', './icons/apple-touch-icon.png',
  './fonts/sofia-sans-cyrillic-400-normal.woff2', './fonts/sofia-sans-cyrillic-600-normal.woff2', './fonts/sofia-sans-cyrillic-800-normal.woff2',
  './fonts/sofia-sans-latin-400-normal.woff2', './fonts/sofia-sans-latin-600-normal.woff2', './fonts/sofia-sans-latin-800-normal.woff2',
  './fonts/sofia-sans-extra-condensed-cyrillic-700-normal.woff2', './fonts/sofia-sans-extra-condensed-cyrillic-900-normal.woff2',
  './fonts/sofia-sans-extra-condensed-latin-700-normal.woff2', './fonts/sofia-sans-extra-condensed-latin-900-normal.woff2'];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(VERSION).then((c) => c.addAll(CORE)).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  const isPage = req.mode === 'navigate' || req.url.endsWith('/index.html');
  if (isPage) {
    // the page itself: newest when online, saved copy when offline
    e.respondWith(fetch(req).then((res) => { const copy = res.clone(); caches.open(VERSION).then((c) => c.put('./index.html', copy)); return res; }).catch(() => caches.match('./index.html')));
    return;
  }
  e.respondWith(caches.match(req).then((hit) => hit || fetch(req).then((res) => { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); return res; })));
});
