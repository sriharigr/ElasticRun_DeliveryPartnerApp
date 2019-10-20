// Import and configure the Firebase SDK
// These scripts are made available when the app is served or deployed on Firebase Hosting
// If you do not serve/host your project using Firebase Hosting see https://firebase.google.com/docs/web/setup
importScripts('/__/firebase/6.3.4/firebase-app.js');
importScripts('/__/firebase/6.3.4/firebase-messaging.js');
importScripts('/__/firebase/init.js');

const messaging = firebase.messaging();

/**
 * Here is is the code snippet to initialize Firebase Messaging in the Service
 * Worker when your app is not hosted on Firebase Hosting.
 // [START initialize_firebase_in_sw]
 // Give the service worker access to Firebase Messaging.
 // Note that you can only use Firebase Messaging here, other Firebase libraries
 // are not available in the service worker.
 importScripts('https://www.gstatic.com/firebasejs/6.3.4/firebase-app.js');
 importScripts('https://www.gstatic.com/firebasejs/6.3.4/firebase-messaging.js');
 // Initialize the Firebase app in the service worker by passing in the
 // messagingSenderId.
 
 // Retrieve an instance of Firebase Messaging so that it can handle background
 // messages.
 // [END initialize_firebase_in_sw]
 **/
firebase.initializeApp({
  'messagingSenderId': '1078337551124'
});



const messaging = firebase.messaging();

