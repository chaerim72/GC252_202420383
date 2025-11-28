const canvasContainer = document.getElementById("canvas-container");
let renderer;

const INITIAL_W = 800;
const INITIAL_H = 600;
const INITIAL_RATIO = INITIAL_W / INITIAL_H;

const cellsPerRow = 100;
let cellsPerColumn;
const cells = [];
let cellSize;

let hoveredCell = null;

function getIdx(r, c) {
  return r * cellsPerRow + c;
}

let lastTime = 0;
const interval = 100;

function setup() {
  renderer = createCanvas(INITIAL_W, INITIAL_H);
  renderer.parent(canvasContainer);
  renderer.elt.style.aspectRatio = `${INITIAL_W} / ${INITIAL_H}`;

  new ResizeObserver(() => {
    const { width: containerWidth, height: containerHeight } =
      canvasContainer.getBoundingClientRect();
    renderer.elt.style.width = `${containerWidth}px`;
    renderer.elt.style.height = `${containerWidth / INITIAL_RATIO}px`;
  }).observe(canvasContainer);

  cellSize = width / cellsPerRow;
  cellsPerColumn = Math.floor(height / cellSize);

  const RPS = ["R", "P", "S"];

  for (let r = 0; r < cellsPerColumn; r++) {
    for (let c = 0; c < cellsPerRow; c++) {
      const x = c * cellSize;
      const y = r * cellSize;
      const randomState = random(RPS);
      const newCell = new Cell(x, y, cellSize, cellSize, randomState);
      cells.push(newCell);
    }
  }

  cells.forEach((cell, idx) => {
    const row = Math.floor(idx / cellsPerRow);
    const col = idx % cellsPerRow;
    const tl = row > 0 && col > 0 ? cells[getIdx(row - 1, col - 1)] : null;
    const t = row > 0 ? cells[getIdx(row - 1, col)] : null;
    const tr =
      row > 0 && col < cellsPerRow - 1 ? cells[getIdx(row - 1, col + 1)] : null;
    const r = col < cellsPerRow - 1 ? cells[getIdx(row, col + 1)] : null;
    const br =
      row < cellsPerColumn - 1 && col < cellsPerRow - 1
        ? cells[getIdx(row + 1, col + 1)]
        : null;
    const b = row < cellsPerColumn - 1 ? cells[getIdx(row + 1, col)] : null;
    const bl =
      row < cellsPerColumn - 1 && col > 0
        ? cells[getIdx(row + 1, col - 1)]
        : null;
    const l = col > 0 ? cells[getIdx(row, col - 1)] : null;
    cell.setNeighbors(tl, t, tr, r, br, b, bl, l);
  });
}

function RPSBar() {
  const barWidth = width;
  const barHeight = 30;
  const barY = height - barHeight;

  let rCount = 0;
  let pCount = 0;
  let sCount = 0;

  cells.forEach((cell) => {
    if (cell.state === "R") rCount++;
    else if (cell.state === "P") pCount++;
    else if (cell.state === "S") sCount++;
  });

  const total = rCount + pCount + sCount;
  const rRatio = rCount / total;
  const pRatio = pCount / total;
  const sRatio = sCount / total;

  let x = 0;
  //바위
  fill("blue");
  rect(x, barY, barWidth * rRatio, barHeight);
  fill(0);
  textSize(14);
  textAlign(CENTER, CENTER);
  text(
    "바위 : " + `${(rRatio * 100).toFixed(1)}%`,
    x + (barWidth * rRatio) / 2,
    barY + barHeight / 2
  );
  x += barWidth * rRatio;

  //보
  fill("red");
  rect(x, barY, barWidth * pRatio, barHeight);
  fill(0);
  text(
    "보 : " + `${(pRatio * 100).toFixed(1)}%`,
    x + (barWidth * pRatio) / 2,
    barY + barHeight / 2
  );
  x += barWidth * pRatio;

  //가위
  fill("yellow");
  rect(x, barY, barWidth * sRatio, barHeight);
  fill(0);
  text(
    "가위 : " + `${(sRatio * 100).toFixed(1)}%`,
    x + (barWidth * sRatio) / 2,
    barY + barHeight / 2
  );
}

function draw() {
  background(250);
  cells.forEach((aCell) => {
    aCell.computeNextState();
  });

  if (millis() - lastTime > interval) {
    cells.forEach((aCell) => {
      aCell.updateState();
    });
    lastTime = millis();
  }

  cells.forEach((cell) => cell.render(cell === hoveredCell));

  RPSBar();
}

function mouseMoved() {
  hoveredCell = null;
  for (let idx = 0; idx < cells.length; idx++) {
    if (cells[idx].isHovered(mouseX, mouseY)) {
      hoveredCell = cells[idx];
      break;
    }
  }
}

function mousePressed() {
  hoveredCell?.toggleState();
}
