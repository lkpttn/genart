var size;

function setup() {
  // put setup code here
  createCanvas(800, 800);
  // noFill();
  stroke('red');
  strokeWeight(2);
  size = 700;
}

function draw() {
  // put drawing code here
  drawSpiral(width / 2, height / 2, 6700);
}

// FUNCTIONS ********************
function drawSpiral(x, y, size) {
  translate(x, y);
  beginShape();
  for (let i = 0; i < size; i++) {
    let theta = radians(i);
    let radius = theta * 1.5;
    let x = radius * cos(theta);
    let y = radius * sin(theta);
    vertex(x, y);
  }
  endShape();
}
