'use strict';

const local = require('feathers-authentication-local');
const jwt = require('feathers-authentication-jwt');
const auth = require('feathers-authentication');
const hooks = require('./hooks');

module.exports = function() {
	const app = this;
	const config = app.get('auth');
	app.configure(auth(config))
		.configure(local())
		.configure(jwt());
	const authService = app.service('authentication');
	authService.before(hooks.before);
	authService.after(hooks.after);
};