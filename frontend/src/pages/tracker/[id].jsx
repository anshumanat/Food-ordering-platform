import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';

export default function TrackerPage() {
  const { id } = useParams();

  return (
    <>
      <Navbar cartCount={0} />
      <div className="p-6 max-w-xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">📦 Tracking Order #{id}</h2>
        <p className="text-gray-600">
          This is a placeholder. Real-time tracking and updates will be implemented later.
        </p>
      </div>
    </>
  );
}
