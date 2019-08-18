const mongoose = require('mongoose');
const schema = new mongoose.Schema(
	{
		sender: {
			type: String,
			required: true,
		},
		senderId: {
			type: mongoose.SchemaTypes.ObjectId,
			required: true,
			ref: 'user',
		},
		content: {
			type: mongoose.SchemaTypes.Mixed,
		},
		room: {
			type: mongoose.SchemaTypes.ObjectId,
		},
		date: {
			type: Date,
			default: () => new Date(),
		},
	},
	{},
);
schema.statics.findInRoom = function(roomId) {
	return this.find({ room: mongoose.Types.ObjectId(roomId) }, '-senderId -room').lean();
};
schema.statics.createMessage = function(sender, senderId, content, roomId) {
	return this.create({
		sender,
		senderId: mongoose.Types.ObjectId(senderId),
		content,
		room: mongoose.Types.ObjectId(roomId),
	});
};
module.exports = mongoose.model('message', schema);
