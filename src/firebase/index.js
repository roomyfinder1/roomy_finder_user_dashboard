/* eslint-disable import/no-extraneous-dependencies */
import { initializeApp } from 'firebase/app';
import { getAuth } from '@firebase/auth';
import { getStorage } from 'firebase/storage';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { FIREBASE_VAPID_KEY } from '../config-global';

const firebaseConfig = {
  apiKey: 'AIzaSyAObyh2MPBu_Wui39tuQebVwwQEsgH_P-g',
  authDomain: 'roomy-finder.firebaseapp.com',
  projectId: 'roomy-finder',
  storageBucket: 'roomy-finder.appspot.com',
  messagingSenderId: '274087124726',
  appId: '1:274087124726:web:35b36ff1662386b99d96d7',
  measurementId: 'G-2DXF87HE7B',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const messaging = getMessaging(app);

export default app;

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log(payload);
      resolve(payload);
    });
  });

export const requestForToken = () =>
  getToken(messaging, {
    vapidKey: FIREBASE_VAPID_KEY,
    forceRefresh: true,
  })
    .then((currentToken) => {
      if (currentToken) {
        return currentToken;
      }
      console.log('No registration token available. Request permission to generate one.');
      return null; // Ensure a consistent return value
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      return null; // Ensure a consistent return value
    });

export const SendRequest = () => {
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      return getToken(messaging, { vapidKey: FIREBASE_VAPID_KEY })
        .then((currentToken) => {
          if (!currentToken) {
            console.log('Failed to generate the registration token.');
          }
        })
        .catch((err) => {
          console.log('An error occurred when requesting to receive the token.', err);
        });
    }
    console.log('User Permission Denied.');
    return null;
  });
};
