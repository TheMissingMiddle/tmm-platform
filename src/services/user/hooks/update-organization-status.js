'use strict';

module.exports = function(options) {
	return function(hook) {
		if (hook.result.role === 'org') {
			return hook.app.service('organizations').find({
				query: {
					email: hook.data.email,
					status: 'pending'
				}
			}).then((organizations) => {
				return hook.app.service('organizations').patch(organizations[0]._id, {
					status: 'active',
					userId: hook.result._id
				}).then(() => hook)
				.catch((error) => {
					throw new Error(error)
				});
			});
		}
		return hook;
	};
};