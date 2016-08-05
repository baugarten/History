const uuid = require('node-uuid');
const User = require('../../models/User')
const Team = require('../../models/Team')

var emailCounter = 0;
exports.userPassword = 'password';
exports.seed = function(knex, Promise) {
  return Promise.join(
    User.registerWithAccountAndTeam('Account Name', 'Test Team', 'User Name', `email${emailCounter++}@gmail.com`, exports.userPassword)
      .then(function(accountAndUser) {
        exports.user = accountAndUser.user;
        exports.account = accountAndUser.account;
        exports.team = accountAndUser.team;
      })
  );
};
