int[] colors = {#2364aa, #3da5d9, #73bfb8, #fec601, #ea7317};
//int[] colors = {#008cc5,#33cccc,#f7fff7,#ff6b6b,#ffe66d};

void setup() {
  size(800, 800);
  noLoop();
  rectMode(CENTER);
}

void draw() {
  background(getCol());
  grid();
}

void grid() {
  int cells = 5;
  float gap = width / cells;
  for (int j=0; j<=cells; j++) {
    for (int i=0; i<=cells; i++) {
      float x = i * gap + gap / 2;
      float y = j * gap + gap / 2;
      float diameter = random(30, 100);
      stroke(getCol());
      dotCircle(x, y, diameter);
    }
  }
}

void dotCircle(float x_, float y_, float diameter) {
  float radius = diameter/2;
  int count = int(diameter*100);
  for (int i = 0; i < count; i ++) {
    float angle = random(TWO_PI);
    float rnd = (random(random(random(2))))+1;
    float x = x_ + rnd * radius * cos(angle);
    float y = y_ + rnd * radius * sin(angle);

    square(x, y, 0.5);
  }
}

void mousePressed() {
  redraw();
}

void keyPressed() {
  if (key == 's')saveFrame("####.png");
}

int getCol() {
  return colors[(int)random(colors.length)];
}
