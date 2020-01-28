function setup() {
    createCanvas(1000, 500);
    background('#222222');
}

function mouseDragged(event) {
    ellipse(mouseX, mouseY, 50, 50);
    fill('rgba(0,255,0, 0.25)');
    console.log(event);
    var socket = io();
    let neededData = event.srcElement;
    socket.emit("send drawing", neededData);
    
    socket.on("show drawing", (neededData) => {
        console.log("Received", neededData);
    });
    // prevent default
    return false;
}  