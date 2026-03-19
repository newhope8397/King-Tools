let img = new Image();
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let rotation = 0;

// UPLOAD
document.getElementById("upload").addEventListener("change", e=>{
  let file = e.target.files[0];
  let reader = new FileReader();

  reader.onload = e=>{
    img.src = e.target.result;
  };

  reader.readAsDataURL(file);
});

// LOAD IMAGE
img.onload = ()=>{
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img,0,0);
};

// ROTATE FIXED
function rotateImage(){
  rotation = (rotation + 90) % 360;

  let temp = document.createElement("canvas");
  let tctx = temp.getContext("2d");

  temp.width = canvas.height;
  temp.height = canvas.width;

  tctx.translate(temp.width/2, temp.height/2);
  tctx.rotate(Math.PI/2);
  tctx.drawImage(canvas,-canvas.width/2,-canvas.height/2);

  canvas.width = temp.width;
  canvas.height = temp.height;
  ctx.drawImage(temp,0,0);
}

// DOWNLOAD
function download(){
  let link = document.createElement("a");
  link.download = "image.png";
  link.href = canvas.toDataURL();
  link.click();
}
