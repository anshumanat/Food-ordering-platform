import React from 'react';

export default function MenuItemCard({ item, onAdd }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
      <img
        src={item.image_url}
        alt={item.name}
        className="w-40 h-60 object-cover rounded"
      />
      <h2 className="text-lg font-bold mt-4 text-center">{item.name}</h2>
      <p className="text-gray-600 text-center">${item.price.toFixed(2)}</p>
      <button
        onClick={() => onAdd(item)}
        className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add to Cart
      </button>
    </div>
  );
}

