let pallete = ["#3E1E68", "#5D2F77", "#E45A92", "#FFACAC"];

let balls = [];

function setup() {
  createCanvas(600, 400);
  ball.push(new Ball(0.5 * width, 0.5 * height, 100, 7, pallete[0]));
  ball.push(new Ball(0.5 * width, 0.5 * height, 50, 10, pallete[1]));
  ball.push(new Ball(0.5 * width, 0.5 * height, 200, 3, pallete[2]));
  ball.push(new Ball(0.5 * width, 0.5 * height, 150, 2, pallete[3]));
  for (let n = 0; n < 20; n++) {
    ball.push(
      new Ball(0.5 * width, 0.5 * height, 50, 5, pallete[n % pallete.length])
    );
  }
}

function draw() {
  background(127);

  // if (mouseIsPressed) {
  //   createBall();
  // }

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
  // createBall();
  for (let idx = balls.length - 1; idx >= 0; idx--) {
    if (balls[idx].isHovered()) {
      balls.splice(idx, 1);
    }
  }
}

function createBall() {
  let dist = [mouseX, width - mouseX, mouseY, height - mouseY];
  let minDist = min(dist);
  let randomDiameter = random(2 * minDist);
  if (randomDiameter > 100) randomDiameter = 100;
  let randomSpeed = random(3, 10);
  balls.push(
    new Ball(
      mouseX,
      mouseY,
      randomDiameter,
      randomSpeed,
      pallete[balls.length % pallete.length]
    )
  );
}
