// ==========================
// BASIC FILTERS
// ==========================
function applyBrightness(value){
    let imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
    let data = imageData.data;

    for(let i=0;i<data.length;i+=4){
        data[i] += value;
        data[i+1] += value;
        data[i+2] += value;
    }

    ctx.putImageData(imageData,0,0);
    saveState();
}

// ==========================
// CONTROLS
// ==========================

// BRIGHTNESS SLIDER
function setBrightness(val){
    applyBrightness(val - 100);
}

// CONTRAST
function setContrast(val){
    let imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
    let data = imageData.data;

    let factor = (259 * (val + 255)) / (255 * (259 - val));

    for(let i=0;i<data.length;i+=4){
        data[i] = factor * (data[i]-128) + 128;
        data[i+1] = factor * (data[i+1]-128) + 128;
        data[i+2] = factor * (data[i+2]-128) + 128;
    }

    ctx.putImageData(imageData,0,0);
    saveState();
}

// ROTATE
function rotate(){
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");

    tempCanvas.width = canvas.height;
    tempCanvas.height = canvas.width;

    tempCtx.translate(tempCanvas.width/2, tempCanvas.height/2);
    tempCtx.rotate(Math.PI/2);

    tempCtx.drawImage(canvas, -canvas.width/2, -canvas.height/2);

    canvas.width = tempCanvas.width;
    canvas.height = tempCanvas.height;

    ctx.drawImage(tempCanvas, 0, 0);
    saveState();
}

// ZOOM
function zoom(scale){
    ctx.setTransform(scale, 0, 0, scale, 0, 0);
    ctx.drawImage(app.currentImage, 0, 0);
}

// RESIZE
function resizeImg(){
    let w = document.getElementById("w").value;
    let h = document.getElementById("h").value;

    let temp = document.createElement("canvas");
    let tctx = temp.getContext("2d");

    temp.width = w;
    temp.height = h;

    tctx.drawImage(canvas,0,0,w,h);

    canvas.width = w;
    canvas.height = h;

    ctx.drawImage(temp,0,0);
    saveState();
}

// AI (BASIC PLACEHOLDER)
function aiEnhance(){
    applyBrightness(20);
}

function aiCool(){
    applyBrightness(-20);
}

// DOWNLOAD FIX
function download(){
    downloadImage();
}
