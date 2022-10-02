//expo bundleID: 'host.exp.Exponent'
import { Platform } from "react-native";
import {
  createUserWithEmailAndPassword,
  
} from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  setDoc,
  orderBy,
  where,
  FieldPath,
  query,
  updateDoc,
  Timestamp,
  getDoc,
  collectionGroup,
  limit,
} from "firebase/firestore";
import {
  //blob storage
  putString,
  uploadString,
  getStorage,
  putFile,
  ref,
  storage,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import {
  getDatabase,
  set,
  ref as storageRef,
  update as updateRealtime,
  onValue,
  orderByChild,
  get as realtimeGet,
  query as realtimeQuery,
} from "firebase/database"; //realtimeDB
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "@firebase/auth";
import "@firebase/firestore";
import { retrieve } from "./storage";
import {GPC, setGPC} from "./global";
import "react-native-get-random-values";
import { v4 as uuidv4, validate } from "uuid";
import {
  API_KEY,
  AUTH_DOMAIN,
  DATABASE_URL,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  MEASUREMENT_ID,
} from "@env";

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
};
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();
/////////////////////User creation\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

async function createUser(email, password, userData) {
  const response = await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("User creation successful");
      writeUserDataAtCreation(userData);
      return 0;
    })
    .catch((error) => {
      console.log("User creation error", error.code);
      return error.code;
    });
  Object.keys(userData).forEach((key) => {
    GPC["usrData_" + key] = userData[key]; //temp assignment to global until async server is complete
  });
  return response;
}

/////////////////////////Firestore DB\\\\\\\\\\\\\\\\\\\\\\\\\\\\
const firestoreDb = getFirestore();
const usersRef = collection(firestoreDb, "users");

async function writeUserDataAtCreation(userData) {
  try {
    validate;
    appendUserData(userData);
    storePicture(
      "https://firebasestorage.googleapis.com/v0/b/greenpineconnects.appspot.com/o/def.png?alt=media&token=dfefab79-7b79-4988-8967-616a63ccdfec"
    );
  } catch (error) {
    console.log("DB write error", error);
  }
}

export async function getUserData() {
  let data = [];
  const querySnapshot = await getDocs(usersRef);
  querySnapshot.forEach((doc) => {
    data.push({ ...doc.data(), ...{ id: doc.id } });
  });
  return data;
}

export async function getUserDataByID(id) {
  console.log("getting usr data for", id);
  try {
    const docRef = doc(firestoreDb, "users", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log(
        `The document matching the requested ID of ${id} was not found.`
      );
      return 0;
    }
  } catch (error) {
    console.log("GetUserDataByID error", error);
  }
}

async function commentCount(postID, func) {
  const commentRef = doc(firestoreDb, "posts", postID);
  const increment = func == "add" ? 1 : -1;
  await updateDoc(commentRef, {
    commentCount: firebase.firestore.FieldValue.increment(increment),
  });
}

export async function createComment(postID, comment) {
  try {
    const commentRef = doc(firestoreDb, "comments", postID);
    let newId = uuidv4();
    await setDoc(
      commentRef,
      {
        [newId]: {
          body: comment,
          from: auth.currentUser.uid,
          id: newId,
          time: firebase.firestore.Timestamp.fromDate(new Date()),
        },
      },
      { merge: true }
    );
    commentCount(postID, "add");
    console.log("written new comment!");
  } catch (e) {
    console.log("writeComment error", e);
  }
}

async function changeProfilePic(newURL) {
  try {
    const ppicRef = doc(firestoreDb, "users", auth.currentUser.uid);
    await updateDoc(ppicRef, {
      photo: newURL,
    });
  } catch (e) {
    console.log("changeProfilePic error", error);
  }
}

//////////////////////Profile picture storage\\\\\\\\\\\\\\\\\\\\\\\\

let blobDb = getStorage();

export async function storePicture(uri) {
  try {
    Platform.OS === "ios" ? uri.replace("file://", "") : uri;
    const storageRef = ref(blobDb, auth.currentUser.uid);
    uploadString(storageRef, uri, "data_url").then((snapshot) => {
      console.log("Profile picture stored!");
      GPC.usrData_image = uri;
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        changeProfilePic(downloadURL);
      });
    });
  } catch (error) {
    console.log("error storePicture ", error);
  }
}

export async function getPictureOfUser(uid) {
  //not working well, may be deprecated
  blobDb = getStorage();
  const rf = ref(blobDb, uid);
  const res = await getDownloadURL(rf)
    .then((pic) => {
      return pic;
    })
    .catch((error) => {
      console.log(
        "getPictureOfUser, getDownloadURL error: (codes on internet)",
        error
      );
      return;
    });
  return res;
}
///////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

async function getAndGlobalizeUsrData() {
  //called on login: gets data of logged user
  const q = query(
    collection(firestoreDb, "users"),
    where("email", "==", auth.currentUser.email)
  );
  const snap = await getDocs(q);
  let response = new Object(), newGPC={};
  snap.forEach((doc) => {
    response = doc.data();
  });
    (function writeToGPC() {
      for (key of Object.keys(response)) {
        if (key === "chats") continue;
        newGPC['usrData_'+String(key)] = response[key];
        console.log("stored in GPC ", "usrData_" + String(key), response[key]);
      }
    })();
  newGPC["usrData_id"] = auth.currentUser.uid;
  setGPC(newGPC);
  return response;
}

