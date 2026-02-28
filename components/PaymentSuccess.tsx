import React, { useEffect, useState } from 'react';
import { CheckCircle2, ChefHat, ArrowRight, Landmark, Loader2, Sparkles, Key, Package } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getOrder } from '../services/api';
import { OrderStorageService, Order } from '../services/orderStorage';

interface PaymentSuccessProps {
    onReturn: () => void;
}

const PaymentSuccess: React.FC<PaymentSuccessProps> = ({ onReturn }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [verificationCode, setVerificationCode] = useState<string>('');
    const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');
    const [latestOrderId, setLatestOrderId] = useState<string | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);

        const params = new URLSearchParams(location.search);
        const reference = params.get('reference');

        // Extract verification codes from session storage (set during checkout)
        const storedCode = sessionStorage.getItem('verificationCode');
        const storedMethod = sessionStorage.getItem('deliveryMethod');
        const pendingOrder = sessionStorage.getItem('pendingOrder');
        
        if (storedCode) {
            setVerificationCode(storedCode);
        }
        if (storedMethod) {
            setDeliveryMethod(storedMethod as 'delivery' | 'pickup');
        }

        // Save order to local storage for history
        if (pendingOrder && storedCode) {
            try {
                const orderData = JSON.parse(pendingOrder);
                
                // Create a complete order object
                const order: Order = {
                    id: orderData.orderId || `order-${Date.now()}`,
                    orderReference: orderData.orderReference || reference || `ATM-${Math.floor(Math.random() * 9000) + 1000}`,
                    verificationCode: storedCode,
                    items: [], // This would be populated from cart data
                    customerName: '', // This would be populated from form data
                    email: '',
                    phone: '',
                    address: '',
                    deliveryMethod: storedMethod as 'delivery' | 'pickup',
                    subtotal: orderData.subtotal || 0,
                    deliveryFee: orderData.deliveryFee || 0,
                    totalAmount: orderData.totalAmount || 0,
                    status: 'preparing',
                    createdAt: new Date(),
                    estimatedDeliveryTime: storedMethod === 'delivery' ? new Date(Date.now() + 35 * 60 * 1000) : undefined
                };

                // Try to get additional order details from session storage
                const checkoutDetails = sessionStorage.getItem('checkoutDetails');
                if (checkoutDetails) {
                    const details = JSON.parse(checkoutDetails);
                    order.customerName = details.fullName || '';
                    order.email = details.email || '';
                    order.phone = details.phone || '';
                    order.address = details.address || '';
                }

                // Try to get cart items from session storage
                const cartItems = sessionStorage.getItem('cartItems');
                if (cartItems) {
                    order.items = JSON.parse(cartItems);
                }

                // Save the order
                OrderStorageService.saveOrder(order);
                setLatestOrderId(order.id);
                
                // Clean up session storage
                sessionStorage.removeItem('pendingOrder');
                sessionStorage.removeItem('verificationCode');
                sessionStorage.removeItem('deliveryMethod');
                sessionStorage.removeItem('checkoutDetails');
                sessionStorage.removeItem('cartItems');
                
            } catch (error) {
                console.error('Error saving order:', error);
            }
        }

        // Don't try to fetch order - it will be created by webhook
        // Just show success message
        setLoading(false);
    }, [location]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#fcfcfc] flex items-center justify-center p-6 text-center">
                <div className="space-y-6">
                    <Loader2 size={48} className="text-orange-950 animate-spin mx-auto" />
                    <p className="text-stone-400 font-bold uppercase tracking-widest text-[10px]">Syncing Atmos Record...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fcfcfc] flex items-center justify-center p-6">
            <div className="max-w-2xl w-full bg-white rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden animate-reveal-up border border-stone-50">
                <div className="relative h-64 bg-orange-950 flex items-center justify-center overflow-hidden">
                    {/* Background patterns */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat" />
                    <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-orange-400/20 blur-[80px] rounded-full" />

                    <div className="relative z-10 scale-[1.2]">
                        <div className="w-32 h-32 bg-orange-400 rounded-full flex items-center justify-center shadow-2xl">
                            <ChefHat size={60} className="text-orange-950" />
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                            <CheckCircle2 size={24} className="text-emerald-500" />
                        </div>
                    </div>
                </div>

                <div className="p-12 md:p-16 text-center space-y-8">
                    <div className="space-y-4">
                        <h2 className="text-5xl font-serif font-black text-orange-950 tracking-tight">Sync Complete!</h2>
                        <div className="inline-block px-6 py-2 bg-orange-50 text-orange-800 rounded-full text-[11px] font-black uppercase tracking-widest border border-orange-100">
                            PAYMENT SECURED BY PAYSTACK
                        </div>
                    </div>

                    <p className="text-stone-400 font-medium text-xl leading-relaxed max-w-md mx-auto">
                        Your legendary pack is being prepared! Our Atmos chefs are already selecting the finest proteins for your order.
                    </p>

                    {verificationCode && (
                        <div className="bg-amber-50 border-2 border-dashed border-orange-200 p-8 rounded-[2.5rem] space-y-4 animate-reveal-up">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center justify-center gap-3 text-orange-800">
                                    <Key size={20} className="text-orange-400" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">Verification Code</span>
                                </div>
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(verificationCode);
                                        alert('Verification code copied to clipboard!');
                                    }}
                                    className="text-xs bg-orange-100 hover:bg-orange-200 text-orange-700 px-3 py-1 rounded-md transition-colors"
                                >
                                    Copy Code
                                </button>
                            </div>
                            <div className="text-3xl font-serif font-black text-orange-950 tracking-[0.2em] animate-pulse">
                                {verificationCode}
                            </div>
                            <p className="text-[10px] font-bold text-orange-800/60 uppercase tracking-widest">
                                {deliveryMethod === 'pickup'
                                    ? "Present this code at Atmos HQ to claim your order"
                                    : "Show this code to your rider to verify delivery"
                                }
                            </p>
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-6 max-w-sm mx-auto">
                        <div className="bg-stone-50 p-6 rounded-3xl border border-stone-100 text-left">
                            <span className="text-[10px] font-black text-stone-300 uppercase tracking-widest block mb-1">Status</span>
                            <span className="text-base font-black text-orange-950">Preparing</span>
                        </div>
                        <div className="bg-stone-50 p-6 rounded-3xl border border-stone-100 text-left">
                            <span className="text-[10px] font-black text-stone-300 uppercase tracking-widest block mb-1">Arrival</span>
                            <span className="text-base font-black text-orange-950">~35 Mins</span>
                        </div>
                    </div>

                    <div className="pt-8 space-y-4">
                        {latestOrderId && (
                            <button
                                onClick={() => navigate(`/order/${latestOrderId}`)}
                                className="w-full bg-amber-100 hover:bg-amber-200 text-amber-950 py-4 rounded-[1.5rem] font-black flex items-center justify-center gap-4 transition-all text-base uppercase tracking-[0.2em]"
                            >
                                <Package size={20} />
                                View Order Details
                            </button>
                        )}
                        
                        <button
                            onClick={() => navigate('/orders')}
                            className="w-full bg-stone-100 hover:bg-stone-200 text-stone-700 py-4 rounded-[1.5rem] font-black flex items-center justify-center gap-4 transition-all text-base uppercase tracking-[0.2em]"
                        >
                            View Order History
                        </button>
                        
                        <button
                            onClick={onReturn}
                            className="w-full bg-amber-950 hover:bg-black text-white py-6 rounded-[1.5rem] font-black flex items-center justify-center gap-4 transition-all shadow-xl active:scale-95 text-base uppercase tracking-[0.2em]"
                        >
                            Return to Kitchen <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                        </button>
                    </div>

                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-300">
                        Check your Telegram for order updates.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;
