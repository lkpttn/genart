Object[] lineArray;

void setup() {
  size(500, 500);
  noLoop();
  background(0);
  stroke(255);
  strokeWeight(1);

  int x1 = 100;
  int y1 = 100;
  int x2 = 400;
  int y2 = 400;
  line(x1, y1, x2, y2);

  float lineLength = dist(x1, y1, x2, y2);

  lineArray = new Object[0];

  float count = 40;
  for (int i = 0; i <= count; i++) {
    float x = lerp(x1, x2, i/count) + 10;
    float y = lerp(y1, y2, i/count);
    float[] point = {x, y}; // Object
    lineArray = (Object[]) append(lineArray, point);
    point(x, y);
  }
 
  
  for (int i = 0; i <= lineArray.length; i++) {
    float[] point = lineArray[i];
    float x = lineArray[i][0];
    float y = lineArray[i][1];
    point(x + 5, y);
  }
}
