int count = 30;
int margin = 100;
float u, v = 0.00;

void setup() {
  size(1000, 1000);
  noLoop();
}

void draw() {
  background(255);
  // fill(0);
  
  for (int x = 0; x < count; x++) {
    for (int y = 0; y < count; y++) {
      u = norm(x, 0, count);
      v = norm(y, 0, count);
      drawTile(u, v, 800/count);
    }
  }
  
  // noFill();
  // rect(margin, margin, width-margin-margin, height-margin-margin);
}

void drawTile(float u, float v, int size) {
  float x = lerp(margin, width - margin, u);
  float y = lerp(margin, width - margin, v);
  
  if (int(random(2)) == 0) {
    arc(x, y + size, size, size, (3 * PI) / 2, TWO_PI);
    arc(x + size, y, size, size, HALF_PI, PI);
  } else {
   arc(x, y, size, size, 0, HALF_PI);
   arc(x + size, y + size, size, size, PI, (3 * PI) / 2);
  }
}

void mousePressed() {
  redraw();
}
