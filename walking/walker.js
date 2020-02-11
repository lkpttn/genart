var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const width = canvas.width;
const height = canvas.height;

let x = width / 2;
let y = height / 2;
const stepSize = 20;

const angles = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2];

context.fillStyle = 'black';
context.fillRect(0, 0, width, height);

const draw = () => {
  // Choose a random angle and move that way 1 stepSize
  let angle = angles[Math.floor(Math.random() * angles.length)];
  x += Math.cos(angle) * stepSize;
  y += Math.sin(angle) * stepSize;

  // Turn around if you hit the edge of the canvas
  if (this.x < 0) this.x = 0;
  if (this.x > width) this.x = width;
  if (this.y < 0) this.y = 0;
  if (this.y > height) this.y = height;

  context.beginPath();
  context.arc(x, y, 2, 0, Math.PI * 2, false);
  context.fillStyle = 'rgba(255,255,255,0.2)';
  context.fill();

  requestAnimationFrame(draw); // do it again
};

draw();
