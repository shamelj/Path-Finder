// main functioning objects
let maze
let searchAlgorithm;

function setup() {
  createCanvas(1000, 600).position(0, 0, 'static');
  background('pink')
  slider = createSlider(1, 60, 30)
  maze = new Grid(25, 25);
  initializeButtons()
}

function draw() {
  frameRate(slider.value())
  //background(220);
  if (mouseIsPressed === true) {
    mouseClicked()

  }
  if (!isPaused)
    searchAlgorithm.search();

}

function mouseClicked() {
  if (mouseX >= min(maze.cols, maze.rows) * maze.sideLength || mouseY >= min(maze.cols, maze.rows) * maze.sideLength)
    return;
  let clickedCell = getCellPos(mouseX, mouseY)
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

function getCellPos(i, j) { //  (i,j) vertex on canvas
  let x = i - i % maze.sideLength;
  let y = j - j % maze.sideLength;
  return { // (x,y) indices on grid[][]
    x: y / maze.sideLength,
    y: x / maze.sideLength
  };
}