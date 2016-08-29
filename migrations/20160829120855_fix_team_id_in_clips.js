
/**
 * This migration was needed because heroku didn't have a team_id column in the clips table
 * Adding a temporary migration just for heroku seemed to make the most sense.
 *
 * This column should get added as part of a previous migration.
 */
exports.up = function(knex, Promise) {
  return Promise.all([
    //knex.schema.table('clips', function(table) {
    //  table.uuid('team_id').notNullable().references('id').inTable('teams');
    //})
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    //knex.schema.table('clips', function(table) {
    //  table.dropColumn('team_id');
    //})
  ])
};

