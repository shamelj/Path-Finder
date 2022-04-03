class Grid {

    constructor(rows, cols) {
        this.rows = rows
        this.cols = cols
        this.sideLength = min(int(height / rows), int(width / cols))
        this.grid = []
        this.cellsToRender = [];
        this.source = {
            x: -1,
            y: -1
        };
        this.target = {
            x: -1,
            y: -1
        };
        this.initializeGrid();

    }
    sourceIsPicked() {
        return this.source.x != -1;
    }
    targetIsPicked() {
        return this.target.x != -1;
    }
    getCellAt(i, j) {
        return this.grid[i][j]
    }

    initializeGrid() {
        this.grid = (new Array(this.rows));
        for (let i = 0; i < this.grid.length; i++)
            this.grid[i] = new Array(this.cols);

        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[i].length; j++) {
                this.grid[i][j] = new Cell(j * this.sideLength, i * this.sideLength, this.sideLength, unvisitedColor)
            }
        }
    }

    setSource(i, j) {
        if (this.#isTargetAt(i, j))
            return;
        if (this.source.x != -1) {
            this.grid[this.source.x][this.source.y].color = unvisitedColor
            this.grid[this.source.x][this.source.y].show()
        }
        this.source = {
            x: i,
            y: j
        };
        this.grid[i][j].color = sourceColor
        this.grid[i][j].show();
    }
    #isSourceAt(i, j) {
        return i == this.source.x && j == this.source.y;

    }
    #isTargetAt(i, j) {
        return i == this.target.x && j == this.target.y;
    }
    setTarget(i, j) {
        if (this.#isSourceAt(i, j))
            return;
        if (this.target.x != -1) {
            this.grid[this.target.x][this.target.y].color = unvisitedColor
            this.grid[this.target.x][this.target.y].show()
        }
        this.target = {
            x: i,
            y: j
        };
        this.grid[i][j].color = targetColor
        this.grid[i][j].show();
    }
    setBlock(i, j) {
        if (this.#isSourceAt(i,j) || this.#isTargetAt(i,j))
            return;
        this.getCellAt(i,j).color = blockColor;
        this.getCellAt(i,j).show();
    }
    renderGrid() {
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[0].length; j++)
                this.grid[i][j].show();
        }
    }
    reachedTarget() {
        return (this.grid[this.target.x][this.target.y].parent.x != -1)
    }
    showPath() {
        if (!this.reachedTarget())
            return;

        let x = this.target.x,
            y = this.target.y;
        while (x != -1) {
            this.cellsToRender.push({
                x: x,
                y: y
            })
            let parent = this.grid[x][y].parent
            this.grid[x][y].color = pathColor;
            this.grid[x][y].show()
            x = parent.x;
            y = parent.y;

        }
        this.setSource(this.source.x, this.source.y);
        this.setTarget(this.target.x, this.target.y);
    }
    renderExplored() {
        for (let i = this.cellsToRender.length - 1; i >= 0; i--) {
            const cell = this.cellsToRender[i];
            this.grid[cell.x][cell.y].show();
            this.cellsToRender.pop()
        }

    }
}