const mongoose = require('mongoose');
const schema = new mongoose.Schema(
	{
		user: {
			type: mongoose.SchemaTypes.ObjectId,
			required: true,
		},
		closed: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	},
);
schema.statics.recordOnlineTime = async function(userId) {
	const user = mongoose.Types.ObjectId(userId);
	const currentOnlineRecord = await this.findOne({
		user,
		closed: false,
	}).lean();
	//if this user is online
	if (currentOnlineRecord) {
		return false;
	} else {
		currentOnlineRecord.closed = true;
		await currentOnlineRecord.save();
		await this.create({
			user,
		});
		await this.models['user'].findByIdAndUpdate(userId, { lastOnline: new Date() });
		return true;
	}
};
module.exports = mongoose.model('online', schema);
