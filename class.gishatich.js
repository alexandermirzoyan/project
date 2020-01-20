class Gishatich extends LivingCreature {
    constructor(x, y) {
        super(x,y);
        // this.multiply = 1;
        this.energy = 2;
        this.index = 3;
    }

    sharjvel() {
        var norVandak = random(this.yntrelVandak(0));

        if (norVandak) {
            matrix[this.y][this.x] = 0;

            this.x = norVandak[0];
            this.y = norVandak[1];

            matrix[this.y][this.x] = 3;

        }

    }

    utel() {
        var norVandak = random(this.yntrelVandak(1));

        if (norVandak >= 2) {

            matrix[norVandak[1]][norVandak[0]] = 2;
            matrix[this.y][this.x] = 0;
            this.x = norVandak[0];
            this.y = norVandak[1];
            this.energy++;

            for (var j in xotakerArr) {
                if (norVandak[0] == xotakerArr[j].x && norVandak[1] == xotakerArr[j].y) {
                    xotakerArr.splice(j, 1);
                    break;
                }
            }
        }
    }

    mah() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (var j in shunArr) {
                if (this.x == shunArr[j].x && this.y == shunArr[j].y) {
                    shunArr.splice(j, 1);
                    break;
                }
            }
        }
    }

}