var dotenv = require('dotenv');

dotenv.load();

module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL || {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  },
  migrations: {
    directory: `${__dirname}/migrations`
  }
};

if (process.env.NODE_ENV === 'test' || process.env.CLIENT_ENV === 'test') {
  module.exports.seeds = {
    directory: __dirname + '/test/seeds'
  }
}
