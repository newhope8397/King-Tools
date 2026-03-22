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

        const box = document.getElementById("box");

        let maxW = box.clientWidth;
        let maxH = box.clientHeight;

        let ratio = Math.min(maxW / img.width, maxH / img.height);

        let newW = img.width * ratio;
        let newH = img.height * ratio;

        canvas.width = newW;
        canvas.height = newH;

        ctx.drawImage(img, 0, 0, newW, newH);

        app.currentImage = img;

        saveState();
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
