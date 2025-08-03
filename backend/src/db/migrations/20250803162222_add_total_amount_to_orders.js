exports.up = function(knex) {
  return knex.schema.alterTable('orders', (table) => {
    table.decimal('total_amount', 10, 2);
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable('orders', (table) => {
    table.dropColumn('total_amount');
  });
};

