import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase Configuration (Standard Web App SDK setup)
const firebaseConfig = {
  apiKey: "AIzaSyDemoKeyForSpectra2026HackathonApp",
  authDomain: "heritage-ai-spectra.firebaseapp.com",
  projectId: "heritage-ai-spectra",
  storageBucket: "heritage-ai-spectra.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:demo1234567890"
};

// Initialize Firebase & Firestore
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
