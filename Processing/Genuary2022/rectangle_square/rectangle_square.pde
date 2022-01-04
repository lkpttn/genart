int margin = 60;
int gap = 20;
int marginWidth, marginHeight;
IntList slices;

void setup() {
  size(1000, 1000);
  noLoop();
  noStroke();

  background(255);
  fill(50);

  marginWidth = width - margin*2;
}

void draw() {
  background(255);

  for (int y = margin; y < height - margin; y += 80 + gap) {
    // Divide marginWidth into random rects
    slices = new IntList();
    int tempWidth = marginWidth;
    while (tempWidth > 0) {
      int slice;
      if (tempWidth < 400) {
        slice = tempWidth;
      } else {
        slice = int(random(150, tempWidth));
      }
  
      // Slice off part of marginWidth and store it
      slices.append(slice);
      tempWidth = tempWidth - slice;
    }
  
    slices.shuffle();
    int x = margin;
    for (int j = 0; j < slices.size(); j++) {
      rect(x, y, slices.get(j) - gap, 80);
      // drawCappedRect(x, y, slices.get(j) - gap, 80, 20);
      x += slices.get(j);
    }
  }

  //drawCappedRect(100, 100, 350, 100, 10);
  //drawCappedRect(50, 300, 700, 100, 30);
}

void drawCappedRect(int x, int y, int w, int h, int spacer) {
  fill(50);
  rect(x, y, w, h);

  int randoF = int(random(7));
  int randoB = int(random(7));

  // Front cap
  for (int i = 0; i < randoF; i++) {
    fill(150 + i*10);
    rect(x + i*spacer, y, spacer, h);
  }

  // End cap
  for (int i = 0; i < randoB; i++) {
    fill(150 + i*10);
    rect(x + w - i*spacer, y, spacer, h);
  }
}

void mousePressed() {
  redraw();
}
