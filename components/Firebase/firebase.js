import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/app';
import 'firebase/database';
import 'firebase/storage';

//import firebaseConfig from './firebaseConfig';

// Initialize Firebase App
const firebaseConfig = {
    apiKey: "AIzaSyCGZ4cbtXtEOsSELmWbVRPiB6uRuFYICaI",
    authDomain: "aceconstructionhkd.firebaseapp.com",
    databaseURL: "https://aceconstructionhkd.firebaseio.com",
    projectId: "aceconstructionhkd",
    storageBucket: "aceconstructionhkd.appspot.com",
    messagingSenderId: "308366225703",
    appId: "1:308366225703:web:44b6b7c24fe36e3951f902"
    };

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const firebaseDB = firebase.database();
const firebaseContacts = firebaseDB.ref('contacts');
const firebaseGallery = firebaseDB.ref('gallery');
const firebasePromotions = firebaseDB.ref('promotions');
const firebaseTeams = firebaseDB.ref('teams');
const firebasePlayers = firebaseDB.ref('players');
const firebaseChats = firebaseDB.ref('chats');
const firebaseEngineers = firebaseDB.ref('engineers');
const firebaseUsers = firebaseDB.ref('users');
const firebaseLoggedInDetail = firebaseDB.ref("loggedInDetail");

export {
  firebase,
  firebasePromotions,
  firebaseLoggedInDetail,
  firebaseTeams,
  firebasePlayers,
  firebaseChats,
  firebaseContacts,
  firebaseGallery,
  firebaseEngineers,
  firebaseDB,
  firebaseUsers
}

export const auth = firebase.auth();

export const loginWithEmail = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

export const registerWithEmail = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

export const logout = () => auth.signOut();

export const passwordReset = email => auth.sendPasswordResetEmail(email);
