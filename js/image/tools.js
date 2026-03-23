// ==========================
// BASIC FILTERS 

// ==========================
// CONTROLS
// ==========================

// BRIGHTNESS SLIDER
function setBrightness(val){
    app.brightness = val;
    render();
}

//CONTRAST 
function setContrast(val){
    app.contrast = val;
    render();
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

    const img = new Image();
    img.src = tempcanvas.todataURL();
 ZOOimg.onload = ()=>{app.originalImage = img;
                      render();
                     };
}

// ZOOM
function zoom(val){
    app.zoom = val;
    render();
}

document.getElementById("zoomRange").addEventListener("input", (e)=>{
    zoom(parseFloat(e.target.value));
});
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
    app.originalImage = new Image();
app.originalImage.src = canvas.toDataURL();

app.currentImage = new Image();
app.currentImage.src = canvas.toDataURL();
}

// AI (BASIC PLACEHOLDER)
function aiEnhance(){
    if(!app.originalImage) return;

    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(app.originalImage, 0, 0, canvas.width, canvas.height);

    applyBrightness(20);
}

function aiCool(){
    if(!app.originalImage) return;

    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(app.originalImage, 0, 0, canvas.width, canvas.height);

    applyBrightness(-20);
}

// DOWNLOAD FIX
function download(){
    downloadImage();
}
