'use strict';

const hooks = require('feathers-hooks-common');
const auth = require('feathers-authentication');
const addUserId = require('./add-user-id');
const globalHooks = require('../../../hooks');

exports.before = {
  all: [],
  create: [
    auth.hooks.authenticate(['jwt', 'local'])
  ],
  remove: [
    auth.hooks.authenticate('jwt')
  ]
};

exports.after = {
  all: [],
  create: [
    addUserId()
  ],
  remove: []
};