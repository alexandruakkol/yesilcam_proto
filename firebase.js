//expo bundleID: 'host.exp.Exponent'
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore";
import { GoogleSignin } from "@react-native-community/google-signin";
import * as Application from 'expo-application';
import { HotelSharp } from "@mui/icons-material";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {getFirestore, collection, getDocs} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAevCuPuEq2FB73plVhfxniRHeYyUnA-as",
  authDomain: "greenpineconnects.firebaseapp.com",
  databaseURL: "https://greenpineconnects-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "greenpineconnects",
  storageBucket: "greenpineconnects.appspot.com",
  messagingSenderId: "756252962829",
  appId: "1:756252962829:web:ef99e2785435332e83a544",
  measurementId: "G-1S927LZVJL"
};

let app;
if(firebase.apps.length === 0 ){
  app = firebase.initializeApp(firebaseConfig);

}else{
  app = firebase.app();
}

const auth = firebase.auth();

//db init
const db = getFirestore()

//collection reference
const colRef = collection(db, 'users');

//get collection data
getDocs(colRef)
  .then((snapshot) => {
    console.log(snapshot.docs.forEach((doc)=>console.log(doc.data)))
  })


export {auth}


