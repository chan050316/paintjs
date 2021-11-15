const canvas = document.querySelector('#jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.querySelectorAll('.jsColor');
const mode = document.querySelector('#jsMode');
const range = document.querySelector('#jsRange');
const save = document.querySelector('#jsSave');
const remove = document.querySelector('#jsRemove');

const defaultColor = '#2c2c2c'
const canvasSize = 700;

canvas.width = canvasSize;
canvas.height = canvasSize;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvasSize, canvasSize);
ctx.strokeStyle = defaultColor;
ctx.fillStyle = defaultColor;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function mousemove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    
    if(!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function startPainting() {
    painting = true;
}

function stopPainting() {
    painting = false;
}

function changeColor(event) {
    const color = event.target.style.backgroundColor;

    ctx.strokeStyle = color;
    ctx.fillStyle = ctx.strokeStyle;
}

function changeMode(event) {
    if(filling) {
        filling = false;
        event.target.innerText = 'FILL';
    } else {
        filling = true;
        event.target.innerText = 'STROKE';
    }
}

function fillCanvas() {
    if(filling) {
        ctx.fillRect(0, 0, canvasSize, canvasSize);
    }
}

function changeStroke() {
    ctx.lineWidth = range.value;
}

function saving() {
    const url = canvas.toDataURL();
    const link = document.createElement('a');
    link.href = url;
    link.download = 'aaa';
    link.click();
}

function removing() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvasSize, canvasSize);
    ctx.fillStyle = defaultColor;
}

// canvas EventListener
canvas.addEventListener('mousemove', mousemove);
canvas.addEventListener('mousedown', startPainting);
canvas.addEventListener('mouseup', stopPainting);
canvas.addEventListener('mouseleave', stopPainting);
canvas.addEventListener('click', fillCanvas);

// other EventListener
colors.forEach(color => color.addEventListener('click', changeColor));
mode.addEventListener('click', changeMode);
range.addEventListener('input', changeStroke);
save.addEventListener('click', saving);
remove.addEventListener('click', removing);
