import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBbKIxxFoAO66zwFZsGy0wfR8GdDAqcxUs",
  authDomain: "pamsy-e9dc3.firebaseapp.com",
  projectId: "pamsy-e9dc3",
  storageBucket: "pamsy-e9dc3.appspot.com",
  messagingSenderId: "349350246204",
  appId: "1:349350246204:web:37d6ddd04c53b95275d039",
  measurementId: "G-T85XPRRGQQ",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const auth = getAuth(FIREBASE_APP);
export const db = getFirestore(FIREBASE_APP);
