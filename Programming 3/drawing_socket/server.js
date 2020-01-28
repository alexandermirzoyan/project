var express = require("express");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var data = [];

app.use(express.static("."));
app.get('/', (req,res) => {
    res.redirect('./index.html');
})

io.on('connection', (socket) => {
    for (var i in data) {
        io.sockets.emit("show drawing", data[i]);
    }
    socket.on("send drawing", (drawing) => {
        console.log(data);
        data.push(drawing);
        console.log(data);
        io.sockets.emit("show drawing", drawing);
    })
})

server.listen(3000, () => {
    console.log("Example is running on port 3000");
})