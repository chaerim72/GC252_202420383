class Larva {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D().mult(1.5);
    this.size = 8;
    this.color = color(200, 255, 180);
  }

  update() {
    let noiseAngle =
      noise(this.pos.x * 0.01, this.pos.y * 0.01, frameCount * 0.005) *
      TWO_PI *
      2;
    let dir = p5.Vector.fromAngle(noiseAngle);
    this.vel.add(dir.mult(0.05));
    this.vel.limit(1.5);
    this.pos.add(this.vel);
    this.edges();
  }

  edges() {
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.y < 0) this.pos.y = height;
    if (this.pos.y > height) this.pos.y = 0;
  }

  display() {
    // fill(this.color);
    // noStroke();
    noFill();
    stroke(255);
    ellipse(this.pos.x, this.pos.y, this.size);
  }
}
