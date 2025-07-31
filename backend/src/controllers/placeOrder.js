const db = require('../db');

//tested via postman
module.exports = async function placeOrder(params) {
  const { name, email, address, cart } = params;

  const [orderRow] = await db('orders')
    .insert({ name, email, address })
    .returning('id');

  const orderId = typeof orderRow === 'object' ? orderRow.id : orderRow;

  const items = cart.map((item) => ({
    order_id: orderId,
    item_name: item.name,
    quantity: Number(item.quantity),
    price: Number(item.price),
  }));

  await db('order_items').insert(items);

  return {
    orderId,
    name,
    email,
    address,
    items: cart,
    created_at: new Date().toISOString()
  };
};


