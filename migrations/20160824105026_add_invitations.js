
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('invitations', function(table) {
      table.string('code').notNullable().primary();
      table.uuid('from_user_id').notNullable().references('id').inTable('users');
      table.uuid('to_account_id').notNullable().references('id').inTable('accounts');
      table.string('to_email').notNullable();
      table.dateTime('sent_at').notNullable().defaultTo(knex.fn.now());
      table.dateTime('expires_at').notNullable();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('invitations')
  ])
};
