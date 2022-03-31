class Cell {
    constructor(x, y, w, color) {
        this.x = x;
        this.y = y;
        this.w = w
        this.parent={x:-1,y:-1};
        this.color = color
    }
    show() {
        stroke('#222222');
        strokeWeight(1);
        rectMode(CORNER)
        fill(this.color)
        //fill(random(255),random(255),random(255))
        square(this.x, this.y, this.w)
    }
}