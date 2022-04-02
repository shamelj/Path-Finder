class Grid {

    constructor(rows, cols) {
        this.rows = rows
        this.cols = cols
        this.sideLength = min(int(height / rows), int(width / cols))
        this.grid = []
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
        if (this.source.x != -1) {
            this.grid[this.source.x][this.source.y].color = unvisitedColor
            this.grid[this.source.x][this.source.y].show()
        }
        this.source = {
            x: i,
            y: j
        };
        this.grid[i][j].color = sourceColor
    }
    setTarget(i, j) {
        if (this.target.x != -1) {
            this.grid[this.target.x][this.target.y].color = unvisitedColor
            this.grid[this.target.x][this.target.y].show()
        }
        this.target = {
            x: i,
            y: j
        };
        this.grid[i][j].color = targetColor
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
}