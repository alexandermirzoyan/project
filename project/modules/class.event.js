module.exports = class Event {
    constructor(radius) {
        this.radius = radius;
    }

    boom() {
        console.log(this.radius);
    }
}