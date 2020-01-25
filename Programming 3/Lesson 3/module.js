module.exports = class Square {
    constructor(side) {
        this.side = side;
    }		
    getArea(side) {
        return this.side * this.side;
    }
};
