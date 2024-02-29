/* eslint-disable no-restricted-globals */
/* eslint-disable no-restricted-globals */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-undef */

// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/10.4.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.4.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: 'AIzaSyAObyh2MPBu_Wui39tuQebVwwQEsgH_P-g',
  authDomain: 'roomy-finder.firebaseapp.com',
  projectId: 'roomy-finder',
  storageBucket: 'roomy-finder.appspot.com',
  messagingSenderId: '274087124726',
  appId: '1:274087124726:web:35b36ff1662386b99d96d7',
  measurementId: 'G-2DXF87HE7B',
};

firebase.initializeApp(firebaseConfig);

// Retrieve Firebase messaging instance
const backgroundMessage = firebase.messaging();

// Handle background messages
backgroundMessage.onBackgroundMessage((payload) => {
  // Customize notification here
  // const notificationTitle = 'Background Message Title';
  // const notificationOptions = {
  //   body: 'Background Message Body',
  //   click_action: 'https://example.com/fish_photos',
  // };
  // // Show notification
  // self.registration.showNotification(notificationTitle, notificationOptions);
  // self.addEventListener('notificationclick', handleClick);
});

// messaging.onBackgroundMessage(...);

// function handleClick(event) {
//   event.notification.close();
//   console.log(event.notification);
//   event.waitUntil(
//     clients.openWindow('https://google.com') // Replace with the URL or route you want to open
//   );
// }
