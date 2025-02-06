import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAiD3R60F3Gw1ibpn8UgQx2Jyip1SBc510",
  authDomain: "fir-course-fd378.firebaseapp.com",
  projectId: "fir-course-fd378",
  storageBucket: "fir-course-fd378.firebasestorage.app",
  messagingSenderId: "196074572275",
  appId: "1:196074572275:web:2b66d5896cc216673f6a86",
  measurementId: "G-0RREGQLJ7E"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);