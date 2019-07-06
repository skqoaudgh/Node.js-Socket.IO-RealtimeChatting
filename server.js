const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', (req, res ,next) => {
    res.sendFile(__dirname + '/views/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected!');
})

http.listen(3000, () => {
    console.log('express server is opened on port 3000');
});