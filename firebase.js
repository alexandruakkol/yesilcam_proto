//expo bundleID: 'host.exp.Exponent'
import React from "react";
import * as Application from "expo-application";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc
  ,setDoc
} from "firebase/firestore";
import { TransformOutlined } from "@mui/icons-material";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "@firebase/auth";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAevCuPuEq2FB73plVhfxniRHeYyUnA-as",
  authDomain: "greenpineconnects.firebaseapp.com",
  databaseURL:
    "https://greenpineconnects-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "greenpineconnects",
  storageBucket: "greenpineconnects.appspot.com",
  messagingSenderId: "756252962829",
  appId: "1:756252962829:web:ef99e2785435332e83a544",
  measurementId: "G-1S927LZVJL",
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});

function generateNewUserID(name) {
  const l1 = name.charAt(0);
  const l2 = name.charAt(name.length);
  const n1 = 0;
  const n2 = 0;
  const n3 = 0;
  const n4 = 0;

  //add duplicate verification
  return l1 + l2 + n1 + n2 + n3 + n4;
}

async function createUser(email, password, userData) {
  const response = await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("User creation successful", userCredential);
      //userData.userID = generateNewUserID(userData);
      //writeUserData(userData);
      userData.userID = generateNewUserID(userData.name);
      writeUserData(userData);
      return 0;
    })
    .catch((error) => {
      console.log("User creation error", error.code);
      return error.code;
    });
  return response;
}

//Firestore DB

async function writeUserData(userData) {
  const db = getFirestore();
  const docRef = doc(db, "users", userData.userID);
  try {
    setDoc(docRef, userData);
  } catch (error) {
    console.log("DB write error", error);
  }
}

export { auth, createUser };
