public class FlowField {
  PVector[] vectors;
  int cols, rows;
  float increment = 0.02;
  float zoffset;
  int scale;
  
  FlowField(int res) {
    scale = res;
    cols = floor(width / res) + 1;
    rows = floor(height / res) + 1;
    vectors = new PVector[cols * rows];
  }
  
  void update() {
    float yoffset = 0;
    for (int y = 0; y < rows; y++) {
      float xoffset = 0;
      for (int x = 0; x < cols; x++) {
        float n = (float) noise(xoffset, yoffset);
        float angle = map(n, -1, 1, 0, TWO_PI);
        PVector v = PVector.fromAngle(angle);
        int index = x + y * cols;
        vectors[index] = v;
        xoffset += increment;
      }
      yoffset += increment;
    }
  }
  
  void display() {
    for (int y = 0; y < rows; y++) {
      for (int x = 0; x < cols; x++) {
        int index = x + y * cols;
        PVector v = vectors[index];
        
        stroke(0);
        strokeWeight(2);
        pushMatrix();
        translate(x * scale, y * scale);
        rotate(v.heading());
        line(0, 0, scale, 0);
        popMatrix();
      }
    }
  }
}
