// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZ8jDpRgJn5e1KPzm46z52NXP_3h3-KxQ",
  authDomain: "commonblog-5d9fa.firebaseapp.com",
  projectId: "commonblog-5d9fa",
  storageBucket: "commonblog-5d9fa.appspot.com",
  messagingSenderId: "547451680595",
  appId: "1:547451680595:web:41323a9ed10ed82474d3a6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//export database
export const db = getFirestore(app);