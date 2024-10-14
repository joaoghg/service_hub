require('dotenv').config();

module.exports = {
    client: 'pg',
    connection: {
      database: process.env.PGDATABASE,
      user:     process.env.PGUSER,
      password: process.env.PGPASSWORD
    },
    migrations: {
      tableName: 'knex_migrations'
    }
}