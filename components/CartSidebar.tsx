
import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Flame } from 'lucide-react';
import { CartItem } from '../types';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, delta: number) => void;
  onRemove: (cartItemId: string) => void;
  onCheckout: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemove, onCheckout }) => {
  const getItemPriceWithProteins = (item: CartItem) => {
    const proteinTotal = item.selectedProteins?.reduce((sum, p) => sum + p.price, 0) || 0;
    return item.price + proteinTotal;
  };

  const subtotal = items.reduce((sum, item) => sum + (getItemPriceWithProteins(item) * item.quantity), 0);
  const deliveryFee = subtotal > 0 ? 1500 : 0;
  const total = subtotal + deliveryFee;

  return (
    <>
      <div
        className={`fixed inset-0 bg-amber-950/40 backdrop-blur-md z-[120] transition-opacity duration-700 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      <div className={`fixed right-0 top-0 bottom-0 w-full max-w-xl bg-white z-[130] shadow-[0_0_100px_rgba(0,0,0,0.1)] transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-10 border-b border-stone-100 flex items-center justify-between bg-amber-950 text-white">
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-white/10 rounded-xl text-amber-400">
              <ShoppingBag size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-serif font-black tracking-tight">Your Atmos Pack</h2>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-300">Curated Selection</p>
            </div>
          </div>
          <button onClick={onClose} className="w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-all">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-8 p-12">
              <div className="w-32 h-32 bg-amber-50 rounded-full flex items-center justify-center text-amber-200 border border-amber-100 animate-pulse">
                <ShoppingBag size={56} />
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-serif font-black text-amber-950">Empty Board</h3>
                <p className="text-stone-400 font-medium text-lg leading-relaxed">Your atmosphere is missing some heat. Head to the kitchen to begin your journey.</p>
              </div>
              <button
                onClick={onClose}
                className="bg-amber-950 text-white px-12 py-5 rounded-[2rem] font-black hover:bg-black transition-all shadow-2xl"
              >
                Start Packing
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {items.map((item) => (
                <div key={item.cartItemId} className="flex gap-8 group animate-reveal-up border-b border-stone-50 pb-8 last:border-0">
                  <div className="relative w-28 h-28 shrink-0 overflow-hidden rounded-[2rem] shadow-xl border border-stone-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-serif font-black text-xl text-amber-950 tracking-tight leading-none">{item.name}</h4>
                      <button
                        onClick={() => onRemove(item.cartItemId)}
                        className="text-stone-300 hover:text-red-500 transition-colors p-1"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    {/* Selected Proteins Badge List */}
                    {item.selectedProteins && item.selectedProteins.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {item.selectedProteins.map(p => (
                          <span key={p.id} className="bg-amber-50 text-[9px] font-black text-amber-800 uppercase px-2 py-0.5 rounded-full border border-amber-100">
                            + {p.name}
                          </span>
                        ))}
                      </div>
                    )}

                    <p className="text-amber-800 font-black text-base mb-4">₦{(getItemPriceWithProteins(item) * item.quantity).toLocaleString()}</p>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5 bg-amber-50 p-1 rounded-xl border border-amber-100">
                        <button
                          onClick={() => onUpdateQuantity(item.cartItemId, -1)}
                          className="w-8 h-8 flex items-center justify-center bg-white rounded-lg hover:bg-amber-100 text-amber-600 transition-colors shadow-sm"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="font-black text-xs w-6 text-center text-amber-950">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.cartItemId, 1)}
                          className="w-8 h-8 flex items-center justify-center bg-white rounded-lg hover:bg-amber-100 text-amber-600 transition-colors shadow-sm"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Quantity</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-10 border-t border-stone-100 bg-stone-50/50 space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between text-stone-400 text-sm font-black uppercase tracking-widest">
                <span>Pack Subtotal</span>
                <span>₦{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-stone-400 text-sm font-black uppercase tracking-widest">
                <span>Atmos Concierge Delivery</span>
                <span>₦{deliveryFee.toLocaleString()}</span>
              </div>
              <div className="h-px bg-stone-200 my-4" />
              <div className="flex justify-between text-amber-950 font-black text-4xl font-serif pt-2">
                <span>Total Due</span>
                <span className="text-amber-800">₦{total.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={onCheckout}
              className="group relative w-full bg-amber-950 hover:bg-black text-white py-8 rounded-[2.5rem] font-black flex items-center justify-center gap-4 shadow-[0_30px_60px_rgba(69,26,3,0.3)] hover:scale-[1.02] active:scale-95 transition-all text-xl uppercase tracking-[0.2em] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/10 to-amber-400/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              Complete & Chop <ArrowRight size={28} />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
