import React, { useState, useEffect } from 'react';
import { X, MapPin, Loader2, Search, CheckCircle2, ChevronRight, AlertCircle, ShieldCheck, Landmark, Navigation, ArrowRight, Sparkles, ChefHat } from 'lucide-react';
import { ILORIN_AREAS, getAllLGAs, getAreasByLGA, getAreaById, getKitchenLocation } from '../services/ilorinAreas';
import { calculateDistance } from '../services/geocoding';
import { getCurrentLocation, getAddressSuggestions, formatAddressHelp, UserLocation } from '../services/locationHelper';
import PaymentInstructions from './PaymentInstructions';

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
  deliveryDistance?: number;
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
  const [addressInput, setAddressInput] = useState('');
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [geocodingError, setGeocodingError] = useState<string | null>(null);
  const [addressFormatError, setAddressFormatError] = useState<string | null>(null);
  
  // Area selection state
  const [selectedLGA, setSelectedLGA] = useState<string>('');
  const [selectedArea, setSelectedArea] = useState<string>('');
  const [isFindingLocation, setIsFindingLocation] = useState(false);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [showAddressHelp, setShowAddressHelp] = useState(false);
  const [addressSuggestions, setAddressSuggestions] = useState<any[]>([]);
  const [locationConfirmed, setLocationConfirmed] = useState(false);
  const [details, setDetails] = useState<CheckoutDetails>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    deliveryMethod: 'delivery',
    deliveryCoordinates: undefined,
    deliveryDistance: undefined,
    paymentMethod: 'card' // Default to card for Paystack redirection
  });

  const mapRef = React.useRef<any>(null);
  const markerRef = React.useRef<any>(null);

  useEffect(() => {
    if (isOpen && details.deliveryMethod === 'delivery' && step === 'details' && !mapRef.current) {
      // Small delay to ensure the container is rendered
      setTimeout(() => {
        const mapContainer = document.getElementById('delivery-map');
        if (!mapContainer) return;

        // Initialize map centered on the Kitchen area
        const center = [KITCHEN_COORDS.lat, KITCHEN_COORDS.lng];
        mapRef.current = (window as any).L.map('delivery-map').setView(center, 15);

        (window as any).L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap'
        }).addTo(mapRef.current);

        // Add draggable marker
        markerRef.current = (window as any).L.marker(center, { draggable: true }).addTo(mapRef.current);

        markerRef.current.on('dragend', () => {
          const pos = markerRef.current.getLatLng();
          const dist = getDistance(KITCHEN_COORDS.lat, KITCHEN_COORDS.lng, pos.lat, pos.lng);
          setDetails(prev => ({
            ...prev,
            deliveryCoordinates: { lat: pos.lat, lng: pos.lng },
            deliveryDistance: dist
          }));
        });

        // Initial distance
        const dist = getDistance(KITCHEN_COORDS.lat, KITCHEN_COORDS.lng, center[0], center[1]);
        setDetails(prev => ({
          ...prev,
          deliveryCoordinates: { lat: center[0], lng: center[1] },
          deliveryDistance: dist
        }));
      }, 100);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [isOpen, details.deliveryMethod, step]);

  const getItemPriceWithProteins = (item: CartItem) => {
    const proteinTotal = item.selectedProteins?.reduce((sum, p) => sum + p.price, 0) || 0;
    return item.price + proteinTotal;
  };

  const subtotal = items.reduce((sum, item) => sum + (getItemPriceWithProteins(item) * item.quantity), 0);

  // Kitchen Location (Oke Ogba, opposite nepa office, afon road, Ilorin)
  // Using central Ilorin coordinates as most accurate reference point
  // TODO: Get exact GPS coordinates for NEPA office for maximum accuracy
  const KITCHEN_COORDS = { lat: 8.5000, lng: 4.5500 };

  const calculateFee = (dist: number) => {
    // Base delivery fee is ₦1000 for any delivery
    // Add ₦150 per km after first 2km
    const baseFee = 1000;
    if (dist <= 2) return baseFee;
    return baseFee + Math.ceil(dist - 2) * 150;
  };

  const deliveryFee = details.deliveryMethod === 'pickup' ? 0 : (details.deliveryDistance ? calculateFee(details.deliveryDistance) : 1000);
  const total = subtotal + deliveryFee;

  // Haversine Distance Formula
  const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
  };

  // Simple area selection handlers
  const handleLGAChange = (lga: string) => {
    setSelectedLGA(lga);
    setSelectedArea(''); // Reset area when LGA changes
    setLocationConfirmed(false);
    setGeocodingError(null);
  };

  const handleAreaChange = (areaId: string) => {
    setSelectedArea(areaId);
    setLocationConfirmed(false);
    setGeocodingError(null);
  };

  // Address detail handlers for preset locations
  const handleStreetNameChange = (streetName: string) => {
    setAddressInput(prev => {
      const parts = prev.split(', ');
      parts[0] = streetName;
      return parts.join(', ');
    });
    setLocationConfirmed(false);
    setGeocodingError(null);
  };

  const handleRoadNameChange = (roadName: string) => {
    setAddressInput(prev => {
      const parts = prev.split(', ');
      if (parts.length < 2) parts.push(roadName);
      else parts[1] = roadName;
      return parts.join(', ');
    });
    setLocationConfirmed(false);
    setGeocodingError(null);
  };

  const handleAreaNameChange = (areaName: string) => {
    setAddressInput(prev => {
      const parts = prev.split(', ');
      if (parts.length < 3) parts.push(areaName);
      else parts[2] = areaName;
      return parts.join(', ');
    });
    setLocationConfirmed(false);
    setGeocodingError(null);
  };

  const handleFindLocation = async () => {
    if (!selectedArea) {
      setGeocodingError('Please select an area');
      return;
    }

    setIsFindingLocation(true);
    setGeocodingError(null);

    try {
      const area = getAreaById(selectedArea);
      if (!area) {
        setGeocodingError('Invalid area selected');
        return;
      }

      const kitchen = getKitchenLocation();
      const distance = calculateDistance(
        kitchen.coordinates.lat,
        kitchen.coordinates.lng,
        area.coordinates.lat,
        area.coordinates.lng
      );

      console.log('Area selected:', area.name);
      console.log('Distance from kitchen:', distance);

      setDetails(prev => ({
        ...prev,
        address: `${area.name}, ${area.lga}`,
        deliveryDistance: distance
      }));

      setLocationConfirmed(true);
      setUserLocation({
        area: area.name,
        coordinates: area.coordinates
      });

    } catch (error) {
      console.error('Location finding error:', error);
      setGeocodingError('Failed to get location. Please try again.');
    } finally {
      setIsFindingLocation(false);
    }
  };

  const handleDetectLocation = async () => {
    setIsDetectingLocation(true);
    try {
      const location = await getCurrentLocation();
      setUserLocation(location);
      setLocationConfirmed(true);
      
      // Get address suggestions based on detected area
      const suggestions = getAddressSuggestions(location.area);
      setAddressSuggestions(suggestions);
      setShowAddressHelp(true);
      
      // Auto-fill address input with a good example
      if (suggestions.length > 0 && suggestions[0].examples.length > 0) {
        setAddressInput(suggestions[0].examples[0]);
      }
    } catch (error) {
      console.error('Location detection failed:', error);
      // Still show general address help even if location detection fails
      const suggestions = getAddressSuggestions();
      setAddressSuggestions(suggestions);
      setShowAddressHelp(true);
    } finally {
      setIsDetectingLocation(false);
    }
  };

  // Create order function (placeholder - would connect to backend)
  const createOrder = async (orderData: any) => {
    console.log('Creating order:', orderData);
    
    try {
      const response = await fetch('http://atmosfoodin.onrender.com/api/orders', {
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

      if (details.deliveryMethod === 'delivery' && !details.address) {
        throw new Error('Please provide delivery address');
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
        deliveryCoordinates: details.deliveryCoordinates,
        deliveryDistance: details.deliveryDistance,
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
                            {details.deliveryDistance && (
                              <span className="text-[10px] font-black text-amber-600 bg-amber-50 px-2 py-1 rounded-md border border-amber-100 uppercase tracking-widest">
                                Distance: {details.deliveryDistance.toFixed(1)} KM
                              </span>
                            )}
                          </div>
                        </div>
                        
                        {/* Area Selection Dropdowns */}
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Select LGA</label>
                            <select
                              value={selectedLGA}
                              onChange={(e) => handleLGAChange(e.target.value)}
                              className={`w-full px-3 py-3 sm:px-4 sm:py-4 rounded-xl sm:rounded-2xl text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 ${
                                locationConfirmed 
                                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900' 
                                  : 'bg-stone-50 border-stone-200 text-stone-900'
                              }`}
                            >
                              <option value="">Choose LGA...</option>
                              {getAllLGAs().map(lga => (
                                <option key={lga} value={lga}>{lga}</option>
                              ))}
                            </select>
                          </div>

                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Select Area</label>
                            <select
                              value={selectedArea}
                              onChange={(e) => handleAreaChange(e.target.value)}
                              disabled={!selectedLGA}
                              className={`w-full px-3 py-3 sm:px-4 sm:py-4 rounded-xl sm:rounded-2xl text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 ${
                                locationConfirmed 
                                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900' 
                                  : selectedLGA
                                  ? 'bg-stone-50 border-stone-200 text-stone-900'
                                  : 'bg-stone-100 border-stone-300 text-stone-500 cursor-not-allowed'
                              } disabled:cursor-not-allowed`}
                            >
                              <option value="">Choose Area...</option>
                              {selectedLGA && getAreasByLGA(selectedLGA).map(area => (
                                <option key={area.id} value={area.id}>{area.name}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* Find Location Button */}
                        <div className="flex gap-2">
                          <div className="relative flex-1">
                            <button
                              onClick={handleFindLocation}
                              disabled={!selectedArea || isFindingLocation}
                              className={`w-full py-3 sm:py-4 rounded-xl sm:rounded-2xl font-black flex items-center justify-center gap-3 sm:gap-4 transition-all shadow-xl active:scale-95 text-sm sm:text-base ${
                                locationConfirmed
                                  ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                                  : 'bg-amber-950 text-white hover:bg-black'
                              } disabled:bg-stone-200 disabled:cursor-not-allowed`}
                            >
                              {isFindingLocation ? (
                                <>
                                  <Loader2 size={16} className="animate-spin" />
                                  Finding Location...
                                </>
                              ) : (
                                <>
                                  <Search size={16} />
                                  Find Location
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                        
                        {/* Address Format Error */}
                        {addressFormatError && !locationConfirmed && (
                          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                            <p className="text-amber-700 text-xs font-medium flex items-center gap-2">
                              <span className="w-1 h-1 bg-amber-500 rounded-full animate-pulse"></span>
                              {addressFormatError}
                            </p>
                          </div>
                        )}
                        
                        {geocodingError && (
                          <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                            <p className="text-red-600 text-xs font-medium">{geocodingError}</p>
                          </div>
                        )}
                        
                        {/* Location Confirmation */}
                        {locationConfirmed && userLocation && (
                          <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                            <div className="flex items-center gap-2">
                              <CheckCircle2 size={16} className="text-emerald-600" />
                              <span className="text-sm font-medium text-emerald-800">
                                Area has been detected: {userLocation.area}
                              </span>
                            </div>
                          </div>
                        )}
                        
                        {/* Address Suggestions */}
                        {showAddressHelp && addressSuggestions.length > 0 && (
                          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-3">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-black text-blue-900 flex items-center gap-2">
                                <MapPin size={14} className="text-blue-600" />
                                Address Help for {userLocation?.area || 'Your Area'}
                              </h4>
                              <button
                                onClick={() => setShowAddressHelp(false)}
                                className="text-blue-400 hover:text-blue-600 text-xs"
                              >
                                ✕
                              </button>
                            </div>
                            
                            {addressSuggestions.map((suggestion, index) => (
                              <div key={index} className="space-y-2">
                                <p className="text-xs font-black text-blue-800">
                                  Format: {suggestion.format}
                                </p>
                                <div className="space-y-1">
                                  <p className="text-xs font-medium text-blue-700">Examples:</p>
                                  {suggestion.examples.map((example, exIndex) => (
                                    <button
                                      key={exIndex}
                                      onClick={() => setAddressInput(example)}
                                      className="block w-full text-left text-xs text-blue-600 hover:text-blue-800 hover:bg-blue-100 p-2 rounded transition-colors"
                                    >
                                      📍 {example}
                                    </button>
                                  ))}
                                </div>
                                {suggestion.landmarks && suggestion.landmarks.length > 0 && (
                                  <div className="mt-2">
                                    <p className="text-xs font-medium text-blue-700">Nearby Landmarks:</p>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                      {suggestion.landmarks.map((landmark, lmIndex) => (
                                        <span key={lmIndex} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                          {landmark}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {/* Address Format Guide */}
                        {!locationConfirmed && (
                          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-3">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-black text-blue-900 flex items-center gap-2">
                                <MapPin size={14} className="text-blue-600" />
                                Address Format Guide
                              </h4>
                            </div>
                            
                            <div className="space-y-2">
                              <p className="text-xs font-black text-blue-800">Required Format:</p>
                              <p className="text-xs text-blue-700 font-medium">
                                <strong>House Number</strong>, <strong>Street Name</strong>, <strong>Area Name</strong>
                              </p>
                              
                              <div className="space-y-2">
                                  <p className="text-xs font-medium text-blue-700">Good Examples (All Ilorin Areas):</p>
                                  <div className="space-y-2">
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                      <p className="text-xs text-blue-800 font-medium mb-1">Central Areas:</p>
                                      <button
                                        onClick={() => {
                                          handleStreetNameChange("NEPA Office");
                                          handleRoadNameChange("Afon Road");
                                          handleAreaNameChange("Oke Ogba");
                                        }}
                                        className="block w-full text-left text-xs text-blue-600 hover:text-blue-800"
                                      >
                                        📍 Street: NEPA Office → Road: Afon Road → Area: Oke Ogba
                                      </button>
                                      <button
                                        onClick={() => {
                                          handleStreetNameChange("Kwara Hotel");
                                          handleRoadNameChange("Road");
                                          handleAreaNameChange("GRA");
                                        }}
                                        className="block w-full text-left text-xs text-blue-600 hover:text-blue-800"
                                      >
                                        📍 Street: Kwara Hotel → Road: Road → Area: GRA
                                      </button>
                                    </div>
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                      <p className="text-xs text-blue-800 font-medium mb-1">Educational Areas:</p>
                                      <button
                                        onClick={() => {
                                          handleStreetNameChange("University");
                                          handleRoadNameChange("Road");
                                          handleAreaNameChange("Tanke");
                                        }}
                                        className="block w-full text-left text-xs text-blue-600 hover:text-blue-800"
                                      >
                                        📍 Street: University → Road: Road → Area: Tanke
                                      </button>
                                    </div>
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                      <p className="text-xs text-blue-800 font-medium mb-1">Southern Areas:</p>
                                      <button
                                        onClick={() => {
                                          handleStreetNameChange("Market");
                                          handleRoadNameChange("Road");
                                          handleAreaNameChange("Asadam");
                                        }}
                                        className="block w-full text-left text-xs text-blue-600 hover:text-blue-800"
                                      >
                                        📍 Street: Market → Road: Road → Area: Asadam
                                      </button>
                                      <button
                                        onClick={() => {
                                          handleStreetNameChange("Sango");
                                          handleRoadNameChange("Junction");
                                          handleAreaNameChange("Sango");
                                        }}
                                        className="block w-full text-left text-xs text-blue-600 hover:text-blue-800"
                                      >
                                        📍 Street: Sango → Road: Junction → Area: Sango
                                      </button>
                                    </div>
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                      <p className="text-xs text-blue-800 font-medium mb-1">Airport Area:</p>
                                      <button
                                        onClick={() => {
                                          handleStreetNameChange("Ilorin International");
                                          handleRoadNameChange("Airport");
                                          handleAreaNameChange("Airport");
                                        }}
                                        className="block w-full text-left text-xs text-blue-600 hover:text-blue-800"
                                      >
                                        📍 Street: Ilorin International → Road: Airport → Area: Airport
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              
                              <div className="mt-3 p-2 bg-blue-100 rounded-lg">
                                <p className="text-xs text-blue-800">
                                  <strong>✅ Include:</strong> House number, street name, and Ilorin area name<br/>
                                  <strong>❌ Avoid:</strong> Only "Ilorin" or vague descriptions
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {/* General Address Help Button */}
                        {!showAddressHelp && !locationConfirmed && (
                          <button
                            onClick={() => {
                              const suggestions = getAddressSuggestions(userLocation?.area);
                              setAddressSuggestions(suggestions);
                              setShowAddressHelp(true);
                            }}
                            className="text-xs text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1"
                          >
                            <MapPin size={12} />
                            Need more help with addresses?
                          </button>
                        )}
                        
                        {details.address && (
                          <div className="bg-green-50 border border-green-200 rounded-xl p-3">
                            <p className="text-green-700 text-xs font-medium flex items-center gap-2">
                              <MapPin size={12} className="text-green-500" />
                              {details.address}
                            </p>
                          </div>
                        )}
                        
                        <div
                          id="delivery-map"
                          className="w-full h-36 sm:h-48 bg-stone-100 rounded-xl sm:rounded-[2rem] border-2 border-stone-100 overflow-hidden z-0"
                          style={{ minHeight: '150px' }}
                        />
                        
                        <p className="text-[8px] sm:text-[9px] text-stone-400 font-bold uppercase tracking-widest flex items-center gap-2">
                          <MapPin size={10} className="sm:w-3 sm:h-3 text-amber-500" /> Enter address above or drag marker to adjust location
                        </p>
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
                disabled={!details.fullName || (details.deliveryMethod === 'delivery' && (!details.address || !details.deliveryDistance)) || !details.phone}
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
