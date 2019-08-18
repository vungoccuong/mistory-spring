module.exports = function(server, app) {
	function checkLogin(unAuthPath) {
		return (req, res) => {
			if (req.isAuthenticated()) {
				return app.render(req, res, req.path);
			}
			return app.render(req, res, unAuthPath || '/login');
		};
	}
	server.get('/', checkLogin());
	server.get('/chat', checkLogin());
	server.get('/chat/:roomId', (req, res) => {
		if (!req.isAuthenticated()) {
			return app.render(req, res, '/login');
		}
		return app.render(req, res, req.path);
	});
	server.get('/login', checkLogin());
	server.get('/logon', checkLogin('/logon'));
};
