class Xotaker extends LivingCreature {
    constructor(x, y) {
        super(x,y)
        this.energy = 8;
        this.index = 2;
        this.multiply = 1;
    }
    
    sharjvel() {
        var norVandak = random(this.yntrelVandak(0));

        if (norVandak) {
            matrix[this.y][this.x] = 0;

            this.x = norVandak[0];
            this.y = norVandak[1];

            matrix[this.y][this.x] = 2;

        }

    }

    utel() {

        var norVandak = random(this.yntrelVandak(1));
        this.multiply++;

        if (norVandak && this.multiply >= 2) {

            matrix[norVandak[1]][norVandak[0]] = 2;
            matrix[this.y][this.x] = 0;
            this.x = norVandak[0];
            this.y = norVandak[1];
            this.energy++;

            for (var j in grassArr) {
                if (norVandak[0] == grassArr[j].x && norVandak[1] == grassArr[j].y) {
                    this.multiply = 0;
                    grassArr.splice(j, 1);
                    break;
                }
            }
        }

    }

    mah() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (var j in xotakerArr) {
                if (this.x == xotakerArr[j].x && this.y == xotakerArr[j].y) {
                    xotakerArr.splice(j, 1);
                    break;
                }
            }
        }
    }

}