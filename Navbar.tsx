import React from 'react';
import { ShoppingBag, Coffee, PlusCircle } from 'lucide-react';
import { APP_NAME } from '../constants';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  activeTab: 'shop' | 'admin';
  setActiveTab: (tab: 'shop' | 'admin') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onCartClick, activeTab, setActiveTab }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          <div className="flex items-center cursor-pointer" onClick={() => setActiveTab('shop')}>
            <div className="p-2 bg-cobalt-600 rounded-full mr-3">
              <Coffee className="h-6 w-6 text-white" />
            </div>
            <span className="font-serif text-2xl font-bold text-stone-800 tracking-wide">
              {APP_NAME}
            </span>
          </div>

          <div className="flex items-center space-x-8">
            <button 
              onClick={() => setActiveTab('shop')}
              className={`font-sans text-sm font-semibold tracking-wider transition-colors ${activeTab === 'shop' ? 'text-cobalt-600' : 'text-stone-500 hover:text-stone-800'}`}
            >
              OBCHOD
            </button>
            
            <button 
              onClick={() => setActiveTab('admin')}
              className={`flex items-center font-sans text-sm font-semibold tracking-wider transition-colors ${activeTab === 'admin' ? 'text-cobalt-600' : 'text-stone-500 hover:text-stone-800'}`}
            >
              <PlusCircle className="w-4 h-4 mr-1" />
              ADMIN (AI)
            </button>

            <button 
              onClick={onCartClick}
              className="relative p-2 text-stone-600 hover:text-cobalt-600 transition-colors"
            >
              <ShoppingBag className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};