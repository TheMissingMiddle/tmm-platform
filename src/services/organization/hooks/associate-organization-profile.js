'use strict';

module.exports = function(options) {
	return function(hook) {
		return hook.app.service('organizations').find({
			query: {
				userId: hook.params.user._id
			}
		}).then((organizations) => {
			if (!organizations.length) {
				throw new Error('No valid organization.');
			}
			hook.data.organizationId = organizations[0]._id;
			return hook;
		});
	};
};