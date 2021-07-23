// initial data
let currentColor = 'black';
let canDraw = false;

let mouseX;
let mouseY;

let screen = document.querySelector('#tela');
let ctx = screen.getContext('2d');

// events
document.querySelectorAll('.colorArea .color').forEach(item => {
    item.addEventListener('click', colorClickEvent);
});

screen.addEventListener('mousedown', mouseDownEvent);
screen.addEventListener('mousemove', mouseMoveEvent);
screen.addEventListener('mouseup', mouseUpEvent);

document.querySelector('.clear').addEventListener('click', clearScreen);
document.querySelector('.download').addEventListener('click', download);

// functions
function colorClickEvent(e) {
    let color = e.target.getAttribute('data-color');
    currentColor = color;

    document.querySelector('.color.active').classList.remove('active');
    e.target.classList.add('active');
}

function mouseDownEvent(e){
    canDraw = true;
    
    mouseX = e.pageX - screen.offsetLeft;
    mouseY = e.pageY - screen.offsetTop;
}

function mouseMoveEvent(e) {
    if(canDraw) {
        draw(e.pageX, e.pageY);
    }
}

function draw(x, y) {
    let pointX = x - screen.offsetLeft;
    let pointY = y - screen.offsetTop;
    
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.lineJoin = 'round';
    ctx.moveTo(mouseX, mouseY);
    ctx.lineTo(pointX, pointY);
    ctx.closePath();

    ctx.strokeStyle = currentColor;
    ctx.stroke();

    mouseX = pointX;
    mouseY = pointY;
}

function mouseUpEvent() {
    canDraw = false;
}

function clearScreen() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function download() {
    console.log("clicou");
    let download = document.querySelector('.download');

    var image = screen
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");

    download.setAttribute("href", image);
    download.setAttribute("download","image.png");
}