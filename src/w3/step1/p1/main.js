function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(127);
  //fill("255, 0, 0");
  //fill("red");
  fill("#FF0000");
  noStroke();
  circle(0, 0, 100);
  fill("skyblue");
  stroke("orange");
  strokeWeight(4);
  circle(width, height, 100);
  fill("green");
  stroke("pink");
  circle(0.5 * width, 0.5 * height, 100);
  fill("black");
  noStroke();
  circle(mouseX, mouseY, 100);
  fill("white");
  circle(mouseY, mouseX, 100);
}
