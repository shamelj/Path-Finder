class Search {
    constructor(grid) {
        this.grid = grid;
    }
    singleSearchIteration() {}
    shouldntExplore(x, y) {
        return x < 0 || y < 0 || x >= this.grid.rows || y >= this.grid.cols || [unvisitedColor, targetColor].indexOf(this.grid.matrix[x][y].color) == -1;
    }
}