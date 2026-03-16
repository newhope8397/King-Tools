// ===== Dark / Light Mode Toggle =====
function toggleTheme() {
    const body = document.body;
    body.classList.toggle("dark");
    const btn = document.getElementById("theme-toggle");
    if(body.classList.contains("dark")){
        btn.innerText = "☀️ Light Mode";
    } else {
        btn.innerText = "🌙 Dark Mode";
    }
}

// ===== Search Filter for Homepage Tools =====
function searchTool() {
    const input = document.getElementById("searchBar").value.toLowerCase();
    const tools = document.getElementById("toolList").getElementsByClassName("tool");
    for(let i = 0; i < tools.length; i++){
        const title = tools[i].getElementsByTagName("h3")[0].innerText.toLowerCase();
        tools[i].style.display = title.includes(input) ? "" : "none";
    }
}

// ===== Optional: Highlight Tool on Hover =====
const tools = document.querySelectorAll(".tool");
tools.forEach(tool => {
    tool.addEventListener("mouseenter", () => {
        tool.style.transform = "translateY(-10px)";
        tool.style.boxShadow = "0 10px 25px rgba(0,0,0,0.2)";
    });
    tool.addEventListener("mouseleave", () => {
        tool.style.transform = "translateY(0)";
        tool.style.boxShadow = "0 5px 15px rgba(0,0,0,0.1)";
    });
});
// ===== IMAGE STUDIO =====

let img = new Image();
let canvas = document.getElementById("canvas");
let ctx = canvas ? canvas.getContext("2d") : null;
let rotation = 0;

// Upload Image
const uploadInput = document.getElementById("upload");
if(uploadInput){
uploadInput.addEventListener("change", function(e){

let file = e.target.files[0];
let reader = new FileReader();

reader.onload = function(event){
img.src = event.target.result;
}

reader.readAsDataURL(file);

});
}

img.onload = function(){

canvas.width = img.width;
canvas.height = img.height;

ctx.clearRect(0,0,canvas.width,canvas.height);
ctx.drawImage(img,0,0);

}

// Resize
function resizeImage(){

canvas.width = img.width / 2;
canvas.height = img.height / 2;

ctx.drawImage(img,0,0,canvas.width,canvas.height);

}

// Rotate (can rotate multiple times)
function rotateImage(){

rotation += 90;

canvas.width = img.height;
canvas.height = img.width;

ctx.clearRect(0,0,canvas.width,canvas.height);

ctx.save();
ctx.translate(canvas.width/2, canvas.height/2);
ctx.rotate(rotation * Math.PI / 180);

ctx.drawImage(img,-img.width/2,-img.height/2);

ctx.restore();

}

// Crop center
function cropImage(){

let size = Math.min(canvas.width,canvas.height);

let startX = (canvas.width-size)/2;
let startY = (canvas.height-size)/2;

let data = ctx.getImageData(startX,startY,size,size);

canvas.width = size;
canvas.height = size;

ctx.putImageData(data,0,0);

}

// Compress
function compressImage(){

let data = canvas.toDataURL("image/jpeg",0.6);
img.src = data;

}

// Convert PNG
function convertImage(){

let data = canvas.toDataURL("image/png");
img.src = data;

}

// Watermark
function addWatermark(){

ctx.font = "28px Arial";
ctx.fillStyle = "rgba(255,255,255,0.7)";
ctx.fillText("👑 King Tools",20,40);

}

// Download
function download(){

let link = document.createElement("a");

link.download = "king-tools-image.png";
link.href = canvas.toDataURL();

link.click();

}

// Reset
function resetImage(){

rotation = 0;

canvas.width = img.width;
canvas.height = img.height;

ctx.drawImage(img,0,0);

}

// ===== Crop Presets =====

// Square
function cropSquare(){

cropImage();

}

// Instagram
function cropInstagram(){

cropImage();

}

// Story (9:16)
function cropStory(){

canvas.height = canvas.width * 16 / 9;

ctx.drawImage(img,0,0,canvas.width,canvas.height);

}

// Landscape
function cropLandscape(){

canvas.height = canvas.width * 9 / 16;

ctx.drawImage(img,0,0,canvas.width,canvas.height);

}

// YouTube Thumbnail
function cropThumbnail(){

canvas.width = 1280;
canvas.height = 720;

ctx.drawImage(img,0,0,1280,720);

}
