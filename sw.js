const CACHE_NAME = "pwa-cache-v1";
const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/styles.css",
  "/app.js",
  "/taskly.png"
];

// Install dan cache file
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// Fetch: ambil dari cache kalau offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
