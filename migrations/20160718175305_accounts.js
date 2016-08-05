
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('accounts', function(table) {
      table.uuid('id').primary();
      table.string('name').notNullable();
      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('accounts')
  ])
};
