// main functioning objects
let grid
let searchAlgorithm = null;

function setup() {
  createCanvas(1200, 600).position(0, 0, 'static');
  background('pink')
  reset(14, 14)
  initializeButtons()
}

function draw() {
  frameRate(SpeedSlider.value())
  if (state == isRunning)
    searchAlgorithm.singleSearchIteration();

}

function mouseClicked() {
  if (!mouseInRange())
    return;
  let cellPos = getCellPos(mouseX,mouseY);
  let i = cellPos.i,
    j = cellPos.j;
  if (state == sourceTurn) {
    grid.setSource(i, j);
    state = -1;
  } else if (state == targetTurn) {
    grid.setTarget(i, j);
    state = -1;
  }
}

function mouseDragged() {
  if (!mouseInRange())
    return;
  let cellPos = getCellPos(mouseX,mouseY);
  let i = cellPos.i,
    j = cellPos.j;
  if (state == blockTurn) {
    grid.setBlock(i, j);
  }
}

function mouseInRange() {
  let gridWidth = grid.cols * grid.sideLength
  let gridHeight = grid.rows * grid.sideLength
  if (mouseX >= gridWidth || mouseY >= gridHeight || mouseX <= 0 || mouseY <= 0)
    return false;
  return true;

}

function getCellPos(x, y) {
  let i = x - x % grid.sideLength;
  let j = y - y % grid.sideLength;
  return {
    i: ceil(j / grid.sideLength),
    j: ceil(i / grid.sideLength)
  };
}