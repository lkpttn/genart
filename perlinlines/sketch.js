var colors;
var lines = [];
var thick;
var num = 180;
var dimension = 800;

function setup() {
  // put setup code here
  createCanvas(dimension, dimension);
  rectMode(CENTER);
  angleMode(DEGREES);
  noFill();
  strokeWeight(2);
  colors = [color(255, 0, 0), color(0, 255, 0), color(0, 0, 255)];
  makeLines();
}

function draw() {
  blendMode(BLEND);
  background(255);
  for (let i = 0; i < lines.length; i++) {
    lines[i].calc();
    lines[i].render();
  }

  noLoop();
}

// FUNCTIONS ********************
function makeLines() {
  let count = 10;
  lines.splice(0, lines.length);

  for (let i = 0; i < count; i++) {
    lines.push(new Line(0, i * 20, 10, 40, colors[i % colors.length]));
  }
}

class Line {
  constructor(x, y, frequency, amplitude, color) {
    this.x = x;
    this.y = y;
    this.frequency = frequency;
    this.amplitude = amplitude;
    this.color = color;
    this.points = [];
  }

  calc() {
    // Need to calculate the position of the entire line
    for (let i = 0; i < dimension; i++) {
      this.x += this.frequency;
      let noiseVal = noise(i) * this.amplitude;
      this.points.push([this.x, this.y + noiseVal]);
    }
  }

  render() {
    // Draw the entire line
    beginShape();
    stroke(this.color);
    for (let i = 0; i < this.points.length; i++) {
      let x = this.points[i][0];
      let y = this.points[i][1];
      vertex(x, y);
    }
    endShape();
  }
}
