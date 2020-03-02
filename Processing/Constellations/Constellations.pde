PVector[] points = new PVector[6];

void setup() {
  size(700, 700);
  noLoop();
  stroke(200);
  fill(255);
  ellipseMode(CENTER);
}

void draw() {
  background(10);

  // Starchart bg
  noFill();
  stroke(50);
  for (int i = 0; i < 10; i++) {
    float inc = 1.6;
    float radius = i * 80 * inc;
    ellipse(width/2, height/2, radius, radius);
  }

  int num = 24;
  for (int j = 0; j < num; j++) {
    float theta = TWO_PI / num;
    float angle = theta * j;
    float x = 500 * cos(angle);
    float y = 500 * sin(angle);
    line(width/2 + x, height/2 + y, width/2 , height/2);
  }

  fill(255);
  stroke(255);
  drawConstellation(random(width), random(height));
}


void drawConstellation(float x, float y) {
  float startX = x;
  float startY = y;

  float angle;
  float changeX, changeY;
  float newX, newY;


  // Fill the array with vectors
  points[0] = new PVector(startX, startY);
  for (int i = 1; i < points.length; i++) {
    angle = random(PI);
    changeX = random(40, 80) * cos(angle);
    changeY = random(40, 80) * sin(angle);
    newX = startX + changeX;
    newY = startY + changeY;

    points[i] = new PVector(newX, newY);
    startX = newX;
    startY = newY;
  }

  // For each point, draw it's dot and any lines to close vectors
  // Limit the number of connections????
  for (int i = 0; i < points.length; i++) {
    PVector point = points[i];
    //String numText = str(i);
    //text(numText, point.x + 10, point.y - 10);

    float starSize = random(3, 8);
    ellipse(point.x, point.y, starSize, starSize);

    // Look at other points and draw lines
    // Maybe just look at a few random points?
    for (int j = 0; j < 1; ) {
      int index = int(random(points.length));
      PVector otherPoint = points[index];
      float distance = point.dist(otherPoint);
      if (distance <= 110 && distance != 0) {
        line(point.x, point.y, otherPoint.x, otherPoint.y);
        j++;
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
