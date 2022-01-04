int nOff = 5;
int pointDensity;
color[] palette1 = {#6cbbd4, #5863b1, #5282a1, #1dd3b0, #c1f29b};
color[] palette2 = {#deFbE4, #eafc70, #14777F, #086375, #5EB8A5};

void setup() {
  size(600, 600);
  background(0);
  pixelDensity(2);
  noLoop();
  
  pointDensity = width / 11; // How many things we'll draw
}

void draw() {

  // Draw a quadrilateral at each point
  for (float x = -width * 0.1; x < width * 1.1; x += pointDensity * 2) {
    for (float y = -height * 0.1; y < height * 1.1; y += pointDensity * 2) {
      push();
      translate(x, y);
      strokeCap(SQUARE);
      strokeWeight(random(1));
      
      // Get a smooth curve random values for coloring
      float num = noise((x + nOff) / 10, y / 10);
      if (num < 0.15) {
        noStroke();
        fill(palette1[int(random(0, 4))]);
      } else if (num >= 0.25 && num < 0.35) {
        stroke(palette1[int(random(0, 4))]);
        noFill();
      } else if (num >= 0.45 && num < 0.7) {
        noStroke();
        fill(palette1[int(random(0, 4))]);
      } else {
        noFill();
        stroke(palette1[int(random(0, 4))]);
      }

      float quadX = pointDensity * 3; // Width multiplier
      float quadY = pointDensity * 1; // Height multiplier
      float plusY = 1 * pointDensity; // Used to calculate slope of the quad
      quad(0, 0, 0, quadY, -quadX, quadY - plusY, -quadX, -plusY);
      pop();
    }
  }

  // Draw the other direction with new strokes/colors
  for (float x = -width * 0.1; x < width * 1.1; x += pointDensity * 2) {
    for (float y = -height * 0.1; y < height * 1.1; y += pointDensity * 2) {
      push();
      translate(x, y);
      strokeCap(SQUARE);
      strokeWeight(random(1));
      float num = noise((x + nOff) / 10, y / 10);
      if (num < 0.15) {
        noStroke();
        fill(palette2[int(random(0, 4))]);
      } else if (num >= 0.25 && num < 0.35) {
        noStroke();
        fill(palette2[int(random(0, 4))]);
      } else if (num >= 0.45 && num < 0.7) {
        noFill();
        stroke(palette2[int(random(0, 4))]);
      } else {
        noStroke();
        fill(palette2[int(random(0, 4))]);
      }

      float quadX = pointDensity * 3; // Width multiplier
      float quadY = pointDensity * 1; // Height multiplier
      float plusY = 1 * pointDensity; // Used to calculate slope of the quad
      quad(0, 0, 0, quadY, quadX, quadY - plusY, quadX, -plusY);
      pop();
    }
  }
}
