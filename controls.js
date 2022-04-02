// navigation elements
let slider;
// Main Colors
let blockColor = '#0a3747';
let unvisitedColor = 'darkgrey';
let visitedColor = '#2fa8d4';
let exploredColor = 'yellow'
let targetColor = '#fa001d'
let sourceColor = '#2ecc12'
let pathColor = '#66139e'
//Starting up booleans
let sourceIsPicked = true,
    targetIsPicked = true,
    blocksArePicked = true;
isPaused = true;

function reset(rows, cols) {
    sourceIsPicked = true;
    targetIsPicked = true;
    blocksArePicked = true;
    isPaused = true;
    maze = new Grid(rows, cols);
    background('pink')
    slider = createSlider(1, 60, 30)
}

function initializeStart() {
    // start-pause button
    maze.renderGrid()
    let startBtn = createButton('Paused', false);
    startBtn.style('background-color: red')
    startBtn.mouseClicked(() => {
        if (sourceIsPicked && targetIsPicked) {
            if (isPaused) {
                startBtn.html('Started')
                startBtn.style('background-color: green')
            } else {
                startBtn.html('Paused')
                startBtn.style('background-color: red')
            }
            searchAlgorithm = new A_Star(maze);
            isPaused = !isPaused;
        }
    });
}

function initializeSourceButton() {
    // source Button
    let sourceBtn = createButton('Pick Source', '');
    sourceBtn.mouseClicked(() => {
        sourceIsPicked = !sourceIsPicked;
    })
}

function initializeTargetButton() {
    let targetBtn = createButton('Pick Target', '');
    targetBtn.mouseClicked(() => {
        targetIsPicked = !targetIsPicked;
    })
}

function initializeBlocksButton() {
    let blocksBtn = createButton('Pick Blocks');
    blocksBtn.mouseClicked(() => {
        blocksArePicked = !blocksArePicked;
    })
}
function initializeResetButton(){
    let resetBtn = createButton('Reset');
    resetBtn.mouseClicked(() => reset(20, 20))
}
function initializeButtons() {
    initializeStart()
    initializeSourceButton()
    // Target Button
    initializeTargetButton()
    // Blocks Button
    initializeBlocksButton()
    // reset button
    

}