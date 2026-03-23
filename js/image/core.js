// ==========================
// CORE SYSTEM
// ==========================
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d", { willReadFrequently: true });
ctx.imageSmoothingEnabled = true;
ctx.imageSmoothingQuality = "high";
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

        app.brightness = 100;
        app.contrast = 100;
        app.zoom = 1;

        app.offsetX:0,
        app.offsetY:0, 
        render(); 
    };
}
// render
function render(){
    if(!app.originalImage) return;

    const img = app.originalImage;

    let baseW = img.width * app.scale;
    let baseH = img.height * app.scale;

    let w = baseW * app.zoom;
    let h = baseH * app.zoom;

    ctx.clearRect(0,0,canvas.width,canvas.height);

    let x = (canvas.width - w)/2 + app.offsetX;
    let y = (canvas.height - h)/2 + app.offsetY;

    ctx.drawImage(img, x, y, w, h);

    applyFilters();
}
 //APPLY FILTERS AFTER DRAW 
function applyFilters(){
    let imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
    let data = imageData.data;

    let brightness = app.brightness - 100;
    let contrast = app.contrast;

    let factor = (259 * (contrast + 255)) / (255 * (259 - contrast));

    for(let i=0;i<data.length;i+=4){
        // brightness
        data[i] += brightness;
        data[i+1] += brightness;
        data[i+2] += brightness;

        // contrast
        data[i] = factor * (data[i]-128) + 128;
        data[i+1] = factor * (data[i+1]-128) + 128;
        data[i+2] = factor * (data[i+2]-128) + 128;
        //clamp values 
       data[i] = Math.max(0, Math.min(255,data[i]));
        data[i+1] = Math.max(0, Math.min(255,data[i+1]));
        data[i+2] = Math.max(0, Math.min(255,data[i+2]));
    }

    ctx.putImageData(imageData,0,0);
}

// EXPORT
function downloadImage(){
    const link = document.createElement("a");
    link.download = "edited.png";
    link.href = canvas.toDataURL();
    link.click();
}
