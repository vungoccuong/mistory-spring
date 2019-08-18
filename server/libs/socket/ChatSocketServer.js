const EventEmitter = require('events').EventEmitter;
const WebSocketServer = require('ws').Server;
const _ = require('lodash');
const utils = require('./utils');

class ChatSocketServer extends WebSocketServer {
	constructor(server) {
		super({ noServer: true });
		this.server = server;
		this.eventer = new EventEmitter();
		this.middlewares = [];
		this._init();
	}
	_init() {
		this._polling();
		this._event();
		this._middleware();
	}
	_event() {
		this.on('connection', ws => {
			ws.initExtension();
			this.eventer.emit('connection', ws);
			this._initSocketEvent(ws);
		});
		this.on('error', e => {
			// throw e;
		});
	}
	_polling() {
		this.interval = setInterval(() => {
			this.clients.forEach(ws => {
				if (!ws.isAlive) return ws.terminate();
				ws.setNotAlive();
				ws.ping(_.noop);
			});
		}, 30000);
	}
	_middleware() {
		process.nextTick(() => {
			this.server.on('upgrade', (req, socket, head) => {
				console.log('upgrading.............');
				const mapping = {};
				this._run(req, socket, mapping, err => {
					if (err) {
						return socket.destroy();
					}
					console.log('middlewares  is all passed');
					this.handleUpgrade(req, socket, head, ws => {
						for (let key of Object.keys(mapping)) {
							ws[key] = mapping[key];
						}
						this.emit('connection', ws, req);
					});
				});
			});
		});
	}
	_run(req, socket, mapping, fn) {
		const fns = this.middlewares;
		if (!fns.length) return fn(null);
		function run(i) {
			fns[i](req, socket, mapping, function(err) {
				if (err) {
					return fn(err);
				}
				if (!fns[i + 1]) return fn(null);
				run(i + 1);
			});
		}

		run(0);
	}

	_initSocketEvent(ws) {
		ws.on('pong', ws.setIsAlive);
		ws.on('message', this._onMessage(ws));
	}
	_onMessage(ws) {
		return rawData => {
			let data = utils.decode(rawData);
			if (!data || typeof data != 'object') return;
			const { event, payload } = data;
			if (!event) return;
			ws.eventer.emit(event, payload, ws);
		};
	}

	broadcastEvent(event, payload) {
		this.clients.forEach(client => {
			if (client.isOpen()) {
				client.emitEvent(event, payload);
			}
		});
	}
	emitToRoom(room, event, payload) {
		this.clients.forEach(ws => {
			if (ws.isOpen() && ws.rooms.has(room)) {
				ws.emitEvent(event, payload);
			}
		});
	}
	onEvent(event, cb = _.noop) {
		this.eventer.on(event, cb);
	}
	use(fn) {
		this.middlewares.push(fn);
	}
}
module.exports = ChatSocketServer;
