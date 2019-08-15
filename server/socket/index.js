const WebSocket = require('ws');
const WebSocketServer = WebSocket.Server;
const _ = require('lodash');
const uniqid = require('uniqid');
WebSocketServer.prototype.broadcastAll = function(data) {
	this.clients.forEach(ws => {
		if (ws.isOpen()) {
			ws.send(data);
		}
	});
};
WebSocketServer.prototype.sendToRoom = function(room, data) {
	this.clients.forEach(ws => {
		if (ws.isOpen() && ws.rooms.has(room)) {
			ws.send(data);
		}
	});
};
function heartBeat() {
	this.isAlive = true;
}
WebSocket.prototype.isAlive = true;
WebSocket.prototype.rooms = undefined;
WebSocket.prototype.id = undefined;
WebSocket.prototype.join = function(rooms) {
	rooms = Array.isArray(rooms) ? rooms : [rooms];
	this.rooms.push(...rooms);
};
WebSocket.prototype.initExtension = function() {
	this.id = uniqid();
	this.isAlive = true;
	this.rooms = new Set();
};
WebSocket.prototype.isOpen = function() {
	return this.readyState === WebSocket.OPEN;
};
function getJsonData(str) {
	try {
		return JSON.parse(str);
	} catch (e) {
		return false;
	}
}
module.exports = function(server) {
	const wss = new WebSocketServer({ server });
	wss.on('connection', function connection(ws) {
		ws.initExtension();
		ws.on('pong', heartBeat);
		ws.on('message', function(rawData) {
			const data = getJsonData(rawData);
			if (!data) return;
			const { event, payload } = data;
			wss.clients.forEach(function(client) {
				if (client.readyState === WebSocket.OPEN) {
					console.log(payload);
					// client.send(JSON.stringify(payload));
					// client.send(Buffer.from([1, 2, 3]));
					client.send(' sdfds');
				}
			});
		});
	});
	const interval = setInterval(() => {
		wss.clients.forEach(ws => {
			if (!ws.isAlive) return ws.terminate();
			ws.isAlive = false;
			ws.ping(_.noop);
		});
	}, 30000);
};
