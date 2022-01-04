int cols = 50;
int rows = 50;
int spacer = 10;

float[][] simple2D = { {0, 1, 0, 0, 0, 1, 0, 0},
                       {0, 0, 0, 0, 1, 0, 0, 1},
                       {1, 0, 0, 1, 0, 0, 1, 0},
                       {0, 0, 1, 0, 0, 0, 0, 1} };
                       
float[][] generated2D;
float[][] generated2Dbuffer;

void setup() {
  size(500, 500);
  noStroke();

  makeGrid();
  
  // Visit cells
  for (int y = 0; y < rows; y++) {
    for (int x = 0; x < cols; x++) {
      // If value is 1, visit all neighbors
      if (generated2D[y][x] == 1) {
        for (int xx = x-1; xx <= x+1; xx++) {
          for (int yy = y-1; yy <= y+1; yy++) {
            // Check for out of bounds and self
            if (((xx >= 0) && (xx < cols)) && ((yy >= 0) && (yy < rows))) {
              if (!((xx == x) && (yy == y))) {
                if (generated2D[yy][xx] != 1) {
                  generated2D[yy][xx] += 0.3;
                }
              } // End if
            } // End if
          } // End for yy
        } // End for xx
      } // End if 1
    } // End for x
  } // End for y
}

void draw() {  
  for (int y = 0; y < rows; y++) {
    for (int x = 0; x < cols; x++) {
      // Fill the cell based on color and draw a rect
      // 1 = white 0 = black
      // int rColorFill = int(generated2D[rows-1][x] * 255);
      int gColorFill = int(generated2D[y][x] * 255);
      // int bColorFill = int(generated2D[y][cols-1] * 255);
      color turq = color(56, gColorFill, 180);
      fill(turq);
      rect(x * spacer, y * spacer, spacer, spacer);
    }
  }
  
  iterate();
}

void makeGrid() {
    
  generated2D = new float[rows][cols];
  generated2Dbuffer = new float[rows][cols];
  
  for (int y = 0; y < rows; y++) {
    for (int x = 0; x < cols; x++) {
      if (random(1) > 0.9) {
        generated2D[y][x] = 1;
      }
      else { generated2D[y][x] = 0; }
    }
  }
}

void iterate() {
  // Save current grid to buffer
  for (int y = 0; y < rows; y++) {
    for (int x = 0; x < cols; x++) {
      generated2Dbuffer[y][x] = generated2D[y][x];
    }
  }
  
  // Visit each cell
  for (int y = 0; y < rows; y++) {
    for (int x = 0; x < cols; x++) {
      // Visit all neighbors
      int neighbors = 0;
        for (int xx = x-1; xx <= x+1; xx++) {
          for (int yy = y-1; yy <= y+1; yy++) {
            // Check for out of bounds and self
            if (((xx >= 0) && (xx < cols)) && ((yy >= 0) && (yy < rows))) {
              if (!((xx == x) && (yy == y))) {
                if (generated2Dbuffer[xx][yy]==1){
                  neighbors++; // Check alive neighbours and count them
                }
              } // End if
            } // End if
          } // End for yy
        } // End for xx
        // We've checked the neigbours: apply rules!
      if (generated2Dbuffer[x][y]==1) { // The cell is alive: kill it if necessary
        if (neighbors < 2 || neighbors > 3) {
          generated2D[x][y] = 0; // Die unless it has 2 or 3 neighbours
        }
      } 
      else { // The cell is dead: make it live if necessary      
        if (neighbors == 3 ) {
          generated2D[x][y] = 1; // Only if it has 3 neighbours
        }
      } // End of if
    } // End for x
  } // End for y
}
