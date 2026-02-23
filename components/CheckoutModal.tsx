import React, { useState } from 'react';
import { X, MapPin, Loader2, CheckCircle2, ShieldCheck, Landmark, Navigation, ArrowRight, Sparkles, ChefHat } from 'lucide-react';
import { getAllLGAs, getAreasByLGA, getAreaById } from '../services/ilorinAreas';
import { getCurrentLocation, UserLocation } from '../services/locationHelper';
import PaymentInstructions from './PaymentInstructions';

const BASE_DELIVERY_FEE = 600;

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  selectedProteins?: { name: string; price: number }[];
}

interface CheckoutDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  deliveryMethod: 'pickup' | 'delivery';
  paymentMethod?: 'card' | 'transfer';
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onPaymentSuccess: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, items, onPaymentSuccess }) => {
  const [step, setStep] = useState<'details' | 'payment-instructions' | 'processing' | 'success'>('details');
  const [error, setError] = useState<string | null>(null);
  const [addressFormatError, setAddressFormatError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [selectedLGA, setSelectedLGA] = useState('');
  const [selectedAreaId, setSelectedAreaId] = useState('');
  const [details, setDetails] = useState<CheckoutDetails>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    deliveryMethod: 'delivery',
    paymentMethod: 'card' // Default to card for Paystack redirection
  });

  const handleLGAChange = (lga: string) => {
    setSelectedLGA(lga);
    setSelectedAreaId('');
    setAddressFormatError(null);
  };

  const handleAreaChange = (areaId: string) => {
    setSelectedAreaId(areaId);
    setAddressFormatError(null);
  };

  const getItemPriceWithProteins = (item: CartItem) => {
    const proteinTotal = item.selectedProteins?.reduce((sum, p) => sum + p.price, 0) || 0;
    return item.price + proteinTotal;
  };

  const subtotal = items.reduce((sum, item) => sum + (getItemPriceWithProteins(item) * item.quantity), 0);

  const selectedArea = selectedAreaId ? getAreaById(selectedAreaId) : undefined;
  const deliveryFee = details.deliveryMethod === 'pickup'
    ? 0
    : (BASE_DELIVERY_FEE + (selectedArea?.deliveryFee ?? 0));
  const total = subtotal + deliveryFee;

  const validateAddress = () => {
    if (details.deliveryMethod === 'pickup') {
      try {
        const location = getCurrentLocation();
        setUserLocation(location);
      } catch (error) {
        console.error('Location detection failed:', error);
      }
      setAddressFormatError(null);
      return true;
    }

    if (!selectedLGA || !selectedAreaId) {
      setAddressFormatError('Please select your Local Government and Area.');
      return false;
    }

    if (!details.address) {
      setAddressFormatError('Please enter your street address.');
      return false;
    }

    setAddressFormatError(null);
    return true;
  };

  // Create order function (placeholder - would connect to backend)
  const createOrder = async (orderData: any) => {
    console.log('Creating order:', orderData);
    
    try {
      const response = await fetch('https://atmosfoodin.onrender.com/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });
      
      // Check if response is OK before parsing JSON
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response not OK:', errorText);
        
        // Try to parse as JSON, fallback to text
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { message: errorText };
        }
        
        throw new Error(errorData.message || 'Failed to create order');
      }
      
      // Parse successful response
      const responseText = await response.text();
      console.log('Raw response:', responseText);
      
      let result;
      try {
        result = JSON.parse(responseText);
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        throw new Error('Invalid server response format');
      }
      
      return result;
    } catch (error: any) {
      console.error('Create order error:', error);
      throw error;
    }
  };

  
  const handleInitiatePayment = async () => {
    try {
      setStep('processing');
      setError(null);

      console.log('=== Starting Payment Process ===');
      console.log('Current details:', details);
      console.log('Cart items:', items);

      // Validate required fields before sending
      if (!details.fullName || !details.email || !details.phone) {
        throw new Error('Please fill in all required fields (name, email, phone)');
      }

      if (details.deliveryMethod === 'delivery') {
        if (!selectedLGA || !selectedAreaId) {
          throw new Error('Please select your Local Government and Area');
        }
        if (!details.address) {
          throw new Error('Please provide delivery address');
        }
      }

      // Generate verification code matching backend format
      const verificationCode = details.deliveryMethod === 'pickup' 
        ? `ATMOS-P-${Math.floor(1000 + Math.random() * 9000)}`
        : `ATMOS-D-${Math.floor(1000 + Math.random() * 9000)}`;
      
      const orderData = {
        items: items.map(item => ({
          product: item.id || item._id,
          quantity: item.quantity,
          proteins: item.selectedProteins?.map(p => p.id).filter(Boolean) || []
        })),
        customerName: details.fullName,
        email: details.email,
        phoneNumber: details.phone,
        address: details.address || 'PICKUP',
        deliveryMethod: details.deliveryMethod,
        deliveryAreaId: details.deliveryMethod === 'delivery' ? selectedAreaId : undefined,
        deliveryLGA: details.deliveryMethod === 'delivery' ? selectedLGA : undefined,
        deliveryFee: details.deliveryMethod === 'delivery' ? deliveryFee : 0,
        verificationCode
      };

      console.log('Prepared order data:', JSON.stringify(orderData, null, 2));
      console.log('Sending to: /api/orders');

      sessionStorage.setItem('verificationCode', verificationCode);
      sessionStorage.setItem('deliveryMethod', details.deliveryMethod);

      const result = await createOrder(orderData);

      console.log('Order creation result:', result);

      if (result.success) {
        // Store order details for payment verification
        sessionStorage.setItem('pendingOrder', JSON.stringify({
          orderId: result.orderId,
          orderReference: result.orderReference,
          subtotal,
          deliveryFee,
          totalAmount: result.totalAmount,
          verificationCode,
          paymentInstructions: result.paymentInstructions
        }));
        
        console.log('Moving to payment instructions step');
        // Move to payment instructions step
        setStep('payment-instructions');
      } else {
        console.error('Order creation failed - no success flag');
        throw new Error(result.message || 'Failed to create order');
      }
    } catch (err: any) {
      console.error('=== PAYMENT INITIALIZATION ERROR ===');
      console.error('Error type:', typeof err);
      console.error('Error message:', err.message);
      console.error('Error stack:', err.stack);
      console.error('Full error:', err);
      
      setError(err.message || err.response?.data?.message || 'Payment service unavailable');
      setStep('details');
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden">
      <div
        className="absolute inset-0 bg-amber-950/60 backdrop-blur-xl animate-reveal-fade"
        onClick={step === 'success' ? onPaymentSuccess : onClose}
      />

      <div className={`relative w-full max-w-6xl bg-white rounded-[2rem] md:rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] overflow-hidden transition-all duration-700 transform flex flex-col md:flex-row h-[95vh] md:h-[85vh] lg:h-[80vh] xl:h-[75vh] ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>

        {/* Sidebar Info */}
        <div className="hidden md:flex md:w-96 lg:w-80 bg-amber-950 p-6 lg:p-10 flex-col justify-between text-white relative overflow-hidden">
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
              <div className="flex justify-between text-stone-600 text-sm font-black uppercase tracking-widest">
                <span>Subtotal</span>
                <span>₦{subtotal.toLocaleString()}</span>
              </div>
              {details.deliveryMethod === 'delivery' && deliveryFee > 0 && (
                <>
                  <div className="flex justify-between text-stone-600 text-sm font-black uppercase tracking-widest">
                    <span>Delivery Fee</span>
                    <span>₦{deliveryFee.toLocaleString()}</span>
                  </div>
                  <div className="h-px bg-amber-200 my-3" />
                </>
              )}
              <div className="flex justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-600/60">Total</span>
                <span className="text-2xl sm:text-3xl font-serif font-black text-amber-950">₦{total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 text-[10px] font-black uppercase tracking-widest text-amber-200/30 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> ATMOS PAY SERVER: ACTIVE
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white p-4 sm:p-6 md:p-8 lg:p-10 xl:p-14 overflow-y-auto custom-scrollbar relative">
          {step !== 'success' && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 text-stone-300 hover:text-amber-950 transition-colors p-2"
            >
              <X size={20} className="sm:w-6 sm:h-6 md:w-7 md:h-7" />
            </button>
          )}

          {step === 'details' && (
            <div className="space-y-10 animate-reveal-up">
              <div>
                <h2 className="text-4xl font-serif font-black text-amber-950 mb-3 tracking-tight">Delivery Info</h2>
                <p className="text-stone-400 font-medium">Where should the heat arrive?</p>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-500 font-bold text-sm">
                  {error}
                </div>
              )}

              <div className="flex p-1 bg-stone-100 rounded-2xl gap-1">
                <button
                  onClick={() => setDetails({ ...details, deliveryMethod: 'delivery' })}
                  className={`flex-1 py-3 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${details.deliveryMethod === 'delivery' ? 'bg-amber-950 text-white shadow-lg' : 'text-stone-400 hover:text-stone-600'}`}
                >
                  Delivery
                </button>
                <button
                  onClick={() => setDetails({ ...details, deliveryMethod: 'pickup' })}
                  className={`flex-1 py-3 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${details.deliveryMethod === 'pickup' ? 'bg-amber-950 text-white shadow-lg' : 'text-stone-400 hover:text-stone-600'}`}
                >
                  Pickup
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Full Name</label>
                  <input
                    type="text"
                    className="w-full bg-stone-50 border-stone-200 rounded-2xl px-4 py-3 sm:px-6 sm:py-4 focus:ring-2 focus:ring-amber-200 outline-none transition-all font-bold text-sm sm:text-base"
                    placeholder="Abiodun Adeyemi"
                    value={details.fullName}
                    onChange={e => setDetails({ ...details, fullName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Email Address</label>
                  <input
                    type="email"
                    className="w-full bg-stone-50 border-stone-200 rounded-2xl px-4 py-3 sm:px-6 sm:py-4 focus:ring-2 focus:ring-amber-200 outline-none transition-all font-bold text-sm sm:text-base"
                    placeholder="abi@example.com"
                    value={details.email}
                    onChange={e => setDetails({ ...details, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Phone Number</label>
                  <input
                    type="tel"
                    className="w-full bg-stone-50 border-stone-200 rounded-2xl px-4 py-3 sm:px-6 sm:py-4 focus:ring-2 focus:ring-amber-200 outline-none transition-all font-bold text-sm sm:text-base"
                    placeholder="080 000 0000"
                    value={details.phone}
                    onChange={e => setDetails({ ...details, phone: e.target.value })}
                  />
                </div>
                <div className="sm:col-span-2 space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">
                    {details.deliveryMethod === 'delivery' ? 'Delivery Address' : 'Pickup Location (Instructions)'}
                  </label>
                  {details.deliveryMethod === 'pickup' ? (
                    <div className="w-full bg-stone-50 border border-amber-100 rounded-2xl sm:rounded-3xl p-4 sm:p-6 space-y-3">
                      <span className="text-xs font-black text-amber-950 uppercase tracking-widest flex items-center gap-2">
                        <Landmark size={14} className="text-amber-500" /> Atmos Kitchen HQ
                      </span>
                      <p className="text-stone-500 text-sm font-medium leading-relaxed">
                        Your legendary pack will be ready for pickup at our flagship store. Please present your pickup ID code shown after payment for verification.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-end">
                          <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Enter Your Delivery Address</label>
                          <div className="flex items-center gap-2">
                            {userLocation?.area && (
                              <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100 uppercase tracking-widest">
                                <Navigation size={10} className="inline mr-1" />
                                {userLocation.area}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Select Local Government</label>
                          <select
                            className="w-full bg-stone-50 border border-stone-200 rounded-xl sm:rounded-2xl px-4 py-3 sm:px-6 sm:py-4 focus:ring-2 focus:ring-amber-200 outline-none transition-all font-bold text-sm sm:text-base"
                            value={selectedLGA}
                            onChange={(e) => handleLGAChange(e.target.value)}
                          >
                            <option value="">Select LGA</option>
                            {getAllLGAs().map((lga) => (
                              <option key={lga} value={lga}>
                                {lga}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Select Area</label>
                          <select
                            className="w-full bg-stone-50 border border-stone-200 rounded-xl sm:rounded-2xl px-4 py-3 sm:px-6 sm:py-4 focus:ring-2 focus:ring-amber-200 outline-none transition-all font-bold text-sm sm:text-base disabled:bg-stone-100"
                            value={selectedAreaId}
                            onChange={(e) => handleAreaChange(e.target.value)}
                            disabled={!selectedLGA}
                          >
                            <option value="">Select Area</option>
                            {selectedLGA
                              ? getAreasByLGA(selectedLGA).map((a) => (
                                  <option key={a.id} value={a.id}>
                                    {a.name}
                                  </option>
                                ))
                              : null}
                          </select>
                        </div>

                        {selectedArea && (
                          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3">
                            <p className="text-emerald-700 text-xs font-medium flex items-center gap-2">
                              <MapPin size={12} className="text-emerald-500" />
                              {selectedArea.lga} - {selectedArea.name} (₦{(BASE_DELIVERY_FEE + (selectedArea.deliveryFee ?? 0)).toLocaleString()})
                            </p>
                          </div>
                        )}

                        {addressFormatError && (
                          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                            <p className="text-amber-700 text-xs font-medium flex items-center gap-2">
                              <span className="w-1 h-1 bg-amber-500 rounded-full animate-pulse"></span>
                              {addressFormatError}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Exact Street Address</label>
                        <textarea
                          className="w-full bg-stone-50 border-stone-200 rounded-xl sm:rounded-2xl px-4 py-3 sm:px-6 sm:py-4 focus:ring-2 focus:ring-amber-200 outline-none transition-all font-bold text-sm sm:text-base h-24 sm:h-32 resize-none"
                          placeholder="Floor 4, Atmos Building, Tanke..."
                          value={details.address}
                          onChange={e => setDetails({ ...details, address: e.target.value })}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile Pricing Summary - Only visible on mobile */}
              <div className="md:hidden bg-amber-50 rounded-2xl p-6 space-y-4 border border-amber-100">
                <div className="flex justify-between text-stone-600 text-sm font-black uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span>₦{subtotal.toLocaleString()}</span>
                </div>
                {details.deliveryMethod === 'delivery' && deliveryFee > 0 && (
                  <>
                    <div className="flex justify-between text-stone-600 text-sm font-black uppercase tracking-widest">
                      <span>Atmos Fee</span>
                      <span>₦{deliveryFee.toLocaleString()}</span>
                    </div>
                    <div className="h-px bg-amber-200 my-3" />
                  </>
                )}
                <div className="flex justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-600/60">Total</span>
                  <span className="text-2xl sm:text-3xl font-serif font-black text-amber-950">₦{total.toLocaleString()}</span>
                </div>
              </div>

              <button
                disabled={!details.fullName || !details.email || !details.phone || (details.deliveryMethod === 'delivery' && (!selectedLGA || !selectedAreaId || !details.address))}
                onClick={handleInitiatePayment}
                className="w-full bg-amber-950 hover:bg-black text-white py-4 sm:py-6 rounded-xl sm:rounded-[1.5rem] font-black flex items-center justify-center gap-3 sm:gap-4 transition-all shadow-xl active:scale-95 disabled:bg-stone-200 text-sm sm:text-base"
              >
                Secure Atmos Checkout <ArrowRight size={16} className="sm:w-5 sm:h-5" />
              </button>

              <div className="flex items-center justify-center gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-stone-100">
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/29/Paystack_Logo.png" alt="Paystack" className="h-5 sm:h-6 opacity-40 grayscale" />
                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-stone-300">Secured with Paystack</span>
              </div>
            </div>
          )}

          {step === 'processing' && (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-8 sm:space-y-10 py-12 sm:py-20 animate-reveal-up">
              <div className="relative">
                <div className="absolute inset-0 bg-orange-400/20 blur-[40px] sm:blur-[60px] rounded-full animate-pulse" />
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center">
                  <Loader2 size={60} className="sm:w-20 sm:h-20 text-amber-950 animate-spin" strokeWidth={1} />
                  <Sparkles className="absolute text-amber-400 animate-pulse w-8 h-8 sm:w-8 sm:h-8" size={24} />
                </div>
              </div>
              <div className="space-y-3 sm:space-y-4 px-4">
                <h3 className="text-2xl sm:text-4xl font-serif font-black text-amber-950">Verifying Transfer</h3>
                <p className="text-stone-400 font-medium text-sm sm:text-lg leading-relaxed max-w-xs sm:max-w-sm">
                  Our Atmos Concierge is reaching out to financial hubs to sync your payment. One moment...
                </p>
              </div>
            </div>
          )}

          {step === 'payment-instructions' && (
            <PaymentInstructions 
              onClose={onClose}
              onPaymentSuccess={onPaymentSuccess}
            />
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
