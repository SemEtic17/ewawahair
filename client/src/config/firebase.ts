import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mekelle-estatee.firebaseapp.com",
  projectId: "mekelle-estatee",
  storageBucket: "mekelle-estatee.appspot.com",
  messagingSenderId: "485721388568",
  appId: "1:485721388568:web:ea6aedfdd1ca7d2c52b56d"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
