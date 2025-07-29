import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function ConfirmationPage() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar cartCount={0} />
      <div className="max-w-xl mx-auto p-6 text-center">
        <h2 className="text-3xl font-bold text-green-600 mb-4">🎉 Order Confirmed!</h2>
        <p className="text-gray-700 mb-6">
          Thank you for your order! Your delicious food is being prepared and will be delivered soon.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded"
          >
            Back to Menu
          </button>

          <button
            onClick={() => navigate('/tracker/123')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded"
          >
            Track Order
          </button>
        </div>
      </div>
    </>
  );
}
