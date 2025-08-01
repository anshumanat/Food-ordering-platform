const db = require('../db');

module.exports = (wss) => async function updateOrderStatus(params) {
  const { orderId, status } = params;

  await db('orders')
    .where({ id: orderId })
    .update({ status, updated_at: new Date() });

  const order = await db('orders').where({ id: orderId }).first();
  const items = await db('order_items').where({ order_id: orderId });

  const payload = {
    ...order,
    items,
  };

  // Broadcast update to all clients (minimal payload for TrackerPage)
  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(
        JSON.stringify({
          type: 'order_updated',
          order:payload,
        })
      );
    }
  });

  return { status: 'ok' };
};

