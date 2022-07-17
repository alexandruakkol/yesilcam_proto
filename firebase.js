//expo bundleID: 'host.exp.Exponent'
import { Platform } from "react-native";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  setDoc,
  where,
  FieldPath,
  query,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import {} from "firebase/storage";
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
  function randomInt() {
    return Math.floor(Math.random() * 10);
  }
  const l1 = name[0];
  const l2 = name[name.length - 1];
  const n1 = randomInt();
  const n2 = randomInt();
  const n3 = randomInt();
  const n4 = randomInt();
  console.log("generated userID", l1 + l2 + n1 + n2 + n3 + n4);
  return l1 + l2 + n1 + n2 + n3 + n4;
}

async function createUser(email, password, userData) {
  const response = await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("User creation successful", userCredential);
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
const db = getFirestore();
const usersRef = collection(db, "users");

async function getUserDataByID(id) {
  const docRef = doc(db, "users", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log(
      `The document matching the requested ID of ${id} was not found.`
    );
    return 0;
  }
}

async function getUserDataByEmail(email) {
  const q = query(collection(db, "users"), where("email", "==", email));
  const snap = await getDocs(q);
  let response = new Object();
  snap.forEach((doc) => {
    response = doc.data();
  });
  return response;
}

async function writeUserData(userData) {
  const docRef = doc(db, "users", userData.userID);
  try {
    setDoc(docRef, userData);
  } catch (error) {
    console.log("DB write error", error);
  }
}

async function appendUserData(userData, userID) {
  try {
    console.log("will try writing", userData, " to ID:", userID);
    const ref = doc(db, "users", userID);
    setDoc(ref, userData, { merge: true });
  } catch (error) {
    console.log("DB write error", error);
  }
}

export async function storePicture(uri) {
  Platform.OS === "ios" ? uri.replace("file://", "") : uri;
  const storageRef = firebase.storage().ref("/profilepic/pic.png");

  const uploadedPicture = await storageRef.putString(uri, "base64", {
    contentType: "image/png",
  });

  //firebase.auth().currentUser;
}

export { auth, createUser, getUserDataByEmail, writeUserData, appendUserData };
