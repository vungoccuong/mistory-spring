const EventEmitter = require('events').EventEmitter;
const WebSocketServer = require('ws').Server;
const _ = require('lodash');
const utils = require('./utils');
class ChatSocketServer extends WebSocketServer {
	constructor(options, callback) {
		super(options, callback);
		this.eventer = new EventEmitter();
		this._initPolling();
		this.initEvent();
	}
	initEvent() {
		this.on('connection', ws => {
			ws.initExtension();
			ws.on('pong', ws.setIsAlive);
			ws.on('message', rawData => {
				const data = utils.getJsonData(rawData);
				if (!data) return;
				const { event, payload } = data;
				this.eventer.emit(event, payload, ws);
			});
		});
		this.on('error', e => {
			throw e;
		});
	}
	_initPolling() {
		this.interval = setInterval(() => {
			this.clients.forEach(ws => {
				if (!ws.isAlive) return ws.terminate();
				ws.setNotAlive();
				ws.ping(_.noop);
			});
		}, 30000);
	}
	broadcastAll(data) {
		this.clients.forEach(client => {
			if (client.isOpen()) {
				client.send(data);
			}
		});
	}
	sendToRoom(room, data) {
		this.clients.forEach(ws => {
			if (ws.isOpen() && ws.rooms.has(room)) {
				ws.send(data);
			}
		});
	}
}
module.exports = ChatSocketServer;
