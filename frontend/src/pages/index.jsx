import React, { useEffect, useState, useRef } from 'react';
import MenuItemCard from '../components/MenuItemCard';
import Navbar from '../components/Navbar';
import CartSidebar from '../components/CartSidebar';
import { useNavigate } from 'react-router-dom';
import { rpcCall } from '../utils/rpcClient'; // Shared RPC call

export default function MenuPage() {
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const hasShownSidebar = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Load menu from backend
    rpcCall('getMenu', {})
      .then((data) => { 
        const sanitized = data.map((item) => ({
          ...item,
          price: Number(item.price),
        }));
        setMenu(sanitized);
      })
      .catch((err) => {
        console.error('Failed to fetch menu:', err);
        setMenu([]); // fallback to empty array
      });

   const stored = localStorage.getItem('cart');
   if (stored) {
     const rawCart = JSON.parse(stored);
     const sanitizedCart = rawCart.map((item) => ({
       ...item,
       price: Number(item.price),
     }));
     setCart(sanitizedCart);
   }
   
  }, []);

  const addToCart = (item) => {
    const existing = cart.find((i) => i.id === item.id);
    let updated;

    if (existing) {
      updated = cart.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      );
    } else {
      updated = [...cart, { ...item, quantity: 1 }];
    }

    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));

    if (!hasShownSidebar.current) {
      setShowSidebar(true);
      hasShownSidebar.current = true;
    }
  };

  const removeFromCart = (index) => {
    const updated = [...cart];
    const item = updated[index];

    if (item.quantity > 1) {
      updated[index] = { ...item, quantity: item.quantity - 1 };
    } else {
      updated.splice(index, 1);
    }

    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

return (
  <>
    <Navbar cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} />

    <main className="px-4 md:px-8 lg:px-12 py-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-blue-600 drop-shadow">
        🍽️ Explore Our Menu
      </h1>

      {menu.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No menu items available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {menu.map((item) => (
            <MenuItemCard key={item.id} item={item} onAdd={addToCart} />
          ))}
        </div>
      )}
    </main>

    {showSidebar && cart.length > 0 ? (
      <CartSidebar
        cart={cart}
        onRemove={removeFromCart}
        onClose={() => setShowSidebar(false)}
        visible={true}
      />
    ) : cart.length > 0 ? (
      <button
        onClick={() => setShowSidebar(true)}
        className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-2xl z-50 transition-transform hover:scale-110"
        title="Open Cart"
      >
        🛒
      </button>
    ) : null}
  </>
);
}


