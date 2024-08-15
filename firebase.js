// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-cEdvCbkGyLu4k8VuS7_iVXFvIYcKwuI",
  authDomain: "flashcardsaas-f3175.firebaseapp.com",
  projectId: "flashcardsaas-f3175",
  storageBucket: "flashcardsaas-f3175.appspot.com",
  messagingSenderId: "59514249255",
  appId: "1:59514249255:web:24efc12770d8dc8b2bee02",
  measurementId: "G-HR87GFMZTE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);