import firebase from 'firebase';
const firebaseApp=firebase.initializeApp({
    apiKey: "AIzaSyCCfaxoTTZ81lYJf5rNQ2rRcVDcPH9Sw14",
    authDomain: "my-insta-ead65.firebaseapp.com",
    databaseURL: "https://my-insta-ead65.firebaseio.com",
    projectId: "my-insta-ead65",
    storageBucket: "my-insta-ead65.appspot.com",
    messagingSenderId: "433343853526",
    appId: "1:433343853526:web:e0ec2409739e3204622a77",
    measurementId: "G-RVT89ME7BP"
});
const db=firebaseApp.firestore();
const auth=firebase.auth();
const storage=firebase.storage();
export {db, auth, storage};