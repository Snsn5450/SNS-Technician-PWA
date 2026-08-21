importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js");
firebase.initializeApp({apiKey:"AIzaSyDJVPZFRkzWKJ58cyIfaiuPqdvY4cYYzvE",authDomain:"sns-maintenance-pwa.firebaseapp.com",projectId:"sns-maintenance-pwa",storageBucket:"sns-maintenance-pwa.firebasestorage.app",messagingSenderId:"683218813920",appId:"1:683218813920:web:a091496adb477c47502185"});
const messaging=firebase.messaging();
messaging.onBackgroundMessage(function(payload){console.log("SNS background FCM",payload);});
self.addEventListener("notificationclick",e=>{e.notification.close();e.waitUntil(clients.openWindow("./"));});
