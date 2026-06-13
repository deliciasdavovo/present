/* Service worker do Presente: deixa o app inteiro disponível offline. */
var CACHE = "presente-v3";

var APP_SHELL = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "css/style.css",
  "js/app.js",
  "js/breath.js",
  "js/timer.js",
  "js/audio.js",
  "js/data/palavras.js",
  "js/data/visualizacao.js",
  "js/data/gratidao.js",
  "js/data/respiracao.js",
  "js/data/movimentos.js",
  "js/data/contemplacao.js",
  "js/data/musicas.js",
  "js/data/humor.js",
  "js/data/bondade.js",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/icon-maskable-512.png"
];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) { return c.addAll(APP_SHELL); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; })
        .map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  var url = new URL(e.request.url);

  // Imagens de contemplação (picsum): cache na primeira visita, usa o cache depois.
  if (url.hostname.indexOf("picsum.photos") !== -1) {
    e.respondWith(
      caches.open(CACHE + "-img").then(function (c) {
        return c.match(e.request).then(function (hit) {
          if (hit) return hit;
          return fetch(e.request).then(function (res) {
            if (res && (res.ok || res.type === "opaque")) c.put(e.request, res.clone());
            return res;
          });
        });
      })
    );
    return;
  }

  // App shell e fontes: cache primeiro, rede como reserva (e atualiza o cache).
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(function (hit) {
      var fetched = fetch(e.request).then(function (res) {
        if (res && res.ok && url.origin === location.origin) {
          var copy = res.clone();
          caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
        }
        return res;
      }).catch(function () { return hit; });
      return hit || fetched;
    })
  );
});
