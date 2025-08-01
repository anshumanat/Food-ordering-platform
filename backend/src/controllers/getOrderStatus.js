const db = require('../db');

module.exports = async function getOrderStatus(params) {
  const { orderId } = params;

  const order = await db('orders').where({ id: orderId }).first();
  if (!order) throw { code: 404, message: 'Order not found' };

  const items = await db('order_items').where({ order_id: orderId });

  return {
    ...order,
    items,
  };
};
