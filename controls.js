// navigation elements
let startBtn;
let SpeedSlider;
let algorithmSelector;
// Main Colors
let blockColor = '#0a3747';
let unvisitedColor = 'darkgrey';
let visitedColor = '#2fa8d4';
let exploredColor = 'yellow'
let targetColor = '#fa001d'
let sourceColor = '#08800e'
let pathColor = '#07f58a'
//flow control
let state = -1,
    sourceTurn = 0,
    targetTurn = 1,
    blockTurn = 2,
    isRunning = 4;


function reset(rows, cols) {
    background('white')
    state = -1;
    grid = new Grid(rows, cols);
    searchAlgorithm = null;
    if (startBtn != null) {
        startBtn.html('Paused')
        startBtn.style('background-color: red')
    }
    grid.renderGrid();
}

function initializeButtons() {
    // Speed Slider
    initializeSpeedSlider();
    // Start Button
    initializeStart()
    // Source button
    initializeSourceButton()
    // Target Button
    initializeTargetButton()
    // Blocks Button
    initializeBlocksButton()
    // Algorithm Selector
    initializeAlgorithmSelector()
    // Reset button
    initializeResetButton()
    // row and column input slider 
    initializeRowColInput()

}

function initializeStart() {
    // start-pause button
    grid.renderGrid()
    startBtn = createButton('Paused', false);
    startBtn.style('background-color: red')
    startBtn.mouseClicked(() => {
        if (grid.sourceIsPicked() && grid.targetIsPicked()) {
            if (state != isRunning) {
                startBtn.html('Started')
                startBtn.style('background-color: green')
                state = isRunning;
            } else {
                startBtn.html('Paused')
                startBtn.style('background-color: red')
                state = -1;
            }
            if (searchAlgorithm == null) {
                if (algorithmSelector.value() == 'A*')
                    searchAlgorithm = new A_Star(grid);
                else if (algorithmSelector.value() == 'BFS')
                    searchAlgorithm = new BFS(grid);
            }
        }
    });
}

function initializeSpeedSlider() {
    createSpan(' Speed: ')
    SpeedSlider = createSlider(1, 60, 30)
}

function initializeSourceButton() {
    // source Button
    let sourceBtn = createButton('Pick Source', '');
    sourceBtn.mouseClicked(() => {
        state = (state != isRunning) ? sourceTurn : isRunning;
    })
}

function initializeTargetButton() {
    let targetBtn = createButton('Pick Target', '');
    targetBtn.mouseClicked(() => {
        state = (state != isRunning) ? targetTurn : isRunning;
    })
}

function initializeBlocksButton() {
    let blocksBtn = createButton('Pick Blocks');
    blocksBtn.mouseClicked(() => {
        state = (state != isRunning) ? blockTurn : isRunning;
    })
}

function initializeResetButton() {
    let resetBtn = createButton('Reset');
    resetBtn.mouseClicked(() => reset(14, 14))
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
    let rowInput = createSlider(5, 80, 20);
    createSpan(' colums:')
    let colInput = createSlider(5, 140, 50);
    rowInput.changed(() => reset(parseInt(rowInput.value()), parseInt(colInput.value())))
    colInput.changed(() => reset(parseInt(rowInput.value()), parseInt(colInput.value())))
}