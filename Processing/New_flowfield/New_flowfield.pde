// Draw our grid outside the canvas by half the width/height in each direction
int leftX, rightX, topY, bottomY;

// The resolution will set the size of individual grid points
int resolution;

// Calculate the number of rows and columns we'll have
int numColumns, numRows;

// Holds all the grid vectors
PVector[][] grid;

// Noise values
float xoff, yoff, zoff = 0;
float increment = 0.01;

// Lines
int steps = 200;
int stepLength = 7;


void setup() {
  size(1000,1000);
  background(255);
  
  leftX = int(width * -0.5);
  rightX = int(width * 1.5);
  topY = int(height * -0.5);
  bottomY = int(height * 1.5);

  resolution = int(width * 0.01);
  numColumns = (rightX - leftX) / resolution;
  numRows = (bottomY - topY) / resolution;
  
  grid = new PVector[numColumns][numRows];
  
  for(int y = 0; y < numRows; y++) {
    xoff = 0;
    for(int x = 0; x < numColumns; x++) {
      float angle = noise(xoff, yoff,zoff) * TWO_PI;
      PVector vec = PVector.fromAngle(angle);
      grid[x][y] = vec;
      xoff += increment;
    }
    yoff += increment;
    zoff += 0.03;
  }
}

void draw() {
 // Visualize the field
 //translate(leftX, topY);
 //for(int y = 0; y < numRows; y++) {
 // for(int x = 0; x < numColumns; x++) {
 //     PVector vec = grid[x][y];
 //     stroke(0);
 //     translate(resolution, 0);
 //     rotate(vec.heading());
 //     line(0, 0, resolution, 0);
 //     rotate(-1 * vec.heading());
 //   }
 //   translate(-2000, resolution);
 // }
  
  for(int i = 0; i < 1000; i++) {
      drawCurve();
  }
  
  noLoop();
}


void drawCurve() {
  // Start point
  float x = random(leftX, rightX);
  float y = random(topY, bottomY);

  stroke(100);
  strokeWeight(1);
  noFill();
  beginShape();
  for(int i = 0; i < steps; i++) {
    vertex(x, y);
    
    // How far from the start of the grid
    int xOffset = int(x - leftX);
    int yOffset = int(y - topY);
    
    // Find it's index
    int columnIndex = xOffset / resolution;
    int rowIndex = yOffset / resolution;
    
    // Check for boundaries
    if (columnIndex >= numColumns) {columnIndex = 0;};
    if (columnIndex <= 0) {columnIndex = numColumns - 1;}; // fix this
    if (rowIndex >= numRows) {rowIndex = 0;};
    if (rowIndex <= 0) {rowIndex = numRows - 1;}; // fix this
    
    // Find the angle
    PVector angle = grid[columnIndex][rowIndex];
    
    float xStep = stepLength * cos(angle.heading());
    float yStep = stepLength * sin(angle.heading());
    
    x = x + xStep;
    y = y + yStep;
  }
  endShape();
}
