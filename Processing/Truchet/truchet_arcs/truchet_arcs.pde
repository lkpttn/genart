int count = 20;
int margin = 50;
float u, v = 0.00;
int tileSize;

void setup() {
  size(700, 700);
  noLoop();
  pixelDensity(2);
  strokeWeight(2);
  strokeCap(PROJECT);

  tileSize = (width - margin - margin) / count;
}

void draw() {
  background(255);
  // fill(0);

  for (int x = 0; x < count; x++) {
    for (int y = 0; y < count; y++) {
      u = norm(x, 0, count);
      v = norm(y, 0, count);
      drawTile(u, v, tileSize);
    }
  }

  //noFill();
  //rect(margin, margin, width-margin-margin, height-margin-margin);
}

void drawTile(float u, float v, int size) {
  float x = lerp(margin, width - margin, u);
  float y = lerp(margin, width - margin, v);

  if (int(random(2)) == 0) {
    // line(x, y + size/2, x + size/2, y + size);
    // line(x + size/2, y, x + size, y + size/2);
    arc(x + size, y, size, size, PI / 2, PI);
    arc(x, y + size, size, size, (3 * PI) / 2, 2 * PI);
  } else {
    line(x + size/2, y, x, y +size/2);
    line(x + size/2, y + size, x + size, y + size/2);
  }
}

void keyPressed() {
  if (key == 's' || key == 'S') {
    save("arcs.png");
    println("Saving image");
  }
  if (key == ENTER) {
    redraw();
  }
}
