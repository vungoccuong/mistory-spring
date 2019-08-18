import { w3cwebsocket as W3CWebSocket } from 'websocket';
import _ from 'lodash';
import { decode, encode } from './index';
import { message } from 'antd';
import Emitter from './socketEmitter';
export const connection = new W3CWebSocket('ws://localhost:3000');
const emitter = new Emitter();
connection.emitEvent = function(event, payload) {
	const data = encode({ event, payload });
	this.send(data);
};
connection.onEvent = function(event, cb = _.noop) {
	return emitter.listen(event, cb);
};
connection.onopen = () => {
	console.log('connection is opened');
	if (process.browser) {
		message.success('Kết nối thành công');
	}
};
connection.onerror = error => {
	console.log('Looxi', error.message);
	if (process.browser) {
		message.error('Kết nối thất bại');
	}
};
connection.onmessage = function(e) {
	const rawData = e.data;
	const data = decode(rawData);
	if (!data || !data.event) return;
	emitter.emit(data.event, data.payload);
};
