var uuid = require('node-uuid');
var User = require('../../models/User')

exports.seed = function(knex, Promise) {
  return Promise.join(
    User.registerWithAccount('Account Name', 'User Name', 'email@gmail.com', 'password')
      .then(function(accountAndUser) {
        exports.user = accountAndUser.user;
        exports.account = accountAndUser.account;
      })
  );
};
