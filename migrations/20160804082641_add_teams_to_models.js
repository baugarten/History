
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('teams', function(table) {
      table.uuid('account_id').references('id').inTable('accounts');
      table.dropColumn('name');
      table.string('short_name').notNullable();
      table.string('display_name').notNullable();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('teams', function(table) {
      table.dropColumn('account_id');
      table.dropColumn('short_name');
      table.dropColumn('display_name');
      table.string('name').notNullable();
    })
  ]);
};
