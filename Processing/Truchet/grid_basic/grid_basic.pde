int count = 10;
int margin = 100;
float u, v = 0.00;

void setup() {
  size(1000, 1000);
  noLoop();
  ellipseMode(CORNER);
}

void draw() {
  background(255);
  rect(0, 0, 100, 100);
  rect(width-margin, 0, 100, 100);
  rect(0, height-margin, 100, 100);
  rect(width-margin, height-margin, 100, 100);
  
  for (int x = 0; x < count; x++) {
    for (int y = 0; y < count; y++) {
      u = norm(x, 0, count);
      v = norm(y, 0, count);
      drawTile(u, v, 800/count);
    }
  }
}

void drawTile(float u, float v, int size) {
  float x = lerp(margin, width - margin, u);
  float y = lerp(margin, width - margin, v);
  
  rect(x, y, size, size);
  
}

void mousePressed() {
  redraw();
}