async function appendUserData(userData) {
  //deletes null values from object
  Object.keys(userData).forEach(
    (k) => userData[k] == null && delete userData[k]
  );
  try {
    const ref = doc(firestoreDb, "users", auth.currentUser.uid);
    setDoc(ref, userData, { merge: true });
  } catch (error) {
    console.log("DB write error", error);
  }
}

export async function newPost(data) {
  console.log(data);
  try {
    const docRef = doc(firestoreDb, "posts", uuidv4());
    setDoc(
      docRef,
      { ...data, time: firebase.firestore.Timestamp.fromDate(new Date()) },
      { merge: true }
    );
    console.log("new post written");
  } catch (error) {
    console.log("newPost error", error);
  }
}

export async function writeToDB(collection, data) {
  //may be deprecated
  try {
    const docRef = doc(firestoreDb, collection, auth.currentUser.uid);
    updateDoc(docRef, data);
  } catch (error) {
    console.log("writeToDB error", error);
  }
}

export async function getCollection(col) {
  try {
    const postsRef = collection(firestoreDb, col);
    const q = query(postsRef, orderBy("time", "desc"), limit(20));
    const snap = await getDocs(q);
    let response = [];
    snap.forEach((el) => response.push({ ...el.data(), id: el.id }));
    response = response.sort((a, b) =>
      a.time.seconds < b.time.seconds ? 1 : -1
    );
    return response;
  } catch (error) {
    console.log("getAllCollection error", error);
  }
}

export async function getComments(postID) {
  try {
    const commentsRef = collection(firestoreDb, "comments");
    const postRef = doc(commentsRef, postID);
    const snap = await getDoc(postRef);
    let response = [];
    if (!snap.data()) {
      console.log("no Comments");
      return;
    }
    Object.values(snap.data()).forEach((el) =>
      response.push({ ...el, id: el.id })
    );
    response = response.sort((a, b) =>
      a.time.seconds < b.time.seconds ? 1 : -1
    );
    return response;
  } catch (error) {
    console.log("getComments error", error);
  }
}
///////////////////Firebase realtime\\\\\\\\\\\\\\\

const realtimeDb = getDatabase();

export function createNewConvo(withPerson) {}

export async function getChatData(convoID) {
  const chatsRef = storageRef(realtimeDb, "chats/" + convoID);
  const q = realtimeQuery(chatsRef);
  return await realtimeGet(q, (snapshot) => {
    return snapshot;
  });
}

export function newRealtimeMessage(data, convoID) {
  try {
    updateRealtime(
      storageRef(realtimeDb, "messages/" + convoID + "/" + uuidv4()),
      {
        //make new uuid for message, write data inside it. add timestamp and uid
        ...data,
        ...{ time: firebase.firestore.Timestamp.fromDate(new Date()) },
        ...{ from: auth.currentUser.uid },
      }
    );
    updateLastMessage(data.body, convoID);
  } catch (error) {
    console.log("realtimeWrite error", error);
  }
}

export function updateLastMessage(message, convoID) {
  let updates = {};
  updates["/chats/" + convoID + "/lastMessage"] = message;
  try {
    updateRealtime(storageRef(realtimeDb), updates);
  } catch (error) {
    console.log("updateLastMessage error", error);
  }
}

export function getRealtimeMessages(convoID, setMyData) {
  const messagesRef = storageRef(realtimeDb, "messages/" + convoID);
  console.log("getting convo", convoID, messagesRef);
  const q = realtimeQuery(messagesRef);
  onValue(q, (snapshot) => {
    let data = [];
    snapshot.forEach((child) => {
      data.push(child.val());
    });
    //incoming realtime messages handled here
    console.log("existing messages:", data);
    data = data.sort((a, b) => (a.time.seconds > b.time.seconds ? 1 : -1));
    setMyData(data);
  });
}

export function swipeRight(swipedRightOn) {
  getRightSwipes(auth.currentUser.uid).then((mySwipes) => {
    mySwipes = mySwipes.val();
    GPC["usrData_" + "swipedRightOn"] = Object.keys(mySwipes);
    console.log("my swipes", mySwipes);
    console.log("adding right swipe data on: ", swipedRightOn);
    let obj = {};
    obj[swipedRightOn] = "true";
    try {
      set(
        storageRef(
          realtimeDb,
          "swipes/" + auth.currentUser.uid + "/swipedRightOn"
        ),
        {
          ...mySwipes,
          ...obj,
        }
      );
    } catch (error) {
      console.log("swipeRight DB error", error);
    }
  });
  matchCheck(swipedRightOn);
}

export async function getRightSwipes(ofPerson) {
  const rightSwipesRef = storageRef(
    realtimeDb,
    "swipes/" + ofPerson + "/swipedRightOn"
  );
  return await realtimeGet(rightSwipesRef);
}

export function matchCheck(withPerson) {
  getRightSwipes(withPerson).then((theirSwipes) => {
    if (!theirSwipes.val()) return;
    if (Object.keys(theirSwipes.val()).includes(auth.currentUser.uid)) {
      console.log("match");
    } else {
      console.log("no match");
    }
  });
}
//////////////////////////\\\\\\\\\\\\\\\\\\\\\\\

export { auth, createUser, getAndGlobalizeUsrData, appendUserData };
