class BFS extends Search {
    #queue;
    constructor(maze) {
        super(maze);
        this.#queue = [
            []
        ];
        this.#initializeQueue();
    }
    #initializeQueue() {
        this.#queue = [
            [this.maze.source.x, this.maze.source.y]
        ];
    }
    singleSearchIteration() {
        if (this.maze.reachedTarget()){
            this.maze.showPath()
            return
        }

        let q2 = []
        while (!this.maze.reachedTarget() && this.#queue.length > 0) { // iterate over all the cells on the current level only       
            const cell = this.#queue.pop()
            this.maze.cellsToRender.push({x:cell[0],y:cell[1]})
            if (cell[0] != this.maze.source.x || cell[1] != this.maze.source.y)
                this.maze.grid[cell[0]][cell[1]].color = visitedColor
            this.#addNeighbours(cell[0], cell[1], q2);
        }
        this.#queue = q2;
        this.maze.renderExplored();
    }
    #addNeighbours(i, j, q2) {
        const directions = [
            [0, 1],
            [1, 0],
            [-1, 0],
            [0, -1]
        ]
        for (const direction of directions) { // adding neighbours
            let x = i + direction[0],
                y = j + direction[1];
            if (this.shouldntExplore(x,y))
                continue;
            this.maze.grid[x][y].parent = {
                x: i,
                y: j
            };
            if (this.maze.reachedTarget())
                return;
            this.maze.grid[x][y].color = exploredColor;
            this.maze.cellsToRender.push({x:x,y:y})
            q2.push([x, y]);
        }

    }
}