void setup() {
  size(1000, 1000);
  noLoop();
  noSmooth();
  background(0);
  stroke(59);
}

void draw() {
  for (int x = 0; x < width; x++) {
    for (int y = 0; y < height; y++) {
      color phase = color(
        255-map((x*y), 0, 1000000, 0, 255),
        map(x*y, 0, 1000000, 0, 255),
        map(x*y, 0, 100000, 0, 255)
        );
      stroke(phase);
      point(x, y);
    }
  }
}
