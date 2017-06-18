'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks-common');
const auth = require('feathers-authentication-hooks');
const local = require('feathers-authentication-local');
const validateUserRole = require('./validate-user-role');
const validatePendingInvitationStatus = require('./validate-pending-invitation-status');
const updateOrganizationStatus = require('./update-organization-status');

exports.before = {
  all: [],
  find: [],
  get: [],
  create: [
    local.hooks.hashPassword({
      passwordField: 'password'
    }),
    validateUserRole(),
    validatePendingInvitationStatus(),
    hooks.setCreatedAt('createdAt')
  ],
  update: [
    hooks.disallow()
  ],
  patch: [
    auth.restrictToAuthenticated(),
    auth.restrictToOwner({
      ownerField: '_id'
    }),
    local.hooks.hashPassword({
      passwordField: 'password'
    }),
    hooks.setUpdatedAt('updatedAt')
  ],
  remove: [
    auth.restrictToAuthenticated()
  ]
};

exports.after = {
  all: [],
  find: [],
  get: [],
  create: [
    hooks.discard('password'),
    updateOrganizationStatus()
  ],
  update: [],
  patch: [],
  remove: []
};