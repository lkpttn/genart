public class Particle {
  PVector pos;
  PVector velocity;
  PVector acceleration;
  PVector previousPos;
  float maxSpeed;
  boolean finished = false;
  
  ArrayList<PVector> history = new ArrayList<PVector>();
  
  Particle(PVector start, float maxS) {
    maxSpeed = maxS;
    pos = start;
    velocity = new PVector(0, 0);
    acceleration = new PVector(0, 0);
    previousPos = pos.copy();
  }
  
  void update() {
    history.add(pos.copy());
    pos.add(velocity);
  }
  
  void applyForce(PVector force) {
    acceleration.add(force);
  }
  
  void show() {
    stroke(0);
    noFill();
    strokeWeight(4);
    beginShape();
    for (PVector v : history) {
      vertex(v.x, v.y);
    }
    endShape();
  }
   
  void check(ArrayList<Particle> others) {
    if (!finished) {
      for (Particle other: others) {
        if (other != this) {
          for (PVector v : other.history) {
            float d = PVector.dist(pos, v);
            if (d < 8) {
              this.finished = true;
              return;
            }
          }
        }
      }
    }
  }
  
  void edges() {
    if (pos.x < 0 || pos.x > width - 1 || pos.y < 0 || pos.y > height - 1) {
      this.finished = true;
    }
  }
  
  void follow(FlowField flowfield) {
    int x = floor(pos.x / flowfield.scale);
    int y = floor(pos.y / flowfield.scale);
    int index = x + y * flowfield.cols;
    this.velocity = flowfield.vectors[index];
  }
}
