import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey:"YOUR_KEY",
  authDomain:"YOUR_DOMAIN",
  projectId:"YOUR_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// GOOGLE LOGIN
window.googleLogin = function(){
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
};

// CHECK LOGIN
onAuthStateChanged(auth, user=>{
  if(user){
    console.log("Logged in:", user.email);
  }
});
