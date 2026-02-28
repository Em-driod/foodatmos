import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Clock, 
  MapPin, 
  Package, 
  CheckCircle, 
  AlertCircle, 
  ArrowLeft, 
  ArrowRight,
  Copy,
  Phone,
  MessageCircle,
  ChefHat,
  Truck,
  User,
  Calendar,
  CreditCard
} from 'lucide-react';
import { Order, OrderStorageService } from '../services/orderStorage';

const OrderDetail: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const loadOrder = async () => {
      try {
        if (orderId) {
          const foundOrder = OrderStorageService.getOrderById(orderId);
          setOrder(foundOrder);
        }
      } catch (error) {
        console.error('Error loading order:', error);
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [orderId]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'preparing': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'ready': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'out-for-delivery': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'completed': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      case 'cancelled': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-stone-600 bg-stone-50 border-stone-200';
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'preparing': return <ChefHat size={20} className="animate-pulse" />;
      case 'ready': return <Package size={20} />;
      case 'out-for-delivery': return <Truck size={20} />;
      case 'completed': return <CheckCircle size={20} />;
      case 'cancelled': return <AlertCircle size={20} />;
      default: return <Package size={20} />;
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'preparing': return 'Preparing';
      case 'ready': return 'Ready for Pickup';
      case 'out-for-delivery': return 'Out for Delivery';
      case 'completed': return 'Completed';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-NG', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getEstimatedTime = (date?: Date) => {
    if (!date) return 'Calculating...';
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    
    if (diff <= 0) return 'Any moment now';
    
    const minutes = Math.floor(diff / 60000);
    if (minutes < 60) return `~${minutes} minutes`;
    
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `~${hours}h ${remainingMinutes}m`;
  };

  const handleWhatsAppContact = () => {
    const message = `Hello ATMOS FOOD NG, I'm inquiring about my order ${order?.orderReference} (Verification Code: ${order?.verificationCode}).`;
    const whatsappUrl = `https://wa.me/2348075389127?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fcfcfc] flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-stone-400 font-bold uppercase tracking-widest text-[10px]">Loading Order Details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-[#fcfcfc] flex items-center justify-center p-6">
        <div className="text-center space-y-6 max-w-md">
          <AlertCircle size={64} className="mx-auto text-stone-300" />
          <div>
            <h2 className="text-2xl font-serif font-black text-stone-600 mb-2">Order Not Found</h2>
            <p className="text-stone-400 mb-6">The order you're looking for doesn't exist or has been removed.</p>
            <button
              onClick={() => navigate('/orders')}
              className="bg-amber-950 hover:bg-black text-white px-6 py-3 rounded-xl font-black flex items-center gap-2 transition-all mx-auto"
            >
              <ArrowLeft size={16} />
              Back to Orders
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfcfc] p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/orders')}
            className="flex items-center gap-2 text-stone-600 hover:text-amber-950 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-black uppercase tracking-widest text-[10px]">Back to Orders</span>
          </button>
          
          <div className="flex items-center gap-3">
            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-black uppercase tracking-widest border ${getStatusColor(order.status)}`}>
              {getStatusIcon(order.status)}
              {getStatusText(order.status)}
            </span>
          </div>
        </div>

        {/* Order Header */}
        <div className="bg-white rounded-3xl shadow-sm border border-stone-100 p-8 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-serif font-black text-amber-950">{order.orderReference}</h1>
              <div className="flex items-center gap-4 text-stone-600">
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span className="text-sm">{formatDate(order.createdAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Package size={16} />
                  <span className="text-sm">{order.items.length} items</span>
                </div>
              </div>
            </div>

            <div className="text-right space-y-2">
              <div className="text-3xl font-serif font-black text-amber-950">₦{order.totalAmount.toLocaleString()}</div>
              <div className="text-sm text-stone-400">Total Amount</div>
            </div>
          </div>
        </div>

        {/* Verification Code */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-dashed border-amber-200 rounded-3xl p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center">
                <CreditCard size={20} className="text-amber-950" />
              </div>
              <div>
                <div className="text-sm font-black text-amber-800 uppercase tracking-widest">Verification Code</div>
                <div className="text-2xl font-serif font-black text-amber-950 tracking-[0.2em]">
                  {order.verificationCode}
                </div>
              </div>
            </div>
            
            <button
              onClick={() => copyToClipboard(order.verificationCode)}
              className="bg-amber-100 hover:bg-amber-200 text-amber-700 px-4 py-2 rounded-xl font-black text-sm transition-all flex items-center gap-2"
            >
              <Copy size={16} />
              {copied ? 'Copied!' : 'Copy Code'}
            </button>
          </div>
          
          <div className="mt-4 text-sm text-amber-700">
            {order.deliveryMethod === 'pickup'
              ? "Present this code at Atmos HQ to claim your order"
              : "Show this code to your rider to verify delivery"
            }
          </div>
        </div>

        {/* Order Progress */}
        <div className="bg-white rounded-3xl shadow-sm border border-stone-100 p-8 mb-6">
          <h2 className="text-xl font-serif font-black text-amber-950 mb-6">Order Progress</h2>
          
          <div className="space-y-4">
            <div className={`flex items-center gap-4 p-4 rounded-xl ${order.status === 'preparing' ? 'bg-amber-50 border border-amber-200' : 'bg-stone-50'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${order.status === 'preparing' ? 'bg-amber-400 text-white' : 'bg-emerald-500 text-white'}`}>
                {order.status === 'preparing' ? <ChefHat size={20} className="animate-pulse" /> : <CheckCircle size={20} />}
              </div>
              <div className="flex-1">
                <div className="font-black text-amber-950"> your Order will be ready in the next 10 minutes</div>
                
              </div>
            </div>

            <div className={`flex items-center gap-4 p-4 rounded-xl ${order.status === 'ready' ? 'bg-blue-50 border border-blue-200' : order.status === 'out-for-delivery' || order.status === 'completed' ? 'bg-emerald-50 border border-emerald-200' : 'bg-stone-50'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${order.status === 'ready' ? 'bg-blue-400 text-white' : order.status === 'out-for-delivery' || order.status === 'completed' ? 'bg-emerald-500 text-white' : 'bg-stone-300 text-white'}`}>
                {order.status === 'ready' ? <Package size={20} /> : order.status === 'out-for-delivery' || order.status === 'completed' ? <CheckCircle size={20} /> : <Package size={20} />}
              </div>
              <div className="flex-1">
                <div className="font-black text-amber-950">Order Ready</div>
                <div className="text-sm text-stone-600">
                  {order.deliveryMethod === 'pickup' 
                    ? 'Your order is ready for pickup'
                    : 'Your order is ready and waiting for delivery'
                  }
                </div>
              </div>
            </div>

            {order.deliveryMethod === 'delivery' && (
              <div className={`flex items-center gap-4 p-4 rounded-xl ${order.status === 'out-for-delivery' ? 'bg-purple-50 border border-purple-200' : order.status === 'completed' ? 'bg-emerald-50 border border-emerald-200' : 'bg-stone-50'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${order.status === 'out-for-delivery' ? 'bg-purple-400 text-white' : order.status === 'completed' ? 'bg-emerald-500 text-white' : 'bg-stone-300 text-white'}`}>
                  {order.status === 'out-for-delivery' ? <Truck size={20} className="animate-pulse" /> : order.status === 'completed' ? <CheckCircle size={20} /> : <Truck size={20} />}
                </div>
                <div className="flex-1">
                  <div className="font-black text-amber-950">Out for Delivery</div>
                  <div className="text-sm text-stone-600">
                    {order.status === 'out-for-delivery' 
                      ? `Estimated arrival: ${getEstimatedTime(order.estimatedDeliveryTime)}`
                      : 'Your order will be delivered soon'
                    }
                  </div>
                </div>
              </div>
            )}

            <div className={`flex items-center gap-4 p-4 rounded-xl ${order.status === 'completed' ? 'bg-emerald-50 border border-emerald-200' : 'bg-stone-50'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${order.status === 'completed' ? 'bg-emerald-500 text-white' : 'bg-stone-300 text-white'}`}>
                <CheckCircle size={20} />
              </div>
              <div className="flex-1">
                <div className="font-black text-amber-950">Order Completed</div>
                <div className="text-sm text-stone-600">
                  {order.status === 'completed' 
                    ? 'Your order has been successfully delivered'
                    : 'Waiting for completion'
                  }
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-3xl shadow-sm border border-stone-100 p-8 mb-6">
          <h2 className="text-xl font-serif font-black text-amber-950 mb-6">Order Items</h2>
          
          <div className="space-y-4">
            {order.items.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-stone-50 rounded-xl">
                <div className="flex-1">
                  <div className="font-black text-amber-950">{item.name}</div>
                  <div className="text-sm text-stone-600">
                    Quantity: {item.quantity}
                    {item.selectedProteins && item.selectedProteins.length > 0 && (
                      <span className="ml-2">
                        • {item.selectedProteins.map(p => p.name).join(', ')}
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-black text-amber-950">
                    ₦{((item.price + (item.selectedProteins?.reduce((sum, p) => sum + p.price, 0) || 0)) * item.quantity).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-stone-200 space-y-2">
            <div className="flex justify-between text-stone-600">
              <span>Subtotal</span>
              <span>₦{order.subtotal.toLocaleString()}</span>
            </div>
            {order.deliveryFee > 0 && (
              <div className="flex justify-between text-stone-600">
                <span>Delivery Fee</span>
                <span>₦{order.deliveryFee.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between text-xl font-black text-amber-950 pt-2 border-t border-stone-200">
              <span>Total</span>
              <span>₦{order.totalAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Delivery/Pickup Info */}
        <div className="bg-white rounded-3xl shadow-sm border border-stone-100 p-8 mb-6">
          <h2 className="text-xl font-serif font-black text-amber-950 mb-6">
            {order.deliveryMethod === 'pickup' ? 'Pickup Information' : 'Delivery Information'}
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <User size={20} className="text-stone-400" />
              <div>
                <div className="text-sm text-stone-400">Customer Name</div>
                <div className="font-black text-amber-950">{order.customerName}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone size={20} className="text-stone-400" />
              <div>
                <div className="text-sm text-stone-400">Phone Number</div>
                <div className="font-black text-amber-950">{order.phone}</div>
              </div>
            </div>

            {order.deliveryMethod === 'delivery' ? (
              <>
                <div className="flex items-center gap-3">
                  <MapPin size={20} className="text-stone-400" />
                  <div>
                    <div className="text-sm text-stone-400">Delivery Address</div>
                    <div className="font-black text-amber-950">{order.address}</div>
                    {order.deliveryLGA && (
                      <div className="text-sm text-stone-600">{order.deliveryLGA}</div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Package size={20} className="text-stone-400" />
                <div>
                  <div className="text-sm text-stone-400">Pickup Location</div>
                  <div className="font-black text-amber-950">Atmos Kitchen HQ</div>
                  <div className="text-sm text-stone-600">Present your verification code</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleWhatsAppContact}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-3 transition-all"
          >
            <MessageCircle size={20} />
            Contact on WhatsApp
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="flex-1 bg-amber-950 hover:bg-black text-white py-4 rounded-2xl font-black flex items-center justify-center gap-3 transition-all"
          >
            <ArrowRight size={20} />
            Order Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
