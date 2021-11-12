const canvas = document.querySelector('#jsCanvas');
const ctx = canvas.getContext('2d');
const range = document.querySelector('#jsRange');
const colors = document.querySelectorAll('.jsColor');
const mode = document.querySelector('#jsMode');
const save = document.querySelector('#jsSave');

const canvasSize = 700;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvasSize, canvasSize);
ctx.strokeStyle = '#2c2c2c';
ctx.lineWidth = 2.5;

canvas.width = canvasSize;
canvas.height = canvasSize;

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

function changerange(event) {
    ctx.lineWidth = event.target.value;
}

function changeColor(event) {
    const color = event.target.style.backgroundColor

    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function changeMode(event) {
    if(filling) {
        event.target.innerText = 'FILL'
        filling = false;

    } else {
        event.target.innerText = 'STROKE'
        filling = true;
    }
}

function changeBgColor() {
    if (filling) {
        ctx.fillRect(0, 0, canvasSize, canvasSize)
    }
}

function handleCM(event) {
    event.preventDefault();
    //이벤트를 취소할 수 있는 경우, 이벤트의 전파를 막지않고 그 이벤트를 취소합니다.
}

function canvasSave() {
    const image = canvas.toDataURL();
    const link = document.createElement('a');
    link.href = image;
    link.download = '😃';
    // link.click();
}

// canvas Event
canvas.addEventListener('mousemove', mousemove);
canvas.addEventListener('mousedown', startPainting);
canvas.addEventListener('mouseleave', stopPainting);
canvas.addEventListener('mouseup', stopPainting);
canvas.addEventListener('click', changeBgColor);
// canvas.addEventListener('contextmenu', handleCM)

// range Event
range.addEventListener('input', changerange);

// colors Event
colors.forEach(color => color.addEventListener('click', changeColor));

// mode Event
mode.addEventListener('click', changeMode);

// save Event
save.addEventListener('click', canvasSave);