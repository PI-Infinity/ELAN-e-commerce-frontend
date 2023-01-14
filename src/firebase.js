import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAjL3-Xz_p7liQCIImRhzv5RI4jBnwVhBQ",
  authDomain: "elan-ecommerce.firebaseapp.com",
  projectId: "elan-ecommerce",
  storageBucket: "elan-ecommerce.appspot.com",
  messagingSenderId: "954865463054",
  appId: "1:954865463054:web:f4dcf6a1af37cf791df15f",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
