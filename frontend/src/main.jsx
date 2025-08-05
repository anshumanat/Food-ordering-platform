    import React from 'react';
    import { createRoot } from 'react-dom/client';
    import { BrowserRouter, Routes, Route } from 'react-router-dom';
    import MenuPage from './pages/index';
    import CartPage from './pages/cart'; 
    import CheckoutPage from './pages/checkout'; 
    import { Toaster } from 'react-hot-toast';
    import ConfirmationPage from './pages/confirmation';
    import TrackerPage from './pages/tracker/[id]';
    import AdminLogin from './pages/AdminLogin';
    import KitchenPage from './pages/kitchen/KitchenPage';
    import AnalyticsPage from './pages/AnalyticsPage';
    import './styles/tailwind.css';

    const container = document.getElementById('root');
    if (container) {
      createRoot(container).render(
        <>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MenuPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/confirmation" element={<ConfirmationPage />} />
              <Route path="/tracker/:id" element={<TrackerPage />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/kitchen" element={<KitchenPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
            </Routes>
          </BrowserRouter>
          <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
        </>
      );
    }

