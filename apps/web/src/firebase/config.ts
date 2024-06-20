import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBiWcheQdfuwO6QXn-gbhQIhpBhCPHBHnM",
  authDomain: "weardrobe-f8147.firebaseapp.com",
  projectId: "weardrobe-f8147",
  storageBucket: "weardrobe-f8147.appspot.com",
  messagingSenderId: "79455354600",
  appId: "1:79455354600:web:e843b050b265adf8d2135d",
  measurementId: "G-L0VZRT0T00"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'en';
const storage = getStorage(app);

export const googleProvider = new GoogleAuthProvider;
export const facebookProvider = new FacebookAuthProvider;
export { auth, storage };