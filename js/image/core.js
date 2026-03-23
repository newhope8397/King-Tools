// ==========================
// CORE SYSTEM
// ==========================
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d", { willReadFrequently: true });

window.app = {
    canvas,
    ctx,
    currentImage: null,
    scale: 1
};

function loadImage(file){
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
        const box = document.getElementById("box");

        let ratio = Math.min(
            box.clientWidth / img.width,
            box.clientHeight / img.height
        );

        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        app.currentImage = img;
        app.scale = ratio;

        saveState();
    };
}

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

// EXPORT
function downloadImage(){
    const link = document.createElement("a");
    link.download = "edited.png";
    link.href = canvas.toDataURL();
    link.click();
}
