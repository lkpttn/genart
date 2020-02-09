// Variables
var points;
var magnitude;
var yOffset;
var dimension = 600;

// MAIN **********************************

function setup() {
  // put setup code here
  createCanvas(dimension, dimension);
  background(255);
  stroke(237, 34, 93);
  fill(255);

  points = 600; // size
  magnitude = 0.2;
  yOffset = 0;
}

function draw() {
  for (let i = 0; i < 10; i++) {
    drawLine(i * 60);
  }
  noLoop();
}

// METHOODS *******************************
function drawLine(space) {
  // Use this to draw the same line each time
  // yOffset = 0;
  beginShape();
  for (let x = 0; x < points; ) {
    let y = map(noise(yOffset), 0, 1, 0, dimension);
    vertex(x, space + y * magnitude);
    x += 2;
    yOffset += 0.02;
  }
  endShape();
}
