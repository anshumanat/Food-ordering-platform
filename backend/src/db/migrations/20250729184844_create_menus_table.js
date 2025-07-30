/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('menus', function (table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.decimal('price', 8, 2).notNullable();
    table.string('image_url');
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('menus');
};
