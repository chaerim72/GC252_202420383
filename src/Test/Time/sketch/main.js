let weatherTypes = ["rain", "snow", "sand"];
let currentWeather = 0;
let nextWeather = 0;

let particles = [];

let SPAWN_RATES = {
  rain: 10,
  snow: 2,
  sand: 15,
};

let secondsRadius, minutesRadius, hoursRadius;
let showClock = false;

let currentBg, targetBg;

let mode = "normal"; // normal | fadingOut

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  let radius = min(width, height) / 2;
  secondsRadius = radius * 0.71;
  minutesRadius = radius * 0.6;
  hoursRadius = radius * 0.5;

  currentBg = color(25);
  targetBg = currentBg;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  let radius = min(width, height) / 2;
  secondsRadius = radius * 0.71;
  minutesRadius = radius * 0.6;
  hoursRadius = radius * 0.5;
}

function drawWeatherLabel() {
  let labelMap = {
    rain: "비",
    snow: "눈",
    sand: "모래",
  };

  let type = weatherTypes[currentWeather];
  let label = labelMap[type];

  push();
  resetMatrix();
  fill(255);
  noStroke();
  textSize(12);
  textAlign(LEFT, BOTTOM);
  text(label, 12, height - 12);
  pop();
}

function draw() {
  updateBackground();

  translate(width / 2, height / 2);

  let secondAngle = map(second(), 0, 60, 0, 360);
  let minuteAngle = map(minute(), 0, 60, 0, 360);
  let hourAngle = map(hour(), 0, 12, 0, 360);

  let hands = [
    createHand(secondAngle, secondsRadius),
    createHand(minuteAngle, minutesRadius),
    createHand(hourAngle, hoursRadius),
  ];

  if (mode === "normal") {
    spawnParticles();
  }

  drawParticles(hands);
  drawClock(secondAngle, minuteAngle, hourAngle);

  //fade 끝나면 다음 날씨
  if (mode === "fadingOut" && particles.length === 0) {
    currentWeather = nextWeather;
    mode = "normal";
  }

  drawWeatherLabel();
}

function updateBackground() {
  let type = weatherTypes[currentWeather];

  if (type === "rain") targetBg = color(25);
  if (type === "snow") targetBg = color(20, 30, 60);
  if (type === "sand") targetBg = color(20, 15, 10);

  currentBg = lerpColor(currentBg, targetBg, 0.04);
  background(currentBg);
}

function spawnParticles() {
  let type = weatherTypes[currentWeather];
  let count = SPAWN_RATES[type];

  for (let i = 0; i < count; i++) {
    particles.push(createParticle(type));
  }
}

function createParticle(type) {
  if (type === "sand") {
    return {
      type,
      x: random(-width, width),
      y: random(-height, -height * 0.9),
      vx: random(-0.6, -0.2),
      vy: random(0, 1),
      gravity: random(0.05, 0.12),
      size: random(2, 4),
      alpha: 255,
    };
  }

  if (type === "snow") {
    return {
      type,
      x: random(-width / 2, width / 2),
      y: random(-height, -height * 0.9),
      vx: random(-0.3, 0.3),
      vy: random(0.6, 1),
      gravity: random(0.005, 0.015),
      size: random(4, 7),
      alpha: 255,
    };
  }

  if (type === "rain") {
    return {
      type,
      x: random(-width, width),
      y: random(-height, -height * 0.9),
      vx: random(0.8, 1.4),
      vy: random(7, 12),
      gravity: 0.25,
      length: random(12, 20),
      alpha: 255,
    };
  }
}

function drawParticles(hands) {
  let margin = width * 0.5;

  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];

    //항상 이동
    p.vy += p.gravity;
    p.x += p.vx || 0;
    p.y += p.vy;

    //fade
    if (mode === "fadingOut") {
      p.alpha -= 6;
    }

    //시계 바늘 충돌
    for (let h of hands) {
      let hitDist = p.type === "rain" ? 12 : p.type === "sand" ? 6 : 5;

      if (pointLineDist(p.x, p.y, h.x1, h.y1, h.x2, h.y2) < hitDist) {
        particles.splice(i, 1);
        continue;
      }
    }

    //제거 조건
    if (
      p.alpha <= 0 ||
      p.y > height / 2 + margin ||
      p.x < -width / 2 - margin ||
      p.x > width / 2 + margin
    ) {
      particles.splice(i, 1);
      continue;
    }

    drawParticle(p);
  }
}

function drawParticle(p) {
  if (p.type === "sand") {
    noStroke();
    fill(255, 220, 150, p.alpha);
    circle(p.x, p.y, p.size);
  }

  if (p.type === "snow") {
    noStroke();
    fill(255, p.alpha);
    circle(p.x, p.y, p.size);
  }

  if (p.type === "rain") {
    stroke(70, 100, 190, p.alpha);
    strokeWeight(1);
    line(p.x, p.y, p.x - p.vx, p.y - p.vy * 2);
  }
}

function drawClock(secondAngle, minuteAngle, hourAngle) {
  let secAlpha = showClock ? 255 : 10;
  let minAlpha = showClock ? 255 : 8;
  let hourAlpha = showClock ? 255 : 5;

  push();
  rotate(secondAngle);
  stroke(255, secAlpha);
  strokeWeight(2);
  line(0, 0, 0, -secondsRadius);
  pop();

  push();
  rotate(minuteAngle);
  stroke(255, minAlpha);
  strokeWeight(5);
  line(0, 0, 0, -minutesRadius);
  pop();

  push();
  rotate(hourAngle);
  stroke(255, hourAlpha);
  strokeWeight(7);
  line(0, 0, 0, -hoursRadius);
  pop();

  if (showClock) {
    push();
    stroke(255);
    strokeWeight(2);
    for (let i = 0; i < 60; i++) {
      point(0, -secondsRadius);
      rotate(6);
    }
    pop();
  }
}

function createHand(angle, length) {
  return {
    x1: 0,
    y1: 0,
    x2: sin(angle) * length,
    y2: -cos(angle) * length,
  };
}

function pointLineDist(px, py, x1, y1, x2, y2) {
  let A = px - x1;
  let B = py - y1;
  let C = x2 - x1;
  let D = y2 - y1;

  let dot = A * C + B * D;
  let len = C * C + D * D;
  let t = max(0, min(1, dot / len));

  let x = x1 + t * C;
  let y = y1 + t * D;

  return dist(px, py, x, y);
}

function mousePressed() {
  showClock = !showClock;
}

function keyPressed() {
  if (key === " ") {
    if (mode === "normal") {
      mode = "fadingOut";
      nextWeather = (currentWeather + 1) % weatherTypes.length;
    }
  }
}
