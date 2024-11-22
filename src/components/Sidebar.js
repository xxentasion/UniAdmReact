import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
  const pathname = useLocation().pathname;

  return (
    <nav className="w-64 bg-gray-800 text-white flex-shrink-0">
      <div className="p-4 text-2xl font-bold">ПГУ</div>
      <ul className="mt-6">
        <li className={`px-4 py-2 ${pathname === '/' ? 'bg-gray-700' : ''} hover:bg-gray-600`}>
          <Link to="/" className="block">Заявления</Link>
        </li>
        <li className={`px-4 py-2 ${pathname.startsWith('/programs') && 'bg-gray-700'} hover:bg-gray-600`}>
          <Link to="/programs" className="block">Программы</Link>
        </li>
        <li className={`px-4 py-2 ${pathname.startsWith('/faculties') && 'bg-gray-700'} hover:bg-gray-600`}>
          <Link to="/faculties" className="block">Факультеты</Link>
        </li>
        <li className={`px-4 py-2 ${pathname.startsWith('/profile') && 'bg-gray-700'} hover:bg-gray-600`}>
          <Link to="/profile" className="block">Профиль</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
