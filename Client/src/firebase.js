// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_OAUTH_KEY,
  authDomain: "ns-sports.firebaseapp.com",
  projectId: "ns-sports",
  storageBucket: "ns-sports.appspot.com",
  messagingSenderId: "457911931192",
  appId: "1:457911931192:web:c5a034e85c43af784d31cd",
  measurementId: "G-DC0PD3G5EZ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
