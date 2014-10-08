var passport = require('passport');

module.exports = {
	login: function (req, res, next) {
		passport.authenticate('local', function (err, user) {
			console.log(user);
			if (err) {
				return next(err);
			}

			if (!user) {
				res.send({ success: false });
			}

			req.logIn(user, function (err) {
				if (err) {
					return next(err);
				}
				res.send({ success: true, user: user });
			});
		})(req, res, next);
	},
	logout: function (req, res, next) {
		req.logout();
		res.end();
	},
	isAuthenticated: function (req, res, next) {
		if (!req.isAuthenticated()) {
			res.status(403);
			res.end('Not Authenticated');
		}
		else {
			next();
		}
	},
	isInRole: function (role) {
		return function (req, res, next) {
			if (req.isAuthenticated() && req.user.roles.indexOf(role) > -1) {
				next();
			}
			else {
				res.status(403);
				res.end();
			}
		}
	}
}