module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/auth.db3"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations"
    }, // Migrations
    seeds: {
      directory: "./data/seeds"
    }, // Seeds
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done);
      }
    }
  } // Development Config Object
};
