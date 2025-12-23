
import React, { useState, useEffect } from 'react';
import { View } from '../types';

interface NavbarProps {
  currentView: View;
  navigate: (view: View) => void;
  cartCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, navigate, cartCount }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Beranda', view: View.LANDING },
    { label: 'Belanja', view: View.SHOP },
    { label: 'Blog', view: View.BLOG },
    { label: 'Tentang Kami', view: View.ABOUT },
    { label: 'Kontak', view: View.CONTACT },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => navigate(View.LANDING)}
        >
          <div className="bg-blue-900 text-white p-2 rounded-lg">
            <i className="fas fa-microchip text-xl"></i>
          </div>
          <div>
            <h1 className={`font-bold text-xl leading-tight ${isScrolled ? 'text-blue-900' : 'text-slate-900'}`}>
              Bang Ipul
            </h1>
            <p className={`text-[10px] uppercase tracking-widest ${isScrolled ? 'text-slate-500' : 'text-slate-600'}`}>
              Service Elektronik
            </p>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.view}
              onClick={() => navigate(item.view)}
              className={`text-sm font-medium transition-colors hover:text-amber-600 ${
                currentView === item.view ? 'text-amber-600 font-bold' : 'text-slate-700'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="relative cursor-pointer" onClick={() => navigate(View.SHOP)}>
            <i className="fas fa-shopping-cart text-slate-700 hover:text-amber-600 transition-colors"></i>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <div className="relative" onClick={() => navigate(View.SHOP)}>
            <i className="fas fa-shopping-cart text-slate-700"></i>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl text-slate-700`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-slate-100 animate-slideDown">
          <div className="flex flex-col p-4 gap-4">
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => {
                  navigate(item.view);
                  setIsMobileMenuOpen(false);
                }}
                className={`text-left p-2 rounded-lg ${
                  currentView === item.view ? 'bg-slate-50 text-amber-600 font-bold' : 'text-slate-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
