class A_Star extends Search {
    #g;
    #pQueue;
    constructor(maze) {
        super(maze);

        this.#g = [
            []
        ]; // cost from start to node g(n)
        
        this.#initializeG()
        this.#pQueue = new PriorityQueue({
            comparator: (a, b) => {
                let distA = this.#g[a.x][a.y] + this.#heuristic (a.x,a.y)*0.99;
                let distB = this.#g[b.x][b.y] + this.#heuristic (b.x,b.y)*0.99;
                return distA - distB;
            }
        })
        this.#initializeQueue()
    }
    #initializeQueue() {
        this.#pQueue.queue({
            x: this.grid.source.x,
            y: this.grid.source.y
        })
    }
    #initializeG() {
        this.#g = (new Array(this.grid.rows));
        for (let i = 0; i < this.#g.length; i++)
            this.#g[i] = new Array(this.grid.cols);

        for (let i = 0; i < this.#g.length; i++) {
            for (let j = 0; j < this.#g[i].length; j++) {
                this.#g[i][j] = Infinity;
            }
        }
        this.#g[this.grid.source.x][this.grid.source.y] = 0;
    }
    #heuristic (i,j){ // estimated cost function
        return abs(this.grid.target.x - i) + abs(this.grid.target.y - j);
    }
    singleSearchIteration() {
        if (this.grid.reachedTarget()) {
            this.grid.renderExplored()
            return
        }
        if (this.#pQueue.length == 0)
            return;
        const node = this.#pQueue.dequeue()
        const i = node.x,
            j = node.y;
        this.grid.cellsToRender.push({
            x: i,
            y: j
        });
        this.grid.matrix[i][j].color = (this.grid.matrix[i][j].color != sourceColor) ? visitedColor : sourceColor;
        this.#addNeighbours(i,j)
        this.grid.renderExplored()

    }
    #addNeighbours(i, j) {
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
            this.#g[x][y] = min(this.#g[x][y], this.#g[i][j] + 1)
            if (this.grid.reachedTarget()) {
                this.grid.showPath();
                this.grid.renderExplored();
                return;
            }
            this.grid.matrix[x][y].color = exploredColor;
            this.grid.cellsToRender.push({
                x: x,
                y: y
            });
            this.#pQueue.queue({
                x: x,
                y: y
            });
        }
    }

}