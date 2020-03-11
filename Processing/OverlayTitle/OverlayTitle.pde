void setup() {
  size(700, 700);
  noLoop();
  stroke(0);
  noFill();
}

void draw() {
  background(50);
  
  drawOverlay("Constellations", "AST0001");
}

void drawOverlay(String title, String supertitle) {
  fill(255);
  rect(0, 0, 130, height);
  fill(0);
  PFont normalFontBold = createFont("Arial Bold", 20);
  PFont boldFont = createFont("Arial Bold", 40);
  
  
  pushMatrix();
  rotate(HALF_PI);
  translate(20, -80);
  
  textFont(normalFontBold);
  text(supertitle, 0, 0);
  
  translate(0, 35);
  
  textFont(boldFont);
  text(title, 0, 0);
  popMatrix();
}

void mousePressed() {
  redraw();
}

void keyPressed() {
  if (key == 's')saveFrame("####.png");
  println("Saving screenshot");
}
