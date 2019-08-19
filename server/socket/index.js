const EventType = require('./eventTypes');
const roomModel = require('../models/room');
const messageModel = require('../models/message');
const _ = require('lodash');
const socketUtil = require('./utils/socket');
const authMiddleware = require('./middlewares/auth');
module.exports = wss => {
	wss.use(authMiddleware);
	wss.onEvent('connection', async ws => {
		await socketUtil.joinAllRoom(ws);
		ws.onEvent(EventType.MESSAGE, async data => {
			const { roomId, content } = data;
			const user = ws.user;
			const room = await roomModel.findByIdAndUserId(roomId, user._id);
			if (!room) return ws.close();
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
		ws.onEvent(EventType.TYPING, async data => {
			const user = ws.user;
			const { isTyping } = data;
			const roomId = data.room;
			const room = await roomModel.findByIdAndUserId(roomId, user._id).lean();
			if (!room) return ws.close();
			wss.emitToRoom(room._id.toString(), EventType.TYPING, {
				room: roomId,
				isTyping,
				username: user.username,
			});
		});
	});
};
