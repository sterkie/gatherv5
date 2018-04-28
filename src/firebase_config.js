import * as firebase from "firebase";
import "@firebase/firestore";

const config = {
  apiKey: "AIzaSyBkh0MjjrF8C13LA-CE8WmkHK0vbNGg0-0",
  authDomain: "gather-a921e.firebaseapp.com",
  databaseURL: "https://gather-a921e.firebaseio.com",
  projectId: "gather-a921e",
  storageBucket: "gather-a921e.appspot.com",
  messagingSenderId: "636103105721"
};

const fb = firebase.initializeApp(config);
export const auth = fb.auth();
export const db = fb.database();
export const fs = fb.firestore();
export const storage = firebase.storage();
