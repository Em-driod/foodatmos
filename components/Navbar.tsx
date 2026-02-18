
import React from 'react';
import { ShoppingBag, Search, Flame } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onCartClick }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] px-6 py-6 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto atmos-glass px-8 py-4 rounded-2xl shadow-xl border border-amber-100">
        <div className="flex items-center gap-4 cursor-pointer group">
          <img src="/dep.jpeg" alt="AtmosFood Logo" className="h-10 w-10 object-contain group-hover:scale-110 transition-transform" />
          <h1 className="text-xl font-serif font-black tracking-tight text-amber-950">
            Atmos<span className="text-amber-600 font-light italic">Food</span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button className="hidden sm:flex items-center gap-2.5 bg-amber-50 hover:bg-amber-100 px-6 py-3 rounded-xl transition-all text-amber-950 font-black text-[11px] uppercase tracking-[0.2em] border border-amber-100">
            <Search size={16} />
            <span>Search</span>
          </button>

          <button
            onClick={onCartClick}
            className="relative bg-orange-400 text-white flex items-center gap-3 px-8 py-3.5 rounded-xl transition-all hover:bg-black active:scale-95 group shadow-[0_10px_30px_rgba(69,26,3,0.2)]"
          >
            <ShoppingBag size={18} />
            <span className="text-[11px] font-black uppercase tracking-[0.3em]">Your Pack</span>
            {cartCount > 0 && (
              <span className="bg-amber-400 text-amber-950 text-[10px] font-black h-5 w-5 flex items-center justify-center rounded-full ml-1">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
