const EventType = require('./eventTypes');
const sessionParser = require('../shareds/sessionParser');
const userModel = require('../models/user');
const roomModel = require('../models/room');
const messageModel = require('../models/message');
const status = require('http-status');
const _ = require('lodash');
module.exports = wss => {
	wss.use(function(req, socket, mapping, done) {
		sessionParser(req, {}, async () => {
			const passport = req.session.passport || {};
			if (passport.user) {
				const id = passport.user;
				const user = await userModel.findById(id).lean();
				if (user) {
					mapping.user = user;
					done();
				} else {
					done('not found');
				}
			} else {
				done('not auth');
			}
		});
	});
	wss.onEvent('connection', ws => {
		joinAllRoom(ws);
		ws.onEvent(EventType.MESSAGE, async data => {
			const { roomId, content } = data;
			const user = ws.user;
			const room = await roomModel.findByIdAndUserId(roomId, user._id);
			if (!room) ws.close(status.NOT_FOUND);
			const message = await messageModel.createMessage(
				user.username,
				user._id,
				content,
				room._id,
			);
			room.lastMessage = message.id;
			await room.save();
			wss.emitToRoom(
				room._id.toString(),
				EventType.MESSAGE,
				_.pick(message, ['sender', 'date', 'content', '_id', 'room']),
			);
		});
	});
	async function joinAllRoom(ws) {
		const userId = ws.user._id;
		const records = await roomModel.find({ members: userId }, '_id');
		ws.join(records.map(record => record._id.toString()));
	}
};
