
import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-heilkunst-green/20 bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Leaf className="h-6 w-6 text-heilkunst-green" />
          <Link to="/" className="font-serif text-xl font-semibold text-heilkunst-green-dark">
            Heilkunst-KI-Kompass
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-heilkunst-purple transition-colors">
            Home
          </Link>
          <Link to="/knowledge" className="text-sm font-medium hover:text-heilkunst-purple transition-colors">
            Wissensbank
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/">
            <Button variant="outline" className="hidden md:flex">
              Fragebogen starten
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
