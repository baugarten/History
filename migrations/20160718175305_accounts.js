
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('accounts', function(table) {
      table.uuid('id').primary();
      table.string('name').notNullable();
      table.timestamps();
    }),
    knex.schema.withSchema('users', function(table) {
      table.uuid('account_id').references('id').inTable('accounts');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('accounts')
  ])
};
