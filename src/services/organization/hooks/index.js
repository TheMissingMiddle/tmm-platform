'use strict';

const hooks = require('feathers-hooks-common');
const joinTmmEmail = require('./join-tmm-email');
const setInitialStatus = require('./set-initial-status');
const validateUniqueEmail = require('./validate-unique-email');
const auth = require('feathers-authentication-hooks');
const globalHooks = require('../../../hooks');

exports.before = {
  all: [],
  find: [],
  get: [],
  create: [
    auth.restrictToAuthenticated(),
    setInitialStatus(),
    validateUniqueEmail(),
    hooks.setCreatedAt('createdAt')
  ],
  update: [
    hooks.disallow()
  ],
  patch: [
    hooks.setUpdatedAt('updatedAt')
  ],
  remove: []
};

exports.after = {
  all: [],
  find: [],
  get: [],
  create: [
    joinTmmEmail()
  ],
  update: [],
  patch: [],
  remove: []
};