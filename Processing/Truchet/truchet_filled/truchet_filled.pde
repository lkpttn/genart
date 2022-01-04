int tiles = 41;


void setup() {
  size(600, 600);
  noLoop();
  noStroke();
  background(255);
}

void draw() {
 
  for (int x = 0; x < width; x+= tiles) {
    for (int y = 0; y < height; y += tiles) {
      if (int(random(2)) == 0) {
        fill(0);
      } else {
        fill(150);
      }
      rect(x, y, tiles, tiles);
    }
  }

  for (int x = 0; x < width; x+= tiles) {
    for (int y = 0; y < height; y += tiles) {
      if ((x+y) % 2 == 0) {
        fill(0);
      } else {
        fill(150);
      }
      ellipse(x, y, tiles, tiles);
    }
  }
}

void mousePressed() {
  redraw();
}
