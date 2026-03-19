const firebaseConfig = {
  apiKey:"YOUR_KEY",
  authDomain:"YOUR_DOMAIN",
  projectId:"YOUR_ID"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

auth.onAuthStateChanged(async user=>{
  if(!user){
    window.location.href="index.html";
    return;
  }

  document.getElementById("name").innerText = "Name: " + user.displayName;
  document.getElementById("email").innerText = "Email: " + user.email;

  const doc = await db.collection("users").doc(user.uid).get();

  if(doc.exists && doc.data().pro){
    document.getElementById("status").innerHTML = "PRO 💎";
  } else {
    document.getElementById("status").innerHTML = "FREE";
  }
});

// PROJECTS
function loadProjects(){
  let user = auth.currentUser;

  document.getElementById("gallery").innerHTML = "Loading...";

  db.collection("projects")
  .where("uid","==",user.uid)
  .get()
  .then(snapshot=>{
    let html="";
    snapshot.forEach(doc=>{
      html += `<img src="${doc.data().img}">`;
    });
    document.getElementById("gallery").innerHTML = html;
  });
}

// LOGOUT
function logout(){
  auth.signOut();
}
