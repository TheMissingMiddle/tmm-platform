'use strict';

module.exports = function(options) {
	return function(hook) {
		hook.data.status = 'pending';
		return hook;
	};
};