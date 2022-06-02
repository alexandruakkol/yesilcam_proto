// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Initialize Firebase
let app;
if(firebase.apps.length === 0 ){
  app = firebase.initializeApp(firebaseConfig);

}else{
  app = firebase.app();
}

const auth = firebase.auth();

export {auth}


