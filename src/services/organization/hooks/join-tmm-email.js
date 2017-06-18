'use strict';

const mailgun = require('mailgun-js');

module.exports = function(options) {
  return function(hook) {
    const organization = hook.data;
    const mailSender = mailgun({
      apiKey: hook.app.get('mailgun').apiKey,
      domain: hook.app.get('mailgun').domain
    });
    let data = {
      from: 'The Missing Middle <support@themissingmiddle.org>',
      to: organization.email,
      subject: `The Missing Middle Invitation`,
      text: `The Missing Middle invites ${organization.name} to use its online platform. Please use the following link to set up your organization's portal: ${hook.app.get('host')}/new-organization.`
    };
    return Promise.resolve().then(() => {
      mailSender.messages().send(data, (error, body) => {
        if (error) {
          console.log(error);
          // throw new Error(error);
        }
        return hook;
      });
    });
  };
};