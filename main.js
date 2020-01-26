const stepButton = document.getElementById('step');
const autoButton = document.getElementById('auto');
const stopButton = document.getElementById('stop');
const numSteps = document.getElementById('stepText');
const resetButton = document.getElementById('reset');
const rainbowCheckbox = document.getElementById('rainbow');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let x = 0;
let y = 0;
let steps = 0;
let nIntervId;
let speed = 100;

function drawOrigin() {
  ctx.translate(canvas.width / 2, canvas.height / 2);
  let origin = new Path2D();
  origin.arc(0, 0, 2, 25, 0, 2 * Math.PI);
  ctx.fillStyle = 'red';
  ctx.fill(origin)
}

function step() {
  let direction = ""

  ctx.beginPath();
  ctx.moveTo(x, y);
  switch(getRandomInt(4)) {
    case 0:
      x += 10;
      direction = "right";
      break;
    case 1:
      x -= 10;
      direction = "left";
      break;
    case 2:
      y += 10;
      direction = "down";
      break;
    case 3:
      y -= 10;
      direction = "up";
      break;
  }
  ctx.lineTo(x, y);
  if (rainbowCheckbox.checked === true) {
    ctx.strokeStyle = 'rgb('+ getRandomInt(256) + ', ' + getRandomInt(256) + ', ' + getRandomInt(256) + ')';
  } else {
    ctx.strokeStyle = 'grey';
  }
  ctx.stroke();
  steps++;
  numSteps.innerHTML = "Steps: " + steps;
  console.log(direction);
}

function auto() {
  autoButton.style.display = 'none';
  stopButton.style.display = 'block';
  nIntervId = setInterval(step, speed);
}

function stop() {
  autoButton.style.display = 'block';
  stopButton.style.display = 'none';
  clearInterval(nIntervId);
}

function reset() {
  stop();
  x = 0;
  y = 0;
  steps = 0;
  numSteps.innerHTML = "Steps: " + steps;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawOrigin();
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

drawOrigin();
stepButton.onclick = step;
autoButton.onclick = auto;
stopButton.onclick = stop;
resetButton.onclick = reset;