
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('invitations', function(table) {
      table.datetime('claimed_at');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('invitations', function(table) {
      table.dropColumn('claimed_at');
    })
  ])
};
  
