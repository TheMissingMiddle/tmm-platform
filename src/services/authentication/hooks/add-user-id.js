'use strict';

module.exports = function(options) {
	return function(hook) {
		// hook.params.payload.userId = hook.params.user._id;
		delete hook.params.user.password;
		hook.result.user = hook.params.user;
		return hook;
	};
};