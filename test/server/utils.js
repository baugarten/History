var seeds = require('../seeds/shows_seed');

exports.authToken = function() {
  return `Bearer ${seeds.user.generateToken()}`;
}

exports.user = function() {
  return seeds.user.fetch();
}
