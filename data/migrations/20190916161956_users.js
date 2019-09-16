exports.up = function(knex) {
  return (
    knex.schema
      //! USERS
      .createTable("users", users => {
        users.increments();
        users
          .string("username", 128)
          .notNullable()
          .unique();
        users.string("password", 128).notNullable();
      })
  );
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
