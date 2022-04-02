class A_Star extends Search {
    constructor(maze) {
        super(maze);

        this.g = [
            []
        ]; // cost from start to node g(n)
        this.h = [
            []
        ]; // estimated cost from node to target h(n)
        this.initializeG()
        this.initializeH()
        this.pQueue = new PriorityQueue({
            comparator: (a, b) => {
                return (this.g[a.x][a.y] + this.h[a.x][a.y]) - (this.g[b.x][b.y] + this.h[b.x][b.y])
            }
        })
        this.initializeQueue()
    }
    initializeQueue() {
        this.pQueue.queue({
            x: this.maze.source.x,
            y: this.maze.source.y
        })
    }
    initializeG() {
        this.g = (new Array(this.maze.rows));
        for (let i = 0; i < this.g.length; i++)
            this.g[i] = new Array(this.maze.cols);

        for (let i = 0; i < this.g.length; i++) {
            for (let j = 0; j < this.g[i].length; j++) {
                this.g[i][j] = Infinity;
            }
        }
        this.g[this.maze.source.x][this.maze.source.y] = 0;
    }
    initializeH() {
        this.h = (new Array(this.maze.rows));
        for (let i = 0; i < this.h.length; i++)
            this.h[i] = new Array(this.maze.cols);

        for (let i = 0; i < this.h.length; i++) {
            for (let j = 0; j < this.h[i].length; j++) {
                this.h[i][j] = abs(this.maze.target.x - i) + abs(this.maze.target.y - j);
            }
        }

    }
    search() {
        if (this.maze.reachedTarget()) {
            this.renderGrid()
            return
        }
        if (this.pQueue.length == 0)
            return;
        const node = this.pQueue.dequeue()
        const i = node.x,
            j = node.y;
        this.cellsToRender.push({
            x: i,
            y: j
        });
        this.maze.grid[i][j].color = (this.maze.grid[i][j].color != sourceColor) ? visitedColor : sourceColor;
        const directions = [
            [0, 1],
            [1, 0],
            [-1, 0],
            [0, -1]
        ]
        for (const direction of directions) { // adding neighbours
            let x = i + direction[0],
                y = j + direction[1];
            if (x < 0 || y < 0 || x >= this.maze.rows || y >= this.maze.cols || [unvisitedColor, targetColor].indexOf(this.maze.grid[x][y].color) == -1)
                continue;
            this.maze.grid[x][y].parent = {
                x: i,
                y: j
            };
            this.g[x][y] = min(this.g[x][y], this.g[i][j] + 1)
            if (this.maze.reachedTarget()) {
                this.showPath();
                this.renderGrid();
                return;
            }
            this.maze.grid[x][y].color = exploredColor;
            this.cellsToRender.push({
                x: x,
                y: y
            });
            this.pQueue.queue({
                x: x,
                y: y
            });
        }
        this.renderGrid()

    }

}