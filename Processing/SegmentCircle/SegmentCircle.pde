void setup() {
  size(900, 900);
  noLoop();
  stroke(0);
  noFill();
  rectMode(CENTER);
  strokeCap(SQUARE);
}

void draw() {
  background(250);
  translate(width/2, height/2);
  for(int i = 0; i < 60; i++) {
   segmentCircle(100 + i * 5, 90);
  }
}


void segmentCircle(int r, int num) {
  float prevX = 0;
  float prevY = 0;
  // Draw num segments around a circle with r radius
  for (int i = 0; i < num; i++) {
    int angle = 360 / num * i;

    float x = r * cos(radians(angle));
    float y = r * sin(radians(angle));

    line(prevX, prevY, x, y);
    // rect(x, y, 5, 5);
    
    strokeWeight(int(random(1,10)));
    
    prevX = x;
    prevY = y;
  }
}

void mousePressed() {
  redraw();
}

void keyPressed() {
  if (key == 's')saveFrame("####.png");
  println("Saving screenshot");
}
