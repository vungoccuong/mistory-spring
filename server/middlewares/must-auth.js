const status = require('http-status');
module.exports = function(req, res, next) {
	if (req.isAuthenticated) {
		return next();
	}
	return res.status(status.UNAUTHORIZED).send({ message: 'Lỗi xác thực' });
};
