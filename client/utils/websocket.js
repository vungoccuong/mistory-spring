import { w3cwebsocket as W3CWebSocket } from 'websocket';
export const connection = new W3CWebSocket('ws://localhost:3000');
connection.onopen = () => {
	console.log('connection is opened');
	connection.send('sdfds');
};
connection.onerror = error => {
	console.log('Looxi', error.message);
};
