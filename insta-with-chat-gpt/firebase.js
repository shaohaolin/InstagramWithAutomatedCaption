// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHYjeDcf3pGudqdjGAYjAo3yOYC96J9jg",
  authDomain: "insta-with-chat-gpt.firebaseapp.com",
  projectId: "insta-with-chat-gpt",
  storageBucket: "insta-with-chat-gpt.appspot.com",
  messagingSenderId: "280188427070",
  appId: "1:280188427070:web:ca1be79033aa2be08baa6f",
  measurementId: "G-2SLCC5LJWK",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
