// navigation elements
let startBtn;
let SpeedSlider;
let algorithmSelector;
let colInput,rowInput;
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
    background('grey')
    state = -1;
    grid = new Grid(rows, cols);
    searchAlgorithm = null;
    if (startBtn != null) {
        startBtn.html('Paused')
        startBtn.style('background-color: #db4047')
    }
    grid.renderGrid();
}

function initializeButtons() {
    // Speed Slider
    initializeSpeedSlider();
    // Start Button
    initializeStart()
    // Reset button
    initializeResetButton()
    // Source button
    initializeSourceButton()
    // Target Button
    initializeTargetButton()
    // Blocks Button
    initializeBlocksButton()
    // Algorithm Selector
    initializeAlgorithmSelector()

    // row and column input slider 
    initializeRowColInput()

}

function createCol(parent, child) {
    let col = createDiv();
    col.class('col')
    col.parent(parent)
    child.class('col-12')
    child.parent(col)
}

function initializeStart() {
    // start-pause button
    grid.renderGrid()
    startBtn = createButton('Paused', false);
    createCol('row1', startBtn);
    startBtn.style('background-color: #db4047')
    startBtn.mouseClicked(() => {
        if (grid.sourceIsPicked() && grid.targetIsPicked()) {
            if (state != isRunning) {
                startBtn.html('Started')
                startBtn.style('background-color: #40db4f')
                state = isRunning;
            } else {
                startBtn.html('Paused')
                startBtn.style('background-color: #db4047')
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
    let span = createSpan(' Speed: ')
    let col = createDiv();
    col.parent('row2')
    col.class('col')
    span.parent(col);
    SpeedSlider = createSlider(1, 60, 30)
    SpeedSlider.parent(col);

}

function initializeSourceButton() {
    // source Button
    let sourceBtn = createButton('Pick Source', '');
    createCol('row3', sourceBtn)
    sourceBtn.mouseClicked(() => {
        state = (state != isRunning) ? sourceTurn : isRunning;
    })
}

function initializeTargetButton() {
    let targetBtn = createButton('Pick Target', '');
    createCol('row3', targetBtn)

    targetBtn.mouseClicked(() => {
        state = (state != isRunning) ? targetTurn : isRunning;
    })
}

function initializeBlocksButton() {
    let blocksBtn = createButton('Pick Blocks');
    createCol('row3', blocksBtn)

    blocksBtn.mouseClicked(() => {
        state = (state != isRunning) ? blockTurn : isRunning;
    })
}

function initializeResetButton() {
    let resetBtn = createButton('Reset');
    createCol('row2', resetBtn);
    resetBtn.mouseClicked(() => reset(rowInput.value(), colInput.value()))
}

function initializeAlgorithmSelector() {
    algorithmSelector = createSelect();
    createCol('row3', algorithmSelector)

    algorithmSelector.position(10, 10);
    algorithmSelector.option('A*');
    algorithmSelector.option('BFS');
    algorithmSelector.selected('A*');
    algorithmSelector.position(0, 0, 'static')
}

function initializeRowColInput() {
    //row input
    let rowSpan = createSpan(' rows: ');
    rowInput = createSlider(5, 70, 20);
    let div1 = createDiv();
    rowSpan.parent(div1);
    rowInput.parent(div1);
    createCol('row3', div1)

    // col input
    let colSpan = createSpan(' colums:')
    colInput = createSlider(5, 70, 20);
    let div2 = createDiv();
    colSpan.parent(div2);
    colInput.parent(div2);
    createCol('row3', div2)
    // action listeners
    rowInput.changed(() => reset(parseInt(rowInput.value()), parseInt(colInput.value())))
    colInput.changed(() => reset(parseInt(rowInput.value()), parseInt(colInput.value())))
}