int starNum = 36;

void setup() {
  size(1400, 1400);
  noLoop();
  stroke(200);
  fill(255);
  ellipseMode(CENTER);
}

void draw() {
  background(32, 38, 57);

  // Starchart bg
  noFill();
  stroke(209, 210, 206, 20);
  for (int i = 0; i < 20; i++) {
    float radius = (i * 100) + 100;
    ellipse(width/2, height/2, radius, radius);
  }
a
  int num = 24;
  for (int j = 0; j < num; j++) {
    float theta = TWO_PI / num;
    float angle = theta * j;
    float innerX = 50 * cos(angle);
    float innerY = 50 * sin(angle);
    float outerX = 1000 * cos(angle);
    float outerY = 1000 * sin(angle);
    line(width/2 + innerX, height/2 + innerY, width/2 + outerX, height/2 + outerY);
  }

  // Stars
  fill(255, 50);
  for (int k = 0; k < 800; k++) {
    float starSize = random(1, 6);
    ellipse(random(width), random(height), starSize, starSize);
  }


  // Generate constellations
  fill(255);
  stroke(255);
  for (int l = 0; l < starNum; l++) {
    float angle = l * (360 / starNum); // This is in degrees
    float radius = random(100, 600) + l * 10;
    float x = width/2 + radius * sin(radians(angle));
    float y = height/2 + radius * cos(radians(angle));
    Constellation conste = new Constellation(x, y, int(random(4, 8))); 
    conste.render();
  }

  // Cheaty circle
  fill(32, 38, 57);
  noStroke();
  ellipse(width/2, height/2, 98, 98);
  
}

class Constellation {
  float startX, startY, angle;
  float changeX, changeY, newX, newY;
  PVector[] points;

  Constellation (float x, float y, int num) {
    startX = x;
    startY = y;
    points = new PVector[num];
  }

  void render() {
    points[0] = new PVector(startX, startY);
    for (int i = 1; i < points.length; i++) {
      angle = random(PI);
      changeX = random(20, 60) * cos(angle);
      changeY = random(20, 60) * sin(angle);
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
        if (distance <= 80 && distance != 0) {
          line(point.x, point.y, otherPoint.x, otherPoint.y);
          j++;
        }
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
