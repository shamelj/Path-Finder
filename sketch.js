let queue = []
let grid //= new Grid(0,0);
fps = 1;
time = 1
let slider

function setup() {
  createCanvas(600, 600).position(0, 0, 'static');
  slider = createSlider(1, 60, 1)
  grid = new Grid(15, 15);
  for (let i = 0; i < grid.rows-2; i++)
    grid.grid[i][1].color = 'brown'
  grid.setSource(0, 0);
  grid.setTarget(7, 7);

}

async function draw() {
  frameRate(slider.value())
  background(220);
  grid.renderGrid()
  grid.singleBfsIteration();
}