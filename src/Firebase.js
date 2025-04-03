import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyACXylGS_p8G-wp_VCWL4SCPD5PYMpGJA0",
    authDomain: "battery-service-cec1f.firebaseapp.com",
    projectId: "battery-service-cec1f",
    storageBucket: "battery-service-cec1f.firebasestorage.app",
    messagingSenderId: "127629786623",
    appId: "1:127629786623:web:df590028e15a3e01d47bca"
};


// Intialize Firebae
export const app = initializeApp(firebaseConfig);

// Initalize Firestore

const db = getFirestore(app);

export default db;