// navigation elements
let slider;
let algorithmSelector;
let rowInput, colInput;
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
    background('white')
    sourceIsPicked = true;
    targetIsPicked = true;
    blocksArePicked = true;
    isPaused = true;
    maze = new Grid(rows, cols);
    maze.renderGrid();
}

function initializeButtons() {
    initializeStart()
    initializeSourceButton()
    // Target Button
    initializeTargetButton()
    // Blocks Button
    initializeBlocksButton()
    // Algorithm Selector
    initializeAlgorithmSelector()
    // Reset button
    initializeResetButton()
    //
    initializeRowColInput()

}

function initializeStart() {
    // start-pause button
    maze.renderGrid()
    let startBtn = createButton('Paused', false);
    startBtn.style('background-color: red')
    startBtn.mouseClicked(() => {
        if (maze.source.x != -1 && maze.target.x != -1) {
            if (isPaused) {
                startBtn.html('Started')
                startBtn.style('background-color: green')
            } else {
                startBtn.html('Paused')
                startBtn.style('background-color: red')
            }
            if (algorithmSelector.value() == 'A*')
                searchAlgorithm = new A_Star(maze);
            else if (algorithmSelector.value() == 'BFS')
                searchAlgorithm = new BFS(maze);
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

function initializeResetButton() {
    let resetBtn = createButton('Reset');
    resetBtn.mouseClicked(() => reset(20, 50))
}

function initializeAlgorithmSelector() {
    algorithmSelector = createSelect();
    algorithmSelector.position(10, 10);
    algorithmSelector.option('A*');
    algorithmSelector.option('BFS');
    algorithmSelector.selected('A*');
    algorithmSelector.position(0, 0, 'static')
}

function initializeRowColInput() {
    createSpan(' rows: ');
    rowInput = createSlider(5, 80, 20);
    createSpan(' colums:')
    colInput = createSlider(5, 140, 50);
    rowInput.changed(() => reset(parseInt(rowInput.value()), parseInt(colInput.value())))
    colInput.changed(() => reset(parseInt(rowInput.value()), parseInt(colInput.value())))


}