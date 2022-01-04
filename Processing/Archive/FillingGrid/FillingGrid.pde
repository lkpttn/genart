int margin = 40;

void setup() {
  size(1200, 800);
  noLoop();
  stroke(0);
  noFill();
}

void draw() {
  background(0);
  stroke(255);

  translate(margin, margin);
  drawGrid(40, width - margin *2, height - margin * 2);
}

void drawGrid(int size, int w, int h) {
  int gridWidth =  w / size;
  int gridHeight = h / size;
  for (int i = 0; i < gridWidth; i++) {
    for (int j = 0; j < gridHeight; j++) {
      {
        push();
        translate(size * i, size * j);
        
        // Operate on each cell
        noStroke();
        fill(int(random(0,255)));
        rect(0, 0, size, size);
        
        pop();
      }
    }
  }
}

void mousePressed() {
  redraw();
}

void keyPressed() {
  if (key == 's')saveFrame("####.png");
  println("Saving screenshot");
}
