
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('clips', function(table) {
      table.uuid("id").primary();
      table.uuid("creator_id").notNullable().references("id").inTable("users");
      table.string('clip', 2048).notNullable();
      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('clips')
  ])
};

