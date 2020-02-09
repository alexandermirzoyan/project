//! Requiring modules  --  START
var Grass = require('./modules/class.grass');
var GrassEater = require('./modules/class.xotaker');
var Mard = require('./modules/class.mard');
var Gishatich = require('./modules/class.gishatich');
var Dog = require('./modules/class.shun');
let random = require('./modules/random');
//! Requiring modules  --  END


//! Setting global arrays  --  START
grassArr = [];
grassEaterArr = [];
mardArr = [];
gishatichArr = [];
dogArr = [];
matrix = [];
//! Setting global arrays  -- END


//! Creating MATRIX -- START
function matrixGenerator(matrixSize, grass, grassEater, mard, gishatich, dog) {
  for (let i = 0; i < matrixSize; i++) {
    matrix[i] = [];
    for (let o = 0; o < matrixSize; o++) {
      matrix[i][o] = 0;
    }
  }
  for (let i = 0; i < grass; i++) {
    let customX = Math.floor(random(matrixSize)); // 0-9
    let customY = Math.floor(random(matrixSize)); // 4
    matrix[customY][customX] = 1;
  }
  for (let i = 0; i < grassEater; i++) {
    let customX = Math.floor(random(matrixSize));
    let customY = Math.floor(random(matrixSize));
    matrix[customY][customX] = 2;
  }
  for (let i = 0; i < mard; i++) {
    let customX = Math.floor(random(matrixSize));
    let customY = Math.floor(random(matrixSize));
    matrix[customY][customX] = 3;
  }
  for (let i = 0; i < gishatich; i++) {
    let customX = Math.floor(random(matrixSize));
    let customY = Math.floor(random(matrixSize));
    matrix[customY][customX] = 4;
  }
  for (let i = 0; i < dog; i++) {
    let customX = Math.floor(random(matrixSize));
    let customY = Math.floor(random(matrixSize));
    matrix[customY][customX] = 5;
  }
}
matrixGenerator(15, 5, 5, 5, 5, 5);
//! Creating MATRIX -- END


//! SERVER STUFF  --  START
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const fs = require('fs');

app.use(express.static('.'));
app.get('/', (req, res) => {
  res.redirect('index.html');
});
// stats path
app.get('/stats', function (req, res) {
  res.redirect('stats.html');
});

server.listen(3000, () => {
  console.log("Example is running on port 3000")
});
//! SERVER STUFF END  --  END

function creatingObjects() {
  for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] == 1) {
        var grass = new Grass(x, y);
        grassArr.push(grass);
      }
      else if (matrix[y][x] == 2) {
        var grassEater = new GrassEater(x, y);
        grassEaterArr.push(grassEater);
      }
      else if (matrix[y][x] == 3) {
        let genderArr = ['male', 'female'];
        let randomFromGenderArray1 = genderArr[Math.floor(Math.random()*genderArr.length)];
        let randomFromGenderArray2 = genderArr[Math.floor(Math.random()*genderArr.length)];
        var mard = new Mard(x, y, randomFromGenderArray1, randomFromGenderArray2);
        mardArr.push(mard);
      }
      else if (matrix[y][x] == 4) {
        var gishatich = new Gishatich(x, y);
        grassEaterArr.push(gishatich);
      }
      else if (matrix[y][x] == 5) {
        var dog = new Dog(x, y);
        grassEaterArr.push(dog);
      }
    }
  }
}
creatingObjects();

let weather = 'Spring';
let weatherID = 1;
function changeWeather() {
  switch (weatherID) {
    case 1:
      weather = 'Summer';
      weatherID++;
      break;
    case 2:
      weather = 'Autumn';
      weatherID++;
      break;
    case 3:
      weather = 'Winter';
      weatherID++;
      break;
    case 4:
      weather = 'Spring';
      weatherID++;
      break;
    case 5:
      weatherID = 1;
      break;
  }
}

function game() {
  if (grassArr[0] !== undefined) {
    for (var i in grassArr) {
      grassArr[i].bazmanal();
    }
  }
  if (grassEaterArr[0] !== undefined) {
    for (var i in grassEaterArr) {
      grassEaterArr[i].sharjvel();
      grassEaterArr[i].utel();
      grassEaterArr[i].mah();
    }
  }
  if (mardArr[0] !== undefined) {
    for (var i in mardArr) {
      mardArr[i].walk();
      mardArr[i].bazmanal();
    }
  }
  if (gishatichArr[0] !== undefined) {
    for (var i in gishatichArr) {
      gishatichArr[i].sharjvel();
      gishatichArr[i].utel();
      gishatichArr[i].mah();
    }
  }
  if (dogArr[0] !== undefined) {
    for (var i in dogArr) {
      dogArr[i].sharjvel();
      dogArr[i].utel();
      dogArr[i].mah();
    }
  }

  let sendData = {
    matrix: matrix,
    weather: {
      weather: weather,
      weatherID: weatherID,
    }
  };

  let stats = {
    grassCount: 0,
    grassEaterCount: 0,
    personCount: 0,
    gishatichCount: 0,
    dogCount: 0,
  };

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      switch (matrix[i][j]) {
        case 1:
          stats.grassCount++;
          break;
        case 2:
          stats.grassEaterCount++;
          break;
        case 3:
          stats.personCount++;
          break;
        case 4:
          stats.gishatichCount++;
          break;
        case 5:
          stats.dogCount++;
          break;
      }
    }
  }

  fs.writeFile("statistics.json", JSON.stringify(stats), "utf-8", (error) => {
    if (error) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(error);
    }
  });

  //! Send data over the socket to clients who listens "data" and "statistics"
  io.sockets.emit("data", sendData);
  io.sockets.emit("statistics", stats);
}

function weatherSocket() {
  changeWeather();

  let sendData = {
    weather: {
      weather: weather,
      weatherID: weatherID,
    }
  };
  io.sockets.emit("weather", sendData);
}

io.on('connection', (socket) => {
  socket.on('event', (data) => {
    if (!data.hasOwnProperty(0)) {
      matrixGenerator(15, 15*15, 0, 0, 0, 0);
      let sendData = {
        matrix: matrix,
        weather: {
          weather: weather,
          weatherID: weatherID,
        }
      };
      io.sockets.emit("data", sendData);
    }
  })
})

setInterval(game, 1000);
setInterval(weatherSocket, 4000);