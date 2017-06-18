'use strict';

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const dbService = require('feathers-mongodb');
const hooks = require('./hooks');
const memory = require('feathers-memory');

module.exports = function() {
  const app = this;
  function UserService() {
    this.find = (params) => app.service('tmm_users').find(params);
    this.get = (id, params) => app.service('tmm_users').get(id, params);
    this.create = (data, params) => app.service('tmm_users').create(data, params);
    this.update = (id, data, params) => app.service('tmm_users').update(id, data, params);
    this.patch = (id, data, params) => app.service('tmm_users').patch(id, data, params);
    this.remove = (id, params) => app.service('tmm_users').remove(id, params);
  };
  app.use('/users', new UserService());
  MongoClient.connect(app.get('mongodb')).then(db => {
    let options = {
      Model: db.collection('users')
    };
    app.use('/tmm_users', dbService(options));
    const userService = app.service('tmm_users');
    userService.before(hooks.before);
    userService.after(hooks.after);
  });
};