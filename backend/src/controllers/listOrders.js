const db = require('../db');

//tested via postman
module.exports = async function listOrders(params) {
  const { email } = params;

  const orders = await db('orders')
    .modify((query) => {
      if (email) query.where('email', email);
    })
    .orderBy('created_at', 'desc');

  const result = [];

  for (const order of orders) {
    const items = await db('order_items').where('order_id', order.id);
    result.push({ ...order, items });
  }

  return result;
};
