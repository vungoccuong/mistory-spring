const mongoose = require('mongoose');
const schema = new mongoose.Schema(
	{
		name: {
			type: String,
		},
		members: {
			type: [
				{
					type: mongoose.SchemaTypes.ObjectId,
					ref: 'user',
				},
			],
			required: true,
		},
		creator: {
			type: mongoose.SchemaTypes.ObjectId,
			required: true,
			ref: 'user',
		},
		type: {
			type: String,
			enum: ['group', 'inbox'],
			default: 'inbox',
		},
		lastMessage: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: 'message',
		},
	},
	{
		timestamps: true,
	},
);
schema.statics.findByIdAndUserId = function(id, userId) {
	return this.findOne({
		_id: mongoose.Types.ObjectId(id),
		members: mongoose.Types.ObjectId(userId),
	});
};
schema.statics.isMember = async function(roomId, userId) {
	return !(await this.findByIdAndUserId(roomId, userId));
};

module.exports = mongoose.model('room', schema);
