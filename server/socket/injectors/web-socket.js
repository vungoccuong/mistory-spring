const WebSocket = require('ws');
const uniqid = require('uniqid');
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
	this.rooms.add(this.id);
};
WebSocket.prototype.isOpen = function() {
	return this.readyState === WebSocket.OPEN;
};
WebSocket.prototype.setIsAlive = function() {
	this.isAlive = true;
};
WebSocket.prototype.setNotAlive = function() {
	this.isAlive = false;
};
module.exports = console.log('injected extension to WebSocket');
