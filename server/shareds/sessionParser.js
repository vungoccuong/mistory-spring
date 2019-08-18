const session = require('express-session');
module.exports = session({
	secret: 'hirosume',
	saveUninitialized: false,
	resave: true,
});
