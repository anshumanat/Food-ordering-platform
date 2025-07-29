import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('cart');
    if (stored) setCart(JSON.parse(stored));
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
      <div className="p-6 px-4 max-w-2xl sm:max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">🛒 Your Cart</h2>

        {cart.length === 0 ? (
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Your cart is currently empty.</p>
            <button
              onClick={() => navigate('/')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <>
            <ul className="space-y-4">
              {cart.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center border-b pb-3"
                >
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      ${item.price.toFixed(2)} × {item.quantity}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(index)}
                    className="text-red-500 hover:text-red-700 text-lg"
                    title="Remove one item"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>

            <hr className="my-4" />

            <div className="flex justify-between items-center mb-4">
              <p className="text-lg font-bold">Total: ${total.toFixed(2)}</p>
              <span className="text-sm text-gray-500">
                {itemCount} item{itemCount > 1 ? 's' : ''}
              </span>
            </div>

            

            <div className="flex flex-wrap gap-3 justify-between sm:justify-end">
              <button
                onClick={clearCart}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Clear Cart
              </button>
              <button
                onClick={() => navigate('/')}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => navigate('/checkout')}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}


