int count = 6;
// int[] colors = {#d2c59b, #fcf8e8, #d4cfbe, #B5B7B7, #edeadf};
int[] colors = {#444444, #111111, #eeeeee, #c7c7c7, #828282};

void setup() {
  size(700, 700);
  noLoop();
  stroke(getCol());
  fill(getCol());
}

void draw() {
  background(getCol());
  recur(10, 10, width - 20, count);
  drawTitle("THEME", "RECURSION");
}

void recur(float x, float y, float size, int n) {
  drawShape(x, y, size);
  n--;

  // Recur if there's depth left
  if (n>=0) {
    float hs = size /2;

    // Get some probability
    float probability = map(n, 0, count -1, 0.5, 0);

    // Recur in four equal areas, half dimension
    if (random(1) > probability) {
      recur(x, y, hs, n);
      recur(x + hs, y, hs, n);
      recur(x + hs, y + hs, hs, n);
      recur(x, y + hs, hs, n);
    }
  }
}

void drawShape(float x, float y, float size) {
  float rando = random(1);
  fill(getCol());
  stroke(getCol());

  // Draw a shape
  if (rando < 0.4) {
    square(x, y, size);
  } else if (rando > 0.4 && rando < 0.7) {
    smallCircle(x, y, size);
    // dotCircle(x, y, size);
  } else if (rando > 0.7) {
    ellipse(x, y, size, size);
  }
}

// SHAPES
void drawX(float x, float y, float size) {
  line(x, y, x + size, y + size);
  line(x + size, y, x, y + size);
}    

void smallCircle(float x, float y, float size) {
  square(x, y, size);
  ellipse(x, y, size/2, size/2);
}

void dotCircle(float x_, float y_, float diameter) {
  square(x_, y_, diameter);
  stroke(getCol());
  float radius = diameter/4;
  int count = int(diameter*60);
  for (int i = 0; i < count; i ++) {
    float angle = random(TWO_PI);
    float rnd = (random(random(random(2))))+1;
    float x = x_ + rnd * radius * cos(angle);
    float y = y_ + rnd * radius * sin(angle);

    square(x, y, 0.5);
  }
}




// HELPERS
int getCol() {
  return colors[(int)random(colors.length)];
}

void mousePressed() {
  redraw();
}

void keyPressed() {
  if (key == 's')saveFrame("####.png");
}
