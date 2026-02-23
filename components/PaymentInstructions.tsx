import React, { useState, useEffect } from 'react';
import { X, MessageCircle, CheckCircle2, AlertCircle, Copy, Phone, Building2, ArrowRight } from 'lucide-react';

interface PaymentInstructionsProps {
  onClose: () => void;
  onPaymentSuccess: () => void;
}

const PaymentInstructions: React.FC<PaymentInstructionsProps> = ({ onClose, onPaymentSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderData, setOrderData] = useState<any>(null);

  const subtotal = typeof orderData?.subtotal === 'number' ? orderData.subtotal : undefined;
  const deliveryFee = typeof orderData?.deliveryFee === 'number' ? orderData.deliveryFee : undefined;
  const computedTotal =
    typeof subtotal === 'number' && typeof deliveryFee === 'number'
      ? subtotal + deliveryFee
      : undefined;
  const totalToPay = typeof computedTotal === 'number' ? computedTotal : orderData?.totalAmount;

  useEffect(() => {
    const pendingOrder = sessionStorage.getItem('pendingOrder');
    if (pendingOrder) {
      setOrderData(JSON.parse(pendingOrder));
    }
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const handleWhatsAppShare = () => {
    const phoneNumber = '2348075389127';
    const message = `Hello ATMOS FOOD NG, I've made a payment for order ${orderData?.orderReference}. Please verify my payment. Order ID: ${orderData?.orderId}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handlePaymentConfirmation = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Simulate payment confirmation - just mark as confirmed
      // The order is already created in backend, just move to success
      sessionStorage.removeItem('pendingOrder');
      sessionStorage.removeItem('verificationCode');
      sessionStorage.removeItem('deliveryMethod');
      
      // Move to success step
      onPaymentSuccess();
    } catch (err: any) {
      setError(err.message || 'Failed to confirm payment');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!orderData) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-stone-400">Loading payment instructions...</div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col animate-reveal-up">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-stone-100">
        <div>
          <h3 className="text-2xl font-serif font-black text-amber-950">Payment Instructions</h3>
          <p className="text-stone-400 text-sm">Complete your payment to confirm order</p>
        </div>
        <button
          onClick={onClose}
          className="text-stone-300 hover:text-amber-950 transition-colors p-2"
        >
          <X size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* Order Summary */}
        <div className="bg-amber-50 border-2 border-amber-200 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-amber-800 font-black">Order Reference:</span>
            <span className="text-amber-950 font-black font-mono">{orderData?.orderReference}</span>
          </div>

          {typeof subtotal === 'number' && (
            <div className="flex items-center justify-between">
              <span className="text-amber-800 font-black">Goods:</span>
              <span className="text-amber-950 font-black">₦{subtotal.toLocaleString()}</span>
            </div>
          )}

          {typeof deliveryFee === 'number' && (
            <div className="flex items-center justify-between">
              <span className="text-amber-800 font-black">Delivery Fee:</span>
              <span className="text-amber-950 font-black">₦{deliveryFee.toLocaleString()}</span>
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="text-amber-800 font-black">Amount to Pay:</span>
            <span className="text-amber-950 font-black text-xl">₦{totalToPay?.toLocaleString?.() ?? totalToPay}</span>
          </div>
        </div>

        {/* Payment Instructions */}
        <div className="bg-stone-50 border-2 border-stone-200 rounded-3xl p-6 space-y-6">
          <h4 className="text-lg font-black text-stone-900 flex items-center gap-2">
            <Building2 size={20} className="text-amber-500" />
            Bank Transfer Details
          </h4>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-stone-200">
              <span className="text-stone-600 font-medium">Bank Name:</span>
              <div className="flex items-center gap-2">
                <span className="font-black text-stone-900">Moniepoint</span>
                <button
                  onClick={() => copyToClipboard('Moniepoint')}
                  className="text-amber-500 hover:text-amber-600 p-1"
                >
                  <Copy size={16} />
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-stone-200">
              <span className="text-stone-600 font-medium">Account Number:</span>
              <div className="flex items-center gap-2">
                <span className="font-black text-stone-900 font-mono">5228829625</span>
                <button
                  onClick={() => copyToClipboard('5228829625')}
                  className="text-amber-500 hover:text-amber-600 p-1"
                >
                  <Copy size={16} />
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-stone-200">
              <span className="text-stone-600 font-medium">Account Name:</span>
              <div className="flex items-center gap-2">
                <span className="font-black text-stone-900">ATMOS FOOD NG</span>
                <button
                  onClick={() => copyToClipboard('ATMOS FOOD NG')}
                  className="text-amber-500 hover:text-amber-600 p-1"
                >
                  <Copy size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* WhatsApp Instructions */}
        <div className="bg-green-50 border-2 border-green-200 rounded-3xl p-6 space-y-4">
          <h4 className="text-lg font-black text-green-900 flex items-center gap-2">
            <MessageCircle size={20} className="text-green-600" />
            Send Receipt on WhatsApp
          </h4>
          
          <div className="space-y-4">
            <p className="text-green-800 text-sm leading-relaxed">
              After making payment, send a screenshot of your receipt to our WhatsApp number for verification:
            </p>
            
            <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-green-200">
              <span className="text-green-600 font-medium">WhatsApp Number:</span>
              <div className="flex items-center gap-2">
                <span className="font-black text-green-900 font-mono">+234 807 538 9127</span>
                <button
                  onClick={() => copyToClipboard('+2348075389127')}
                  className="text-green-600 hover:text-green-700 p-1"
                >
                  <Copy size={16} />
                </button>
              </div>
            </div>

            <button
              onClick={handleWhatsAppShare}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-3 transition-all"
            >
              <MessageCircle size={20} />
              Open WhatsApp
            </button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 flex items-start gap-3">
            <AlertCircle size={20} className="text-red-500 flex-shrink-0" />
            <span className="text-red-700 text-sm font-medium">{error}</span>
          </div>
        )}

        {/* Confirm Payment Button */}
        <button
          onClick={handlePaymentConfirmation}
          disabled={isSubmitting}
          className="w-full bg-amber-950 hover:bg-black text-white py-6 rounded-3xl font-black flex items-center justify-center gap-3 transition-all disabled:bg-stone-300 disabled:cursor-not-allowed shadow-xl"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <CheckCircle2 size={24} />
              <span>When You Have Paid, Submit</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default PaymentInstructions;
