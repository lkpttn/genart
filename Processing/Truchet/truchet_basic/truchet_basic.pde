color[] palette = { #1267d3, #118135, #fbbd00, #f72520};
int tiles = 46;

void setup() {
  size(600, 600);
  noLoop();
  strokeWeight(4);
  strokeCap(SQUARE);
  pixelDensity(2);
}

void draw() {
  background(255);
  // For each tile, go and draw one of two shapes
  for (int x = 0; x < width; x+= tiles) {
    for (int y = 0; y < height; y += tiles) {
      drawTile(x, y, tiles);
    }
  }
}


void drawTile(int x, int y, int size) {
  // stroke(randomColor(palette));
  if (int(random(2)) == 0) {
    arc(x, y + size, size, size, (3 * PI) / 2, 2 * PI);
    arc(x + size, y, size, size, PI / 2, PI);
  } else {
    arc(x, y, size, size, 0, HALF_PI);
    arc(x + size, y + size, size, size, PI, (3 * PI) / 2);
  }
}

color randomColor(color[] palette) {
  return palette[int(random(palette.length))];
}

void mousePressed() {
  redraw();
}
