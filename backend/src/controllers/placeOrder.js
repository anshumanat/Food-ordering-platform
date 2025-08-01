const db = require('../db');

module.exports = (wss) => async function placeOrder(params) {
  const { name, email, address, cart } = params;

  // Insert into orders
  const [orderRow] = await db('orders')
    .insert({ name, email, address })
    .returning(['id', 'created_at', 'status']);

  const orderId = typeof orderRow === 'object' ? orderRow.id : orderRow;

  const items = cart.map((item) => ({
    order_id: orderId,
    item_name: item.name,
    quantity: Number(item.quantity),
    price: Number(item.price),
  }));

  await db('order_items').insert(items);

  const fullOrder = {
    id: orderId,
    name,
    email,
    address,
    status: orderRow.status || 'pending',
    created_at: orderRow.created_at || new Date().toISOString(),
    items: cart,
  };

  //  Emit WebSocket event to all connected clients
  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(JSON.stringify({
        type: 'order_created',
        order: fullOrder
      }));
    }
  });

  return fullOrder;
};



