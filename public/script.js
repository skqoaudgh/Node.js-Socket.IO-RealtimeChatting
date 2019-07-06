const form = document.getElementById('form');
const input = document.getElementById('textcontrol');
const btn = document.getElementById('buttoncontrol');
const list = document.getElementById('list');
const nick = document.getElementById('nickcontrol');
const typing = document.getElementById('typing');
const clientlist = document.getElementById('clientlist');
const nickBtn = document.getElementById('nickbutton');

const socket = io();
let nickname = '';

function addChatting(msg) {
    const msgbox = document.createElement('li');
    msgbox.className = "chat";
    msgbox.innerHTML = nickname + ': ' + msg;
    list.appendChild(msgbox);
}

function reListing(list) {
    while(clientlist.hasChildNodes()) {
        clientlist.removeChild(clientlist.firstChild);
    }

    for(let key of Object.keys(list.clientList)) {
        const val = list.clientList[key];
        const client = document.createElement('li');
        client.innerHTML = val;
        clientlist.appendChild(client);
    }
}

input.addEventListener('keyup', (event) => {
    if(input.value.length > 0) {
        socket.emit('typing', nickname + ' is typing...');
    }
    else {
        socket.emit('typing', '');
    }
});

btn.addEventListener('click', (event) => {
    event.preventDefault();
    if(input.value == '') 
        return false;

    socket.emit('typing', '');
    socket.emit('chat message', input.value);
    addChatting(input.value);
    input.value = '';
    return false;
});

nickBtn.addEventListener('click', (event) => {
    event.preventDefault();
    nickname = nick.value;
    socket.emit('nick change', nickname);
});

window.addEventListener('load', (event) => {
    const num = Math.floor(Math.random() * 99999) + 1;
    nick.value = 'Guest' + num;
    nickname = nick.value;
    socket.emit('list in', nickname);
});

socket.on('chat message', (msg) => {
    addChatting(msg);
});

socket.on('info message', (msg) => {
    const msgbox = document.createElement('li');
    msgbox.className = "info";
    msgbox.innerHTML = msg;
    list.appendChild(msgbox);
});

socket.on('typing', (msg) => {
    typing.innerHTML = msg;
});

socket.on('list', (msg) => {
    reListing(msg);
});