let Vehicle;
let target;

function setup() {
  createCanvas(800, 600);

  Vehicle = new Vehicle(width / 2, height / 2, 3, 0.05);
  target = createVector(width / 2, height / 2);
}

function draw() {
  if (mouseIsPressed) {
    target.set(mouseX, mouseY);
  }

  background(0);

  noStroke();
  fill("red");
  circle(target.x, target.y, 16);

  // Vehicle.seek(target);
  Vehicle.arrive(target);
  Vehicle.update();
  Vehicle.show();
  Vehicle.showVel();
  Vehicle.showDecRad();
}
