import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function KitchenPage() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  // Admin auth check
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token !== 'admin123') {
      navigate('/admin-login');
    }
  }, [navigate]);

  // Fetch initial orders
  useEffect(() => {
    fetch('http://localhost:4000/rpc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'listOrders',
        params: {},
        id: 1,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const active = data.result.filter(
          (order) => order.status !== 'delivered'
        );
        setOrders(active);
      });
  }, []);

  // WebSocket live updates
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:4000/ws');

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);

      if (msg.type === 'order_created') {
        setOrders((prev) => [...prev, msg.order]);
      }

      if (msg.type === 'order_updated') {
        setOrders((prev) =>
          prev.map((order) =>
            order.id === msg.order.id ? msg.order : order
          )
        );
      }
    };

    return () => ws.close();
  }, []);

  const updateStatus = (orderId, status) => {
    fetch('http://localhost:4000/rpc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'updateOrderStatus',
        params: { orderId, status },
        id: Date.now(),
      }),
    });
  };

  const acceptOrder = (orderId) => {
    fetch('http://localhost:4000/rpc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'acceptOrder',
        params: { orderId },
        id: Date.now(),
      }),
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin-login');
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">🍳 Kitchen Dashboard</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
        >
          Logout
        </button>
      </div>

      {orders.length === 0 ? (
        <p>No active orders.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2">Order ID</th>
                <th className="p-2">Customer</th>
                <th className="p-2">Items</th>
                <th className="p-2">Status</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t">
                  <td className="p-2">{order.id}</td>
                  <td className="p-2">{order.name}</td>
                  <td className="p-2 text-xs">
                    {order.items.map((item, idx) => (
                      <div key={idx}>
                        {item.item_name || item.name} × {item.quantity}
                      </div>
                    ))}
                  </td>
                  <td className="p-2 capitalize">{order.status.replace(/_/g, ' ')}</td>
                  <td className="p-2">
                    {order.status === 'pending' ? (
                      <button
                        onClick={() => acceptOrder(order.id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs"
                      >
                        Accept
                      </button>
                    ) : (
                      <select
                        className="border px-2 py-1 rounded text-xs"
                        value={order.status}
                        onChange={(e) =>
                          updateStatus(order.id, e.target.value)
                        }
                        disabled={order.status === 'delivered'}
                      >
                        <option value="cooking">Cooking</option>
                        <option value="out_for_delivery">Out for Delivery</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}




