import { writable } from 'svelte/store';

const messageStore = writable('{"action":"console","message":"connected to store"}');
const socket = new WebSocket('ws://localhost:8765');

// Connection opened
socket.addEventListener('open', function (event) {
	console.log("connected to pi baby server");
	sendMessage(JSON.stringify({action:"init"}))
});

// Listen for messages
socket.addEventListener('message', function (event) {
    messageStore.set(event.data);
});

const sendMessage = (message) => {
	if (socket.readyState <= 1) {
		socket.send(message);
	}
}


export default {
	subscribe: messageStore.subscribe,
	sendMessage
}
