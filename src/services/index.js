'use strict';

const authentication = require('./authentication');
const user = require('./user');
const organization = require('./organization');
// const contact = require('./contact');
// const interaction = require('./interaction');
// const message = require('./message');
// const call = require('./call');

module.exports = function() {
	const app = this;
	app.configure(authentication);
	app.configure(user);
	app.configure(organization);
	// app.configure(contact);
	// app.configure(interaction);
	// app.configure(message);
	// app.configure(call);
};