import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('cart');
    if (stored) setCart(JSON.parse(stored) || []);
  }, []);

  const removeFromCart = (index) => {
    const updated = [...cart];
    const item = updated[index];

    if (item.quantity > 1) {
      updated[index] = { ...item, quantity: item.quantity - 1 };
    } else {
      updated.splice(index, 1);
    }

    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <Navbar cartCount={itemCount} />
      <div className="p-6 px-4 max-w-2xl sm:max-w-xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">🛒 Your Cart</h2>

        {cart.length === 0 ? (
          <div className="text-center mt-16">
            <p className="text-gray-500 text-lg mb-4">Your cart is currently empty.</p>
            <button
              onClick={() => navigate('/')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow transition"
            >
              🍽️ Browse Menu
            </button>
          </div>
        ) : (
          <>
            <ul className="space-y-5">
              {cart.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between gap-4 border-b pb-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image_url || '/placeholder.jpg'}
                      alt={item.name}
                      className="w-16 h-16 rounded-md object-cover border"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        ${item.price.toFixed(2)} × {item.quantity}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(index)}
                    className="text-red-500 hover:text-red-700 text-xl transition"
                    title="Remove one"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>

            <hr className="my-6" />

            <div className="flex justify-between items-center mb-6">
              <p className="text-xl font-semibold text-gray-800">
                Total: <span className="text-blue-600">${total.toFixed(2)}</span>
              </p>
              <span className="text-sm text-gray-500">
                {itemCount} item{itemCount !== 1 ? 's' : ''}
              </span>
            </div>

            <div className="flex flex-wrap gap-3 justify-end">
              <button
                onClick={clearCart}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow transition"
              >
                🗑️ Clear Cart
              </button>
              <button
                onClick={() => navigate('/')}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md transition"
              >
                🔙 Continue Shopping
              </button>
              <button
                onClick={() => navigate('/checkout')}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md shadow transition"
              >
                ✅ Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}


