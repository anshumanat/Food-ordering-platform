import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { rpcCall } from '../utils/rpcClient';

export default function CheckoutPage() {
  const [cart, setCart] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', address: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('cart');
    if (stored) setCart(JSON.parse(stored));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.includes('@')) errs.email = 'Invalid email';
    if (!form.address.trim()) errs.address = 'Address is required';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);

      try {
        const order = await rpcCall('placeOrder', {
          name: form.name,
          email: form.email,
          address: form.address,
          cart,
        });

        if (order?.id) {
          await rpcCall('confirmPayment', {
            orderId: order.id,
            paymentRef: `demo_payment_${Date.now()}`,
          });

          toast.success('🎉 Order placed and payment confirmed!');
          localStorage.removeItem('cart');
          localStorage.setItem('last_order_id', order.id);
          window.dispatchEvent(new Event('orderPlaced'));

          navigate('/confirmation', {
            state: { orderId: order.id },
          });
        } else {
          toast.error('❌ Failed to place order.');
        }
      } catch (err) {
        console.error('Place order error:', err);
        toast.error('Something went wrong.');
      } finally {
        setLoading(false);
      }
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <Navbar cartCount={itemCount} />

      <div className="max-w-2xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6 text-center">🧾 Checkout</h2>

        {cart.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is currently empty.</p>
        ) : (
          <>
            {/* Cart Items */}
            <ul className="space-y-4 mb-6">
              {cart.map((item) => (
                <li key={item.id} className="flex items-center justify-between gap-4 border-b pb-2">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-14 h-14 rounded object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      ${item.price.toFixed(2)} × {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </li>
              ))}
            </ul>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>

              <div>
                <label className="block font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>

              <div>
                <label className="block font-medium mb-1">Address</label>
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
              </div>

              <div className="flex justify-between items-center pt-4 border-t mt-4">
                <span className="text-lg font-bold">Total: ${total.toFixed(2)}</span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 rounded text-white font-medium transition ${
                  loading
                    ? 'bg-blue-300 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
              >
                {loading ? 'Placing Order...' : 'Place Order'}
              </button>
            </form>
          </>
        )}
      </div>
    </>
  );
}


