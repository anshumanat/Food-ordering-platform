import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { rpcCall } from '../../utils/rpcClient';
import { useWebSocket } from '../../hooks/useWebSocket';

export default function KitchenPage() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token !== 'admin123') {
      navigate('/admin-login');
    }
  }, [navigate]);

  useEffect(() => {
    rpcCall('listOrders', {})
      .then((data) => {
        const active = data?.filter((order) => order.status !== 'delivered');
        setOrders(active || []);
      })
      .catch(console.error);
  }, []);

  useWebSocket('ws://localhost:4000/ws', {
    onMessage: (event) => {
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
    },
  });

  const updateStatus = (orderId, status) => {
    rpcCall('updateOrderStatus', { orderId, status }).catch(console.error);
  };

  const acceptOrder = (orderId) => {
    rpcCall('acceptOrder', { orderId }).catch(console.error);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin-login');
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          🍳 Kitchen Dashboard
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => navigate('/analytics')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow text-sm"
          >
            🔍 Analytics
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow text-sm"
          >
            🔒 Logout
          </button>
        </div>
      </div>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500 mt-10 text-lg">No active orders.</p>
      ) : (
        <>
          {/* Table for Desktop */}
          <div className="hidden sm:block overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
                <tr>
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Items</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-t border-gray-200 hover:bg-gray-50 transition"
                  >
                    <td className="p-3 font-medium text-gray-800">{order.id}</td>
                    <td className="p-3">{order.name}</td>
                    <td className="p-3 text-xs text-gray-600 space-y-1">
                      {order.items.map((item, idx) => (
                        <div key={idx}>
                          {item.item_name || item.name} × {item.quantity}
                        </div>
                      ))}
                    </td>
                    <td className="p-3 capitalize">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          order.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : order.status === 'cooking'
                            ? 'bg-orange-100 text-orange-800'
                            : order.status === 'out_for_delivery'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {order.status.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="p-3">
                      {order.status === 'pending' ? (
                        <button
                          onClick={() => acceptOrder(order.id)}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs shadow"
                        >
                          Accept
                        </button>
                      ) : (
                        <select
                          className="border px-2 py-1 rounded text-xs bg-white shadow-sm"
                          value={order.status}
                          onChange={(e) => updateStatus(order.id, e.target.value)}
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

          {/* Card View for Mobile */}
          <div className="sm:hidden space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="font-bold text-gray-800">Order #{order.id}</span>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      order.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : order.status === 'cooking'
                        ? 'bg-orange-100 text-orange-800'
                        : order.status === 'out_for_delivery'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {order.status.replace(/_/g, ' ')}
                  </span>
                </div>
                <p className="text-sm text-gray-600">👤 {order.name}</p>
                <div className="text-sm text-gray-700">
                  {order.items.map((item, idx) => (
                    <div key={idx}>
                      • {item.item_name || item.name} × {item.quantity}
                    </div>
                  ))}
                </div>
                <div className="pt-2">
                  {order.status === 'pending' ? (
                    <button
                      onClick={() => acceptOrder(order.id)}
                      className="bg-green-500 w-full hover:bg-green-600 text-white py-2 rounded text-sm"
                    >
                      Accept
                    </button>
                  ) : (
                    <select
                      className="w-full border px-3 py-2 rounded text-sm"
                      value={order.status}
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                      disabled={order.status === 'delivered'}
                    >
                      <option value="cooking">Cooking</option>
                      <option value="out_for_delivery">Out for Delivery</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}



