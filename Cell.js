class Cell {
    constructor(x, y,w, color) {
        this.x = x;
        this.y = y;
        this.w = w
        this.color = color
    }
    show() {
        stroke('#222222');
        strokeWeight(1);
        rectMode(CORNER)
        fill(this.color)
        square(this.x, this.y, this.w)
    }
}