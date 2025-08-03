const db = require('../db');

module.exports = () => async function confirmPayment(params) {
  const { orderId, paymentRef } = params;

  await db('orders')
    .where({ id: orderId })
    .update({
      payment_ref: paymentRef,   
      updated_at: new Date(),
    });

  return { status: 'paid' };
};

