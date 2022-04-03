// main functioning objects
let maze
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
    maze.setSource(i, j);
    state = -1;
  } else if (state == targetTurn) {
    maze.setTarget(i, j);
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
    maze.setBlock(i, j);
  }
}

function mouseInRange() {
  let gridWidth = maze.cols * maze.sideLength
  let gridHeight = maze.rows * maze.sideLength
  if (mouseX >= gridWidth || mouseY >= gridHeight || mouseX <= 0 || mouseY <= 0)
    return false;
  return true;

}

function getCellPos(x, y) {
  let i = x - x % maze.sideLength;
  let j = y - y % maze.sideLength;
  return {
    i: ceil(j / maze.sideLength),
    j: ceil(i / maze.sideLength)
  };
}