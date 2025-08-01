// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, signInWithPopup, 
        GoogleAuthProvider, 
        onAuthStateChanged, 
        User}
        from "firebase/auth";
import { getFirestore } from "firebase/firestore";




// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDnXJB0rOSsk3_hKIUj5eX-XRlVFhC-IbU",
  //This is fine to expose to public, not like trad API keys. 
  authDomain: "buzz-firebase-auth.firebaseapp.com",
  projectId: "buzz-firebase-auth",
  appId: "1:940984892954:web:c59892ecdce381f3a41ba3",
  measurementId: "G-C633DW742Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;

