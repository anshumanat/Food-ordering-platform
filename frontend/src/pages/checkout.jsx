import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      setTimeout(() => {
        toast.success('🎉 Order placed successfully!');
        localStorage.removeItem('cart');
        navigate('/confirmation');
      }, 1200); // Simulate delay
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <Navbar cartCount={itemCount} />
     <div className="max-w-2xl sm:max-w-md mx-auto p-6 px-4">
        <h2 className="text-2xl font-bold mb-4">Checkout</h2>

        {cart.length === 0 ? (
          <p className="text-gray-600">🛒 Your cart is empty.</p>
        ) : (
          <>
            <ul className="text-sm text-gray-700 mb-4">
              {cart.map((item) => (
                <li key={item.id} className="flex justify-between">
                  <span>{item.name} × {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>

              <div>
                <label className="block font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>

              <div>
                <label className="block font-medium">Address</label>
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
              </div>

              <hr className="my-4" />
              <div className="text-right font-semibold">
                Total: ${total.toFixed(2)}
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 rounded text-white ${
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
