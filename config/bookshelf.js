var config = require('../knexfile');
var knex = require('knex')(config);
var bookshelf = require('bookshelf')(knex);

bookshelf.plugin('registry');
bookshelf.plugin('virtuals');
bookshelf.plugin('visibility');

if (process.env.NODE_ENV !== 'test' && process.env.CLIENT_ENV !== 'test') {
  knex.migrate.latest();
}

module.exports = bookshelf;
