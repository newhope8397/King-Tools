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
    img.src = tempCanvas.toDataURL();
    img.onload = ()=>{app.originalImage = img;
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

    const tempCanvas = document.createElement("canvas");
    const tctx = tempCanvas.getContext("2d");

    tempCanvas.width = w;
    tempCanvas.height = h;

    tctx.drawImage(canvas,0,0,w,h);

    const img = new Image();
    img.src = tempCanvas.toDataURL();

    img.onload = ()=>{
    canvas.width = w;
    canvas.height = h;

     app.originalImage = img;
     render();
    
  };
}

// AI (BASIC PLACEHOLDER)
function aiEnhance(){
    if(!app.originalImage) return;
    
    app.brightness = 120;
    app.contrast = 120;
    render();
}

function aiCool(){
    if(!app.originalImage) return;

    app.brightness = 90;
    app.contrast = 110;
    render();
}

// DOWNLOAD FIX
function download(){
    downloadImage();
}
