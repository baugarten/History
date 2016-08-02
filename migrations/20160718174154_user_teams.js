
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('user_teams', function(table) {
      table.uuid('user_id').references('id').inTable('users');
      table.uuid('team_id').references('id').inTable('teams');
      table.boolean('is_admin').defaultTo(false);
      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('user_teams')
  ])
};
