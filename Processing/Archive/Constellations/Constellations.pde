int starNum = 20;
String[] constellationNames = {   "Andromeda", 
  "Aquarius", 
  "Aquila", 
  "Ara", 
  "Argo Navis", 
  "Aries", 
  "Auriga", 
  "Boötes", 
  "Cancer", 
  "Canis Major", 
  "Canis Minor", 
  "Capricornus", 
  "Cassiopeia", 
  "Centaurus", 
  "Cepheus", 
  "Cetus", 
  "Corona Australis", 
  "Corona Borealis", 
  "Corvus", 
  "Crater", 
  "Cygnus", 
  "Delphinus", 
  "Draco", 
  "Equuleus", 
  "Eridanus", 
  "Gemini", 
  "Hercules", 
  "Hydra", 
  "Leo Major", 
  "Lepus", 
  "Libra", 
  "Lupus", 
  "Lyra", 
  "Ophiuchus", 
  "Orion", 
  "Pegasus", 
  "Perseus", 
  "Pisces", 
  "Piscis Austrinus", 
  "Sagitta", 
  "Sagittarius", 
  "Scorpius", 
  "Serpens Cauda", 
  "Taurus", 
  "Triangulum", 
  "Ursa Major", 
  "Virgo" };
PFont font;

void setup() {
  size(1000, 1000);
  noLoop();
  stroke(200);
  fill(255);
  ellipseMode(CENTER);
  font = createFont("Palatino Linotype", 13, true);
  smooth();
  textFont(font);
  textAlign(CENTER);
}

void draw() {
  background(32, 38, 57);
  pushMatrix();
  translate(width/2, height/2);

  // Starchart bg
  noFill();
  stroke(60, 231, 240, 40); // Light blue
  // stroke(148, 108, 34, 255); // Gold
  for (int i = 0; i < 20; i++) {
    float radius = (i * 100) + 100;
    ellipse(0, 0, radius, radius);
  }

  int num = 24;
  for (int j = 0; j < num; j++) {
    float theta = TWO_PI / num;
    float angle = theta * j;
    float innerX = 100 * cos(angle);
    float innerY = 100 * sin(angle);
    float outerX = 1000 * cos(angle);
    float outerY = 1000 * sin(angle);
    line(innerX, innerY, outerX, outerY);
  }

  stroke(60, 231, 240, 40); // Light blue
  ellipse(-80, -80, 800, 800);
  ellipse(80, 80, 800, 800);

  // Stars
  fill(204, 152, 55, 170);
  noStroke();
  for (int k = 0; k < 800; k++) {
    float starSize = random(1, 6);
    ellipse(random(-width/2, width/2), random(-height/2, height/2), starSize, starSize);
  }


  // Generate constellations
  for (int l = 1; l < starNum; l++) {
    float angle = l * (360 / starNum); // This is in degrees
    float radius = random(200, 600);
    float x = 0;
    float y = radius;

    // int index = int(random(constellationNames.length));
    // typeOnCircle(radius, constellationNames[index].toUpperCase());

    fill(255);
    stroke(255);
    Constellation conste = new Constellation(x, y, int(random(4, 8))); 
    conste.render();

    rotate(radians(angle));
  }

  // Cheaty circle
  fill(32, 38, 57);
  stroke(60, 231, 240, 40); // Light blue
  ellipse(0, 0, 198, 198);
  
  popMatrix();
  drawOverlay("Constellations", "0017");
}

class Constellation {
  float startX, startY, angle;
  float changeX, changeY, newX, newY;
  PVector[] points;

  Constellation (float x, float y, int num) {
    startX = x;
    startY = y;
    points = new PVector[num];
  }

  void render() {

    // find num points
    points[0] = new PVector(startX, startY);
    for (int i = 1; i < points.length; i++) {
      angle = random(90, 270);
      changeX = random(40, 60) * cos(radians(angle));
      changeY = random(40, 60) * sin(radians(angle));
      newX = startX + changeX;
      newY = startY + changeY;

      points[i] = new PVector(newX, newY);
      startX = newX;
      startY = newY;
    }


    // For each point, draw it's dot and any lines to close vectors
    // Limit the number of connections????
    for (int i = 0; i < points.length; i++) {
      PVector point = points[i];
      String numText = str(i);
      // text(numText, point.x + 10, point.y - 10);

      float starSize = random(3, 8);
      ellipse(point.x, point.y, starSize, starSize);

      // Draw a line from point 0 to n
      for (int j = 0; j < points.length - 1; j++) {
        PVector currentPoint = points[j];
        PVector nextPoint = points[j+1];
        line(currentPoint.x, currentPoint.y, nextPoint.x, nextPoint.y);
      }

      // Look at other points and draw lines
      // Maybe just look at a few random points?
      //for (int j = 0; j < 1; ) {
      //  int index = int(random(points.length));
      //  PVector otherPoint = points[index];
      //  float distance = point.dist(otherPoint);
      //  if (distance <= 80 && distance != 0) {
      //    line(point.x, point.y, otherPoint.x, otherPoint.y);
      //    j++;
      //  }
      //}
    }
  }
}

void typeOnCircle(float radius, String str) {
  // current distance around the circle
  float arcLength = 0; 

  // total number of radians that the text will consume
  float totalAngle = textWidth(str) / radius;

  // iterate over each individual character in the String
  for (int i = 0; i < str.length(); i++) {
    // charAt(i) gets the character at position i in the String
    char currentChar = str.charAt(i); 
    float w = textWidth(currentChar);
    // since the letters are drawn centered, we advance by half a letter width
    arcLength += w/2;

    // use a some trig to find the angle matching this arclength
    // the totalAngle/2 just adds some additional rotation so the 
    // text starts wraps evenly around the circle
    float theta = arcLength / radius - totalAngle/2;

    // save our current origin
    pushMatrix();
    // rotate to line up with the orientation of the letter
    rotate(theta);
    // translate out along the radius to where the letter will be drawn 
    translate(0, -radius);
    // draw the character
    fill(148, 108, 34, 220);
    text(currentChar, 0, 0);
    // pop back to our origin in the middle of the circle
    // (undoing the rotate and translate)
    popMatrix();
    // add the other half of the character width to our current position
    arcLength += w/2;
  }
}

void mousePressed() {
  redraw();
}


void keyPressed() {
  if (key == 's')saveFrame("####.png");
  println("Saving " + frameCount + ".png");
}
