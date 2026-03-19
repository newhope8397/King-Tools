// ======================
// ELEMENTS
// ======================
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const upload = document.getElementById("upload");
const cropBox = document.getElementById("cropBox");
const box = document.getElementById("box");
const gallery = document.getElementById("gallery");

// ======================
// STATE (MASTER CONTROL)
// ======================
let img = new Image();
let rotation = 0;
let scale = 1;
let posX = 0;
let posY = 0;
let brightness = 100;
let contrast = 100;

let history = [];

// ======================
// UPLOAD
// ======================
upload.addEventListener("change", e=>{
  const file = e.target.files[0];
  if(!file || !file.type.startsWith("image/")){
    alert("Upload valid image");
    return;
  }

  const reader = new FileReader();
  reader.onload = ev=>{
    img.src = ev.target.result;
  };
  reader.readAsDataURL(file);
});

// ======================
// LOAD IMAGE
// ======================
img.onload = ()=>{
  resetState();
  canvas.width = img.width;
  canvas.height = img.height;
  draw();
};

function resetState(){
  rotation = 0;
  scale = 1;
  posX = 0;
  posY = 0;
}

// ======================
// DRAW ENGINE (CORE)
// ======================
function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  ctx.save();
  ctx.filter = `brightness(${brightness}%) contrast(${contrast}%)`;

  ctx.translate(canvas.width/2 + posX, canvas.height/2 + posY);
  ctx.rotate(rotation * Math.PI/180);
  ctx.scale(scale, scale);

  ctx.drawImage(img, -img.width/2, -img.height/2);

  ctx.restore();
}

// ======================
// HISTORY (UNDO)
// ======================
function saveState(){
  history.push(canvas.toDataURL());
  if(history.length > 10) history.shift();
}

window.undo = ()=>{
  if(history.length === 0) return;

  let last = history.pop();
  let temp = new Image();
  temp.onload = ()=>{
    canvas.width = temp.width;
    canvas.height = temp.height;
    ctx.drawImage(temp,0,0);
  };
  temp.src = last;
};

// ======================
// TOOLS
// ======================
window.rotate = ()=>{
  saveState();
  rotation = (rotation + 90) % 360;

  if(rotation % 180 !== 0){
    canvas.width = img.height;
    canvas.height = img.width;
  } else {
    canvas.width = img.width;
    canvas.height = img.height;
  }

  draw();
};

window.zoom = (v)=>{
  scale = v;
  draw();
};

window.setBrightness = (v)=>{
  brightness = v;
  draw();
};

window.setContrast = (v)=>{
  contrast = v;
  draw();
};

window.resizeImg = ()=>{
  saveState();

  let w = document.getElementById("w").value;
  let h = document.getElementById("h").value;

  if(!w || !h) return alert("Enter width & height");

  canvas.width = w;
  canvas.height = h;
  draw();
};

// ======================
// DRAG (CANVA FEEL)
// ======================
let dragging = false;

canvas.addEventListener("mousedown", ()=>{
  dragging = true;
  canvas.style.cursor = "grabbing";
});

canvas.addEventListener("mouseup", ()=>{
  dragging = false;
  canvas.style.cursor = "grab";
});

canvas.addEventListener("mouseleave", ()=> dragging = false);

canvas.addEventListener("mousemove", e=>{
  if(!dragging) return;

  posX += e.movementX;
  posY += e.movementY;
  draw();
});

// ======================
// CROP SYSTEM (IMPROVED)
// ======================
let startX = 0, startY = 0;
let cropping = false;

window.startCrop = ()=>{
  cropping = true;
  cropBox.style.display = "block";
  cropBox.style.left = "50px";
  cropBox.style.top = "50px";
  cropBox.style.width = "100px";
  cropBox.style.height = "100px";
};

box.addEventListener("mousedown", e=>{
  if(!cropping) return;

  startX = e.offsetX;
  startY = e.offsetY;
});

box.addEventListener("mousemove", e=>{
  if(!cropping) return;

  let w = e.offsetX - startX;
  let h = e.offsetY - startY;

  cropBox.style.left = startX + "px";
  cropBox.style.top = startY + "px";
  cropBox.style.width = w + "px";
  cropBox.style.height = h + "px";
});

window.applyCrop = ()=>{
  saveState();

  let x = parseInt(cropBox.style.left) || 0;
  let y = parseInt(cropBox.style.top) || 0;
  let w = parseInt(cropBox.style.width) || 50;
  let h = parseInt(cropBox.style.height) || 50;

  let data = ctx.getImageData(x,y,w,h);

  canvas.width = w;
  canvas.height = h;
  ctx.putImageData(data,0,0);

  cropBox.style.display = "none";
  cropping = false;
};

// ======================
// AI FILTERS
// ======================
window.aiEnhance = ()=>{
  brightness = 120;
  contrast = 120;
  draw();
};

window.aiCool = ()=>{
  brightness = 110;
  contrast = 140;
  draw();
};

// ======================
// SAVE (FIRESTORE)
// ======================
window.saveProject = ()=>{
  let user = firebase.auth().currentUser;
  if(!user) return alert("Login first");

  firebase.firestore().collection("projects").add({
    uid: user.uid,
    img: canvas.toDataURL()
  });

  alert("Saved!");
};

// ======================
// LOAD PROJECTS
// ======================
window.loadProjects = ()=>{
  let user = firebase.auth().currentUser;
  if(!user) return;

  gallery.innerHTML = "Loading...";

  firebase.firestore().collection("projects")
  .where("uid","==",user.uid)
  .get()
  .then(snap=>{
    let html="";
    snap.forEach(doc=>{
      html += `<img src="${doc.data().img}" width="80">`;
    });
    gallery.innerHTML = html;
  });
};

// ======================
// DOWNLOAD
// ======================
window.download = ()=>{
  let a = document.createElement("a");
  a.download = "king-tools-image.png";
  a.href = canvas.toDataURL();
  a.click();
};
