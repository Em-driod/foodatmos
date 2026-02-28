import React, { useState, useEffect } from 'react';
import { Clock, MapPin, Package, CheckCircle, AlertCircle, X, ArrowRight, Calendar, Filter, Search } from 'lucide-react';
import { Order, OrderStorageService } from '../services/orderStorage';
import { useNavigate } from 'react-router-dom';

interface OrderHistoryProps {
  email?: string;
  onClose?: () => void;
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ email, onClose }) => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<Order['status'] | 'all'>('all');

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const allOrders = email ? OrderStorageService.getOrdersByEmail(email) : OrderStorageService.getAllOrders();
        setOrders(allOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
        setFilteredOrders(allOrders);
      } catch (error) {
        console.error('Error loading orders:', error);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [email]);

  useEffect(() => {
    let filtered = orders;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(order => 
        order.orderReference.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.verificationCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    setFilteredOrders(filtered);
  }, [orders, searchTerm, statusFilter]);

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
      case 'preparing': return <Clock size={16} className="animate-pulse" />;
      case 'ready': return <Package size={16} />;
      case 'out-for-delivery': return <MapPin size={16} />;
      case 'completed': return <CheckCircle size={16} />;
      case 'cancelled': return <AlertCircle size={16} />;
      default: return <Package size={16} />;
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
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleOrderClick = (orderId: string) => {
    navigate(`/order/${orderId}`);
    onClose?.();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fcfcfc] flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-stone-400 font-bold uppercase tracking-widest text-[10px]">Loading Order History...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfcfc] p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-serif font-black text-amber-950 mb-2">Order History</h1>
            <p className="text-stone-400">Track your Atmos orders and delivery status</p>
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

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6 mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Search by order reference, verification code, or name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-200 outline-none transition-all font-medium"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-stone-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as Order['status'] | 'all')}
                className="px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-200 outline-none transition-all font-medium"
              >
                <option value="all">All Orders</option>
                <option value="preparing">Preparing</option>
                <option value="ready">Ready</option>
                <option value="out-for-delivery">Out for Delivery</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 pt-4 border-t border-stone-100">
            <div className="text-center">
              <div className="text-2xl font-serif font-black text-amber-950">{filteredOrders.length}</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-stone-400">Total Orders</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-serif font-black text-amber-600">{filteredOrders.filter(o => o.status === 'preparing').length}</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-stone-400">Preparing</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-serif font-black text-blue-600">{filteredOrders.filter(o => o.status === 'ready').length}</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-stone-400">Ready</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-serif font-black text-purple-600">{filteredOrders.filter(o => o.status === 'out-for-delivery').length}</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-stone-400">On the Way</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-serif font-black text-emerald-600">{filteredOrders.filter(o => o.status === 'completed').length}</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-stone-400">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-serif font-black text-red-600">{filteredOrders.filter(o => o.status === 'cancelled').length}</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-stone-400">Cancelled</div>
            </div>
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-12 text-center">
            <Package size={64} className="mx-auto text-stone-300 mb-4" />
            <h3 className="text-xl font-serif font-black text-stone-600 mb-2">No Orders Found</h3>
            <p className="text-stone-400">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your filters or search terms.'
                : 'You haven\'t placed any orders yet. Start by ordering from our menu!'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                onClick={() => handleOrderClick(order.id)}
                className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Order Info */}
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <span className="text-sm font-black text-amber-950 font-mono">{order.orderReference}</span>
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {getStatusText(order.status)}
                      </span>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-stone-600">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        {formatDate(order.createdAt)}
                      </div>
                      <div className="flex items-center gap-2">
                        <Package size={14} />
                        {order.items.length} items • ₦{order.totalAmount.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-2">
                        {order.deliveryMethod === 'delivery' ? <MapPin size={14} /> : <Package size={14} />}
                        {order.deliveryMethod === 'delivery' ? 'Delivery' : 'Pickup'}
                      </div>
                    </div>

                    <div className="text-sm">
                      <span className="text-stone-400">Verification:</span>
                      <span className="font-mono text-amber-600 ml-2">{order.verificationCode}</span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex items-center">
                    <ArrowRight size={20} className="text-stone-300 group-hover:text-amber-950 transition-colors" />
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
