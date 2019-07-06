const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

let clientList = {};

app.use(express.static('public'));

app.get('/', (req, res ,next) => {
    res.sendFile(__dirname + '/views/index.html');
});

io.on('connection', (socket) => {
    socket.broadcast.emit('info message', 'someone connected');
    socket.on('disconnect', (msg) => {
        socket.broadcast.emit('info message', 'someone disconnected');
        delete clientList[socket.id];
        socket.broadcast.emit('list', {clientList});
    });
    socket.on('chat message', (msg) => {
        socket.broadcast.emit('chat message', msg);
    });
    socket.on('typing', (msg) => {
        socket.broadcast.emit('typing', msg);
    });
    socket.on('list in', (msg) => {
        clientList[socket.id] = msg;
        io.emit('list', {clientList});
    });
    socket.on('nick change', (msg) => {
        delete clientList[socket.id];
        clientList[socket.id] = msg;
        io.emit('list', {clientList});
    });
});

http.listen(3000, () => {
    console.log('express server is opened on port 3000');
});