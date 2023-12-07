const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const drawingTypeSelect = document.getElementById('drawing-type');

window.onload = () => {
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;

  console.log(document.body.clientWidth);
  console.log(document.body.clientHeight);
};

let isPressed = false;
let initialPos = {
  x: 0,
  y: 0,
};
let finalPos = {
  x: 0,
  y: 0,
};

const drawingsPosition = [];
let type = 'box';

drawingTypeSelect.addEventListener('change', (ev) => {
  ev.stopPropagation();
  type = ev.target.value;
});

canvas.addEventListener('mousedown', (ev) => {
  isPressed = true;
  initialPos.x = ev.clientX;
  initialPos.y = ev.clientY;
});

canvas.addEventListener('mouseup', (ev) => {
  drawingsPosition.push({
    type,
    initialPos: Object.assign({}, initialPos),
    finalPos: Object.assign({}, finalPos),
  });
  isPressed = false;
});

canvas.addEventListener('mousemove', (ev) => {
  if (isPressed) {
    finalPos.x = ev.clientX;
    finalPos.y = ev.clientY;
    handleDrawing();
  }
});

function handleDrawing() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawingsPosition.forEach((pos) => {
    switch (pos.type) {
      case 'box':
        drawBox(pos.initialPos, pos.finalPos);
        break;
      case 'circle':
        drawCircle(pos.initialPos, pos.finalPos);
    }
  });
  switch (type) {
    case 'box':
      drawBox(initialPos, finalPos);
      break;
    case 'circle':
      drawCircle(initialPos, finalPos);
      break;
  }
}

function drawBox(initialPos, finalPos) {
  ctx.beginPath();
  ctx.rect(
    initialPos.x,
    initialPos.y,
    finalPos.x - initialPos.x,
    finalPos.y - initialPos.y
  );
  ctx.stroke();
}

function drawCircle(initialPos, finalPos) {
  ctx.beginPath();
  ctx.arc(
    initialPos.x,
    initialPos.y,
    Math.abs(finalPos.y - initialPos.y),
    0,
    Math.PI * 2
  );
  ctx.stroke();
}
