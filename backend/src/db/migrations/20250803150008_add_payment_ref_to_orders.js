exports.up = function(knex) {
  return knex.schema.table('orders', function (table) {
    table.text('payment_ref');
  });
};

exports.down = function(knex) {
  return knex.schema.table('orders', function (table) {
    table.dropColumn('payment_ref');
  });
};

