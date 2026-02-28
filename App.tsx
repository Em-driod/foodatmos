
import React, { useState, useMemo, useRef } from 'react';
import { FoodCategory, FoodItem, CartItem, ProteinOption } from './types';
import Navbar from './components/Navbar';
import FoodCard from './components/FoodCard';
import CartSidebar from './components/CartSidebar';
import DrinksDrawer from './components/DrinksDrawer';

import CheckoutModal from './components/CheckoutModal';
import MultiOrderModal from './components/MultiOrderModal';
import OrderHistory from './components/OrderHistory';
import OrderDetail from './components/OrderDetail';
import { ArrowRight, Soup, Milk, Flame, Utensils, Star, CheckCircle2, Award, Clock, MapPin, Truck, Sparkles, MoveRight } from 'lucide-react';
import { getProducts, getProteins } from './services/api';
import { Routes, Route, useNavigate } from 'react-router-dom';
import PaymentSuccess from './components/PaymentSuccess';

const App: React.FC = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState<FoodItem[]>([]);
  const [proteins, setProteins] = useState<ProteinOption[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDrinksOpen, setIsDrinksOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isMultiOrderOpen, setIsMultiOrderOpen] = useState(false);
  const [activeMultiItem, setActiveMultiItem] = useState<FoodItem | null>(null);
  const [showToast, setShowToast] = useState<{ message: string, isNext: boolean } | null>(null);
  const [currentCustomerEmail, setCurrentCustomerEmail] = useState<string>('');
  const menuRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedProducts, fetchedProteins] = await Promise.all([
          getProducts(),
          getProteins()
        ]);
        setProducts(fetchedProducts);
        setProteins(fetchedProteins);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const filteredItems = useMemo(() => {
    return products.filter(item => item.category !== FoodCategory.DRINKS);
  }, [products]);

  const addToCart = (item: FoodItem, proteins?: ProteinOption[]) => {
    const proteinIdString = proteins?.map(p => p.id).sort().join('-') || 'no-protein';
    const cartItemId = `${item.id}-${proteinIdString}`;

    setCart(prev => {
      const existing = prev.find(i => i.cartItemId === cartItemId);
      if (existing) {
        return prev.map(i => i.cartItemId === cartItemId ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, cartItemId, quantity: 1, selectedProteins: proteins }];
    });

    if (item.category === FoodCategory.DRINKS) {
      setShowToast({ message: `Thirst Quenched! ${item.name} added!`, isNext: false });
    } else if (item.category === FoodCategory.GRAINS) {
      setShowToast({ message: `Elite Choice! Adding a drink?`, isNext: true });
      setTimeout(() => {
        setIsDrinksOpen(true);
      }, 800);
    } else {
      setShowToast({ message: `${item.name} added to pack!`, isNext: false });
    }

    setTimeout(() => setShowToast(null), 3500);
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.cartItemId === cartItemId) {
        const newQty = Math.max(1, i.quantity + delta);
        return { ...i, quantity: newQty };
      }
      return i;
    }));
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(i => i.cartItemId !== cartItemId));
  };

  const handleMultiConfirm = (item: FoodItem, selections: { quantity: number, proteins: ProteinOption[] }[]) => {
    selections.forEach(sel => {
      // Add multiple quantities if bulk-same, or 1 if bulk-diff
      const proteinIdString = sel.proteins?.map(p => p.id || p._id).sort().join('-') || 'no-protein';
      const cartItemId = `${item.id}-${proteinIdString}`;

      setCart(prev => {
        const existing = prev.find(i => i.cartItemId === cartItemId);
        if (existing) {
          return prev.map(i => i.cartItemId === cartItemId ? { ...i, quantity: i.quantity + sel.quantity } : i);
        }
        return [...prev, { ...item, cartItemId, quantity: sel.quantity, selectedProteins: sel.proteins }];
      });
    });

    setIsMultiOrderOpen(false);

    // Show collective toast and open drinks drawer once
    setShowToast({ message: `Elite Choice! Adding a drink?`, isNext: true });
    setTimeout(() => {
      setIsDrinksOpen(true);
    }, 800);
    setTimeout(() => setShowToast(null), 3500);
  };

  const handlePaymentSuccess = () => {
    setCart([]);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
  };

  const handleCheckout = (customerEmail: string) => {
    setCurrentCustomerEmail(customerEmail);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Routes>
      <Route path="/" element={
        <div className="min-h-screen bg-[#fcfcfc] text-orange-400 antialiased selection:bg-orange-100 relative">
          <Navbar cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} />

          {/* Background Decorative Elements */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-200/20 blur-[120px] rounded-full animate-float-slow" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-amber-100/30 blur-[150px] rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border-[1px] border-amber-400/[0.02] rounded-full scale-[1.5]" />
          </div>

          {/* Atmospheric Toast */}
          <div className={`fixed top-28 left-1/2 -translate-x-1/2 z-[110] transition-all duration-700 transform ${showToast ? 'translate-y-0 opacity-100' : '-translate-y-12 opacity-0 pointer-events-none'}`}>
            <div className={`px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border backdrop-blur-xl ${showToast?.isNext ? 'bg-amber-400 border-amber-500 text-amber-950' : 'bg-amber-950 border-amber-800 text-white'}`}>
              <CheckCircle2 size={22} className={showToast?.isNext ? 'text-amber-900' : 'text-amber-400'} />
              <span className="text-[13px] font-black uppercase tracking-widest">{showToast?.message}</span>
              {showToast?.isNext && <ArrowRight size={20} className="animate-bounce-x" />}
            </div>
          </div>

          <main className="max-w-7xl mx-auto px-6 md:px-12 pb-32 relative z-10">

            {/* Editorial Masterclass Hero */}
            <section className="relative pt-44 pb-32 flex flex-col items-center text-center lg:text-left lg:flex-row lg:items-center lg:justify-between gap-16 xl:gap-24 overflow-visible">

              <div className="flex-1 space-y-12 reveal-up">
                <div className="inline-flex items-center gap-3 bg-orange-400 text-amber-100 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.4em] shadow-xl border border-amber-900/50">
                  <Sparkles size={14} fill="currentColor" className="animate-pulse" /> The Atmos Experience
                </div>

                <h2 className="text-6xl md:text-7xl font-serif font-black leading-[0.95] tracking-tighter text-orange-400">
                  Crave the <br />
                  <span className="relative">
                    <span className="text-orange-400 italic font-medium pr-4">Authentic.</span>
                    <span className="absolute -bottom-4 left-0 w-full h-2 bg-orange-400/50 -rotate-2 -z-10" />
                  </span>
                  <br />
                  Own the <span className="text-gradient">Heat.</span>
                </h2>

                <p className="text-stone-500 text-xl md:text-2xl max-w-xl leading-relaxed font-medium mx-auto lg:mx-0">
                  Elevating the three sacred pillars of Nigerian rice culture into a sensory masterpiece. Order. Pack. Chop.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-8 pt-6 justify-center lg:justify-start">
                  <button
                    onClick={() => menuRef.current?.scrollIntoView({ behavior: 'smooth' })}
                    className="group relative bg-orange-400 text-white px-14 py-7 rounded-2xl font-black flex items-center gap-4 transition-all hover:bg-black hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] active:scale-95 text-base uppercase tracking-[0.2em] overflow-hidden"
                  >
                    <span className="relative z-10">Enter the Kitchen</span>
                    <MoveRight size={24} className="group-hover:translate-x-2 transition-transform duration-500 relative z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-600/0 via-amber-600/20 to-amber-600/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </button>

                  <div className="flex flex-col items-center sm:items-start gap-2 border-l-2 border-amber-100 pl-8">
                    <div className="flex items-center -space-x-3 mb-1">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-stone-100">
                          <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Customer" className="w-full h-full object-cover" />
                        </div>
                      ))}
                      <div className="w-10 h-10 rounded-full border-2 border-white bg-amber-100 flex items-center justify-center text-[10px] font-black text-amber-900">+1k</div>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">Trusted by Atmos Fans</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-8 pt-16 border-t border-amber-100/50 max-w-lg mx-auto lg:mx-0">
                  <div className="flex flex-col gap-2">
                    <span className="text-2xl font-serif font-black text-amber-400">30m</span>
                    <span className="text-[9px] font-black uppercase tracking-widest text-stone-400">Mainland Priority</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-2xl font-serif font-black text-amber-400">100%</span>
                    <span className="text-[9px] font-black uppercase tracking-widest text-stone-400">Atmos Certified</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-2xl font-serif font-black text-amber-400">₦0</span>
                    <span className="text-[9px] font-black uppercase tracking-widest text-stone-400">Island Concierge</span>
                  </div>
                </div>
              </div>

              <div className="flex-1 relative group w-full max-w-xl lg:max-w-none reveal-up" style={{ animationDelay: '0.3s' }}>
                <div className="absolute -inset-10 bg-amber-400/10 rounded-[4rem] blur-[80px] animate-float" />

                <div className="relative z-10 grid grid-cols-2 gap-6">
                  <div className="space-y-6 pt-12 animate-float">
                    <div className="aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
                      <img src="https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Jollof" />
                    </div>
                    <div className="bg-white/80 backdrop-blur-xl p-6 rounded-[2rem] shadow-xl border border-white/50 space-y-2">
                      <div className="flex gap-1 text-orange-400"><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /></div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-orange-400">"The best Jollof on the Island, period."</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-orange-400 p-8 rounded-[2rem] shadow-2xl text-white space-y-4">
                      <Award className="text-amber-600" size={32} />
                      <h4 className="text-2xl font-serif font-black leading-tight">Master <br /> Selection</h4>
                      <p className="text-[10px] font-medium text-amber-100 uppercase tracking-widest leading-relaxed">Curated by our top Atmos chefs for the elite palate.</p>
                    </div>
                    <div className="aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
                      <img src="/recipe.jpeg" className="w-full h-full object-cover" alt="Fried Rice" />
                    </div>
                  </div>
                </div>

                {/* Floating Info Tag */}
                <div className="absolute top-1/2 -right-12 -translate-y-1/2 bg-white px-8 py-5 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-stone-50 z-20 hidden xl:block animate-float-slow">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-400 rounded-2xl flex items-center justify-center text-amber-600"><Flame fill="currentColor" size={24} /></div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-300 block">Currently Trending</span>
                      <span className="text-sm font-black text-orange-400">Smoky Atmos Mix</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Menu Section */}
            <section className="py-32" ref={menuRef}>
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20 border-b border-stone-100 pb-16 reveal-up">
                <div className="space-y-4">
                  <div className="text-orange-400 font-black uppercase tracking-[0.5em] text-[12px]">
                    The Three Delicacies
                  </div>
                  <h3 className="text-5xl md:text-7xl font-serif font-black text-orange-400 tracking-tighter leading-none">
                    Essential Atmosphere
                  </h3>
                  <p className="text-stone-400 text-xl max-w-xl font-medium leading-relaxed">
                    A strictly curated trio of Nigerian rice heritage, refined for the modern standard.
                  </p>
                </div>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item, idx) => (
                    <div key={item.id} className="reveal-up" style={{ animationDelay: `${idx * 100}ms` }}>
                      <FoodCard
                        item={item}
                        onAddToCart={addToCart}
                        onAddMulti={(it) => {
                          setActiveMultiItem(it);
                          setIsMultiOrderOpen(true);
                        }}
                        cart={cart}
                        onUpdateQuantity={updateQuantity}
                        onRemoveFromCart={removeFromCart}
                      />
                    </div>
                  ))
                ) : (
                  <div className="col-span-full py-20 text-center space-y-6 reveal-up">
                    <Utensils size={64} className="mx-auto text-orange-200 animate-pulse" />
                    <div className="space-y-2">
                      <h4 className="text-3xl font-serif font-black text-orange-400">Atmos Kitchen is Refreshing</h4>
                      <p className="text-stone-400 font-medium tracking-wide">Food Currently Not Available. Our chefs are preparing something legendary.</p>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </main>

          <footer className="bg-white text-amber-400 pt-32 pb-20 px-6 border-t border-stone-100 relative z-10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
              <div className="space-y-8 lg:col-span-1">
                <div className="flex items-center gap-4">
                  <img src="/dep.jpeg" alt="AtmosFood Logo" className="h-10 w-10 object-contain" />
                  <h2 className="text-4xl font-serif font-black tracking-tighter">AtmosFood</h2>
                </div>
                <p className="text-stone-400 text-xl font-serif italic max-w-sm leading-relaxed">"Defining the premium standard for Nigerian flavor. Order. Pack. Chop."</p>
              </div>

              <div className="space-y-8">
                <h4 className="font-black text-amber-400 uppercase tracking-[0.4em] text-[12px]">The Collective</h4>
                <ul className="space-y-5 text-[12px] font-bold text-stone-500 uppercase tracking-[0.2em]">
                  <li className="hover:text-amber-400 cursor-pointer transition-colors">Mainland Kitchen</li>
                  <li className="hover:text-amber-400 cursor-pointer transition-colors">Island Concierge</li>
                  <li className="hover:text-amber-400 cursor-pointer transition-colors">Atmos Bulk Packs</li>
                </ul>
              </div>

              <div className="space-y-8">
                <h4 className="font-black text-amber-950 uppercase tracking-[0.4em] text-[12px]">Logistics</h4>
                <ul className="space-y-5 text-[12px] font-bold text-stone-500 uppercase tracking-[0.2em]">
                  <li className="flex flex-col gap-1">
                    <span className="text-amber-950 flex items-center gap-2"><Clock size={14} /> Est. Delivery Time</span>
                    <span className="font-medium normal-case text-stone-400">30 - 45 Minutes</span>
                  </li>
                  <li className="flex flex-col gap-1">
                    <span className="text-amber-950 flex items-center gap-2"><MapPin size={14} /> Delivery Zones</span>
                    <span className="font-medium normal-case text-stone-400">Ilorin, Nigeria</span>
                  </li>
                  <li className="flex items-center gap-2 hover:text-amber-950 cursor-pointer transition-colors underline underline-offset-8 decoration-amber-400">
                    <Truck size={14} /> Delivery FAQ
                  </li>
                </ul>
              </div>

              <div className="space-y-8">
                <h4 className="font-black text-amber-950 uppercase tracking-[0.4em] text-[12px]">Concierge</h4>
                <ul className="space-y-5 text-[12px] font-bold text-stone-500 uppercase tracking-[0.2em]">
                  <li className="flex flex-col gap-1">
                    <span className="text-amber-950">Call Us</span>
                    <a 
                      href="tel:08069813105" 
                      className="font-medium normal-case text-stone-400 hover:text-amber-600 transition-colors"
                    >
                      0806 981 3105
                    </a>
                  </li>
                  <li className="flex flex-col gap-1">
                    <span className="text-amber-950">Email Support</span>
                    <a 
                      href="mailto:atmosglobalenterprise@gmail.com" 
                      className="font-medium normal-case text-stone-400 hover:text-amber-600 transition-colors"
                    >
                      atmosglobalenterprise@gmail.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="max-w-7xl mx-auto mt-24 pt-10 border-t border-stone-100 flex flex-col md:flex-row justify-between items-center gap-8 text-[11px] font-black uppercase tracking-[0.8em] text-stone-300">
              <p>© 2024 Atmos Food NG. The Premium Standard.</p>
              <div className="flex gap-10 text-amber-900">
                <span className="hover:text-amber-600 cursor-default transition-colors">Order</span>
                <span className="hover:text-amber-600 cursor-default transition-colors">Pack</span>
                <span className="hover:text-amber-600 cursor-default transition-colors">Chop</span>
              </div>
            </div>
          </footer>

          <CartSidebar
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            items={cart}
            onUpdateQuantity={updateQuantity}
            onRemove={removeFromCart}
            onCheckout={() => setIsCheckoutOpen(true)}
          />

          <DrinksDrawer
            isOpen={isDrinksOpen}
            onClose={() => setIsDrinksOpen(false)}
            products={products}
            cart={cart}
            onAddToCart={addToCart}
            onUpdateQuantity={updateQuantity}
            onRemoveFromCart={removeFromCart}
          />

          <CheckoutModal
            isOpen={isCheckoutOpen}
            onClose={() => setIsCheckoutOpen(false)}
            items={cart}
            onPaymentSuccess={handlePaymentSuccess}
            onCustomerIdentified={handleCheckout}
          />

          <MultiOrderModal
            isOpen={isMultiOrderOpen}
            onClose={() => setIsMultiOrderOpen(false)}
            item={activeMultiItem}
            proteins={proteins}
            onConfirm={handleMultiConfirm}
          />

        </div>
      } />
      <Route path="/payment-success" element={<PaymentSuccess onReturn={() => {
        setCart([]);
        navigate('/');
      }} />} />
      <Route path="/orders" element={<OrderHistory customerEmail={currentCustomerEmail} />} />
      <Route path="/order/:orderId" element={<OrderDetail />} />
    </Routes>
  );
};

export default App;
