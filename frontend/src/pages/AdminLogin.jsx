import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (password === 'admin123') {
      localStorage.setItem('admin_token', 'admin123');
      navigate('/kitchen');
    } else {
      alert('Wrong password');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4 text-center">🔐 Admin Login</h2>
        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-3 py-2 mb-4 rounded"
        />
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600 mb-2"
        >
          Login
        </button>

        {/* NEW: Go to Menu Page Button */}
        <button
          onClick={() => navigate('/')}
          className="bg-gray-200 text-gray-800 w-full py-2 rounded hover:bg-gray-300"
        >
          🍔 Go to Menu Page
        </button>
      </div>
    </div>
  );
}

