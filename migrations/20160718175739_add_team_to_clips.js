
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('clips', function(table) {
      table.uuid('team_id').notNullable().references('id').inTable('teams');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('clips', function(table) {
      table.dropColumn('team_id');
    })
  ])
};
