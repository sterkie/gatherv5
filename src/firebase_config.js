import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyCBMk_G7-aJYubQq9YQ9J9iB0NDeYog_V0",
  authDomain: "gatherv3.firebaseapp.com",
  databaseURL: "https://gatherv3.firebaseio.com",
  projectId: "gatherv3",
  storageBucket: "",
  messagingSenderId: "427057916335"
};

const fb = firebase.initializeApp(config);
export const auth = fb.auth();
export const db = fb.database();
