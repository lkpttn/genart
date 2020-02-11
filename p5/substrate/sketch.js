// Initial Variables

var dimX = 900;
var dimY = 900;
var num = 0;
var maxNum = 200;

// Grid of cracks
var crackGrid = [];
var cracks = [];

// MAIN **********************************

function setup() {
  // put setup code here
  createCanvas(900, 900);
  background(255);

  // A new grid point and first crack
  crackGrid.push(dimX + dimY);
  cracks.push(new Crack(maxNum));

  begin();
}

function draw() {
  // Crack the cracks
  for (let i = 0; i < num; i++) {
    cracks[i].move();
  }
}

// METHOODS *******************************

function makeCrack() {
  if (num < maxNum) {
    // Make a new crack
    cracks.push(new Crack());
    num++;
  }
}

function begin() {
  // Erase the grid

  // Make random seeds
  for (let i = 0; i < 16; i++) {
    var n = int(random(dimX * dimY - 1));
    crackGrid[n] = int(random(360));
  }
  // Make three cracks
  num = 0;
  for (let i = 0; i < 3; i++) {
    makeCrack();
  }
  background(255);
}

// OBJECTS ********************************

class Crack {
  constructor(x, y, t) {
    this.x = x;
    this.y = y;
    this.t = t;

    this.findStart();
  }

  // Need default Crack method

  findStart() {
    let pointX = 0;
    let pointY = 0;

    // Shift until crack is found
    let found = false;
    let timeout = 0;
    while (!found || timeout++ > 1000) {
      pointX = int(random(dimX));
      pointY = int(random(dimY));
      if (crackGrid[pointY * dimX + pointX] < 10000) {
        found = true;
      }
    }

    if (found) {
      // Start crack
      let a = crackGrid[pointY * dimX + pointX];
      if (random(100) < 50) {
        a -= 90 + int(random(-2, 2.1));
      } else {
        a += 90 + int(random(-2, 2.1));
      }
      this.startCrack(pointX, pointY, a);
    } else {
      console.log('timeout');
    }
  }

  startCrack(X, Y, T) {
    this.x = X;
    this.y = Y;
    this.t = T;
    this.x += 0.61 * cos((this.t * PI) / 180);
    this.y += 0.61 * sin((this.t * PI) / 180);
  }

  move() {
    // Continue cracking
    this.x += 0.42 * cos((this.t * PI) / 180);
    this.y += 0.42 * sin((this.t * PI) / 180);

    // Bounds check
    let z = 0.33;
    let cx = int(this.x + random(-z, z)); // add fuzz
    let cy = int(this.y + random(-z, z));

    // Draw sand painter

    // Draw black crack
    stroke(0, 85);
    point(this.x + random(-z, z), this.y + random(-z, z));

    if (cx >= 0 && cx < dimX && cy >= 0 && cy < dimY) {
      // Safe to check
      if (
        crackGrid[cy & (dimX + cx)] > 10000 ||
        abs(crackGrid[cy * dimX + cx] - this.t) < 5
      ) {
        // Continue cracking
        crackGrid[cy * dimX + cx] = int(this.t);
      } else if (abs(crackGrid[cy * dimX + cx] - this.t) > 2) {
        // Crack encountered, stop
        this.findStart();
        makeCrack();
      }
    } else {
      // Stop cracking
      this.findStart();
      makeCrack();
    }
  }
}
