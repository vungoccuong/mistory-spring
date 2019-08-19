const mongoose = require('mongoose');
const { DOCKER, MONGO_URL, MONGO_DOCKER_URL } = process.env;
const docker = DOCKER === '1';
mongoose.connect(
	docker ? MONGO_DOCKER_URL : MONGO_URL,
	{ useNewUrlParser: true },
	() => {
		console.log('mongodb connected');
	},
);
module.exports = () => console.log('bootstrap mongodb');
module.exports.models = [
	require('./user'),
	require('./message'),
	require('./friend'),
	require('./post'),
	require('./comment'),
	require('./notification'),
	require('./room'),
];
