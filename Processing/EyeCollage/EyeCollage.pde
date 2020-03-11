PImage eye;
PImage city;

void setup() {
  size(700, 1200);
  eye = loadImage("eye2.jpg");
  eye.filter(GRAY);
  city = loadImage("city.jpg");
  city.filter(GRAY);
  rectMode(CORNER);
  strokeCap(SQUARE);
  noLoop();
}

void draw() {
  background(180);
  
  noFill();

  fill(255);
  noStroke();
  
  for(int i = 0; i < height;) {
    int rand = int(random(5, 10));
    stutterBarsHorizontal(0, i, 400, rand);
    i = i + rand + 20;
  }
  
  drawGrid(20, 400, 0, 400, 400);
  
  ditherImage(eye, 1, 150, 100, 400, 400);

  

  for(int i = 0; i < 14; i++) {
    fill(i * 20);
    rect(width-40, i * 40, 40, 40);
  }
}

void drawGrid(int spacing, int x, int y, int w, int h) {
  // Calculate the number of spaces in the grid
  int gridWidth = w / spacing; // small number
  int gridHeight = h / spacing;
  for (int i = 0; i < gridWidth; i++) {
    for (int j = 0; j < gridHeight; j++) {
      if (random(1) > 0.6) {
        rect(x + spacing * i, y + spacing * j, 4, 4);
      } else {
        rect(x + spacing * i, y + spacing * j, 2, 2);
     }
    }
  }
}

void stutterBars(int x, int w) {
  int heightArray[] = {10, 30, 60};
  int h;
  for(int i = 0; i < height;) {
    h = intFromArray(heightArray);
    rect(x, i, w, h);
    i = i + h + 10;
  }
}

void stutterBarsHorizontal(int x, int y, int gridW, int h) {
  int widthArray[] = {10, 30, 60};
  int w;
  for(int i = x; i < gridW;) {
    w = intFromArray(widthArray);
    fill(int(random(255)));
    rect(i, y, w, h);
    i = i + w + 10;
  }
}

void drawArcs(int x, int y, int num) {
  for (int i = 0; i < num; i++) {
    ellipse(x, y, i * 60, i * 60);
  }
}

void mousePressed() {
  redraw();
}

void keyPressed() {
  if (key == 's')saveFrame("####.png");
  println("Saving screenshot");
}
