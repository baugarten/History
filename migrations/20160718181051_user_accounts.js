
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('user_accounts', function(table) {
      table.uuid('user_id').references('id').inTable('users');
      table.uuid('account_id').references('id').inTable('accounts');
      table.boolean('is_admin').defaultTo(false);
      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', function(table) {
      table.uuid('account_id').references('id').inTable('accounts');
    }),
    knex.schema.dropTable('user_accounts')
  ])
};
