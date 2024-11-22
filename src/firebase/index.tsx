import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { Analytics, getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
    apiKey: "AIzaSyAHeflR3zkXpHKR1S0rvpwLxKMbVxsKGyc",
    authDomain: "luana-alan.firebaseapp.com",
    projectId: "luana-alan",
    storageBucket: "luana-alan.firebasestorage.app",
    messagingSenderId: "1024109913349",
    appId: "1:1024109913349:web:3d6a17f9347915c030836c",
    measurementId: "G-26G8YZ58DX"
};

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp)
export const firebaseStorage = getStorage(firebaseApp)
export let firebaseAnalytics: Analytics

if (firebaseApp.name && typeof window !== 'undefined') {
    firebaseAnalytics = getAnalytics(firebaseApp);
}

export const db = getFirestore(firebaseApp)