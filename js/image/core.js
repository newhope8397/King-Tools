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
    isdragging; false,
    startX:0,
    startY:0,
    element:[]
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
    originalImage: null,
    currentImage: null,
    scale: 1, 
    zoom: 1,
    brightness: 100,
    contrast: 100
};

// LOAD IMAGE
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

        app.originalImage = img;
        app.currentImage = img;
        app.scale = ratio;

        render(); 
    };
}
// 🔥 use central render
function render(){
    if(!app.originalImage) return;

    const img = app.originalImage;

    let baseW = img.width * app.scale;
    let baseH = img.height * app.scale;

    let w = baseW * app.zoom;
    let h = baseH * app.zoom;

    ctx.clearRect(0,0,canvas.width,canvas.height);

    let x = (canvas.width - w)/2;
    let y = (canvas.height - h)/2;

    ctx.drawImage(img, x, y, w, h);

    // APPLY FILTERS AFTER DRAW
    applyFilters();
}

// CLEAR CANVAS

// EXPORT
function downloadImage(){
    const link = document.createElement("a");
    link.download = "edited.png";
    link.href = canvas.toDataURL();
    link.click();
}
