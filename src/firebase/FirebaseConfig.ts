// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdCo91aICnptSRWTfRD4GDNTAHXvONRo4",
  authDomain: "curd-op-6130c.firebaseapp.com",
  projectId: "curd-op-6130c",
  storageBucket: "curd-op-6130c.appspot.com",
  messagingSenderId: "679117057512",
  appId: "1:679117057512:web:38106ae261c78b770bc85d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, storage, auth };