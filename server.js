const express = require('express');
const app = express();

server = app.listen(3001, function () {
    console.log('server is running on port 3000');
});

let bdd = [];

// console.log(se);

const io = require('socket.io')(server);

io.on('connection', function (socket) {
    socket.on('init', function (data) {
        data.socketId = socket.id
        bdd.push(data)
        console.log('bdd', bdd);
        socket.broadcast.emit('home', bdd)
    })
    socket.on('SEND_MESSAGE', (socketId, data) => {
        console.log(socketId, socket.id, data);
        socket.to(socketId).emit('SEND_MESSAGE', socket.id, data)
    })
}); 