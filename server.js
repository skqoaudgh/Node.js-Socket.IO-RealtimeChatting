const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', (req, res ,next) => {
    res.sendFile(__dirname + '/views/index.html');
});

io.on('connection', (socket) => {
    socket.broadcast.emit('info message', 'someone connected');
    socket.on('disconnect', () => {
        socket.broadcast.emit('info message', 'someone disconnected');
    });
    socket.on('chat message', (msg) => {
        socket.broadcast.emit('chat message', msg);
    });
    socket.on('typing', (msg) => {
        socket.broadcast.emit('typing', msg);
    });
});

http.listen(3000, () => {
    console.log('express server is opened on port 3000');
});