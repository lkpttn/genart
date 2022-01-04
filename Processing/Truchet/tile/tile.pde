int size = 100;
int x, y = 0;

void setup() {
  size(100, 100);
  noLoop();
  stroke(0);
  background(255);
}

void draw() {

  // Top left
  // arc(x, x, size, size, 0, HALF_PI);
  
  // Top right
  // arc(x + size, y, size, size, PI / 2, PI);

  // Bottom left
  // arc(x, y + size, size, size, (3 * PI) / 2, 2 * PI);
  
  // Bottom right
  arc(x + size, y + size, size, size, PI, (3 * PI) / 2);
}
