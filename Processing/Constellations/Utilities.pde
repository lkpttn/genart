void drawOverlay(String title, String supertitle) {
  fill(255);
  rect(0, 0, 180, height);
  fill(0);
  PFont normalFontBold = createFont("Arial Bold", 30);
  PFont boldFont = createFont("Arial Bold", 50);
  
  textAlign(LEFT);
  pushMatrix();
  rotate(HALF_PI);
  translate(40, -110);
  
  textFont(normalFontBold);
  text(supertitle, 0, 0);
  
  translate(0, 45);
  
  textFont(boldFont);
  text(title, 0, 0);
  popMatrix();
}
