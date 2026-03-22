// ==========================
// CORE SYSTEM
// ==========================
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d", { willReadFrequently: true });

// GLOBAL STATE
window.app = {
    canvas,
    ctx,
    currentImage: null,
    isDragging: false,
    startX: 0,
    startY: 0,
    elements: []
};

// LOAD IMAGE
function loadImage(file){
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        app.currentImage = img;

        if(window.saveState) saveState();
    };
}

// CLEAR CANVAS
function clearCanvas(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

// EXPORT
function downloadImage(){
    const link = document.createElement("a");
    link.download = "edited.png";
    link.href = canvas.toDataURL();
    link.click();
}
