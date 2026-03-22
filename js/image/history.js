// ==========================
// HISTORY SYSTEM
// ==========================
let history = [];
let redoStack = [];

window.saveState = function(){
    history.push(canvas.toDataURL());
    if(history.length > 20) history.shift();
    redoStack = [];
}

window.undo = function(){
    if(history.length > 0){
        redoStack.push(canvas.toDataURL());

        let img = new Image();
        img.src = history.pop();

        img.onload = () => ctx.drawImage(img,0,0);
    }
}

window.redo = function(){
    if(redoStack.length > 0){
        history.push(canvas.toDataURL());

        let img = new Image();
        img.src = redoStack.pop();

        img.onload = () => ctx.drawImage(img,0,0);
    }
}
