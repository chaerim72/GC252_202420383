class Fish {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.acc = createVector();
    this.maxSpeed = 3.5;
    this.maxForce = 0.15;
    this.size = 20;
    this.color = color(255, 180, 120);
  }

  behavior(preys, predators) {
    let seekForce = this.seekClosest(preys);
    let fleeForce = this.fleeClosest(predators);

    seekForce.mult(1.0);
    fleeForce.mult(1.5);

    this.acc.add(seekForce);
    this.acc.add(fleeForce);
  }

  seekClosest(list) {
    let closest = null;
    let record = Infinity;
    for (let p of list) {
      let d = dist(this.pos.x, this.pos.y, p.pos.x, p.pos.y);
      if (d < record) {
        record = d;
        closest = p;
      }
    }
    if (closest) return this.seek(closest.pos);
    return createVector(0, 0);
  }

  fleeClosest(list) {
    let closest = null;
    let record = Infinity;
    for (let p of list) {
      let d = dist(this.pos.x, this.pos.y, p.pos.x, p.pos.y);
      if (d < record) {
        record = d;
        closest = p;
      }
    }
    if (closest && record < 120) return this.flee(closest.pos);
    return createVector(0, 0);
  }

  seek(target) {
    let desired = p5.Vector.sub(target, this.pos);
    desired.setMag(this.maxSpeed);
    let steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxForce);
    return steer;
  }

  flee(target) {
    let desired = p5.Vector.sub(this.pos, target);
    desired.setMag(this.maxSpeed);
    let steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxForce);
    return steer;
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
    triangle(
      -this.size / 2,
      -this.size / 3,
      -this.size / 2,
      this.size / 3,
      this.size / 2,
      0
    );
    pop();
  }
}
