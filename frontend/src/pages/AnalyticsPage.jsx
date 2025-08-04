import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { rpcCall } from '../utils/rpcClient';
import { useWebSocket } from '../hooks/useWebSocket';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function AnalyticsPage() {
  const navigate = useNavigate();
  const [ordersToday, setOrdersToday] = useState(0);
  const [revenueToday, setRevenueToday] = useState(0);
  const [history, setHistory] = useState([]);

  // Admin auth check
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token !== 'admin123') {
      navigate('/admin-login');
    }
  }, [navigate]);

  // Fetch analytics initially and every 30 seconds
  const fetchAnalytics = () => {
    rpcCall('getAnalytics', {})
      .then((data) => {
        setOrdersToday(data.ordersToday || 0);
        setRevenueToday(data.revenueToday || 0);
        const now = new Date().toLocaleTimeString();
        setHistory((prev) => [
          ...prev.slice(-9),
          {
            time: now,
            orders: data.ordersToday || 0,
            revenue: data.revenueToday || 0,
          },
        ]);
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchAnalytics();
    const interval = setInterval(fetchAnalytics, 30000); // 30 sec
    return () => clearInterval(interval);
  }, []);

  useWebSocket('ws://localhost:4000/ws', {
    onMessage: (event) => {
      const msg = JSON.parse(event.data);
      if (msg.type === 'analytics_update') {
        fetchAnalytics();
      }
    },
  });

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin-login');
  };

  return (
    <>
      <Navbar cartCount={0} />
      <div className="p-4 max-w-3xl mx-auto min-h-screen">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          📊 Live Analytics
        </h2>

        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center text-center">
            <div className="text-4xl font-bold text-blue-600">{ordersToday}</div>
            <div className="mt-2 text-sm text-gray-500">Orders Today</div>
            <span className="mt-1 text-xs text-gray-400">🛒 Tracked in real-time</span>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center text-center">
            <div className="text-4xl font-bold text-green-600">
              ${revenueToday.toFixed(2)}
            </div>
            <div className="mt-2 text-sm text-gray-500">Revenue Today</div>
            <span className="mt-1 text-xs text-gray-400">💰 Includes all confirmed payments</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow mb-6">
          <h3 className="text-lg font-semibold mb-4">📈 Live Revenue Chart</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={history}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} />
              <Line type="monotone" dataKey="orders" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <button
            onClick={fetchAnalytics}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded shadow-sm text-sm"
          >
            🔄 Refresh Now
          </button>
          <button
            onClick={() => navigate('/kitchen')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow-sm text-sm"
          >
            🍳 Kitchen Dashboard
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow-sm text-sm"
          >
            🔒 Logout
          </button>
        </div>
      </div>
    </>
  );
}
