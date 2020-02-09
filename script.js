//! Setup function fires automatically

function mouseClicked() {
    var socket = io();
    socket.emit("event", { eventStatus: "start"});
}

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