export default function MenuItemCard({ item, onAdd, isFirstItem }) {
  return (
     <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-5 flex flex-col items-center text-center gap-4 w-full max-w-[280px] h-[420px] mx-auto transform hover:scale-[1.02]">
      <div className="w-full h-[180px] rounded-xl overflow-hidden shadow-sm">
        <img
          loading={isFirstItem ? 'eager' : 'lazy'}
          src={item.image_url}
          alt={item.name}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="flex flex-col items-center gap-1 px-2">
        <h2 title={item.name} className="text-lg font-semibold text-gray-800 line-clamp-2">
          {item.name}
        </h2>
        <p className="text-gray-500 text-base tracking-wide">
          ${Number(item.price).toFixed(2)}
        </p>
      </div>

      <button
        onClick={() => onAdd(item)}
        className="mt-auto bg-blue-600 text-white text-sm px-5 py-2 rounded-full shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 transition duration-200"
      >
        Add to Cart
      </button>
    </div>
  );
}



