// main functioning objects
let maze
let searchAlgorithm;

function setup() {
  createCanvas(1200, 600).position(0, 0, 'static');
  background('pink')
  slider = createSlider(1, 60, 30)
  reset(20, 50)
  initializeButtons()
}

function draw() {
  frameRate(slider.value())
  if (mouseIsPressed === true) {
    mouseClicked()
  }
  if (!isPaused)
    searchAlgorithm.search();

}

function mouseClicked() {
  if (!mouseInRange())
    return;
  let clickedCell = getCellPos(mouseX, mouseY)
  console.log(clickedCell)
  if (!sourceIsPicked) {
    maze.setSource(clickedCell.x, clickedCell.y);
    sourceIsPicked = true
  } else if (!targetIsPicked) {
    if (clickedCell.x == maze.source.x && clickedCell.y == maze.source.y)
      return;
    maze.setTarget(clickedCell.x, clickedCell.y);
    targetIsPicked = true

  } else if (!blocksArePicked) {
    if (clickedCell.x == maze.source.x && clickedCell.y == maze.source.y)
      return;
    if (clickedCell.x == maze.target.x && clickedCell.y == maze.target.y)
      return;
    maze.grid[clickedCell.x][clickedCell.y].color = blockColor
  }
  maze.grid[clickedCell.x][clickedCell.y].show()
}

function mouseInRange() {
  let gridWidth = maze.cols * maze.sideLength
  let gridHeight = maze.rows * maze.sideLength
  if (mouseX >= gridWidth || mouseY >= gridHeight || mouseX <= 0 || mouseY <= 0)
    return false;
  return true;

}

function getCellPos(i, j) { //  (i,j) vertex on canvas
  let x = i - i % maze.sideLength;
  let y = j - j % maze.sideLength;
  return { // (x,y) indices on grid[][]
    x: ceil(y / maze.sideLength),
    y: ceil(x / maze.sideLength)
  };
}