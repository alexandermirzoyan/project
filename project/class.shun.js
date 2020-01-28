class Shun extends LivingCreature {
    constructor(x, y) {
        super(x,y);
        this.index = 4;
    }

    stanalNorKordinatner() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    sharjvel() {

        var norVandak = random(this.yntrelVandak(0));

        if (norVandak) {
            matrix[this.y][this.x] = 0;

            this.x = norVandak[0];
            this.y = norVandak[1];

            matrix[this.y][this.x] = 4;

        }

    }

    utel() {
        var norVandak = random(this.yntrelVandak(3));

        if (norVandak && this.multiply >= 2) {

            matrix[norVandak[1]][norVandak[0]] = 2;
            matrix[this.y][this.x] = 0;
            this.x = norVandak[0];
            this.y = norVandak[1];
            this.energy++;

            for (var j in gishatichArr) {
                if (norVandak[0] == gishatichArr[j].x && norVandak[1] == gishatichArr[j].y) {
                    this.multiply = 0;
                    gishatichArr.splice(j, 1);
                    break;
                }
            }
        }

    }

    mah() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (var j in mardArr) {
                if (this.x == mardArr[j].x && this.y == mardArr[j].y) {
                    mardArr.splice(j, 1);
                    break;
                }
            }
        }
    }


}