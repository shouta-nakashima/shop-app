
import firebase from "firebase";
import 'firebase/auth'



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_pi2mPyU96SfWuHXyuNl2NgiGAbtrCzs",
  authDomain: "shopapp-d48bb.firebaseapp.com",
  databaseURL: "https://shopapp-d48bb.firebaseio.com",
  projectId: "shopapp-d48bb",
  storageBucket: "shopapp-d48bb.appspot.com",
  messagingSenderId: "266469950438",
  appId: "1:266469950438:web:28d83f8268f42dd3730c27"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//export
export const auth = firebase.auth()

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

