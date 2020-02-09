// Variables
var points;
var numberOfCompletions;
var frequency;
var magnitude;

var a;
var b;

var dimension = 600;
var increment = 0;

// MAIN **********************************

function setup() {
  // put setup code here
  createCanvas(dimension, dimension);
  colorMode(RGB, 255);
  background(255);
  stroke(237, 34, 93);
  strokeWeight(2);
  noFill();

  points = 700; // size
  frequency = random(0.1, 1.9);
  magnitude = 0.2;
}

function draw() {
  drawSpiral(width / 2, 200, 6700, 'red');

  noLoop();
}

// METHOODS *******************************
function drawSpiral(x, y, size, color) {
  translate(x, y);
  stroke(color);
  beginShape();
  for (let i = 0; i < size; i++) {
    let theta = radians(i);
    let radius = 150;
    let x = radius * cos(theta);
    let y = radius * sin(theta);
    vertex(x, y + increment);
    increment += 0.03;
  }
  endShape();
  translate(-x, -y);
}

// const xPerl = page.rounding(Math.cos(adjustedAngle) * radius);
// const yPerl = page.rounding(Math.sin(adjustedAngle) * radius)
// let radiusMod = noise.perlin3(xPerl / v.flouncy, yPerl / v.flouncy, ttMod) * v.flounceMod;
// const newRadius = radius - radius * radiusMod;
// let x = Math.cos(adjustedAngle) * v.xScale;
// let y = Math.sin(adjustedAngle) * v.yScale;

// We're going to reverse engineer
// They're making 3D noise

// Regular
// const angle = 0.1 * i;
// const offset = a + b * angle;
// const x = cos(angle);
// const y = sin(angle);
// const deformation = abs(noise(x, y));
// const deformedRadius = offset * (1 + magnitude * deformation);
// vertex(x * deformedRadius, y * deformedRadius);

// This down here gives good noise
// It's smooth and changable
