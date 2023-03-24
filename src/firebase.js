import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY2,
  authDomain: "moviex-af27e.firebaseapp.com",
  projectId: "moviex-af27e",
  storageBucket: "moviex-af27e.appspot.com",
  messagingSenderId: "809970299187",
  appId:
    "1:809970299187:web:b4e288b7c4fe0240980e46",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
