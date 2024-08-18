// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcbIu7uDsma7f0959YTI3iUqHQHO5C_Zw",
  authDomain: "flashcard-dl.firebaseapp.com",
  projectId: "flashcard-dl",
  storageBucket: "flashcard-dl.appspot.com",
  messagingSenderId: "159478086663",
  appId: "1:159478086663:web:a3a5b6925008523db2fea2",
  measurementId: "G-H2M3ZHLLL3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);