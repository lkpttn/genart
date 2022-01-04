float[][] pixelArray;
Object[] lineArray;

void setup() {
  size(500, 500);
  noLoop();
  background(0);
  stroke(255);
  strokeWeight(1);
  
  colorMode(HSB, 255);
  color c = color(0, 126, 255);

  // Draw a line between 0 and random
  line(0, height/2, width, height/2);
  
  // Make an array of line coordinates
  int x1 = 0;
  int y1 = height/2;
  int x2 = 200;
  int y2 = 130;
  
  //int lineLength = dist(x1, y1, x2, y2);
  lineArray = new Object[1];
  // lerp to each point on the line and store it
  for (int x = 0; x < 100; x++) {
    for (int y = 0; y < 100; y ++) {
      int[] point = {x, y};
      lineArray = (Object[]) append(lineArray, point);
    }
  }

  

  // Loop to each pixel and change it's brightness based on proximity to Line y
  pixelArray = new float[width][height];
  for (int x = 0; x < width; x++) {
    for (int y = 0; y < height; y ++) {
      // Make the array value equal to brightness based on distance
      float d = dist(x, y, x, height/2);
      float brightness = map(d, 0, height/2, 0, 255);
      pixelArray[x][y] = 255 - brightness;
    }
  }

  // Color each pixel based on it's brightness
  for (int x = 0; x < width; x++) {
    for (int y = 0; y < height; y ++) {
      c = color(59, 200, pixelArray[x][y]);
      stroke(c);
      point(x, y);
    }
  }
}
