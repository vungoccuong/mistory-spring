require('./injectors');
const utils = require('./utils');
const ChatSocketServer = require('./ChatSocketServer');
let wss;
module.exports.init = function(server) {
	wss = new ChatSocketServer({ server });

	wss.eventer.on('message', (payload, ws) => {
		console.log(payload, ws.id);
		ws.send(JSON.stringify({ event: 'message', payload }));
	});
	return wss;
};
// module.exports = wss;
