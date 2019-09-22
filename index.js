const dev = process.env.NODE_ENV !== 'production';
const express = require('express');
const http = require('http');
const port = process.env.PORT || 3000;
const next = require('next');
const app = next({ dev, dir: './client' });
const handle = app.getRequestHandler();
app.prepare().then(() => {
	_init();
});

function _init() {
	const expressServer = _initExpress();
	expressServer.nextApp = app;
	const httpServer = http.createServer(expressServer);
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
	server.use(
		'/spring',
		require('http-proxy-middleware')({
			target: 'http://localhost:8080',
			changeOrigin: true,
			secure: false,
		}),
	);
}

function _initRouter(server) {
	server.get('*', (req, res) => {
		return handle(req, res);
	});
}
