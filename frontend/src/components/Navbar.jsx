import { Link } from 'react-router-dom';

export default function Navbar({ cartCount }) {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between">
      <h1 className="text-xl font-bold">Foodie</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/checkout" className="hover:underline">Checkout</Link>
        <Link to="/tracker/123" className="hover:underline">Tracker</Link>
        <Link
          to="/cart"
          className="bg-blue-500 text-white rounded-full px-2 py-1 text-sm hover:bg-blue-600"
        >
          Cart: {cartCount}
        </Link>
      </div>
    </nav>
  );
}

