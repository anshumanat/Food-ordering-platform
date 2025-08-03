const db = require('../db');
const { startOfToday } = require('date-fns');

module.exports = async function getAnalytics() {
  const today = startOfToday().toISOString();

  const orders = await db('orders')
    .where('created_at', '>=', today);

  const ordersToday = orders.length;
  const revenueToday = orders.reduce((sum, o) => sum + parseFloat(o.total_amount || 0), 0);

  return { ordersToday, revenueToday };
};
