var config = require('./config').db;

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: config.host,
      database: config.database,
      user:     config.user,
      password: config.password
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './server/db/migrations'
    }
  },
  production: {
    client: 'pg',
    connection:  process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './server/db/migrations'
    }
  }
};
