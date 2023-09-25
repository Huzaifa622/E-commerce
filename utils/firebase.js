// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmhDJctI644-mUhZQT3q6VFAhhE5giBfg",
  authDomain: "ecommerce-app-13fa8.firebaseapp.com",
  projectId: "ecommerce-app-13fa8",
  storageBucket: "ecommerce-app-13fa8.appspot.com",
  messagingSenderId: "967744735290",
  appId: "1:967744735290:web:f246066a94bd0f104a4d03"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);