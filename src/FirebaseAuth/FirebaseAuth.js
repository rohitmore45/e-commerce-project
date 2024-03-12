import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBI0LYftG1wVifADLQU-e3OtBmPMxhOqQM",
  authDomain: "shopnow-4cbad.firebaseapp.com",
  projectId: "shopnow-4cbad",
  storageBucket: "shopnow-4cbad.appspot.com",
  messagingSenderId: "304815835228",
  appId: "1:304815835228:web:194dcdefe86e5dec85be99"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

export { app, auth }