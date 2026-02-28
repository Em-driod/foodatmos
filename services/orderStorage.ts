export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  selectedProteins?: { name: string; price: number }[];
}

export interface Order {
  id: string;
  orderReference: string;
  verificationCode: string;
  items: OrderItem[];
  customerName: string;
  email: string;
  phone: string;
  address: string;
  deliveryMethod: 'pickup' | 'delivery';
  deliveryAreaId?: string;
  deliveryLGA?: string;
  subtotal: number;
  deliveryFee: number;
  totalAmount: number;
  status: 'preparing' | 'ready' | 'out-for-delivery' | 'completed' | 'cancelled';
  createdAt: Date;
  estimatedDeliveryTime?: Date;
}

export class OrderStorageService {
  private static readonly STORAGE_KEY = 'atmos_orders';

  // Save a new order
  static saveOrder(order: Order): void {
    const orders = this.getAllOrders();
    orders.push(order);
    this.saveOrders(orders);
  }

  // Get all orders
  static getAllOrders(): Order[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) return [];
      
      const orders = JSON.parse(stored);
      return orders.map((order: any) => ({
        ...order,
        createdAt: new Date(order.createdAt),
        estimatedDeliveryTime: order.estimatedDeliveryTime ? new Date(order.estimatedDeliveryTime) : undefined
      }));
    } catch (error) {
      console.error('Error loading orders:', error);
      return [];
    }
  }

  // Get order by ID
  static getOrderById(orderId: string): Order | null {
    const orders = this.getAllOrders();
    return orders.find(order => order.id === orderId) || null;
  }

  // Get orders by email
  static getOrdersByEmail(email: string): Order[] {
    const orders = this.getAllOrders();
    return orders.filter(order => order.email.toLowerCase() === email.toLowerCase());
  }

  // Update order status
  static updateOrderStatus(orderId: string, status: Order['status']): void {
    const orders = this.getAllOrders();
    const orderIndex = orders.findIndex(order => order.id === orderId);
    
    if (orderIndex !== -1) {
      orders[orderIndex].status = status;
      
      // Update estimated delivery time based on status
      if (status === 'ready' && orders[orderIndex].deliveryMethod === 'delivery') {
        const now = new Date();
        now.setMinutes(now.getMinutes() + 35); // 35 minutes from now
        orders[orderIndex].estimatedDeliveryTime = now;
      }
      
      this.saveOrders(orders);
    }
  }

  // Delete order
  static deleteOrder(orderId: string): void {
    const orders = this.getAllOrders();
    const filteredOrders = orders.filter(order => order.id !== orderId);
    this.saveOrders(filteredOrders);
  }

  // Save orders array to localStorage
  private static saveOrders(orders: Order[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(orders));
    } catch (error) {
      console.error('Error saving orders:', error);
    }
  }

  // Clear all orders (for testing/debugging)
  static clearAllOrders(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  // Get order statistics
  static getOrderStats(email?: string) {
    const orders = email ? this.getOrdersByEmail(email) : this.getAllOrders();
    
    return {
      total: orders.length,
      preparing: orders.filter(o => o.status === 'preparing').length,
      ready: orders.filter(o => o.status === 'ready').length,
      outForDelivery: orders.filter(o => o.status === 'out-for-delivery').length,
      completed: orders.filter(o => o.status === 'completed').length,
      cancelled: orders.filter(o => o.status === 'cancelled').length,
      totalSpent: orders.reduce((sum, order) => sum + order.totalAmount, 0)
    };
  }
}
