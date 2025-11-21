class Eel {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.acc = createVector();
    this.maxSpeed = 2.5;
    this.maxForce = 0.1;
    this.size = 35;
    this.color = color(100, 200, 255);
  }

  behavior(preys) {
    let closest = null;
    let record = Infinity;
    for (let p of preys) {
      let d = dist(this.pos.x, this.pos.y, p.pos.x, p.pos.y);
      if (d < record) {
        record = d;
        closest = p;
      }
    }
    if (closest) this.seek(closest.pos);
  }

  seek(target) {
    let desired = p5.Vector.sub(target, this.pos);
    desired.setMag(this.maxSpeed);
    let steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxForce);
    this.acc.add(steer);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.edges();
  }

  edges() {
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.y < 0) this.pos.y = height;
    if (this.pos.y > height) this.pos.y = 0;
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    fill(this.color);
    noStroke();
    ellipse(0, 0, this.size * 1.6, this.size * 0.5);
    pop();
  }
}
