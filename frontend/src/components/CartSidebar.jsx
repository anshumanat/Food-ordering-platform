import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CartSidebar({ cart, onRemove, onClose,visible }) {
  const navigate = useNavigate();

  const clearCart = () => {
    localStorage.removeItem('cart');
    window.location.reload(); // Quick refresh for global state reset
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div
        className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg p-4 border-l border-gray-200 overflow-y-auto z-20 transition-transform duration-300 ${
          visible ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
      {/* ❌ Close button */}
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-black text-lg"
        title="Close Cart"
      >
        ❌
      </button>

      <h2 className="text-lg font-bold mb-4">Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500">Cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-3">
            {cart.map((item, index) => (
              <li key={index} className="border-b pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      ${item.price.toFixed(2)} × {item.quantity}
                    </p>
                  </div>
                  <button
                    onClick={() => onRemove(index)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    ✕
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <hr className="my-4" />
          <p className="font-bold mb-4">Total: ${total.toFixed(2)}</p>

          <button
            onClick={() => navigate('/cart')}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mb-2"
          >
            Go to Cart
          </button>

          <button
            onClick={clearCart}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
          >
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
}

