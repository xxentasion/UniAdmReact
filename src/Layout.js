import React from 'react';
import Sidebar from './components/Sidebar';
import { Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

function Layout() {
  const { logout } = useAuth();

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* AppBar */}
        <header className="bg-white shadow-md py-4 px-6">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold">Приёмная комиссия</div>
            <button 
              className="bg-gray-800 text-white px-4 py-2 rounded"
              onClick={logout}
            >
              Выйти
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 bg-gray-100 overflow-y-scroll">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
