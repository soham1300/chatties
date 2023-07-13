import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDtUASec9Gc_sNoHxcLbrff195W6D3Y7iU",
    authDomain: "messenger-c4b78.firebaseapp.com",
    projectId: "messenger-c4b78",
    storageBucket: "messenger-c4b78.appspot.com",
    messagingSenderId: "365631220488",
    appId: "1:365631220488:web:e34992a64ec9eef5b29abd"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics();
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);