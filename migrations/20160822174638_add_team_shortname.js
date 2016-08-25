
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('teams', function(table) {
      table.string('short_name').notNullable();
    })
  ]);
  
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('teams', function(table) {
      table.dropColumn('short_name');
    })
  ]);
};
