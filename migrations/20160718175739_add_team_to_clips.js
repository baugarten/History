
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.withSchema('clips', function(table) {
      table.uuid('team_id').references('id').inTable('teams');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.withSchema('clips', function(table) {
      table.dropColumn('team_id');
    })
  ])
};
