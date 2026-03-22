// ==========================
// LAYERS SYSTEM (BASE)
// ==========================

// All layers stored here
window.layers = [];

// Active selected layer
window.activeLayer = null;

// Add new image layer
function addLayer(img){
    const layer = {
        img: img,
        x: 50,
        y: 50,
        width: img.width,
        height: img.height
    };

    layers.push(layer);
    activeLayer = layer;

    renderLayers();
}

// Render all layers
function renderLayers(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    layers.forEach(layer => {
        ctx.drawImage(layer.img, layer.x, layer.y, layer.width, layer.height);
    });
}
