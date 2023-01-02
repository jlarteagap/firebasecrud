// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  onSnapshot,
  deleteDoc, doc
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXXpRegaDmRBrgWi07mh2anKgB9BoTeyA",
  authDomain: "crud-2ec3b.firebaseapp.com",
  projectId: "crud-2ec3b",
  storageBucket: "crud-2ec3b.appspot.com",
  messagingSenderId: "955706435997",
  appId: "1:955706435997:web:f8923916a1db45779b6774",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

export const saveTask = (title, desc) => {
  addDoc(collection(db, "tasks"), { title, desc });
};

export const getTasks = () => getDocs(collection(db, "tasks"));

// recibe la funcion que se llama callback 
export const onGetTasks = (callback) => onSnapshot(collection(db, 'tasks'), callback)

export const deleteTask = (id) => deleteDoc(doc(db, 'tasks', id))