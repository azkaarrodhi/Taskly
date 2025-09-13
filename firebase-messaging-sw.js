importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyClBErlyRv20HwMf_zQC7REsZEknaFjs_8",
  authDomain: "website-61783.firebaseapp.com",
  projectId: "website-61783",
  storageBucket: "website-61783.appspot.com",
  messagingSenderId: "437361977695",
  appId: "1:437361977695:web:7e1069062bfaca0f02aeea",
  measurementId: "G-0X5NV4YK2V"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[FCM] Background Message:', payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: payload.notification.icon || '/taskly.png'
  });
});
