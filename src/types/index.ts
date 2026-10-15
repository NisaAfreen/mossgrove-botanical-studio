export type CategoryId =
  | 'indoor'
  | 'outdoor'
  | 'flowering'
  | 'succulents'
  | 'pots'
  | 'seeds-tools';

export interface Category {
  id: CategoryId;
  name: string;
  blurb: string;
  image: string;
  /** Short line used on the category tile, e.g. "38 varieties" */
  note: string;
}

export type Light = 'Low' | 'Medium' | 'Bright indirect' | 'Full sun';
export type Care = 'Easy' | 'Moderate' | 'Attentive';
export type Availability = 'in-stock' | 'low-stock' | 'out-of-stock';

export interface Product {
  id: string;
  name: string;
  /** Botanical name, shown on the specimen label */
  latin?: string;
  category: CategoryId;
  price: number;
  compareAt?: number;
  /** Demo rating data — clearly labelled as sample data in the UI */
  rating: number;
  reviews: number;
  /** Higher = more popular (used for "Popularity" sort) */
  popularity: number;
  /** ISO date, used for "Newest" sort */
  addedOn: string;
  availability: Availability;
  stock: number;
  image: string;
  size: string;
  light?: Light;
  water?: string;
  care?: Care;
  petSafe?: boolean;
  description: string;
  highlights: string[];
  tags?: string[];
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface CartLine extends CartItem {
  product: Product;
  lineTotal: number;
}

export interface Service {
  id: string;
  name: string;
  short: string;
  description: string;
  image: string;
  includes: string[];
  /** Indicative demo starting price */
  from: string;
  timeline: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  location: string;
  space: string;
  summary: string;
  before: string;
  after: string;
  plants: string[];
  duration: string;
}

export interface Article {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  image: string;
  readTime: string;
  date: string;
  body: { heading?: string; paragraphs: string[]; list?: string[] }[];
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  context: string;
}

export type SpaceType = 'Balcony' | 'Terrace' | 'Backyard' | 'Indoor' | 'Commercial';
export type SpaceSize = 'Small' | 'Medium' | 'Large';
export type GardenStyle = 'Minimalist' | 'Tropical' | 'Modern' | 'Cottage' | 'Low-Maintenance';
export type Budget = 'Under ₹25k' | '₹25k–₹75k' | '₹75k–₹2L' | '₹2L+';
export type Maintenance = 'Low' | 'Moderate' | 'High';

export interface PlannerPreferences {
  space: SpaceType;
  size: SpaceSize;
  style: GardenStyle;
  budget: Budget;
  maintenance: Maintenance;
}

export interface PlannerRecommendation {
  title: string;
  styleNote: string;
  layout: string[];
  productIds: string[];
  service: string;
  estimate: string;
  careRhythm: string;
}

export interface CustomerDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  deliverySlot: 'Morning' | 'Afternoon' | 'Evening';
  notes?: string;
}

export interface Order {
  id: string;
  createdAt: string;
  customer: CustomerDetails;
  lines: CartLine[];
  subtotal: number;
  delivery: number;
  total: number;
}
