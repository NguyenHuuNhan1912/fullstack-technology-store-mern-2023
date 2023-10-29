import { initializeApp } from "firebase/app";
import { getAuth, FacebookAuthProvider, GoogleAuthProvider } from 'firebase/auth'

// const firebaseConfig = {
//   apiKey: "AIzaSyDdbCk73CYLZG5yRcvJFeL6QLpVecNUpvY",
//   authDomain: "chat-bot-d2597.firebaseapp.com",
//   projectId: "chat-bot-d2597",
//   storageBucket: "chat-bot-d2597.appspot.com",
//   messagingSenderId: "517390670904",
//   appId: "1:517390670904:web:6c5b4c2dcf080c1e9fdacd",
//   measurementId: "G-01HJP1RX5F"
// };


// Nhan
const firebaseConfig = {
  apiKey: "AIzaSyDsHrw8WPBU9VTpBjUyCWWz8Rhn3_ld6hM",
  authDomain: "technology-store-f6959.firebaseapp.com",
  projectId: "technology-store-f6959",
  storageBucket: "technology-store-f6959.appspot.com",
  messagingSenderId: "774661170192",
  appId: "1:774661170192:web:47f8119ae90b9317915695",
  measurementId: "G-51XNW4FGQQ"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const fbProvider = new FacebookAuthProvider();
const ggProvider = new GoogleAuthProvider();
export {auth, fbProvider, ggProvider};