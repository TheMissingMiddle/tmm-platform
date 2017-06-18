'use strict';

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const dbService = require('feathers-mongodb');
const hooks = require('./hooks');
const associateOrganizationProfile = require('./hooks/associate-organization-profile');

module.exports = function() {
  const app = this;
  MongoClient.connect(app.get('mongodb')).then(db => {
    let options = {
      Model: db.collection('organizations')
    };
    app.use('/organizations', dbService(options));
    app.use('/organization-terms-conditions', dbService({
      Model: db.collection('organization-terms-conditions')
    }));
    app.use('/organization-form', dbService({
      Model: db.collection('organization-form')
    }));
    app.use('/organization-profile', dbService({
      Model: db.collection('organization-profile')
    }));
    // app.use('/organization-field-options', dbService({
    //   Model: db.collection('organization-field-options')
    // }));
    const organizationService = app.service('organizations');
    organizationService.before(hooks.before);
    organizationService.after(hooks.after);
    const organizationProfileService = app.service('organization-profile');
    organizationProfileService.before({
      create: [
        associateOrganizationProfile()
      ]
    });
  });
};