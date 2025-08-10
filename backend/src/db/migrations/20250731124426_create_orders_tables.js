 
exports.up = function (knex) {
  return knex.schema
    .createTable('orders', (table) => {
      table.increments('id').primary();
      table.string('name');
      table.string('email');
      table.string('address');
      table.timestamps(true, true);
    })
    .createTable('order_items', (table) => {
      table.increments('id').primary();
      table.integer('order_id').references('orders.id').onDelete('CASCADE');
      table.string('item_name');
      table.integer('quantity');
      table.decimal('price', 8, 2);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('order_items')
    .dropTableIfExists('orders');
};

