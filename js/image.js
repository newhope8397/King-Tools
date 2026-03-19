// ======================
// ELEMENTS SAFE LOAD
// ======================
const canvas = document.getElementById("canvas");
if(!canvas) throw new Error("Canvas not found");

const ctx = canvas.getContext("2d");
const upload = document.getElementById("upload");

// ======================
// STATE
// ======================
let img = new Image();
let rotation = 0;

// ======================
// UPLOAD (SAFE)
// ======================
upload.addEventListener("change", e=>{
  const file = e.target.files[0];

  if(!file) return;

  // Allow only images
  if(!file.type.startsWith("image/")){
    alert("Please upload an image file");
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
  rotation = 0; // reset rotation

  canvas.width = img.width;
  canvas.height = img.height;

  draw();
};

// ======================
// DRAW ENGINE (IMPORTANT)
// ======================
function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  ctx.save();

  ctx.translate(canvas.width/2, canvas.height/2);
  ctx.rotate(rotation * Math.PI / 180);

  ctx.drawImage(img, -img.width/2, -img.height/2);

  ctx.restore();
}

// ======================
// ROTATE (CLEAN)
// ======================
window.rotate = ()=>{
  rotation = (rotation + 90) % 360;

  // Swap canvas size when rotating
  if(rotation % 180 !== 0){
    canvas.width = img.height;
    canvas.height = img.width;
  } else {
    canvas.width = img.width;
    canvas.height = img.height;
  }

  draw();
};

// ======================
// DOWNLOAD
// ======================
window.download = ()=>{
  const link = document.createElement("a");
  link.download = "king-tools-image.png";
  link.href = canvas.toDataURL();
  link.click();
};
