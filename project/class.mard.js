class Mard extends LivingCreature {
    constructor(x, y, gender) {
        super(x,y);
        this.multiply = 0;
        this.energy = 10;
        this.speed = Math.round(random(0, 2));
        this.speed2 = this.speed += 1;
        this.gender = gender;
        this.index = 5;
        console.log(this.gender);
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

        return this.directions;
    }

    // Override
    yntrelVandak(ch, ch1, ch2) {
        var found = [];
        var dire = this.stanalNorKordinatner();

        for (var i in dire) {
            var x = dire[i][0];
            var y = dire[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == ch || matrix[y][x] == ch1 || matrix[y][x] == ch2) {
                    found.push(dire[i]);
                }
            }
        }
        return found;
    }

    walk() {
        var find = random(this.yntrelVandak(2, 3, 4));
        var chooseSquare = random(this.yntrelVandak(0, 1));
        this.multiply++;
        if (find) {
            if (this.multiply >= this.speed2) {
                this.energy++;
                if (matrix[find[1]][find[0]] = 2) {
                    for (var i in xotakerArr) {
                        if (find[0] == xotakerArr[i].x && find[1] == xotakerArr[i].y) {
                            xotakerArr.splice(i, 1);
                            break;
                        }
                    }
                }
                else if (matrix[find[1]][find[0]] = 3) {
                    for (var j in gishatichArr) {
                        if (find[0] == gishatichArr[j].x && find[1] == gishatichArr[j].y) {
                            gishatichArr.splice(j, 1);
                            break;
                        }
                    }
                }
                else if (matrix[find[1]][find[0]] = 4) {
                    for (var k in shunArr) {
                        if (find[0] == shunArr[k].x && find[1] == shunArr[k].y) {
                            shunArr.splice(k, 1);
                            break;
                        }
                    }
                }

                matrix[find[1]][find[0]] = 5;
                matrix[this.y][this.x] = 0;
                this.x = find[0];
                this.y = find[1];
                this.multiply = 0;

            }
        }
        else if (chooseSquare && this.multiply >= this.speed) {
            this.energy--;
            matrix[chooseSquare[1]][chooseSquare[0]] = 5;
            matrix[this.y][this.x] = 0;
            this.x = chooseSquare[0];
            this.y = chooseSquare[1];
            this.multiply = 0;

        }
    }

    // Need to optimize
    // bazmanal() {
    //     this.multiply++;
    //     console.log(this.multiply);
    //
    //     var norVandak = random(this.yntrelVandak(0));
    //
    //     if (this.multiply >= 2 && norVandak) {
    //         var norXot = new Mard(norVandak[0], norVandak[1], this.gender);
    //         mardArr.push(norXot);
    //         matrix[norVandak[1]][norVandak[0]] = 1;
    //         this.multiply = 0;
    //     }
    // }

}