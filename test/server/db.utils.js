const knexCleaner = require('knex-cleaner');

exports.clean = function(knex) {
  if (process.env.DB_NAME.indexOf('test') === -1) {
    throw new Error(`Trying to clean non-test database: ${process.env.DB_NAME}`);
  }
  return knexCleaner.clean(knex, { ignoreTables: ['knex_migrations', 'knex_migrations_lock'] })
    .then(function() {
      return knex.migrate.latest();
    })
    .then(function() {
      return knex.seed.run();
    }).catch(console.err);
}

