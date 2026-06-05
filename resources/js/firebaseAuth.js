// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCFIAs7xKkjTGvCbVIneeUs8QUooCrzc2c",
    authDomain: "prescription-f0a87.firebaseapp.com",
    projectId: "prescription-f0a87",
    storageBucket: "prescription-f0a87.firebasestorage.app",
    messagingSenderId: "726998242019",
    appId: "1:726998242019:web:788a300957104bd487abd6",
    measurementId: "G-2HS7Y5PM0N"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig); // Export the app
export const analytics = getAnalytics(app); // Export analytics
export const auth = getAuth(app);