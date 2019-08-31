const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
module.exports = async function(req, res, next) {
	const sid = req.cookies.sid;

	if (sid) {
		const decoded = jwt.verify(sid, '12345555555555551234555555555555555555');
		if (decoded && decoded.jti) {
			req.user = await userModel.findByUsername(decoded.jti);
		}
	}

	next();
};