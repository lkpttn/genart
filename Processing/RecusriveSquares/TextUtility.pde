void drawTitle(String supertitle, String title) {
  // Title background
  fill(0);
  rect(-5, -5, 165, height+ 5);

  // Text
  textAlign(LEFT, TOP);
  fill(255);
  PFont superTitleFont = createFont("Century-Bold", 28);
  PFont titleFont = createFont("Century-Bold", 40);
  PFont frameFont = createFont("Helvetica-Bold", 30);

  pushMatrix();
  rotate(HALF_PI);
  translate(30, -120);

  // ellipse(-5,-5,5,5);

  // translate(20, 100);
  textFont(superTitleFont);
  text(supertitle, 0, 0);

  textFont(titleFont);
  text(title, 0, 30);

  translate(height - 80, 40);
  rotate(-1 * HALF_PI);

  textAlign(CENTER, TOP);
  textFont(frameFont);
  text(frameText(frameCount), 0, 0);

  popMatrix();
}

String frameText(int count) {
  String frameString;
  if (count < 10) {
    frameString = "000" + str(count);
  } else {
    frameString = "00" + str(count);
  }

  return frameString;
}
