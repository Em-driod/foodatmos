
import React, { useState, useEffect } from 'react';
import { X, Milk, Plus, Minus, Star, Flame } from 'lucide-react';
import { FoodItem, CartItem } from '../types';
import { FOOD_ITEMS } from '../constants';
import { FoodCategory } from '../types';

interface DrinksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onAddToCart: (item: FoodItem) => void;
  onUpdateQuantity: (cartItemId: string, delta: number) => void;
  onRemoveFromCart: (cartItemId: string) => void;
}

const DrinksDrawer: React.FC<DrinksDrawerProps> = ({ isOpen, onClose, cart, onAddToCart, onUpdateQuantity, onRemoveFromCart }) => {
  const drinks = FOOD_ITEMS.filter(item => item.category === FoodCategory.DRINKS);
  const [tempDrinks, setTempDrinks] = useState<CartItem[]>([]);

  useEffect(() => {
    if (isOpen) {
      // Initialize tempDrinks with drinks already in the main cart
      const currentCartDrinks = cart.filter(item => item.category === FoodCategory.DRINKS);
      setTempDrinks(currentCartDrinks);
    }
  }, [isOpen, cart]);

  const getLocalQuantity = (cartItemId: string) => tempDrinks.find(c => c.cartItemId === cartItemId)?.quantity || 0;

  const handleLocalAddToCart = (item: FoodItem) => {
    const cartItemId = `${item.id}-no-protein`;
    setTempDrinks(prev => {
      const existing = prev.find(i => i.cartItemId === cartItemId);
      if (existing) {
        return prev.map(i => i.cartItemId === cartItemId ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, cartItemId, quantity: 1 }];
    });
  };

  const handleLocalUpdateQuantity = (cartItemId: string, delta: number) => {
    setTempDrinks(prev => {
      const newItems = prev.map(i => {
        if (i.cartItemId === cartItemId) {
          const newQty = Math.max(0, i.quantity + delta);
          return { ...i, quantity: newQty };
        }
        return i;
      }).filter(i => i.quantity > 0); // Remove if quantity becomes 0
      return newItems;
    });
  };

  const handleAddSelectedDrinks = () => {
    // First, remove existing drinks from the main cart that are no longer selected
    cart.filter(item => item.category === FoodCategory.DRINKS).forEach(drink => {
      if (!tempDrinks.some(td => td.id === drink.id)) {
        onRemoveFromCart(drink.cartItemId);
      }
    });

    // Add/update selected drinks to the main cart
    tempDrinks.forEach(drink => {
      const existingCartItem = cart.find(item => item.cartItemId === drink.cartItemId);
      if (existingCartItem) {
        // Only update if quantity changed, to avoid unnecessary re-renders
        if (existingCartItem.quantity !== drink.quantity) {
          // This assumes onUpdateQuantity handles delta, so calculate difference
          const delta = drink.quantity - existingCartItem.quantity;
          if (delta > 0) {
            for (let i = 0; i < delta; i++) onAddToCart(drink);
          } else if (delta < 0) {
            for (let i = 0; i < Math.abs(delta); i++) onUpdateQuantity(drink.cartItemId, -1);
          }
        }
      } else {
        // Add new drinks
        for (let i = 0; i < drink.quantity; i++) onAddToCart(drink);
      }
    });
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-amber-950/20 backdrop-blur-sm z-[140] transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 right-0 h-[50vh] bg-white/90 backdrop-blur-3xl z-[150] shadow-[0_20px_60px_rgba(69,26,3,0.15)] border-b border-amber-900/10 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className="max-w-7xl mx-auto h-full flex flex-col p-6 md:p-10 relative">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <div className="bg-amber-950 p-3 rounded-2xl text-amber-400">
                <Milk size={24} />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-serif font-black text-amber-950">Chilled Hydration</h2>
                <p className="text-[11px] font-black uppercase tracking-[0.3em] text-amber-700">The Perfect Finish</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-12 h-12 flex items-center justify-center bg-stone-100 hover:bg-amber-950 hover:text-white rounded-full transition-all group"
            >
              <X size={24} className="group-hover:rotate-90 transition-transform duration-500" />
            </button>
          </div>

          <div className="flex-1 overflow-x-auto flex items-center gap-6 pb-4 scrollbar-hide">
            {drinks.map((drink) => {
              const cartItemId = `${drink.id}-no-protein`;
              const qty = getLocalQuantity(cartItemId);
              return (
                <div key={drink.id} className="min-w-[280px] md:min-w-[320px] bg-white rounded-3xl p-4 border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-500 flex items-center gap-5 group">
                  <div className="relative w-24 h-24 shrink-0 overflow-hidden rounded-2xl">
                    <img src={drink.image} alt={drink.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-1.5 left-1.5 bg-orange-400 text-amber-950 text-[8px] font-black px-1.5 py-0.5 rounded shadow-sm">
                      COLD
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-serif font-black text-lg text-amber-950 leading-tight mb-1">{drink.name}</h4>
                    <p className="text-amber-800 font-black text-sm mb-3">₦{drink.price.toLocaleString()}</p>

                    {qty > 0 ? (
                      <div className="flex items-center gap-2 bg-amber-50 p-1 rounded-xl w-fit border border-amber-100">
                        <button onClick={() => handleLocalUpdateQuantity(cartItemId, -1)} className="w-8 h-8 flex items-center justify-center bg-white rounded-lg text-stone-600 hover:text-red-500 shadow-sm"><Minus size={12} /></button>
                        <span className="font-black text-xs w-5 text-center">{qty}</span>
                        <button onClick={() => handleLocalUpdateQuantity(cartItemId, 1)} className="w-8 h-8 flex items-center justify-center bg-amber-950 text-white rounded-lg shadow-sm"><Plus size={12} /></button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleLocalAddToCart(drink)}
                        className="flex items-center gap-2 bg-amber-950 text-white px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all"
                      >
                        <Plus size={14} /> Add Cold
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={handleAddSelectedDrinks}
              className="flex items-center gap-2 px-8 py-4 bg-amber-950 text-white rounded-xl font-black uppercase tracking-[0.3em] hover:bg-black transition-all"
            >
              Add Selected Drinks
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DrinksDrawer;
