/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  // This block is for local machine
  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'postgres',
      password: 'admin1',
      database: 'food_ordering',
    },
    migrations: {
      directory: './src/db/migrations'
    },
    seeds: {
      directory: './src/db/seed'
    }
  },

  // This block is for live Render server
  production: {
    client: 'pg',
    connection: { 
      connectionString: process.env.DATABASE_URL, 
      ssl: { rejectUnauthorized: false }
    },
    migrations: {
      directory: './src/db/migrations'
    },
    seeds: {
      directory: './src/db/seed'
    }
  }

};
