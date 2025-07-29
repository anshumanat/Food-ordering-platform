import React from 'react';

export default function MenuItemCard({ item, onAdd }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6 flex flex-col items-center text-center gap-4 w-full max-w-[280px] h-[400px] mx-auto">
      
      {/* Image */}
      <img
        src={item.image_url}
        alt={item.name}
        className="rounded-xl object-cover w-full h-[180px] transform hover:scale-105 transition-transform"
      />

      {/* Title & Price */}
      <div className="flex flex-col items-center gap-1 px-2">
        <h2 title={item.name} className="text-lg font-semibold text-gray-800 line-clamp-2">{item.name}</h2>
        <p className="text-gray-600 text-base">${item.price.toFixed(2)}</p>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={() => onAdd(item)}
        className="mt-auto bg-blue-600 text-white text-sm px-5 py-2 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition"
      >
        Add to Cart
      </button>
    </div>
  );
}

