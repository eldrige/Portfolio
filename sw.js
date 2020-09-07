const cacheName = "version 1";

const cacheAssets = ["index.html", "assets"];

// call install event
self.addEventListener("install", (e) => {
  console.log("Service worker: Installed");
  e.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        console.log("service worker : cachin files");
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});

// call activate event
self.addEventListener("activate", (e) => {
  console.log("Service worker: Activated");
  //   remove unwanted caches
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            console.log("service worker: Clearnig old cache");
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

//  call fetch event

self.addEventListener("fetch", (e) => {
  console.log("Service worker: fetching");
  // check if your online, if yes serve normally
  e.respondWith(fetch(e.request))
    // else load form cache storage
    .catch(() => {
      caches.match(e.request);
    });
});
