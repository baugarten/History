var seeds = require('../seeds/test_seeds');

exports.authToken = function() {
  return `Bearer ${seeds.user.generateToken()}`;
}

exports.user = function() {
  return seeds.user;
}

exports.unhashedPassword = function() {
  return seeds.userPassword;
}

exports.defaultTeam = function() {
  return seeds.team;
};
