void setup() {
  size(700, 700);
  noLoop();
  stroke(0);
  noFill();
}

void draw() {
  background(250);
}

void mousePressed() {
  redraw();
}

void keyPressed() {
  if (key == 's')saveFrame("####.png");
}
