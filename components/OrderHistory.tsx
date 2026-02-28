import React, { useState, useEffect } from 'react';
import { Clock, MapPin, Package, CheckCircle, AlertCircle, X, ArrowRight, Calendar, Copy } from 'lucide-react';
import { Order, OrderStorageService } from '../services/orderStorage';
import { useNavigate, useLocation } from 'react-router-dom';

interface OrderHistoryProps {
  customerEmail?: string;
  onClose?: () => void;
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ customerEmail, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const email = customerEmail || location.state?.customerEmail;
        const allOrders = email ? OrderStorageService.getOrdersByEmail(email) : OrderStorageService.getAllOrders();
        setOrders(allOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      } catch (error) {
        console.error('Error loading orders:', error);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [customerEmail, location.state?.customerEmail]);

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

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'preparing': return 'Preparing';
      case 'ready': return 'Ready';
      case 'out-for-delivery': return 'On the way';
      case 'completed': return 'Delivered';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-NG', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fcfcfc] flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-stone-400 font-bold uppercase tracking-widest text-[10px]">Loading Orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfcfc] p-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-serif font-black text-amber-950 mb-2">My Orders</h1>
            <p className="text-stone-400">What you ordered and picked</p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="text-stone-300 hover:text-amber-950 transition-colors p-2"
            >
              <X size={24} />
            </button>
          )}
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-12 text-center">
            <Package size={64} className="mx-auto text-stone-300 mb-4" />
            <h3 className="text-xl font-serif font-black text-stone-600 mb-2">No Orders Yet</h3>
            <p className="text-stone-400">You haven't placed any orders. Start by ordering from our menu!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden"
              >
                {/* Order Header */}
                <div className="p-6 border-b border-stone-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-black text-amber-950 font-mono">{order.orderReference}</span>
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusColor(order.status)}`}>
                          {getStatusText(order.status)}
                        </span>
                      </div>
                      <div className="text-sm text-stone-600">
                        {formatDate(order.createdAt)} • {order.deliveryMethod === 'delivery' ? 'Delivery' : 'Pickup'}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-serif font-black text-amber-950">₦{order.totalAmount.toLocaleString()}</div>
                      <div className="text-xs text-stone-400">Verification: {order.verificationCode}</div>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <h3 className="text-sm font-black text-stone-400 uppercase tracking-widest mb-4">Items Ordered</h3>
                  <div className="space-y-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between py-3 border-b border-stone-50 last:border-0">
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

                  {/* Order Actions */}
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-stone-100">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => copyToClipboard(order.verificationCode)}
                        className="text-xs bg-amber-100 hover:bg-amber-200 text-amber-700 px-3 py-1 rounded-md transition-all flex items-center gap-1"
                      >
                        <Copy size={12} />
                        Copy Code
                      </button>
                      <span className="text-xs text-stone-400">
                        {order.deliveryMethod === 'pickup' 
                          ? 'Show this code at pickup' 
                          : 'Show this code to rider'
                        }
                      </span>
                    </div>
                    
                    <button
                      onClick={() => navigate(`/order/${order.id}`)}
                      className="text-sm bg-amber-950 hover:bg-black text-white px-4 py-2 rounded-xl font-black transition-all flex items-center gap-2"
                    >
                      View Details
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
