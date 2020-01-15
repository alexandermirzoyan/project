class Gishatich {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        //this.multiply = 1;
        this.energy = 2;
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
        this.index = 3;
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

    yntrelVandak(ch) {
        var found = [];
        for (var i in this.directions) {

            var x = this.directions[i][0];
            var y = this.directions[i][1];

            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == ch) {
                    found.push(this.directions[i]);
                }
            }
        }

        return found;

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