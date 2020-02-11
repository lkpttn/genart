var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

const dimensions = 512;
const width = (canvas.width = dimensions);
const height = (canvas.height = dimensions);

let x = 50;
let y = 50;
let duration = 1000; // Milliseconds
let nextX, nextY;
let startTime;

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
// Start at a random posiiton
// Choose random coordinates
// Animate the circle to move to the new coordinates
// Choose new coordinates and repeat

x = getRandomInt(width);
y = getRandomInt(height);

const getNewCoordinates = () => {
  nextX = getRandomInt(width);
  nextY = getRandomInt(height);

  // Start the animation loop after choosing new coordinates
  animate();
};

const animate = time => {
  if (!startTime)
    // it's the first frame
    startTime = time || performance.now();

  // deltaTime should be in the range [0 ~ 1]
  let deltaTime = (time - startTime) / duration;
  // currentPos = previous position + (difference * deltaTime)
  // This is a sort of interpolation between points, but it has a constant duration
  // Instead of stepping a specific distance, it divides the distance into 1000 miliparts
  let currentX = x + (nextX - x) * deltaTime;
  let currentY = y + (nextY - y) * deltaTime;

  // This is how we know we've "arrived" at the new coordinates
  if (deltaTime >= 1) {
    x = nextX; // reset x variable
    y = nextY; // reset y variable
    startTime = null; // reset startTime
    draw(x, y); // draw the last frame, at required position
    getNewCoordinates();
  } else {
    draw(currentX, currentY);
    requestAnimationFrame(animate); // do it again
  }
};

const draw = (x, y) => {
  context.fillStyle = 'black';
  context.fillRect(0, 0, width, height);

  context.beginPath();
  context.arc(nextX, nextY, 10, 0, Math.PI * 2, false);
  context.strokeStyle = 'white';
  context.stroke();

  context.beginPath();
  context.arc(x, y, 10, 0, Math.PI * 2, false);
  context.fillStyle = 'white';
  context.fill();
};

getNewCoordinates();
