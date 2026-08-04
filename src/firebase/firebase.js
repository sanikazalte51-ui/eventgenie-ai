import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC4LRQctfXkc8jl0OHRTBWXDJGVIMdD7F0",
  authDomain: "eventgenie-ai.firebaseapp.com",
  projectId: "eventgenie-ai",
  storageBucket: "eventgenie-ai.firebasestorage.app",
  messagingSenderId: "248769406924",
  appId: "1:248769406924:web:254890b2504e745e96df69",
};

const app = initializeApp(firebaseConfig);

// Authentication
export const auth = getAuth(app);

// Firestore Database
export const db = getFirestore(app);

export default app;