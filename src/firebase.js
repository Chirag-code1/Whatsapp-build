

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAwagaKVRe7eyOT0ugwRqGHT0-Gk_NUapA",
  authDomain: "chirag-whatapp-firebase-server.firebaseapp.com",
  projectId: "chirag-whatapp-firebase-server",
  storageBucket: "chirag-whatapp-firebase-server.appspot.com",
  messagingSenderId: "103372979286",
  appId: "1:103372979286:web:0fef6a1a3287a67cea8ff7",
  measurementId: "G-38VLZML3M0"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
