int[] colors = {#f75c03, #2191fb, #d90368, #820263, #f3de2c};

void setup() {
  size(700, 1000);
  noLoop();
  stroke(0);
  ellipseMode(CORNER);
}

void draw() {
  background(250);
  divideRect(10, 10, width - 20, height - 20, 6);
}


void divideRect(float x, float y , float w, float h, int n) {
  // Draw the initial rectangle
  //strokeWeight(n);
  rect(x, y, w, h);
  largeCircle(x, y, w, h);
  drawX(x, y, w, h);
  // Draw a pattern here?
  
  n--;
  
  // If we have iterations left, subdivide
  if (n>=0) {
    if (w>=h) {
      // Pick a random width
      float randomW = random(w*0.1, w*0.9);
      
      // Run the function again inside the two halves
      divideRect(x, y, randomW, h, n);
      divideRect(x + randomW, y, w - randomW, h, n);
    }
    
    // Run the opposite if width is smaller
    if (w<h) {
      float randomH = random(h*0.1, h*0.9);
      divideRect(x, y, w, randomH, n);
      divideRect(x, y + randomH, w, h - randomH, n);
    }
  }
}

void drawX(float x, float y, float w, float h) {
  // Draw line from top left to bottom right
    // Draw line from top right to bottom left
  line(x, y, x + w, y + h);
  line(x + w, y, x, y + h);
}

void largeCircle(float x, float y, float w, float h) {
  ellipse(x, y, w, h);
}

int getCol(){
  return colors[(int)random(colors.length)];
}

void mousePressed() {
  redraw();
}

void keyPressed() {
  if (key == 's')saveFrame("####.png");
  println("Saving");
}
