const db = require('../db');

module.exports = (wss) => async function acceptOrder({ orderId }) {
  // Update status
  await db('orders')
    .where({ id: orderId })
    .update({ status: 'cooking', updated_at: new Date() });

  // Fetch updated order
  const order = await db('orders').where({ id: orderId }).first();
  const items = await db('order_items').where({ order_id: orderId });

  const payload = { ...order, items };

  // Broadcast update
  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(
        JSON.stringify({
          type: 'order_updated',
          order: payload,
        })
      );
    }
  });

  return { status: 'cooking' };
};
