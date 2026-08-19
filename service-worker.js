importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyDJVPZFRkzWKJ58cyIfaiuPqdvY4cYYzvE",
  authDomain: "sns-maintenance-pwa.firebaseapp.com",
  projectId: "sns-maintenance-pwa",
  storageBucket: "sns-maintenance-pwa.firebasestorage.app",
  messagingSenderId: "683218813920",
  appId: "1:683218813920:web:a091496adb477c47502185"
});

const messaging = firebase.messaging();


messaging.onBackgroundMessage(function(payload){

  console.log(
    "SNS BACKGROUND PUSH:",
    payload
  );

  const title =
    payload.notification?.title ||
    "🚨 SNS Maintenance";

  const options = {

    body:
      payload.notification?.body ||
      "New maintenance complaint received.",

    icon:
      "./icon-192.png",

    badge:
      "./icon-192.png",

    vibrate:
      [300,150,300,150,500],

    requireInteraction:
      true,

    tag:
      payload.data?.tag ||
      "sns-maintenance",

    data: {
      url:
        payload.data?.url ||
        "https://snsn5450.github.io/SNS-Technician-PWA/"
    }
  };


  return self.registration
    .showNotification(
      title,
      options
    );

});


self.addEventListener(
  "notificationclick",
  function(event){

    event.notification.close();

    const targetUrl =
      event.notification?.data?.url ||
      "https://snsn5450.github.io/SNS-Technician-PWA/";


    event.waitUntil(

      clients.matchAll({
        type:"window",
        includeUncontrolled:true
      })
      .then(function(clientList){

        for(
          const client of clientList
        ){

          if(
            "focus" in client
          ){

            client.navigate(
              targetUrl
            );

            return client.focus();
          }

        }


        if(
          clients.openWindow
        ){

          return clients.openWindow(
            targetUrl
          );
        }

      })

    );

  }
);
