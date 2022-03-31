class Grid {

    constructor(rows, cols) {
        this.rows = rows
        this.cols = cols
        this.sideLength = 40
        this.grid = []
        this.source = {
            x: 0,
            y: 0
        };
        this.target = {
            x: rows - 1,
            y: cols - 1
        };
        this.queue = [
            []
        ]
        this.initializeQueue();
        this.initializeGrid();
        this.setSource(0, 0);
        this.setTarget(rows - 1, cols - 1);
    }

    initializeGrid() {
        this.grid = (new Array(this.rows));
        for (let i = 0; i < this.grid.length; i++)
            this.grid[i] = new Array(this.cols);

        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[i].length; j++) {
                this.grid[i][j] = new Cell(j * this.sideLength, i * this.sideLength, this.sideLength, 'darkgrey')
            }
        }
        this.initializeQueue();
    }
    initializeQueue() {
        this.queue = [
            [this.source.x, this.source.y]
        ];
    }
    setSource(i, j) {
        this.grid[this.source.x][this.source.y].color = 'darkgrey'
        this.source = {
            x: i,
            y: j
        };
        this.grid[i][j].color = 'lightgreen'
        this.initializeQueue();
    }
    setTarget(i, j) {
        this.grid[this.target.x][this.target.y].color = 'darkgrey'
        this.target = {
            x: i,
            y: j
        };
        this.grid[i][j].color = 'darkblue'
    }
    renderGrid() {
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[0].length; j++)
                this.grid[i][j].show();
        }
    }
    showPath(){
        if (!this.reachedTarget())
            return;
        for (let cells of this.grid)
            for (let cell of cells)
                if (cell.color!='brown')
                cell.color = 'darkgrey'
        let x= this.target.x, y = this.target.y;
        while (x!=-1){
            let parent = this.grid[x][y].parent
            this.grid[x][y].color = 'red';
            x= parent.x;
            y = parent.y;
        }
        this.setSource(this.source.x,this.source.y);
        this.setTarget(this.target.x, this.target.y);

    }
    singleBfsIteration() {
        if (this.reachedTarget())
            this.showPath()
        let q2 = []
        while (!this.reachedTarget() && this.queue.length > 0) { // iterate over all the cells on the current level only       
            const cell = this.queue.pop()
            if (cell[0] != this.source.x || cell[1] != this.source.y)
                this.grid[cell[0]][cell[1]].color = 'green'
            this.addNeighbours(cell[0], cell[1], q2);
        }
        this.queue = q2;
            
            
    }
    addNeighbours(i, j, q2) {
        const directions = [
            [0, 1],
            [1, 0],
            [-1, 0],
            [0, -1]
        ]
        for (const direction of directions) { // adding neighbours
            let x = i + direction[0],
                y = j + direction[1];
            if (x < 0 || y < 0 || x >= this.rows || y >= this.cols || this.grid[x][y].color != 'darkgrey' && this.grid[x][y].color != 'darkblue')
                continue;
            this.grid[x][y].parent = {
                x: i,
                y: j
            };
            if (this.reachedTarget())
                return;
            this.grid[x][y].color = 'yellow';
            q2.push([x, y]);
        }

    }
    reachedTarget() {
        return (this.grid[this.target.x][this.target.y].parent.x != -1)
    }


}