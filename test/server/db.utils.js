
exports.clean = function(knex) {
  return knex.migrate.rollback()
    .then(function() {
      return knex.migrate.latest()
    }).then(function() {
      return knex.seed.run();
    }).catch(console.err);
}

