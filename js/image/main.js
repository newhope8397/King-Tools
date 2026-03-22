// ==========================
// MAIN APP INIT
// ==========================
document.getElementById("upload").addEventListener("change", (e)=>{
    loadImage(e.target.files[0]);
});

document.getElementById("undoBtn").onclick = undo;
document.getElementById("redoBtn").onclick = redo;

document.getElementById("brightness").oninput = (e)=>{
    applyBrightness(parseInt(e.target.value));
};

document.getElementById("grayscale").onclick = applyGrayscale;
document.getElementById("cropBtn").onclick = startCrop;
document.getElementById("download").onclick = downloadImage;
