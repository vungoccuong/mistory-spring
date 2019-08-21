const router = require('express').Router();
const mustAuth = require('../middlewares/must-auth');
const roomModel = require('../models/room');
const validateReq = require('../middlewares/validate-req');
const { body } = require('express-validator');
router.post('/', mustAuth, async (req, res) => {
	const user = req.user;
	const userId = user._id;
	const members = [userId];
	const existedRecord = await roomModel.findExistGroup(userId);
	let id;
	if (existedRecord) {
		id = existedRecord._id;
	} else {
		const record = await roomModel.create({
			members,
			creator: userId,
			type: 'group',
		});
		id = record._id;
	}
	res.send(id);
});
router.post(
	'/invite',
	mustAuth,
	[body('userId').isString(), body('roomId').isString()],
	validateReq,
	async (req, res) => {
		const { userId, roomId } = req.body;
		const user = req.user;
		const record = await roomModel.findOneAndUpdate(
			{
				$and: [
					{
						type: 'group',
					},
					{
						_id: require('mongoose').Types.ObjectId(roomId),
					},
					{
						members: user._id,
					},
				],
			},
			{
				$addToSet: { members: require('mongoose').Types.ObjectId(userId) },
			},
		);
		if (record) {
			res.send({ status: 'success' });
		} else {
			return res.status(403).send({ status: 'error' });
		}
	},
);
module.exports = router;
