
import React from 'react';
import { ShoppingBag, Search, Flame, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onCartClick }) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] px-4 sm:px-6 py-4 sm:py-6 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto atmos-glass px-4 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-xl border border-amber-100">
        <div className="flex items-center gap-4 cursor-pointer group">
          <img src="/dep.jpeg" alt="AtmosFood Logo" className="h-10 w-10 object-contain group-hover:scale-110 transition-transform" />
          <h1 className="text-xl font-serif font-black tracking-tight text-amber-950">
            Atmos<span className="text-amber-600 font-light italic">Food</span>
          </h1>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="sm:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-stone-50 hover:bg-stone-100 transition-colors"
          >
            <div className="w-5 h-5 flex flex-col justify-center gap-1">
              <span className={`block h-0.5 w-full bg-stone-700 transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`block h-0.5 w-full bg-stone-700 transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block h-0.5 w-full bg-stone-700 transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </div>
          </button>
          
          {/* Desktop buttons */}
          <button 
            onClick={() => navigate('/orders')}
            className="hidden sm:flex items-center gap-2.5 bg-stone-50 hover:bg-stone-100 px-6 py-3 rounded-xl transition-all text-stone-700 font-black text-[11px] uppercase tracking-[0.2em] border border-stone-100"
          >
            <Package size={16} />
            <span>Orders</span>
          </button>
          
          <button className="hidden sm:flex items-center gap-2.5 bg-amber-50 hover:bg-amber-100 px-6 py-3 rounded-xl transition-all text-amber-950 font-black text-[11px] uppercase tracking-[0.2em] border border-amber-100">
            <Search size={16} />
            <span>Search</span>
          </button>

          <button
            onClick={onCartClick}
            className="relative bg-orange-400 text-white flex items-center gap-2 sm:gap-3 px-4 sm:px-8 py-2.5 sm:py-3.5 rounded-xl transition-all hover:bg-black active:scale-95 group shadow-[0_10px_30px_rgba(69,26,3,0.2)]"
          >
            <ShoppingBag size={16} className="sm:w-5 sm:h-5" />
            <span className="hidden sm:inline text-[11px] font-black uppercase tracking-[0.3em]">Your Pack</span>
            {cartCount > 0 && (
              <span className="bg-amber-400 text-amber-950 text-[10px] font-black h-5 w-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile menu dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-4 right-4 mt-2 bg-white rounded-xl shadow-xl border border-amber-100 p-4 z-50 pointer-events-auto">
          <button 
            onClick={() => {
              navigate('/orders');
              setIsMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-3 bg-stone-50 hover:bg-stone-100 px-4 py-3 rounded-lg transition-all text-stone-700 font-black text-[11px] uppercase tracking-[0.2em] border border-stone-100 mb-2"
          >
            <Package size={16} />
            <span>My Orders</span>
          </button>
          
          <button className="w-full flex items-center gap-3 bg-amber-50 hover:bg-amber-100 px-4 py-3 rounded-lg transition-all text-amber-950 font-black text-[11px] uppercase tracking-[0.2em] border border-amber-100">
            <Search size={16} />
            <span>Search Food</span>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
