importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyDJVPZFRkzWKJ58cyIfaiuPqdvY4cYYzvE",
  authDomain: "sns-maintenance-pwa.firebaseapp.com",
  projectId: "sns-maintenance-pwa",
  storageBucket: "sns-maintenance-pwa.firebasestorage.app",
  messagingSenderId: "683218813920",
  appId: "1:683218813920:web:a091496adb477c47502185"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Background notification:", payload);

  const title =
    payload.notification?.title ||
    payload.data?.title ||
    "🚨 New Maintenance Complaint";

  const options = {
    body:
      payload.notification?.body ||
      payload.data?.body ||
      "New complaint received",

    icon: "./icon-192.png",
    badge: "./icon-192.png",

    vibrate: [500, 200, 500, 200, 800],

    requireInteraction: true,

    data: {
      url: payload.data?.url || "./"
    }
  };

  self.registration.showNotification(title, options);
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const url =
    event.notification.data?.url || "./";

  event.waitUntil(
    clients.matchAll({
      type: "window",
      includeUncontrolled: true
    }).then((windowClients) => {

      for (const client of windowClients) {
        if ("focus" in client) {
          client.navigate(url);
          return client.focus();
        }
      }

      return clients.openWindow(url);
    })
  );
});
