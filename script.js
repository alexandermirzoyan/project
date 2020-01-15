var grassArr = [];
var xotakerArr = [];
var gishatichArr = [];
var shunArr = [];
var mardArr = [];
var n = 40;
var m = 40;
var side = 15;

var matrix = [];

function setup() {
    frameRate(10);

    for (var a = 0; a < m; a++) {
        matrix[a] = [];
    }

    for (var i = 0; i < m; i++) {
        for (var a = 0; a < n; a++) {
            matrix[i][a] = Math.round(random(5));

        }
    }

    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');

    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length; ++x) {

            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y);
                grassArr.push(gr);
            }

            if (matrix[y][x] == 2) {
                var xotker = new Xotaker(x, y);
                xotakerArr.push(xotker);
            }

            if (matrix[y][x] == 3) {
                var gishatich = new Gishatich(x, y);
                gishatichArr.push(gishatich);
            }

            if (matrix[y][x] == 4) {
                var shun = new Shun(x, y);
                shunArr.push(shun);
            }

            if (matrix[y][x] == 5) {
                var mard = new Mard(x, y);
                mardArr.push(mard);
            }

        }

    }

}

function draw() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill("green");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }

            else if (matrix[y][x] == 3) {
                fill("black");
                rect(x * side, y * side, side, side);
            }

            else if (matrix[y][x] == 4) {
                fill("#F05D3D");
                rect(x * side, y * side, side, side);
            }

            else if (matrix[y][x] == 5) {
                fill("#F6E5C7");
                rect(x * side, y * side, side, side);
            }

        }
    }

    for (var i in grassArr) {
        grassArr[i].bazmanal();
    }

    for (var i in xotakerArr) {
        xotakerArr[i].sharjvel();
        xotakerArr[i].utel();
        xotakerArr[i].mah();
    }

    for (var i in gishatichArr) {
        gishatichArr[i].sharjvel();
        gishatichArr[i].utel();
        gishatichArr[i].mah();
    }

    for (var i in shunArr) {
        shunArr[i].sharjvel();
        shunArr[i].utel();
        shunArr[i].mah();
    }

    for (var i in mardArr) {
        mardArr[i].walk();
    }


}

