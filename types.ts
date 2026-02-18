
export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: FoodCategory;
  image: string;
  rating: number;
  calories: number;
  tags: string[];
}

export enum FoodCategory {
  ALL = 'Full Menu',
  GRAINS = 'The Grains',
  SIDES = 'The Grill & Sides',
  DRINKS = 'Chilled Beverages'
}

export interface CartItem extends FoodItem {
  cartItemId: string;
  quantity: number;
  selectedProteins?: ProteinOption[];
}

export interface ProteinOption {
  id: string;
  name: string;
  price: number;
}

export interface CheckoutDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  paymentMethod: 'card' | 'bank_transfer';
}
