const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.requestNotification = functions.firestore
  .document("users/{userId}/requests/{requesterId}")
  .onCreate((snap, context) => {
    const requestInfo = snap.data();
    const userId = snap.data().id;
    return admin
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("notifications")
      .add(requestInfo)
      .then(doc => {
        console.log("it worked");
      });
  });
