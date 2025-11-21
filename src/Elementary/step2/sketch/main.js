const canvasContainer = document.getElementById("canvas-container");
let renderer;

const INITIAL_W = 800;
const INITIAL_H = 600;
const INITIAL_RATIO = INITIAL_W / INITIAL_H;

const cellsPerRow = 50;
let cellsPerColumn;
const cells = [];
let cellSize;

let hoveredCell = null;

function createNextGen() {
  const refIdx = cells.length - cellsPerRow;
  for (let idx = refIdx; idx < refIdx + cellsPerRow; idx++) {
    cells[idx].computeNextState();
  }
  for (let n = 0; n < cellsPerRow; n++) {
    const refCell = cells[refIdx + n];
    const x = width * 0.5 - 0.5 * cellSize * cellsPerRow + n * cellSize;
    const y = refCell.pos[1] + cellSize;
    const w = cellSize;
    const h = cellSize;
    const cell = new Cell(x, y, w, h, refCell, nextState);
    cells.push(cell);
  }
  for (let n = 0; n < cellsPerRow; n++) {
    const idx = refIdx + cellsPerRow + n;
    const left = n === 0 ? null : cells[idx - 1];
    const right = n === cellsPerRow - 1 ? null : cells[idx + 1];
    cells[idx].setNeighbors(left, right);
  }
}

function updateAllGenerations() {
  const currentRowCnt = Math.floor(cells.length / cellsPerRow);
  for (let row = 0; row < currentRowCnt; row++) {
    for (let col = 0; col < cellsPerRow; col++) {
      const idx = row * cellsPerRow + col;
      if (row !== 0) {
        const refIdx = (row - 1) * cellsPerRow + col;
        cells[idx].state = cells[refIdx].nextState;
      }
    }
    for (let col = 0; col < cellsPerRow; col++) {
      const idx = row * cellsPerRow + col;
      cells[idx].computeNextState();
    }
  }
}

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

  for (let n = 0; n < cellsPerRow; n++) {
    const x = width * 0.5 - 0.5 * cellSize * cellsPerRow + n * cellSize;
    const y = 0;
    const w = cellSize;
    const h = cellSize;
    const cell = new Cell(x, y, w, h, Math.floor(cellsPerRow / 2) === n);
    cells.push(cell);
  }

  cells.forEach((cell, idx) => {
    const left = cells[idx - 1];
    const right = cells[idx + 1];
    // console.log(idx, left, right);
    cell.setNeighbors(left, right);
  });

  for (let row = 1; row < cellsPerColumn; row++) {
    createNextGen();
  }
}

function draw() {
  background(250);
  cells.forEach((cell) => cell.render(cell === hoveredCell));
}

function mouseMoved() {
  hoveredCell = null;
  for (let idx = 0; idx < cellsPerRow; idx++) {
    if (cells[idx].isHovered(mouseX, mouseY)) {
      hoveredCell = cells[idx];
      break;
    }
  }
  //   console.log(hoveredCell);
}

function mousePressed() {
  hoveredCell?.toggleState();
  console.log(hoveredCell?.getCombinedState());
  console.log(hoveredCell?.getNextState());
  updateAllGenerations();
}

function keyPressed() {
  if (key === "s" || key === "S") {
    createNextGen();
  } else if (key === "w" || key === "W") {
    cells.length = cells.length - cellsPerRow;
  }
}
