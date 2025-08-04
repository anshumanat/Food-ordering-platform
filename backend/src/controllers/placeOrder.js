const db = require('../db');

module.exports = (wss) => async function placeOrder(params) {
  const { name, email, address, cart } = params;

  const totalAmount = cart.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0
  );

  // Insert into orders with total_amount
  const [orderRow] = await db('orders')
    .insert({
      name,
      email,
      address,
      total_amount: totalAmount,   // Add this
      status: 'pending',
      created_at: new Date()
    })
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

  // WebSocket events
  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(JSON.stringify({ type: 'order_created', order: fullOrder }));
      client.send(JSON.stringify({ type: 'analytics_update' }));
    }
  });

  return fullOrder;
};




