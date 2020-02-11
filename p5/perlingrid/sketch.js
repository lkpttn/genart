var increment = 0.1; // Amount of change
var scl = 10;
var cols, rows;

var zoff = 0;

var fr;

var particles = [];
var flowField;

function setup() {
  // put setup code here
  createCanvas(200, 200);
  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = createP('');

  flowField = new Array(cols * rows);

  for (let i = 0; i < 200; i++) {
    particles[i] = new Particle();
  }
}

function draw() {
  background(255);
  var yoff = 0;
  for (let y = 0; y < rows; y++) {
    var xoff = 0; // Reset xoffset for each row
    for (let x = 0; x < cols; x++) {
      var index = x + y * cols;
      var angle = noise(xoff, yoff, zoff) * TWO_PI;
      var v = p5.Vector.fromAngle(angle);
      v.setMag(0.1);

      flowField[index] = v;

      xoff += increment;

      stroke(0, 50);

      // // Draw a bunch of lines
      // push();
      // translate(x * scl, y * scl);
      // rotate(v.heading());
      // line(0, 0, scl, 0);
      // strokeWeight(1);
      // pop();
    }
    yoff += increment; // Increment after each row
    zoff += 0.0003; // Increment over time
  }

  for (let i = 0; i < particles.length; i++) {
    particles[i].follow(flowField);
    particles[i].update();
    particles[i].show();
    particles[i].edges();
  }

  fr.html(floor(frameRate()));
}
