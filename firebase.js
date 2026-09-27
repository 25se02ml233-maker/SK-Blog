import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyCIYgbWDOBvftTsqenycxbkaiZdyVnlRaY",
    authDomain: "ravi-teja-blog.firebaseapp.com",
    projectId: "ravi-teja-blog",
    storageBucket: "ravi-teja-blog.firebasestorage.app",
    messagingSenderId: "817838780230",
    appId: "1:817838780230:web:698c2b4a6a076bac9cbf47",
    measurementId: "G-8NDYDNYJT7"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firestore
export const db = getFirestore(app);