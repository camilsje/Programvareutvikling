
import { initializeApp } from "firebase/app";

import { getFirestore } from "@firebase/firestore"
 

const firebaseConfig = {
  apiKey: "AIzaSyBG-JO9XCzPYoCmtgIyIq__EX_MysrOhsQ",
  authDomain: "ifdb-6622a.firebaseapp.com",
  projectId: "ifdb-6622a",
  storageBucket: "ifdb-6622a.appspot.com",
  messagingSenderId: "837878248844",
  appId: "1:837878248844:web:4d33f1857b79d8a06312a9",
  measurementId: "G-MHRMW3966C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app); 
  