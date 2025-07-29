import { NavLink } from 'react-router-dom';
import { FiShoppingCart, FiMenu, FiX } from 'react-icons/fi';
import { useState } from 'react';

export default function Navbar({ cartCount }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-gray-900 text-white px-6 py-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">🍔 Foodie</h1>

        {/* Hamburger toggle (mobile only) */}
        <button
          className="sm:hidden text-white text-2xl focus:outline-none"
          onClick={toggleMenu}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Desktop Nav */}
        <div className="hidden sm:flex items-center gap-6">
          <NavLinks closeMenu={closeMenu} />
          <CartButton cartCount={cartCount} />
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="sm:hidden mt-4 flex flex-col gap-4">
          <NavLinks closeMenu={closeMenu} />
          <CartButton cartCount={cartCount} />
        </div>
      )}
    </nav>
  );
}

function NavLinks({ closeMenu }) {
  return (
    <>
      <NavLink
        to="/"
        onClick={closeMenu}
        className={({ isActive }) =>
          isActive ? 'underline font-medium' : 'hover:underline'
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/checkout"
        onClick={closeMenu}
        className={({ isActive }) =>
          isActive ? 'underline font-medium' : 'hover:underline'
        }
      >
        Checkout
      </NavLink>
      <NavLink
        to="/tracker/123"
        onClick={closeMenu}
        className={({ isActive }) =>
          isActive ? 'underline font-medium' : 'hover:underline'
        }
      >
        Tracker
      </NavLink>
    </>
  );
}

function CartButton({ cartCount }) {
  return (
    <NavLink
      to="/cart"
      className="relative bg-blue-500 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-600 flex items-center gap-1"
    >
      <FiShoppingCart className="text-lg" />
      <span>{cartCount}</span>
    </NavLink>
  );
}


