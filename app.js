const canvas = document.querySelector('#jsCanvas');
const ctx = canvas.getContext('2d');

ctx.strokeStyle = '#2c2c2c';
ctx.lineWdith = 2.5;

let painting = false;

function startPainting() {
    painting = true;
}

function stopPainting() {
    painting = false;
}

function onMouseEnter(event) {
    const x = event.offsetX;
    const y = event.offsetY;
}

function onMouseDown(event) {
    painting = true;
}

// function onMouseLeave(event) {
//     painting = false;
// }

if(canvas) {
    canvas.addEventListener("mousemove", onMouseEnter);
    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting)
}