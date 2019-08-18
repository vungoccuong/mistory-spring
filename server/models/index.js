const mongoose = require('mongoose');
require('./user');
require('./message');
require('./friend');
require('./post');
require('./comment');
require('./notification');
require('./room');
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, () => {
	console.log('mongodb connected');
});
module.exports = () => console.log('bootstrap mongodb');
