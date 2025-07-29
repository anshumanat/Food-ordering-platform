import React from 'react';
import { createRoot } from 'react-dom/client';
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
  createRoot(container).render(<App />);
}
