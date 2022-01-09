int count = 10;
int margin = 50;
float u, v = 0.00;
int tileSize;

void setup() {
  size(600, 600);
  noLoop();
  ellipseMode(CORNER);
  
  tileSize = (width - margin - margin) / count;
  
}

void draw() {
  background(255);
  rect(0, 0, margin, margin);
  rect(width-margin, 0, margin, margin);
  rect(0, height-margin, margin, margin);
  rect(width-margin, height-margin, margin, margin);
  
  for (int x = 0; x < count; x++) {
    for (int y = 0; y < count; y++) {
      u = norm(x, 0, count);
      v = norm(y, 0, count);
      drawTile(u, v, tileSize);
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
