// Initial Variables

var dim = 500;
var k = 5;
var num = 0;
var maximum = k + 1;
var time;

var ticks = 1;
var frames = 13;

var sweeps = [];
var maxPal = 256;
var numPal = 0;

var mainColor;

// MAIN **********************************

function setup() {
  // put setup code here
  createCanvas(500, 500);
  colorMode(RGB, 255);
  background(255);

  mainColor = color(255, 204, 0);

  let g = int(dim / k);
  for (let i = 0; i < k; i++) {
    sweeps.push(new Sweep(0, random(dim), g * 10));
    num++;
  }
}

function draw() {
  time++;
  for (let i = 0; i < num; i++) {
    sweeps[i].render();
  }
}

// METHOODS *******************************

class Sweep {
  constructor(X, Y, Z) {
    this.x = X;
    this.y = Y;
    this.ox = X;
    this.oy = Y;
    this.gage = Z;
    this.ogage = Z;
    this.sg = 0;
    var vx;
    var time;

    // Randomize
    this.selfInit();
  }

  selfInit() {
    // Do color sweeps
    this.color = 'red';
    this.sg = random(0.01, 0.1);
    this.x = this.ox;
    this.y = this.oy;
    this.gage = this.ogage;
    this.vx = 1.0;
  }

  render() {
    // Move through time
    this.x += this.vx;
    if (this.x > dim) {
      this.selfInit();
    }
    tpoint(int(this.x), int(this.y), this.color, 0.07);

    this.sg += random(-0.043, 0.042);
    if (this.sg < -0.3) {
      this.sg = -0.3;
    } else if (this.sg > 0.3) {
      this.sg = 0.3;
    } else if (this.sg > -0.01 && this.sg < 0.01) {
      console.log('Triggered that weird condition');
    }

    let wd = 200;
    let w = this.sg / wd;
    for (let i = 0; i < wd; i++) {
      tpoint(
        int(this.x),
        int(this.y - this.gage + sin(i * w)),
        this.color,
        0.1 - i / (wd * 10 + 10),
      );
      tpoint(
        int(this.x),
        int(this.y + this.gage + sin(i * w)),
        this.color,
        0.1 - i / (wd * 10 + 10),
      );
    }
  }
}

// Translucent point
function tpoint(x1, y1, color, a) {
  let r, g, b;

  let c = mainColor;

  r = int(red(c) + (red(color) - red(c)) * a);
  g = int(green(c) + (green(color) - green(c)) * a);
  b = int(blue(c) + (blue(color) - blue(c)) * a);

  stroke(r, g, b);
  point(x1, y1);
}
