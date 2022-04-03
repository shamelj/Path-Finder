class BFS extends Search {
    #queue;
    constructor(grid) {
        super(grid);
        this.#queue = [
            []
        ];
        this.#initializeQueue();
    }
    #initializeQueue() {
        this.#queue = [
            [this.grid.source.x, this.grid.source.y]
        ];
    }
    singleSearchIteration() {
        if (this.grid.reachedTarget()){
            this.grid.showPath()
            return
        }

        let q2 = []
        while (!this.grid.reachedTarget() && this.#queue.length > 0) { // iterate over all the cells on the current level only       
            const cell = this.#queue.pop()
            this.grid.cellsToRender.push({x:cell[0],y:cell[1]})
            if (cell[0] != this.grid.source.x || cell[1] != this.grid.source.y)
                this.grid.matrix[cell[0]][cell[1]].color = visitedColor
            this.#addNeighbours(cell[0], cell[1], q2);
        }
        this.#queue = q2;
        this.grid.renderExplored();
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
            this.grid.matrix[x][y].parent = {
                x: i,
                y: j
            };
            if (this.grid.reachedTarget())
                return;
            this.grid.matrix[x][y].color = exploredColor;
            this.grid.cellsToRender.push({x:x,y:y})
            q2.push([x, y]);
        }

    }
}