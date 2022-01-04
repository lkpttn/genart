Line[] lineArray;
color[] palette = { 
  color(242, 177, 56, 100),
  color(163, 165, 137, 100),
  color(242, 189, 35, 100),
  color(86, 82, 6, 100),
  color(216, 75, 26, 100),
  color(140, 133, 123, 100) };

void setup() {
  size(1000, 1000);
  background(#D7D8C9);
  noLoop();
  noFill();
  stroke(0);
  strokeWeight(2);
  // pixelDensity(2);

  lineArray = new Line[100];

  for (int i = 0; i < lineArray.length; i++) {
    color col = randomColor(palette);
    float xpos = random(width);
    float ypos = random(height);
    float jitter = random(10);
    lineArray[i] = new Line(col, xpos, ypos, jitter);
  }
}

void draw() {
  for (int i = 0; i < lineArray.length; i++) {
    Line line = lineArray[i];

    for (int j = 0; j < 1000; j++) {
      line.draw();
    }
  }
}

color randomColor(color[] palette) {
  return palette[int(random(palette.length))];
}

class Line {
  color c;
  float xpos;
  float ypos;
  float xprev;
  float yprev;
  float jitter;

  Line(color tempC, float tempX, float tempY, float tempJit) {
    c = tempC;
    xprev = tempX;
    yprev = tempY;
    jitter = tempJit;
  }

  void draw() {
    stroke(c);

    xpos = xprev + random(-jitter, jitter);
    ypos = yprev + random(-jitter, jitter);

    float superJitter = jitter * 6;
    float xc1 = xprev + random(-superJitter, superJitter);
    float yc1 = yprev + random(-superJitter, superJitter);
    float xc2 = xpos - random(-superJitter, superJitter);
    float yc2 = xpos - random(-superJitter, superJitter);

    if (xpos > width) {
      xpos = width;
    }
    if (ypos > height) {
      ypos = height;
    }
    bezier(xprev, yprev, xc1, yc1, xc2, yc2, xpos, ypos);

    xprev = xpos;
    yprev = ypos;
  }
}
