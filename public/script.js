const form = document.getElementById('form');
const input = document.getElementById('textcontrol');
const btn = document.getElementById('buttoncontrol');
const list = document.getElementById('list');
const nick = document.getElementById('nickcontrol');

const socket = io();

function addChatting(msg) {
    const msgbox = document.createElement('li');
    msgbox.className = "chat";
    msgbox.innerHTML = nick.value+': '+msg; 
    list.appendChild(msgbox);
}

btn.addEventListener('click', (event) => {
    event.preventDefault();
    if(input.value == '') 
        return false;

    socket.emit('chat message', input.value);
    addChatting(input.value);
    input.value = '';
    return false;
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