// ==========================
// DRAG SYSTEM
// ==========================
canvas.addEventListener("mousedown", (e)=>{
    app.isDragging = true;
    app.startX = e.offsetX;
    app.startY = e.offsetY;
});

canvas.addEventListener("mousemove", (e)=>{
    if(!app.isDragging) return;

    let dx = e.offsetX - app.startX;
    let dy = e.offsetY - app.startY;

    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(app.currentImage, dx, dy);
});

canvas.addEventListener("mouseup", ()=>{
    app.isDragging = false;
    if(window.saveState) saveState();
});
