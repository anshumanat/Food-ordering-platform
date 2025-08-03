import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function AnalyticsPage() {
  const navigate = useNavigate();
  const [ordersToday, setOrdersToday] = useState(0);
  const [revenueToday, setRevenueToday] = useState(0);

  // Admin route protection
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token !== 'admin123') {
      navigate('/admin-login');
    }
  }, [navigate]);

  // WebSocket listener for real-time analytics
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:4000/ws');

    const fetchAnalytics = () => {
      fetch('http://localhost:4000/rpc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'getAnalytics',
          params: {},
          id: 1,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setOrdersToday(data.result.ordersToday);
          setRevenueToday(data.result.revenueToday);
        });
    };

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.type === 'analytics_update') {
        fetchAnalytics();
      }
    };

    // Initial fetch on mount
    fetchAnalytics();

    return () => ws.close();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin-login');
  };

  return (
    <>
      <Navbar cartCount={0} />
      <div className="p-6 max-w-2xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-6">📈 Admin Analytics</h2>

        <div className="space-y-4 mb-8">
          <div className="bg-white p-4 rounded shadow text-lg">
            🛒 Orders Today: <strong>{ordersToday}</strong>
          </div>
          <div className="bg-white p-4 rounded shadow text-lg">
            💰 Revenue Today: <strong>${revenueToday.toFixed(2)}</strong>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate('/kitchen')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            🔙 Kitchen Dashboard
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            🔒 Logout
          </button>
        </div>
      </div>
    </>
  );
}
