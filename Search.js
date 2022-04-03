class Search {
    constructor(maze) {
        this.maze = maze;
    }
    singleSearchIteration() {}
    shouldntExplore(x, y) {
        return x < 0 || y < 0 || x >= this.maze.rows || y >= this.maze.cols || [unvisitedColor, targetColor].indexOf(this.maze.grid[x][y].color) == -1;
    }
}