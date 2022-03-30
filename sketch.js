let rows = 4,
  cols = 4;
let grid = (new Array(rows))

function setup() {
  createCanvas(600, 600);
  initializeGrid()
}



function draw() {
  background(220);
  renderGrid();
}
function initializeGrid() {
  for (let i = 0; i < grid.length; i++)
    grid[i] = new Array(cols)

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j] = new Cell(j * 75, i * 75, 75, 'grey')
    }
  }
}
function renderGrid() {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++)
      grid[i][j].show();
  }
}