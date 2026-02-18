
import React, { useState, useEffect } from 'react';
import { X, ArrowRight, CreditCard, Landmark, ShieldCheck, Copy, CheckCircle2, Loader2, Sparkles, ChefHat } from 'lucide-react';
import { CartItem, CheckoutDetails } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onPaymentSuccess: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, items, onPaymentSuccess }) => {
  const [step, setStep] = useState<'details' | 'payment' | 'processing' | 'success'>('details');
  const [details, setDetails] = useState<CheckoutDetails>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: 'bank_transfer'
  });
  const [countdown, setCountdown] = useState(600); // 10 minutes for transfer

  useEffect(() => {
    let timer: number;
    if (step === 'payment' && details.paymentMethod === 'bank_transfer') {
      timer = window.setInterval(() => {
        setCountdown(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, details.paymentMethod]);

  const getItemPriceWithProteins = (item: CartItem) => {
    const proteinTotal = item.selectedProteins?.reduce((sum, p) => sum + p.price, 0) || 0;
    return item.price + proteinTotal;
  };

  const subtotal = items.reduce((sum, item) => sum + (getItemPriceWithProteins(item) * item.quantity), 0);
  const total = subtotal + 1500;

  const handleNextStep = () => {
    if (step === 'details') setStep('payment');
    else if (step === 'payment') {
      setStep('processing');
      // Simulate payment verification
      setTimeout(() => {
        setStep('success');
      }, 3500);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      <div
        className="absolute inset-0 bg-amber-950/60 backdrop-blur-xl animate-reveal-fade"
        onClick={step === 'success' ? onPaymentSuccess : onClose}
      />

      <div className={`relative w-full max-w-4xl bg-white rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] overflow-hidden transition-all duration-700 transform flex flex-col md:flex-row h-[90vh] md:h-auto ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>

        {/* Sidebar Info */}
        <div className="hidden md:flex md:w-80 bg-amber-950 p-10 flex-col justify-between text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat" />
          <div className="relative z-10 space-y-8">
            <div className="bg-orange-400/20 w-fit p-3 rounded-2xl border border-amber-400/30">
              <ShieldCheck className="text-amber-400" size={32} />
            </div>
            <div>
              <h3 className="text-3xl font-serif font-black mb-2">Secure Sync</h3>
              <p className="text-amber-200/60 text-sm leading-relaxed font-medium">Your premium atmosphere deserves a premium, protected transaction.</p>
            </div>

            <div className="pt-10 space-y-4">
              <div className="flex justify-between text-xs font-black uppercase tracking-widest text-amber-400">
                <span>Subtotal</span>
                <span>₦{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs font-black uppercase tracking-widest text-amber-200/40">
                <span>Atmos Fee</span>
                <span>₦1,500</span>
              </div>
              <div className="h-px bg-white/10 my-4" />
              <div className="flex justify-between items-end">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-400/60">Total Due</span>
                <span className="text-3xl font-serif font-black">₦{total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 text-[10px] font-black uppercase tracking-widest text-amber-200/30 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> ATMOS PAY SERVER: ACTIVE
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white p-8 md:p-14 overflow-y-auto custom-scrollbar relative">
          {step !== 'success' && (
            <button
              onClick={onClose}
              className="absolute top-8 right-8 text-stone-300 hover:text-amber-950 transition-colors p-2"
            >
              <X size={28} />
            </button>
          )}

          {step === 'details' && (
            <div className="space-y-10 animate-reveal-up">
              <div>
                <h2 className="text-4xl font-serif font-black text-amber-950 mb-3 tracking-tight">Delivery Info</h2>
                <p className="text-stone-400 font-medium">Where should the heat arrive?</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Full Name</label>
                  <input
                    type="text"
                    className="w-full bg-stone-50 border-stone-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-amber-200 outline-none transition-all font-bold"
                    placeholder="Abiodun Adeyemi"
                    value={details.fullName}
                    onChange={e => setDetails({ ...details, fullName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Phone Number</label>
                  <input
                    type="tel"
                    className="w-full bg-stone-50 border-stone-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-amber-200 outline-none transition-all font-bold"
                    placeholder="080 000 0000"
                    value={details.phone}
                    onChange={e => setDetails({ ...details, phone: e.target.value })}
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Delivery Address</label>
                  <textarea
                    className="w-full bg-stone-50 border-stone-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-amber-200 outline-none transition-all font-bold h-32 resize-none"
                    placeholder="Floor 4, Atmos Building, Lekki Phase 1..."
                    value={details.address}
                    onChange={e => setDetails({ ...details, address: e.target.value })}
                  />
                </div>
              </div>

              <button
                disabled={!details.fullName || !details.address}
                onClick={handleNextStep}
                className="w-full bg-amber-950 hover:bg-black text-white py-6 rounded-[1.5rem] font-black flex items-center justify-center gap-4 transition-all shadow-xl active:scale-95 disabled:bg-stone-200"
              >
                Proceed to Payment <ArrowRight size={20} />
              </button>
            </div>
          )}

          {step === 'payment' && (
            <div className="space-y-10 animate-reveal-up">
              <div>
                <h2 className="text-4xl font-serif font-black text-amber-950 mb-3 tracking-tight">Payment Method</h2>
                <p className="text-stone-400 font-medium">Select your preferred Atmos sync method.</p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => setDetails({ ...details, paymentMethod: 'bank_transfer' })}
                  className={`w-full flex items-center justify-between p-6 rounded-[2rem] border-2 transition-all ${details.paymentMethod === 'bank_transfer' ? 'bg-amber-50 border-amber-950' : 'bg-white border-stone-100 hover:border-amber-200'}`}
                >
                  <div className="flex items-center gap-6 text-left">
                    <div className={`p-4 rounded-2xl ${details.paymentMethod === 'bank_transfer' ? 'bg-amber-950 text-white' : 'bg-stone-50 text-stone-400'}`}>
                      <Landmark size={24} />
                    </div>
                    <div>
                      <h4 className="font-black text-amber-950 uppercase tracking-widest text-sm">Bank Transfer</h4>
                      <p className="text-[10px] font-bold text-stone-400">Pay via virtual account number</p>
                    </div>
                  </div>
                  {details.paymentMethod === 'bank_transfer' && <CheckCircle2 className="text-amber-950" size={24} />}
                </button>

                <button
                  onClick={() => setDetails({ ...details, paymentMethod: 'card' })}
                  className={`w-full flex items-center justify-between p-6 rounded-[2rem] border-2 transition-all ${details.paymentMethod === 'card' ? 'bg-amber-50 border-amber-950' : 'bg-white border-stone-100 hover:border-amber-200'}`}
                >
                  <div className="flex items-center gap-6 text-left">
                    <div className={`p-4 rounded-2xl ${details.paymentMethod === 'card' ? 'bg-amber-950 text-white' : 'bg-stone-50 text-stone-400'}`}>
                      <CreditCard size={24} />
                    </div>
                    <div>
                      <h4 className="font-black text-amber-950 uppercase tracking-widest text-sm">Credit / Debit Card</h4>
                      <p className="text-[10px] font-bold text-stone-400">Mastercard, Visa, Verve</p>
                    </div>
                  </div>
                  {details.paymentMethod === 'card' && <CheckCircle2 className="text-amber-950" size={24} />}
                </button>
              </div>

              {details.paymentMethod === 'bank_transfer' && (
                <div className="bg-stone-50 rounded-[2rem] p-8 space-y-8 animate-reveal-up">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Virtual Account Expiring In</span>
                      <span className="text-xl font-black text-amber-900 block">{formatTime(countdown)}</span>
                    </div>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Wema_Bank_logo.svg/2560px-Wema_Bank_logo.svg.png" className="h-4 object-contain opacity-40" alt="Bank Logo" />
                  </div>

                  <div className="space-y-6">
                    <div className="flex justify-between items-center p-5 bg-white rounded-2xl shadow-sm border border-stone-100">
                      <div>
                        <span className="text-[9px] font-black text-stone-300 uppercase tracking-widest block mb-1">Account Number</span>
                        <span className="text-xl font-mono font-black text-amber-950">9024 8837 02</span>
                      </div>
                      <button className="p-3 bg-amber-50 text-amber-800 rounded-xl hover:bg-amber-100 transition-colors"><Copy size={18} /></button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-white rounded-2xl shadow-sm border border-stone-100">
                        <span className="text-[9px] font-black text-stone-300 uppercase tracking-widest block mb-1">Bank Name</span>
                        <span className="text-xs font-black text-amber-950">Wema Bank</span>
                      </div>
                      <div className="p-4 bg-white rounded-2xl shadow-sm border border-stone-100">
                        <span className="text-[9px] font-black text-stone-300 uppercase tracking-widest block mb-1">Account Name</span>
                        <span className="text-xs font-black text-amber-950">ATMOS FOODS</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-[10px] font-medium text-stone-400 text-center italic">Transfer the exact amount (₦{total.toLocaleString()}) to confirm your pack.</p>
                </div>
              )}

              {details.paymentMethod === 'card' && (
                <div className="bg-stone-50 rounded-[2rem] p-8 space-y-6 animate-reveal-up">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-stone-400">Card Number</label>
                    <input type="text" className="w-full bg-white border-stone-200 rounded-xl px-4 py-3 font-mono text-base font-bold outline-none" placeholder="**** **** **** ****" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-widest text-stone-400">Expiry Date</label>
                      <input type="text" className="w-full bg-white border-stone-200 rounded-xl px-4 py-3 font-mono text-base font-bold outline-none" placeholder="MM/YY" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-widest text-stone-400">CVV</label>
                      <input type="text" className="w-full bg-white border-stone-200 rounded-xl px-4 py-3 font-mono text-base font-bold outline-none" placeholder="123" />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-4">
                <button
                  onClick={() => setStep('details')}
                  className="px-8 py-6 rounded-[1.5rem] font-black text-stone-400 hover:text-amber-950 transition-colors uppercase tracking-widest text-xs"
                >
                  Back
                </button>
                <button
                  onClick={handleNextStep}
                  className="flex-1 bg-amber-950 hover:bg-black text-white py-6 rounded-[1.5rem] font-black flex items-center justify-center gap-4 transition-all shadow-xl active:scale-95"
                >
                  {details.paymentMethod === 'bank_transfer' ? 'I have transferred' : `Pay ₦${total.toLocaleString()}`} <ShieldCheck size={20} />
                </button>
              </div>
            </div>
          )}

          {step === 'processing' && (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-10 py-20 animate-reveal-up">
              <div className="relative">
                <div className="absolute inset-0 bg-orange-400/20 blur-[60px] rounded-full animate-pulse" />
                <div className="relative w-40 h-40 flex items-center justify-center">
                  <Loader2 size={80} className="text-amber-950 animate-spin" strokeWidth={1} />
                  <Sparkles className="absolute text-amber-400 animate-pulse" size={32} />
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-4xl font-serif font-black text-amber-950">Verifying Transfer</h3>
                <p className="text-stone-400 font-medium text-lg leading-relaxed max-w-sm">
                  Our Atmos Concierge is reaching out to the financial hubs to sync your payment. One moment...
                </p>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-12 py-20 animate-reveal-up">
              <div className="relative">
                <div className="absolute -inset-10 bg-emerald-100 blur-[80px] rounded-full" />
                <div className="relative w-44 h-44 bg-emerald-500 rounded-full flex items-center justify-center shadow-2xl scale-[1.1]">
                  <ChefHat size={80} className="text-white" />
                </div>
                <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg border border-stone-50">
                  <CheckCircle2 size={32} className="text-emerald-500" />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-5xl font-serif font-black text-amber-950 mb-3 tracking-tight">Sync Complete!</h3>
                  <div className="inline-block px-4 py-1.5 bg-amber-50 text-amber-800 rounded-full text-[10px] font-black uppercase tracking-widest border border-amber-100">
                    ORDER ID: #ATM-{Math.floor(Math.random() * 9000) + 1000}
                  </div>
                </div>
                <p className="text-stone-400 font-medium text-xl leading-relaxed max-w-md mx-auto">
                  The atmosphere is heating up. Your pack is currently being curated by our head chefs.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                <div className="bg-stone-50 p-6 rounded-3xl border border-stone-100 text-left">
                  <span className="text-[9px] font-black text-stone-300 uppercase tracking-widest block mb-1">Status</span>
                  <span className="text-sm font-black text-amber-950">Preparing</span>
                </div>
                <div className="bg-stone-50 p-6 rounded-3xl border border-stone-100 text-left">
                  <span className="text-[9px] font-black text-stone-300 uppercase tracking-widest block mb-1">Arrival</span>
                  <span className="text-sm font-black text-amber-950">~35 Mins</span>
                </div>
              </div>

              <button
                onClick={onPaymentSuccess}
                className="bg-amber-950 hover:bg-black text-white px-16 py-7 rounded-[2.5rem] font-black shadow-[0_30px_60px_rgba(0,0,0,0.2)] hover:scale-[1.05] transition-all uppercase tracking-widest text-base"
              >
                Track My Pack
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
