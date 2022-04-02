class Search {
    constructor(maze) {
        this.maze = maze;
        this.cellsToRender = [];
    }

    search() {}
    renderGrid(){
        for (let i = this.cellsToRender.length-1;i>=0;i--){
            const cell = this.cellsToRender[i];
            this.maze.grid[cell.x][cell.y].show();
            this.cellsToRender.pop()
        }

    }

    showPath() {
        if (!this.maze.reachedTarget())
            return;

        let x = this.maze.target.x,
            y = this.maze.target.y;
        while (x != -1) {
            this.cellsToRender.push({x:x,y:y})
            let parent = this.maze.grid[x][y].parent
            this.maze.grid[x][y].color = pathColor;
            this.maze.grid[x][y].show()
            x = parent.x;
            y = parent.y;
            
        }
        this.maze.setSource(this.maze.source.x, this.maze.source.y);
        this.maze.setTarget(this.maze.target.x, this.maze.target.y);




    }
}