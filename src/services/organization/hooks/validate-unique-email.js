'use strict';

module.exports = function(options) {
	return function(hook) {
		return hook.app.service('organizations').find({
			query: {
				email: hook.data.email
			}
		}).then((organizations) => {
			if (organizations.length) {
				throw new Error('Otganization E-mail already registered on the system.');
			}
			return hook;
		});
	};
};