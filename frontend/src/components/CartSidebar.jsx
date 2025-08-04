import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CartSidebar({ cart, onRemove, onClose, visible }) {
  const navigate = useNavigate();

  const clearCart = () => {
    localStorage.removeItem('cart');
    window.location.reload();
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div
      className={`fixed top-0 right-0 w-72 sm:w-80 h-full bg-white shadow-xl border-l border-gray-200 overflow-y-auto z-50 transition-transform duration-300 ease-in-out transform ${
        visible ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {/* ❌ Close button */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-400 hover:text-black text-xl focus:outline-none transition"
        title="Close Cart"
      >
        ✖
      </button>

      <div className="p-5">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">🛒 Your Cart</h2>

        {cart.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">Your cart is empty.</p>
        ) : (
          <>
            <ul className="space-y-4">
              {cart.map((item, index) => (
                <li key={index} className="flex justify-between items-start border-b pb-2">
                  <div>
                    <p className="font-semibold text-sm text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      ${item.price.toFixed(2)} × {item.quantity}
                    </p>
                  </div>
                  <button
                    onClick={() => onRemove(index)}
                    className="text-red-500 text-lg hover:scale-110 transition-transform"
                    title="Remove item"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>

            <div className="border-t mt-5 pt-4">
              <p className="font-semibold text-lg text-gray-800 mb-4">
                Total: <span className="text-blue-600">${total.toFixed(2)}</span>
              </p>

              <button
                onClick={() => navigate('/cart')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md mb-2 shadow-sm transition"
              >
                Checkout
              </button>

              <button
                onClick={clearCart}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md shadow-sm transition"
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}


