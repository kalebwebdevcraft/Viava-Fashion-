export type ProductCategory =
  | 'Contemporary Habesha'
  | 'Tailored Suits'
  | 'Dresses & Gowns'
  | 'Urban Streetwear'
  | 'Silk & Linens'
  | 'Accessories & Bags';

export type CollectionName =
  | 'Addis Haute 2026'
  | 'Heritage Modern'
  | 'Bole Nocturne'
  | 'Entoto Linens';

export interface ProductVariantSize {
  size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'Custom';
  stock: number;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  sku: string;
  title: string;
  slug: string;
  category: ProductCategory;
  collection: CollectionName;
  priceBirr: number;
  originalPriceBirr?: number;
  description: string;
  details: string[];
  fabricCare: string[];
  images: string[];
  sizes: ProductVariantSize[];
  colors: ProductColor[];
  isFeatured?: boolean;
  isNewArrival?: boolean;
  badge?: string;
  createdAt: string;
}

export interface CartItem {
  productId: string;
  title: string;
  priceBirr: number;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
  image: string;
}

export type OrderStatus =
  | 'New'
  | 'Confirmed'
  | 'In Atelier'
  | 'Out for Delivery'
  | 'Completed'
  | 'Cancelled';

export type PaymentMethod =
  | 'Telebirr'
  | 'CBE Birr (Commercial Bank of Ethiopia)'
  | 'Cash on Delivery (Addis Ababa)'
  | 'Bank Transfer (Awash / Dashen)';

export interface OrderItem {
  productId: string;
  title: string;
  priceBirr: number;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
  image: string;
}

export interface OrderRequest {
  id: string;
  orderNumber: string; // e.g. "VIA-2026-8941"
  customerName: string;
  phone: string;
  email: string;
  city: string; // "Addis Ababa"
  subCity: string; // Bole, Sarbet, Kazanchis, Piassa, etc.
  deliveryAddress: string;
  paymentMethod: PaymentMethod;
  notes?: string;
  items: OrderItem[];
  subtotalBirr: number;
  deliveryFeeBirr: number;
  totalBirr: number;
  status: OrderStatus;
  createdAt: string;
  emailNotificationSent: boolean;
  emailNotificationTimestamp?: string;
}

export interface LookbookItem {
  id: string;
  title: string;
  caption: string;
  image: string;
  tag: 'Runway' | 'Addis Streetwear' | 'Studio Editorial' | 'Atelier Craft';
  aspectRatio?: 'portrait' | 'landscape';
  linkedProductId?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  email: string;
  inquiryType:
    | 'General Inquiry'
    | 'Custom Fitting & Tailoring Appointment'
    | 'VIP Stylist Consultation'
    | 'Bole Boutique Private Visit'
    | 'Wholesale / Bridal Order';
  message: string;
  createdAt: string;
  status: 'Unread' | 'Replied';
}

export interface NotificationLog {
  id: string;
  orderNumber: string;
  recipientEmail: string;
  subject: string;
  sentAt: string;
  previewBody: string;
}
