// let aBall;
// let bBall;
// let cBall;
// let dBall;
let balls = [];

function setup() {
  createCanvas(600, 400);
  // aBall = new Ball(0.5 * width, 0.5 * height, 100, 7, "red");
  // bBall = new Ball(0.5 * width, 0.5 * height, 50, 10, "blue");
  // cBall = new Ball(0.5 * width, 0.5 * height, 200, 3, "yellow");
  // dBall = new Ball(0.5 * width, 0.5 * height, 150, 2, "pink");
  ball.push(new Ball(0.5 * width, 0.5 * height, 100, 7, "red"));
  ball.push(new Ball(0.5 * width, 0.5 * height, 50, 10, "blue"));
  ball.push(new Ball(0.5 * width, 0.5 * height, 200, 3, "yellow"));
  ball.push(new Ball(0.5 * width, 0.5 * height, 150, 2, "pink"));
}

function draw() {
  background(127);

  // aBall.update();
  // aBall.resolveWallCollision();
  // aBall.show();
  // bBall.update();
  // bBall.resolveWallCollision();
  // bBall.show();
  // cBall.update();
  // cBall.resolveWallCollision();
  // cBall.show();
  // dBall.update();
  // dBall.resolveWallCollision();
  // dBall.show();

  // for (let idx = 0; idx < balls.length; idx++) {
  //   balls[idx].update();
  //   balls[idx].resolveWallCollision();
  //   balls[idx].show();
  //   }

  // for(let aBall of balls) {
  //   aBall.update();
  //   aBall.resoveWallCollision();
  //   aBall.show();
  //}

  balls.forEach((aBall) => {
    aBall.update();
    aBall.resoveWallCollision();
    aBall.show();
  });

  fill("black");
  noStroke();
  circle(mouseX, mouseY, 50);
}

function mousePressed() {
  // aBall.reset(0.5 * width, 0.5 * height);
  // bBall.reset(0.5 * width, 0.5 * height);
  // cBall.reset(0.5 * width, 0.5 * height);
  // dBall.reset(0.5 * width, 0.5 * height);
  balls.forEach((aBall) => {
    aBall.reset(0.5 * width, 0.5 * height);
  });
}
