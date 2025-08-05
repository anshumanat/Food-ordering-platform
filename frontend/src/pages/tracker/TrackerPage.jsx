import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { rpcCall } from '../../utils/rpcClient';
import { useWebSocket } from '../../hooks/useWebSocket';

const STAGES = [
  { key: 'pending', label: 'Pending', icon: '🕐' },
  { key: 'cooking', label: 'Cooking', icon: '🍳' },
  { key: 'out_for_delivery', label: 'Out for Delivery', icon: '🚚' },
  { key: 'delivered', label: 'Delivered', icon: '✅' },
];

export default function TrackerPage() {
  const { id } = useParams();
  const [status, setStatus] = useState('pending');
  const [paymentRef, setPaymentRef] = useState(null);

  // Fetch initial status
  useEffect(() => {
    rpcCall('getOrderStatus', { orderId: Number(id) })
      .then((data) => {
        if (data?.status) {
          setStatus(data.status);
          setPaymentRef(data.payment_ref || null);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch order status:', err);
      });
  }, [id]);

  //  WebSocket real-time updates
  useWebSocket('ws://localhost:4000/ws', {
    onMessage: (event) => {
      const msg = JSON.parse(event.data);
      if (
        (msg.type === 'order_updated' || msg.type === 'order_created') &&
        msg.order.id == id
      ) {
        setStatus(msg.order.status || 'pending');
        setPaymentRef(msg.order.payment_ref || null);
      }
    }
  });

  const currentIndex = STAGES.findIndex((s) => s.key === status);

  return (
    <>
      <Navbar cartCount={0} />
      <div className="p-6 max-w-2xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">📦 Tracking Order #{id}</h2>

        <p className="text-lg text-blue-600 font-semibold mb-2">
          Current Status: {status.replace(/_/g, ' ')}
        </p>

        {paymentRef && (
          <p className="text-green-600 text-sm mb-4 font-medium">
            ✅ Payment received (Ref: <code>{paymentRef}</code>)
          </p>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-between relative gap-6 sm:gap-2">
          {STAGES.map((stage, idx) => {
            const isActive = currentIndex >= idx;
            const isCurrent = currentIndex === idx;

            return (
              <div
                key={stage.key}
                className="flex-1 flex flex-col items-center relative min-w-[70px]"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center
                    text-xl font-bold z-10
                    ${isActive ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'}
                    ${isCurrent ? 'animate-pulse' : ''}`}
                  title={stage.label}
                >
                  {stage.icon}
                </div>

                <p className="text-xs mt-2 capitalize text-center">
                  {stage.label}
                </p>

                {idx < STAGES.length - 1 && (
                  <div
                    className={`absolute top-4 left-1/2 w-full h-1 
                      transform translate-x-4
                      z-0 transition-all duration-300
                      ${currentIndex > idx ? 'bg-blue-400' : 'bg-gray-300'}`}
                    style={{ width: '100%' }}
                  ></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}




