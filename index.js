const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const http = require('http');
const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;
const onlyServer = process.env.OS === 'true';
const next = require('next');
const app = next({ dev, dir: './client' });
const handle = app.getRequestHandler();

async function start() {
	if (!onlyServer) {
		await app.prepare();
	}
	const expressServer = _initExpress();
	const httpServer = http.createServer(expressServer);
	require('./server/socket')(httpServer);
	httpServer.listen(port, () => {
		console.log(`server ready on : ${port}`);
	});
}
function _initExpress() {
	const server = express();
	_initBaseMiddleware(server);
	_initRouter(server);

	return server;
}
function _initBaseMiddleware(server) {
	server.use(logger('dev'));
	server.use(express.json());
	server.use(express.urlencoded({ extended: false }));
	server.use(cookieParser());
	server.use(express.static(path.join(__dirname, 'public')));
}
function _initRouter(server) {
	server.use('/v1', require('./server/routes'));
	if (!onlyServer) return;
	server.get('*', (req, res) => {
		return handle(req, res);
	});
}
start();
