
// src/components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import UserMenu from './UserMenu';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container flex justify-between items-center py-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-heilkunst-green-light flex items-center justify-center">
            <Leaf className="h-6 w-6 text-heilkunst-green-dark" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-heilkunst-green-dark">Heilkunst-KI-Kompass</h1>
            <p className="text-xs text-gray-500">Natürliche Heilkunde, personalisiert für dich</p>
          </div>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-gray-700 hover:text-heilkunst-purple transition-colors">
            Home
          </Link>
          <Link to="/knowledge" className="text-gray-700 hover:text-heilkunst-purple transition-colors">
            Wissensbank
          </Link>
        </nav>
        
        <div className="flex items-center gap-2">
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
