int count = 30;
int margin = 50;
float u, v = 0.00;
int tileSize;
color[] palette = { #fbbd00, #1267d3, #118135, #f72520};


void setup() {
  size(700, 700);
  noLoop();
  pixelDensity(2);
  strokeWeight(2);
  strokeCap(SQUARE);
  strokeJoin(BEVEL);

  tileSize = (width - margin - margin) / count;
  
  fill(0);
}

void draw() {
  background(255);
  

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

  // stroke(randomColor(palette));
  stroke(0);

  if (int(random(2)) == 0) {
    triangle(x, y, x + size/2, y, x, y + size/2);
    triangle(x + size/2, y + size, x + size, y + size, x + size, y + size/2);
  } else {
    triangle(x + size/2, y, x + size, y, x + size, y + size/2);
    triangle(x, y + size/2, x + size/2, y + size, x, y + size);
  }
}

color randomColor(color[] palette) {
  return palette[int(random(palette.length))];
}

void keyPressed() {
  if (key == 's' || key == 'S') {
    saveFrame("arcs-######.png");
    println("Saving image");
  }
  if (key == ENTER) {
    redraw();
  }
}
