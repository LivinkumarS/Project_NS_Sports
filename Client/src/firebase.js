import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_OAUTH_KEY,
  authDomain: "ns-sports.firebaseapp.com",
  projectId: "ns-sports",
  storageBucket: "ns-sports.appspot.com",
  messagingSenderId: "457911931192",
  appId: import.meta.env.VITE_OAUTH_APP_KEY,
  measurementId: "G-DC0PD3G5EZ",
};
export const app = initializeApp(firebaseConfig);
