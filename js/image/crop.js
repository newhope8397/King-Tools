// ==========================
// CROP TOOL
// ==========================
let cropStart = null;

function startCrop(){
    canvas.addEventListener("mousedown", cropMouseDown);
    canvas.addEventListener("mouseup", cropMouseUp);
}

function cropMouseDown(e){
    cropStart = {x: e.offsetX, y: e.offsetY};
}

function cropMouseUp(e){
    let endX = e.offsetX;
    let endY = e.offsetY;

    if(width < 0){
    cropStart.x += width;
    width = Math.abs(width);
}

if(height < 0){
    cropStart.y += height;
    height = Math.abs(height);
}

    let imageData = ctx.getImageData(cropStart.x, cropStart.y, width, height);

    canvas.width = width;
    canvas.height = height;

    ctx.putImageData(imageData, 0, 0);

    saveState();
}
function applyCrop(){
    // already handled in mouseUp
    // so just remove listeners
    canvas.removeEventListener("mousedown", cropMouseDown);
    canvas.removeEventListener("mouseup", cropMouseUp);
}
