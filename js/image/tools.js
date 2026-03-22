// ==========================
// FILTERS
// ==========================
function applyBrightness(value){
    let imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
    let data = imageData.data;

    for(let i=0;i<data.length;i+=4){
        data[i] += value;     // R
        data[i+1] += value;   // G
        data[i+2] += value;   // B
    }

    ctx.putImageData(imageData,0,0);
    saveState();
}

function applyGrayscale(){
    let imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
    let data = imageData.data;

    for(let i=0;i<data.length;i+=4){
        let avg = (data[i]+data[i+1]+data[i+2])/3;
        data[i] = data[i+1] = data[i+2] = avg;
    }

    ctx.putImageData(imageData,0,0);
    saveState();
}
