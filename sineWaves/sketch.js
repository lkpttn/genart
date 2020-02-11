// Initial Variables
var w; // Width of the wave
var dx; // Increment x
var xspacing = 16; // Distance between peaks
var amplitude = 50.0; // Deviation from 0
var period = 300.0; // Width of trough
var offset = 0.001;
var yValues;
var yValues2;
var yValues3;

var xOffset = 0;
var yOffset = 500;

var thetas;
var yOffsets = [];

// MAIN **********************************
function setup() {
  // put setup code here
  createCanvas(1000, 1000);
  background(0);
  strokeWeight(2);
  stroke(0);

  // The total width of the
  w = 1000 + xspacing;
  dx = (TWO_PI / period) * xspacing;
  thetas = [0.0, PI];

  for (let i = 0; i < 10; i++) {
    yOffsets.push(i * 150);
  }

  yValues = new Array(floor(w / xspacing));
  yValues2 = new Array(floor(w / xspacing));
}

function draw() {
  background(0);
  stroke(0);
  fill(0);
  rect(250, 440, 495, 120);

  // Waves
  for (let i = 0; i < 10; i++) {
    sineWave(yValues, yOffsets[i], 0, offset, 'lime');
    sineWave(yValues2, yOffsets[i], 1, offset, 'orange');
  }
}

// METHOODS *******************************
function sineWave(yValues, yOffset, iteration, offset, color) {
  thetas[iteration] += offset;
  let x = thetas[iteration];

  // Calculate wave
  for (let i = 0; i < yValues.length; i++) {
    yValues[i] = sin(x) * amplitude;
    x += dx;
  }

  // Draw it
  stroke(color);
  beginShape(LINES);
  for (let j = 0; j < yValues.length; j++) {
    vertex(xOffset + j * xspacing, yOffset + yValues[j]);
  }
  endShape();
}
