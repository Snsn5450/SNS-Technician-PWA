const C = 'sns-tech-v2';
const A = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

/* =========================
   OFFLINE CACHE
========================= */

self.addEventListener('install', event => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(C).then(cache => cache.addAll(A))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    Promise.all([
      self.clients.claim(),

      caches.keys().then(keys =>
        Promise.all(
          keys
            .filter(key => key !== C)
            .map(key => caches.delete(key))
        )
      )
    ])
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .catch(() =>
        caches.match(event.request)
          .then(response =>
            response || caches.match('./index.html')
          )
      )
  );
});


/* =========================
   FIREBASE CLOUD MESSAGING
========================= */

importScripts(
  'https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js'
);

importScripts(
  'https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js'
);

firebase.initializeApp({

  apiKey: "AIzaSyDd-3gnrRVVUxl0eGavhrwzz7knHMHkRDY",

  authDomain:
    "sns-maintenance-app.firebaseapp.com",

  projectId:
    "sns-maintenance-app",

  storageBucket:
    "sns-maintenance-app.firebasestorage.app",

  messagingSenderId:
    "596031864320",

  appId:
    "1:596031864320:web:72c0f26c27e90b400ea2e5"

});


const messaging = firebase.messaging();


messaging.onBackgroundMessage(payload => {

  console.log(
    '[SNS] Background message received:',
    payload
  );

});
