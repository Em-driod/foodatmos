
export interface FoodItem {
  id: string;
  _id?: string;
  name: string;
  description: string;
  price: number;
  category: FoodCategory;
  image: string;
  rating: number;
  calories: number;
  tags: string[];
  proteins?: ProteinOption[];
}

export enum FoodCategory {
  ALL = 'All',
  GRAINS = 'Grains',
  SIDES = 'Sides',
  DRINKS = 'Drinks'
}

export interface CartItem extends FoodItem {
  cartItemId: string;
  quantity: number;
  selectedProteins?: ProteinOption[];
}

export interface ProteinOption {
  id: string;
  _id?: string;
  name: string;
  price: number;
}

export interface CheckoutDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  deliveryMethod: 'delivery' | 'pickup';
  deliveryCoordinates?: { lat: number; lng: number };
  deliveryDistance?: number;
  paymentMethod: 'card' | 'bank_transfer';
}
