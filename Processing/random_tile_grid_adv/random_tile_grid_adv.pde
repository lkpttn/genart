color[] palette = {#011627, #ff3366, #2ec4b6, #f6f7f8, #20a4f3};

void setup() {
  size(600, 600);
  pixelDensity(2);
  noLoop();
  noStroke();
  strokeWeight(2);
  strokeCap(SQUARE);
}

void draw() {
  int size = width / 3;
  int halfSize = size / 2;
  int quartSize = halfSize/2;

  for (int x = 0; x < width; x += size) {
    for (int y = 0; y < height; y += size) {
      if (random(1) < 0.5) {
        if (random(1) < 0.2) {
          // Double divide
          // Top left
          makeTile(x, y, quartSize);
          makeTile(x + quartSize, y, quartSize);
          makeTile(x, y + quartSize, quartSize);
          makeTile(x + quartSize, y + quartSize, quartSize);
          
          // Top right
          makeTile(x + halfSize, y, quartSize);
          makeTile(x + halfSize + quartSize, y, quartSize);
          makeTile(x + halfSize, y + quartSize, quartSize);
          makeTile(x + halfSize + quartSize, y + quartSize, quartSize);
          
          // Bottom left
          makeTile(x, y + halfSize, quartSize);
          makeTile(x + quartSize, y + halfSize, quartSize);
          makeTile(x, y + halfSize + quartSize, quartSize);
          makeTile(x + quartSize, y + halfSize + quartSize, quartSize);
          
          // Bottom right
          makeTile(x + halfSize, y + halfSize, quartSize);
          makeTile(x + halfSize + quartSize, y + halfSize, quartSize);
          makeTile(x + halfSize, y + halfSize + quartSize, quartSize);
          makeTile(x + halfSize + quartSize, y + halfSize + quartSize, quartSize);
        } else {
          // Make four small tiles
          makeTile(x, y, halfSize);
          makeTile(x + halfSize, y, halfSize);
          makeTile(x, y + halfSize, halfSize);
          makeTile(x + halfSize, y + halfSize, halfSize);
        }
      } else {
        // Make big tile
        makeTile(x, y, size);
      }
    }
  }
}

void makeTile(int x, int y, int tileSize) {
  float halfSize = tileSize / 2;
  // Shuffle colors
  fill(randomColor(palette));
  rect(x, y, tileSize, tileSize);

  push();
  translate(x + halfSize, y + halfSize);
  float[] rotations = { 0, PI/2, PI, 3 * PI/2 };
  rotate(rotations[int(random(rotations.length))]);

  // Draw a random shape
  float noiseValue = noise(x, y);
  if (noiseValue < 0.25) {
    // Draw circle
    fill(randomColor(palette));
    arc(-halfSize, 0, tileSize, tileSize, -PI/2, PI/2);
  } else if (noiseValue >= 0.25 && noiseValue < 0.35) {
    fill(randomColor(palette));
    // Draw circle thing
    fill(randomColor(palette));
    triangle(-halfSize, -halfSize, halfSize, halfSize, -halfSize, halfSize);
    fill(randomColor(palette));
    arc(0, 0, halfSize, halfSize, PI/4, 5*PI/4);
    rotate(PI);
    fill(randomColor(palette));
    arc(0, 0, halfSize, halfSize, PI/4, 5*PI/4);
  } else if (noiseValue >= 0.45 && noiseValue < 0.7) {
    // Draw triangle
    fill(randomColor(palette));
    triangle(-halfSize, -halfSize, halfSize, halfSize, -halfSize, halfSize);
  } else {
    // Draw ellipse
    fill(randomColor(palette));
    ellipse(0, 0, halfSize, halfSize);
  }
  pop();
}

void keyPressed() {
  if (key == 's' || key == 'S') {
    save("tilegrid.png");
    println("Saving image");
  }
  if (key == ENTER) {
    redraw();
  }
}

color randomColor(color[] inputArray) {
  int length = inputArray.length;
  return inputArray[int(random(length))];
}

void drawRandomShape(int tileSize, int halfSize) {
  // Draw rings
  noFill();
  stroke(randomColor(palette));
  arc(-halfSize, -halfSize, tileSize, tileSize, 0, PI/2);
  arc(-halfSize, -halfSize, tileSize * 1.5, tileSize * 1.5, 0, PI/2);
  arc(-halfSize, -halfSize, tileSize * 2, tileSize * 2, 0, PI/2);
}
