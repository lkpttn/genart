// Variables here
float increment = 0.01;
PVector[][] grid;
int resolution;
int steps = 300;
int stepLength = 5;

float xoff, yoff, zoff = 0;

color[] rgbColors = {
  color(255,71,72, 50), // Red
  color(255,108,91, 50), // Pink
  color(255,144,112, 50), // Peach
  color(255,175,134, 50), // Other peach lol
  color(255,202,157, 50), // Tan probably
  //color(255,223,180, 50), // Cream
  //color(255,240,204, 50), // Lemon
};



// Setup
void setup() {
  size(1000,1000);
  background(0);
  resolution = 5;
  
  yoff = 0;
  grid = new PVector[width][height];
  for(int y = 0; y < height; y++) {
    xoff = 0;
    for(int x = 0; x < width; x++) {
      // Store the angle here
      float angle = noise(xoff, yoff, zoff) * TWO_PI;
      PVector vec = PVector.fromAngle(angle);
      grid[x][y] = vec;
      xoff += increment;
    }
    yoff += increment;
    zoff += 0.0003;
  }
}

void draw() {
  // Background vectors
  //for (int y = 0; y < height; y += resolution) {
  //  for (int x = 0; x < width; x += resolution) {
  //    PVector vec = grid[x][y];
  //    stroke(0);
  //    push();
  //    translate(x, y);
  //    rotate(vec.heading());
  //    line(0, 0, resolution, 0);
  //    pop();
  //  }
  //}
  
  for(int i = 0; i < 3000; i++) {
      drawCurve();
  }
  noLoop();
}

void mousePressed() {
  save("flowField.png");
}


void drawCurve() {
  // Start point
  float x = random(width);
  float y = random(height);
  
  int red = int(map(x, 0, width, 0, 255));
  int blue = int(map(y, 0, height, 0, 255));
  
  color randomColor = rgbColors[int(random(rgbColors.length))];
  color areaColor = color(red, blue, 204, 50);
  
  stroke(areaColor);
  strokeWeight(1);
  noFill();
  beginShape();
  for(int i = 0; i < steps; i++) {
    vertex(x, y);
    
    // How far from the start of the grid
    int xOffset = int(x - 0);
    int yOffset = int(y - 0);
    
    // Find it's index
    int columnIndex = xOffset / resolution;
    int rowIndex = yOffset / resolution;
    
    // Check for boundaries
    if (columnIndex > width) {columnIndex = 0;};
    if (columnIndex < 0) {columnIndex = width/resolution;};
    if (rowIndex > height) {rowIndex = 0;};
    if (rowIndex < 0) {rowIndex = height/resolution;};
    
    // Find the angle
    PVector angle = grid[columnIndex][rowIndex];
    
    float xStep = stepLength * cos(angle.heading());
    float yStep = stepLength * sin(angle.heading());
    
    x = x + xStep;
    y = y + yStep;
  }
  endShape();
}
