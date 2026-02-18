
import { FoodCategory, FoodItem, ProteinOption } from './types';

export const PROTEIN_OPTIONS: ProteinOption[] = [
  { id: 'p-chicken', name: 'Grilled Chicken', price: 3500 },
  { id: 'p-beef', name: 'Spicy Beef', price: 4000 },
  { id: 'p-fish', name: 'Fried Fish', price: 6500 },
];

export const FOOD_ITEMS: FoodItem[] = [
  // THE GRAINS (THE 3 MAIN DELICACIES)
  {
    id: 'grain-1',
    name: 'Jollof Rice',
    description: 'Authentic Nigerian long-grain rice parboiled in a rich, spicy tomato reduction. The soul of the party.',
    price: 4500,
    category: FoodCategory.GRAINS,
    image: '/jollof.jpeg',
    rating: 4.9,
    calories: 550,
    tags: ['Legendary', 'Spicy']
  },
  {
    id: 'grain-2',
    name: 'Fried Rice',
    description: 'Savory seasoned rice stir-fried with sweet peas, carrots, and aromatic local spices.',
    price: 4500,
    category: FoodCategory.GRAINS,
    image: '/fried.jpeg',
    rating: 4.8,
    calories: 520,
    tags: ['Signature']
  },
  {
    id: 'grain-3',
    name: 'Mixed Rice',
    description: 'A perfect "sync" of both worlds. A half-and-half portion of our Jollof and Fried Rice.',
    price: 5500,
    category: FoodCategory.GRAINS,
    image: '/jollofandfried.jpeg',
    rating: 5.0,
    calories: 540,
    tags: ['Best Value']
  },
  {
    id: 'grain-4',
    name: 'Ofada Rice and Sause',
    description: 'Traditional Nigerian unpolished rice served with a spicy, flavourful stew.',
    price: 6000,
    category: FoodCategory.GRAINS,
    image: '/OFADA RICE, SAUCE & EGG.jpeg',
    rating: 4.7,
    calories: 580,
    tags: ['Traditional', 'Spicy']
  },

  // DRINKS
  {
    id: 'drink-coke-pet',
    name: 'Coca-Cola (PET)',
    description: 'Classic refreshment. Chilled 50cl bottle.',
    price: 800,
    category: FoodCategory.DRINKS,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    calories: 140,
    tags: ['Cold', '50cl']
  },
  {
    id: 'drink-fanta-pet',
    name: 'Fanta (PET)',
    description: 'The orange vibe. Ice cold 50cl bottle.',
    price: 800,
    category: FoodCategory.DRINKS,
    image: 'https://images.unsplash.com/photo-1624517452488-04869289c4ca?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    calories: 160,
    tags: ['Fruity', '50cl']
  },
  {
    id: 'drink-fayrouz-can',
    name: 'Fayrouz (Can)',
    description: 'Premium malt soda. Crisp and refreshing can.',
    price: 1000,
    category: FoodCategory.DRINKS,
    image: 'https://images.unsplash.com/photo-1543253687-c931c8e01820?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    calories: 120,
    tags: ['Premium', 'Can']
  },
  {
    id: 'drink-maltina-can',
    name: 'Maltina (Can)',
    description: 'The classic malt drink. Nutrient-rich can.',
    price: 1000,
    category: FoodCategory.DRINKS,
    image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    calories: 180,
    tags: ['Nutritional', 'Can']
  },
  {
    id: 'drink-maltina-pet',
    name: 'Maltina (PET)',
    description: 'The classic malt drink. Chilled 50cl bottle.',
    price: 1200,
    category: FoodCategory.DRINKS,
    image: 'https://images.unsplash.com/photo-1542444459-bb37a5e19bd7?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    calories: 180,
    tags: ['Nutritional', '50cl']
  },
  {
    id: 'drink-sprite-pet',
    name: 'Sprite (PET)',
    description: 'Lemon-lime crispness. Chilled 50cl bottle.',
    price: 800,
    category: FoodCategory.DRINKS,
    image: 'https://images.unsplash.com/photo-1625772290748-39126ddd9661?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    calories: 140,
    tags: ['Fresh', '50cl']
  },
  {
    id: 'drink-water',
    name: 'Table Water',
    description: 'Pure, chilled table water. Zero calories.',
    price: 500,
    category: FoodCategory.DRINKS,
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&q=80&w=800',
    rating: 5.0,
    calories: 0,
    tags: ['Pure', 'Essential']
  }
];
