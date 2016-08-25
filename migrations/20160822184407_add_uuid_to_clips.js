
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('clips', function(table) {
      table.string('uuid', 45).notNullable();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('clips', function(table) {
      table.dropColumn('uuid');
    })
  ]);
};
