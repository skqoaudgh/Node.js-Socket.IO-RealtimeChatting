const form = document.getElementById('form');
const input = document.getElementById('textcontrol');
const btn = document.getElementById('buttoncontrol');
const list = document.getElementById('list');

const socket = io();

btn.addEventListener('click', (event) => {
    event.preventDefault();
    socket.emit('chat message', input.value);
    input.value = '';
    return false;
});

socket.on('chat message', (msg) => {
    const msgbox = document.createElement('li');
    msgbox.innerHTML = msg; 
    list.appendChild(msgbox);
});