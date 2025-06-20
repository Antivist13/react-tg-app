// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDv1SqEx1qRYngTAMNMqyOhWAy5s1VxGyQ",
    authDomain: "chat-6037a.firebaseapp.com",
    projectId: "chat-6037a",
    storageBucket: "chat-6037a.firebasestorage.app",
    messagingSenderId: "750015234243",
    appId: "1:750015234243:web:f70e6203131fa5d8896276",
    measurementId: "G-DC4FLLJENR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);