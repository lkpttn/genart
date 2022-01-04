int depth = 4;
int grid = 2;

void setup() {
  size(500, 500);
  pixelDensity(2);
  noLoop();
  stroke(0);
}

void draw() {
  int size = width / grid;
  
  makeTile(0, 0, width, 3);

  //// Each tile checks itself for recursion
  //for (int x = 0; x < width; x += size) {
  //  for (int y = 0; y < height; y+= size) {
  //    // fill(map(x+y, 0, 600, 0, 255));
  //    // println("x = " + x);
  //    // translate(x, y);
  //    makeTile(x, y, size, depth);
  //  }
  //}
}

void makeTile(int xCoord, int yCoord, int dSize, int depth) {
  int hSize = dSize / 2;
  push();
  translate(xCoord, yCoord);
  println("Moving to " + xCoord + ", " + yCoord);
  // Draw the tile
  makeRect(0, 0, dSize);
  pop();

  // For a given tile, try to divide [depth] times
  if (depth > 1) {
    depth = depth - 1;
    makeTile(0, 0, hSize, depth);
    makeTile(dSize, 0, dSize, depth);
    makeTile(0, hSize, hSize, depth);
    makeTile(hSize, hSize, hSize, depth);
  }


}


void makeRect(int x, int y, int rSize) {
  // fill(random(255));
  rect(x, y, rSize, rSize);
}

void keyPressed() {
  if (key == ENTER) {
    redraw();
  }
}


//for (int x = 0; x < width; x += size) {
//    for (int y = 0; y < height; y+= size) {
//      // Recur based on depth
//      depth = 3;
//      if (depth != 0 && random(1) < 0.5) {
//        makeRect(x, y, size / 2);
//        depth = depth - 1;
//      } else {
//        // else draw
//         makeRect(x, y, size);
//      }
//      // flip a coin
//      // divide and repeat if depth isn't reached

//    }
//  }
