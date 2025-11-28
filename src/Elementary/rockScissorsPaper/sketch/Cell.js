class Cell {
  pos = [0, 0];
  size = [0, 0];
  state = "R";
  nextState = "R";
  neighbors = [null, null, null, null, null, null, null, null];

  constructor(x, y, w, h, state = "R") {
    this.pos = [x, y];
    this.size = [w, h];
    this.state = state;
  }

  setNeighbors(tl, t, tr, r, br, b, bl, l) {
    this.neighbors[0] = tl;
    this.neighbors[1] = t;
    this.neighbors[2] = tr;
    this.neighbors[3] = r;
    this.neighbors[4] = br;
    this.neighbors[5] = b;
    this.neighbors[6] = bl;
    this.neighbors[7] = l;
  }

  computeNextState() {
    const losesTo = {
      R: "P",
      P: "S",
      S: "R",
    };
    const enemy = losesTo[this.state];

    let cnt = 0;
    for (const nb of this.neighbors) {
      if (!nb) continue;
      if (nb.state === enemy) cnt++;
    }

    // if (cnt >= Math.floor(this.neighbors.filter((n) => n).length / 2))
    //   this.nextState = enemy;
    if (cnt >= 3 && random() < 0.9) this.nextState = enemy;
    else this.nextState = this.state;
  }

  updateState() {
    this.state = this.nextState;
  }

  isHovered(mX, mY) {
    return (
      mX >= this.pos[0] &&
      mX <= this.pos[0] + this.size[0] &&
      mY >= this.pos[1] &&
      mY <= this.pos[1] + this.size[1]
    );
  }

  toggleState() {
    if (this.state === "R") this.state = "P";
    else if (this.state === "P") this.state = "S";
    else this.state = "R";
  }

  render(isHovered = false) {
    strokeWeight(2);
    stroke(isHovered ? "black" : 200);
    if (this.state === "R") fill("blue");
    else if (this.state === "P") fill("red");
    else if (this.state === "S") fill("yellow");

    rect(this.pos[0], this.pos[1], this.size[0], this.size[1]);
  }
}
