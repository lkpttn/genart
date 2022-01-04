DotLine[] dotArray;
color[] palette = { #A4A68A, #F2BE24, #57523E, #D94C1A, #ED7A4D, #1E1803 };

void setup() {
  size(600, 600);
  background(#D7D8C9);
  noLoop();
  noStroke();
  // pixelDensity(2);

  // Create the dots
  dotArray = new DotLine[100];

  for (int i = 0; i < dotArray.length; i++) {
    color col = randomColor(palette);
    float xpos = i * width/100;
    float ypos = height/4 + random(-height/4, height/4);
    float jitter = random(10);
    dotArray[i] = new DotLine(col, xpos, ypos, 4, jitter);
  }
}

void draw() {
  // Iterate the dot lines 1000 times
  for (int i = 0; i < dotArray.length; i++) {
    DotLine dot = dotArray[i];

    for (int j = 0; j < 1000; j++) {
      dot.draw();
      dot.jit();
    }
  }
}

class DotLine {
  color c;
  float xpos;
  float ypos;
  float size;
  float jitter;

  DotLine(color tempC, float tempXpos, float tempYpos, float tempSize, float tempJitter) {
    c = tempC;
    xpos = tempXpos;
    ypos = tempYpos;
    size = tempSize;
    jitter = tempJitter;
  }

  void draw() {
    fill(c);
    ellipse(xpos, ypos, size, size);
  }

  void jit() {
    xpos = xpos + random(-jitter, jitter);
    ypos = ypos + 2;
    size = size - 0.02;
    if (size <= 0) {
      size = 0;
    }
  }
}

color randomColor(color[] palette) {
  return palette[int(random(palette.length))];
}
