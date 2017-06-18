'use strict';

module.exports = function(options) {
	return function(hook) {
		if (['org', 'firm', 'expert'].indexOf(hook.data.role) === -1) {
			throw new Error('No user role especified.');
		}
		return hook;
	};
};