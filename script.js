// var grassArr = [];
// var xotakerArr = [];
// var gishatichArr = [];
// var shunArr = [];
// var mardArr = [];
// var n = 15;
// var m = 15;
// var side = 15;

// var matrix = [];

// function setup() {
//     frameRate(10);

//     for (var a = 0; a < m; a++) {
//         matrix[a] = [];
//     }

//     for (var i = 0; i < m; i++) {
//         for (var a = 0; a < n; a++) {
//             matrix[i][a] = Math.round(random(5));

//         }
//     }

//     createCanvas(matrix[0].length * side, matrix.length * side);
//     background('#acacac');

//     for (var y = 0; y < matrix.length; ++y) {
//         for (var x = 0; x < matrix[y].length; ++x) {

//             if (matrix[y][x] == 1) {
//                 var gr = new Grass(x, y);
//                 grassArr.push(gr);
//             }

//             if (matrix[y][x] == 2) {
//                 var xotker = new Xotaker(x, y);
//                 xotakerArr.push(xotker);
//             }

//             if (matrix[y][x] == 3) {
//                 var gishatich = new Gishatich(x, y);
//                 gishatichArr.push(gishatich);
//             }

//             if (matrix[y][x] == 4) {
//                 var shun = new Shun(x, y);
//                 shunArr.push(shun);
//             }

//             if (matrix[y][x] == 5) {
//                 let genderArr = ['male', 'female'];
//                 let randomFromGenderArray1 = genderArr[Math.floor(Math.random()*genderArr.length)];
//                 let randomFromGenderArray2 = genderArr[Math.floor(Math.random()*genderArr.length)];
//                 var mard = new Mard(x, y, randomFromGenderArray1, randomFromGenderArray2);
//                 mardArr.push(mard);
//             }

//         }

//     }

//     event = new Event(5);
//     event.boom();

// }

// function mouseClicked(event) {
//     console.log(event);
//     if (event.pageX <= n*m && event.pageY <= m*n) {
//         alert("right place")
//     }
// }

// function draw() {
//     for (var y = 0; y < matrix.length; y++) {
//         for (var x = 0; x < matrix[y].length; x++) {
//             if (matrix[y][x] == 1) {
//                 fill("green");
//                 rect(x * side, y * side, side, side);
//             }
//             else if (matrix[y][x] == 2) {
//                 fill("yellow");
//                 rect(x * side, y * side, side, side);
//             }
//             else if (matrix[y][x] == 0) {
//                 fill("#acacac");
//                 rect(x * side, y * side, side, side);
//             }

//             else if (matrix[y][x] == 3) {
//                 fill("black");
//                 rect(x * side, y * side, side, side);
//             }

//             else if (matrix[y][x] == 4) {
//                 fill("#F05D3D");
//                 rect(x * side, y * side, side, side);
//             }

//             else if (matrix[y][x] == 5) {
//                 fill("#F6E5C7");
//                 rect(x * side, y * side, side, side);
//             }

//         }
//     }

//     for (var i in grassArr) {
//         grassArr[i].bazmanal();
//     }

//     for (var i in xotakerArr) {
//         xotakerArr[i].sharjvel();
//         xotakerArr[i].utel();
//         xotakerArr[i].mah();
//     }

//     for (var i in gishatichArr) {
//         gishatichArr[i].sharjvel();
//         gishatichArr[i].utel();
//         gishatichArr[i].mah();
//     }

//     for (var i in shunArr) {
//         shunArr[i].sharjvel();
//         shunArr[i].utel();
//         shunArr[i].mah();
//     }

//     for (var i in mardArr) {
//         mardArr[i].walk();
//         // console.log(mardArr[i].gender);
//         mardArr[i].bazmanal();
//     }


// }

function mouseClicked() {
    var socket = io();
    socket.emit("event", { eventStatus: "start"});
}

//! Setup function fires automatically
function setup() {
    var socket = io();
    var side = 15;

    var matrix = [];

    socket.on("data", drawCreatures);
    socket.on("weather", drawWeather);

    function drawWeather(data) {
        switch (data.weather.weather) {
            case "Spring":
                document.getElementById("weather-name").innerText = "Spring";
                break;
            case "Summer":
                document.getElementById("weather-name").innerText = "Summer";
                break;
            case "Autumn":
                document.getElementById("weather-name").innerText = "Autumn";
                break;
            case "Winter":
                document.getElementById("weather-name").innerText = "Winter";
                break;
        }
    }

    function drawCreatures(data) {
        // Every 1 second by setInterval with socket we receive data

        matrix = data.matrix;
        createCanvas(matrix[0].length * side, matrix.length * side);
        background('#acacac');

        for (var i = 0; matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == 1) {
                    if (data.weather.weather === "Winter") {
                        fill('#B8F19F');
                    }
                    else if (data.weather.weather === "Spring") {
                        fill('green');
                    }
                    else if (data.weather.weather === "Summer") {
                        fill('#12EC0B');
                    }
                    else if (data.weather.weather === "Winter") {
                        fill('#849008');
                    }
                    rect(j * side, i * side, side, side);
                }
                else if (matrix[i][j] == 2) {
                    fill('yellow');
                    rect(j * side, i * side, side, side);
                }
                else if (matrix[i][j] == 3) {
                    fill('#F5F7A0');
                    rect(j * side, i * side, side, side);
                }
                else if (matrix[i][j] == 4) {
                    fill('black');
                    rect(j * side, i * side, side, side);
                }
                else if (matrix[i][j] == 5) {
                    fill('#F35916');
                    rect(j * side, i * side, side, side);
                }
            }
        }
    }
}