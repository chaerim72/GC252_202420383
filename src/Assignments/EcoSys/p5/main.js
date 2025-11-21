let eels = [];
let fishes = [];
let larvas = [];

const numEels = 2;
const numFishes = 8;
const numLarvas = 16;

function setup() {
  createCanvas(800, 600);

  // 초기 개체 생성
  for (let i = 0; i < numEels; i++)
    eels.push(new Eel(random(width), random(height)));
  for (let i = 0; i < numFishes; i++)
    fishes.push(new Fish(random(width), random(height)));
  for (let i = 0; i < numLarvas; i++)
    larvas.push(new Larva(random(width), random(height)));
}

function draw() {
  background(0, 0, 0);

  // --- 애벌레 ---
  for (let l of larvas) {
    l.update();
    l.display();
  }

  // --- 물고기 ---
  for (let f of fishes) {
    f.behavior(larvas, eels);
    f.update();
    f.display();
  }

  // --- 뱀장어 ---
  for (let e of eels) {
    e.behavior(fishes);
    e.update();
    e.display();
  }

  // --- 충돌 감지 (먹이 관계) ---
  handleEating();
}

function handleEating() {
  // 물고기가 애벌레 먹기
  for (let f of fishes) {
    for (let i = larvas.length - 1; i >= 0; i--) {
      if (dist(f.pos.x, f.pos.y, larvas[i].pos.x, larvas[i].pos.y) < 10) {
        larvas.splice(i, 1);
        larvas.push(new Larva(random(width), random(height))); // 재생성
      }
    }
  }

  // 뱀장어가 물고기 먹기
  for (let e of eels) {
    for (let i = fishes.length - 1; i >= 0; i--) {
      if (dist(e.pos.x, e.pos.y, fishes[i].pos.x, fishes[i].pos.y) < 15) {
        fishes.splice(i, 1);
        fishes.push(new Fish(random(width), random(height))); // 재생성
      }
    }
  }
}
