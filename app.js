const canvas = document.querySelector('#jsCanvas');
const ctx = canvas.getContext('2d');
const range = document.querySelector('#jsRange');
const colorEls = document.querySelectorAll('.jsColor');
const mode = document.querySelector('#jsMode');
const saveBtn = document.querySelector('#jsSave');

const INITAIL_COLOR = '#2c2c2c'
const canvasSize = 700;

canvas.width = canvasSize;
canvas.height = canvasSize;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvasSize, canvasSize);
ctx.strokeStyle = INITAIL_COLOR;
ctx.fillStyle = INITAIL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function startPainting() {
    painting = true;
}

function stopPainting() {
    painting = false;
}

function onMouseMove(event) {
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

function changeColor(event) {
    const color = event.target.style.backgroundColor
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function changeValue(event) {
    ctx.lineWidth = event.target.value;
}

function changeMode() {
    if(filling) {
        filling = false;
        mode.innerText = "FILL";
    } else {
        filling = true;
        mode.innerText = "STROKE";
    }
}

function changebgColor() {
    if (filling) {
      ctx.fillRect(0, 0, canvasSize, canvasSize)
    }
}

function handleCM(event) {
    event.preventDefault();
    //이벤트를 취소할 수 있는 경우, 이벤트의 전파를 막지않고 그 이벤트를 취소합니다.
}

function saving() {
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = 'PaintJS[EXPORT]';
    link.click();
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener('click', changebgColor);
    // canvas.addEventListener('contextmenu', handleCM)
}

range.addEventListener('input', changeValue);

// for (i = 0; i < colorEls.length; i++) {
//     colorEls[i].addEventListener('click', changeColor);
// }
colorEls.forEach(color => color.addEventListener('click', changeColor));

mode.addEventListener('click', changeMode);

saveBtn.addEventListener('click', saving);