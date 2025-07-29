import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MenuPage from './pages/index';
import CartPage from './pages/cart'; 
import './styles/tailwind.css';

function App() {
  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Hello, Food App!</h1>
    </div>
  );
}

const container = document.getElementById('root');
if (container) {
  createRoot(container).render(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<MenuPage />} />
      <Route path="/cart" element={<CartPage />} />
      {/* More routes will be added later like /checkout and /tracker/:id */}
    </Routes>
  </BrowserRouter>
  );
}
