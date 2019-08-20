const router = require('express').Router();
const mustAuth = require('../middlewares/must-auth');
const roomModel = require('../models/room');
const userModel = require('../models/user');
const status = require('http-status');
const { query } = require('express-validator');
const reqValidate = require('../middlewares/validate-req');
router.get('/', mustAuth, async (req, res) => {
	const user = req.user;
	const records = await roomModel
		.find({ members: user.id }, '-creator')
		.sort({ updatedAt: -1 })
		.populate('lastMessage')
		.populate('members', '-hashPassword -_id -updatedAt -createdAt')
		.lean();
	return res.send(records.map(r => ({ ...r, ...getRoomAliasAndAvt(r, user.username) })));
});
function getRoomAliasAndAvt(room, userName) {
	const members = room.members;
	if (room.type === 'inbox') {
		return _getInboxRoomAliasAndAvt(members, userName);
	} else {
		return _getGroupRoomAliasAndAvt(members, userName);
	}
}
function _getInboxRoomAliasAndAvt(members, userName) {
	let friend = members[0];
	for (let member of members) {
		if (member.username !== userName) {
			friend = member;
			break;
		}
	}
	return {
		name: friend.fullName,
		avatar: friend.fullName.substring(0, 2).toUpperCase(),
	};
}
function _getGroupRoomAliasAndAvt(members, userName) {
	const fullNames = members.filter(m => m.username !== userName).map(m => m.fullName);
	let name = fullNames.reduce((acc, fullName) => {
		const a = ' ' + fullName.toUpperCase().charAt(0);
		return acc + a;
	}, '');
	return {
		avatar: name,
	};
}
router.get('/info/:id', mustAuth, async (req, res) => {
	const { id } = req.params;
	const user = req.user;
	const room = await roomModel.findByIdAndUserId(id, user.id);
	if (!room) {
		return res.status(status.NOT_FOUND).send({ message: 'Không tìm thấy phòng ' });
	}
	res.send(await _getInfoByType(room.type, room.members, user.id, room.id));
});
function _getInfoByType(type, members, userId, roomId) {
	if (type === 'group') {
		return _getGroupRoomInfo(members, roomId);
	} else {
		return _getInboxRoomInfo(members, userId);
	}
}
async function _getGroupRoomInfo(memberIds) {
	const members = await Promise.all(memberIds.map(id => _getInfo(id)));
	const name = members.reduce((acc, member) => {
		return acc + ' ' + member.fullName;
	}, '');
	return {
		type: 'group',
		members,
		name,
	};
}
async function _getInboxRoomInfo(members, userId) {
	const friend = await _getFriendInfo(members, userId);
	let name = friend.fullName;
	return {
		type: 'inbox',
		name,
		avatar: friend.avatar,
	};
}
function _getFriendInfo(members, userId) {
	const friendId = _getFriendId(members, userId);
	return _getInfo(friendId);
}
function _getFriendId(members, userId) {
	for (let member of members) {
		if (member !== userId) return member;
	}
	return null;
}
function _getInfo(id) {
	return userModel.findById(id, 'username fullName avatar').lean();
}
router.get(
	'/search',
	mustAuth,
	[
		query('text')
			.isString()
			.isLength({ max: 100 }),
	],
	reqValidate,
	async (req, res) => {
		const user = req.user;
		const userId = user._id;
		const { text } = req.query;
		if (!text) return res.send([]);
		const reg = new RegExp(text);
		const userRecords = await userModel
			.find({ $or: [{ username: reg }, { fullName: reg }] }, '_id fullName username')
			.limit(5)
			.lean();
		const populatedRoomRecords = await Promise.all(
			userRecords.map(async user => {
				user.room = await roomModel.findByAMemberId(user._id);
				return user;
			}),
		);
		return res.send([]);
	},
);
module.exports = router;
