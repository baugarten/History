exports.server = require('./server');

exports.TestUtils = require('./test/server/utils');
exports.DbUtils = require('./test/server/db.utils');

var config = require('./knexfile');
exports.knex = require('knex')(config);
