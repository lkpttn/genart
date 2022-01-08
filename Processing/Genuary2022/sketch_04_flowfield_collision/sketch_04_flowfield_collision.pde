FlowField flowfield;
ArrayList<Particle> particles;

boolean debug = false;

void setup() {
  size(1000, 1000);
  int res = 8;
  flowfield = new FlowField(res);
  flowfield.update();
  
  particles = new ArrayList<Particle>();
  for (int i = 0; i < 1000; i++) {
    PVector start = new PVector(random(width), random(height));
    particles.add(new Particle(start, 5));
  }
}

void mousePressed() {
  debug = !debug;
}

void draw() {
  background(255);
  flowfield.update();
  
  if (debug) flowfield.display();
  
  for (Particle p : particles) {
    p.edges();
    // p.check(particles);
    if (!p.finished) {
      p.follow(flowfield);
      p.update();
    }
    p.show();
  }
}
