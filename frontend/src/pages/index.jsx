import React, { useEffect, useState,useRef } from 'react';
import MenuItemCard from '../components/MenuItemCard';
import { mockMenu } from '../mockMenu';
import Navbar from '../components/Navbar';
import CartSidebar from '../components/CartSidebar';
import { useNavigate } from 'react-router-dom';


export default function MenuPage() {
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  
  const hasShownSidebar = useRef(false);

  useEffect(() => {
    setMenu(mockMenu);
    const stored = localStorage.getItem('cart');
    if (stored) setCart(JSON.parse(stored));
  }, []);

const navigate = useNavigate();
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
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-4">Menu</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {menu.map((item) => (
            <MenuItemCard key={item.id} item={item} onAdd={addToCart} />
          ))}
        </div>
      </div>
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
          className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg z-20"
          title="Open Cart"
        >
          🛒
        </button>
      ) : null}
    </>
  );
}

