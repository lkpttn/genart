int grid = 30;
int spacer = 15;
int margin = 30;

int[][] gridArray;
Coord[] neighbors;

int randomX = int(random(grid));
int randomY = int(random(grid));

void setup() {
  size(500, 500);
  noStroke();
  background(0);
  ellipseMode(CENTER);
  
  neighbors = new Coord[8];

  makeGrid();
  // distanceNeighbors();

  //for (int x = 0; x < grid; x++) {
  //  for (int y = 0; y < grid; y++) {
  //    if (gridArray[x][y] == 0) {
  //      ellipse(margin + x * spacer, margin + y * spacer, 10, 10);
  //    }
  //  }
  //}
  
  findNeighbors(randomX, randomY);

  // Find neighbors of missing dot and color
}

void makeGrid() {
  gridArray = new int[grid][grid];

  for (int x = 0; x < grid; x++) {
    for (int y = 0; y < grid; y++) {
      gridArray[x][y] = 0;
    }
  }
  gridArray[randomX][randomY] = 1;
}

void findNeighbors(int x, int y) {
  int index = 0; 
  
  for (int xx = x-1; xx <= x+1; xx++) {
    for (int yy = y-1; yy <= y+1; yy++) {
      // Check for out of bounds and self
      if (((xx >= 0) && (xx < grid)) && ((yy >= 0) && (yy < grid))) {
        if (!((xx == x) && (yy == y))) {
          // Make a new coordinate in the array
          neighbors[index++] = new Coord(xx, yy);
        }
      }
    }
  }
  
  fill(100);
  for (Coord coord : neighbors) {
    ellipse(margin + coord.x * spacer, margin + coord.y * spacer, 10, 10);
  }
}

void distanceNeighbors() {
  for (int x = 0; x < grid; x++) {
    for (int y = 0; y < grid; y++) {
      // this gives us a point x,y
      float d = dist(randomX, randomY, x, y);
      float maxD = dist(0, 0, grid, grid);
      float gray = map(d, 0, maxD, 0, 255);
      fill(gray);
      ellipse(margin + x * spacer, margin + y * spacer, 10, 10);
    }
  }
}
