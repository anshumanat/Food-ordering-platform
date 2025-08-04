import { NavLink } from 'react-router-dom';
import { FiShoppingCart, FiMenu, FiX, FiLock, FiTruck } from 'react-icons/fi';
import { useEffect, useState } from 'react';

export default function Navbar({ cartCount }) {
  const [isOpen, setIsOpen] = useState(false);
  const [lastOrderId, setLastOrderId] = useState(null);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Load and update tracker link when order is placed
  useEffect(() => {
    const updateTracker = () => {
      const storedOrderId = localStorage.getItem('last_order_id');
      setLastOrderId(storedOrderId || null);
    };

    updateTracker(); // on mount
    window.addEventListener('orderPlaced', updateTracker);

    return () => window.removeEventListener('orderPlaced', updateTracker);
  }, []);

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-wide">🍔 Foodie</h1>

        <button
          className="sm:hidden text-white text-2xl focus:outline-none"
          onClick={toggleMenu}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>

        <div className="hidden sm:flex items-center gap-6">
          <NavLinks closeMenu={closeMenu} lastOrderId={lastOrderId} />
          <CartButton cartCount={cartCount} />
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden mt-4 flex flex-col gap-4">
          <NavLinks closeMenu={closeMenu} lastOrderId={lastOrderId} />
          <CartButton cartCount={cartCount} />
        </div>
      )}
    </nav>
  );
}

function NavLinks({ closeMenu, lastOrderId }) {
  const linkStyle = ({ isActive }) =>
    isActive
      ? 'underline font-semibold text-blue-400'
      : 'hover:underline hover:text-blue-300';

  return (
    <>
      <NavLink to="/" onClick={closeMenu} className={linkStyle}>
        Home
      </NavLink>
      <NavLink to="/checkout" onClick={closeMenu} className={linkStyle}>
        Checkout
      </NavLink>

      {lastOrderId ? (
        <NavLink
          to={`/tracker/${lastOrderId}`}
          onClick={closeMenu}
          className={linkStyle}
        >
          <span className="inline-flex items-center gap-1">
            <FiTruck /> Tracker
          </span>
        </NavLink>
      ) : (
        <span className="text-gray-500 cursor-not-allowed">Tracker</span>
      )}

      <NavLink to="/admin-login" onClick={closeMenu} className={linkStyle}>
        <span className="inline-flex items-center gap-1">
          <FiLock /> Admin
        </span>
      </NavLink>
    </>
  );
}

function CartButton({ cartCount }) {
  return (
    <NavLink
      to="/cart"
      className="relative bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2 transition"
      title="Cart"
    >
      <FiShoppingCart className="text-lg" />
      <span>{cartCount}</span>
    </NavLink>
  );
}



