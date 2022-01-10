int size = 100;
int x, y = 0;

void setup() {
  size(100, 100);
  noLoop();
  stroke(0);
  background(255);
  
  fill(50);
}

void draw() {

  // Top left
  // arc(x, x, size, size, 0, HALF_PI);
  
  // Top right
  // arc(x + size, y, size, size, PI / 2, PI);

  // Bottom left
  // arc(x, y + size, size, size, (3 * PI) / 2, 2 * PI);
  
  // Bottom right
  // arc(x + size, y + size, size, size, PI, (3 * PI) / 2);
  
  
  // Triangle - top left
  triangle(x, y, x + size/2, y, x, y + size/2);
  
  // Triangle - top right
  triangle(x + size/2, y, x + size, y, x + size, y + size/2);
  
  // Triangle - bottom left
  triangle(x, y + size/2, x + size/2, y + size, x, y + size);
  
  // Triangle - bottom right
  triangle(x + size/2, y + size, x + size, y + size, x + size , y + size/2);
  
  // Slight lines
  line(x, y + size/2, x + size/2, y + size);
  line(x + size/2, y, x + size, y + size/2);
  
  // Alt slight lines
  line(x + size/2, y, x, y + size/2);
  line(x + size/2, y + size, x + size, y + size/2);
}
