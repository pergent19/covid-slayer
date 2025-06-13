import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold">🦠 Covid Slayer</h1>

        {user && (
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-white text-blue-600 font-bold flex items-center justify-center uppercase">
              <img src={user.avatar} alt="" />
            </div>

            <span className="font-medium hidden sm:block">
              {user.fullName}
            </span>

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md text-sm"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
