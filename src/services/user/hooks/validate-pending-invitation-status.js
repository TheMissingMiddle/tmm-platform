'use strict';

module.exports = function(options) {
	return function(hook) {
		return hook.app.service('organizations').find({
			query: {
				email: hook.data.email,
				status: 'pending'
			}
		}).then((organizations) => {
			if (!organizations.length) {
				throw new Error('No pending invitation for provided email.');
			}
			return hook;
		});
	};
};