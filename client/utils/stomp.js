import SockJs from 'sockjs-client';
import * as StompJs from '@stomp/stompjs';
import _ from 'lodash';
import { message } from 'antd';
import Emitter from './socketEmitter';
import { ONLINE, TEXT, TYPING } from './stompEventType';

const sock = new SockJs('http://localhost:8080/ws');
const stompClient = StompJs.Stomp.over(sock);
const emitter = new Emitter();
let isInit = false;
stompClient.connect(
	{},
	function() {
		message.success('Đã kết nối tới stomp');
		onConnected.call(this);
	},
	function(err) {
		console.log(err);
	},
);
stompClient.queue = [];

function onConnected() {
	stompClient.subscribe('/user/queue/reply', function(payload) {
		const body = JSON.parse(payload.body);
		switch (body.type) {
			case 'ALL_ROOMS': {
				const rooms = body.rooms;
				initRoomListeners(rooms);
				break;
			}
			case ONLINE: {
				emitter.emit(ONLINE, body);
				break;
			}
			default: {
				return;
			}
		}
	});
	stompClient.send('/app/chat/room', {}, '{}');
	if (this.queue.length) {
		const queue = this.queue;
		this.queue = [];
		queue.forEach(e => {
			this.send(...e);
		});
	}
}

function initRoomListeners(rooms) {
	rooms.forEach(roomId => {
		stompClient.subscribe(`/topic/${roomId}`, function(payload) {
			const body = JSON.parse(payload.body);
			console.log(roomId, body);
			switch (body.type) {
				case TYPING: {
					emitter.emit(TYPING, { ...body, isTyping: body.typing, room: roomId });
					break;
				}
				case TEXT: {
					emitter.emit(TEXT, { room: roomId, ...body });
					break;
				}
				default: {
					console.log(body.type);
					return;
				}
			}
		});
	});
}

const oldSend = stompClient.send;
stompClient.send = function(destination, headers, body) {
	if (!this.connected) {
		this.queue.push([destination, headers, body]);
	} else {
		oldSend.call(this, destination, headers, body);
	}
};
stompClient.sendMessage = function(roomId, content) {
	this.send(`/app/chat/${roomId}/message`, {}, JSON.stringify({ content }));
};
stompClient.sendTyping = function(room, isTyping) {
	this.send(`/app/chat/${room}/typing`, {}, JSON.stringify({ isTyping, typing: isTyping }));
};
stompClient.checkIsOnline = function(username) {
	this.send(`/app/online`, {}, JSON.stringify({ username }));
};
stompClient.onEvent = function(event, cb = _.noop) {
	emitter.listen(event, cb);
	return this;
};
stompClient.dispose = function() {
	emitter.dispose();
};

export function getStompConnection() {
	if (!isInit) {
		isInit = true;
	}
	return stompClient;
}
