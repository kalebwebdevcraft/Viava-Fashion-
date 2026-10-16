import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  LookbookItem,
  OrderRequest,
  OrderItem,
  CartItem,
  OrderStatus,
  ContactMessage,
  NotificationLog
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_LOOKBOOK,
  INITIAL_ORDERS,
  INITIAL_CONTACTS
} from '../data/initialData';

interface FashionContextType {
  products: Product[];
  lookbook: LookbookItem[];
  orders: OrderRequest[];
  contacts: ContactMessage[];
  notificationsLog: NotificationLog[];
  cart: CartItem[];
  cartCount: number;
  cartSubtotalBirr: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  activeView: 'storefront' | 'lookbook' | 'boutique' | 'admin' | 'contact';
  setActiveView: (view: 'storefront' | 'lookbook' | 'boutique' | 'admin' | 'contact') => void;
  adminTab: 'inventory' | 'orders' | 'analytics' | 'inquiries' | 'notifications';
  setAdminTab: (tab: 'inventory' | 'orders' | 'analytics' | 'inquiries' | 'notifications') => void;
  lastSubmittedOrder: OrderRequest | null;
  setLastSubmittedOrder: (order: OrderRequest | null) => void;

  // Cart operations
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  updateCartQuantity: (productId: string, size: string, color: string, delta: number) => void;
  clearCart: () => void;

  // Order submission
  submitOrderRequest: (orderData: {
    customerName: string;
    phone: string;
    email: string;
    city: string;
    subCity: string;
    deliveryAddress: string;
    paymentMethod: OrderRequest['paymentMethod'];
    notes?: string;
  }) => { success: boolean; order?: OrderRequest; error?: string };

  // CMS Product operations
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  adjustStock: (productId: string, size: string, newStock: number) => void;

  // CMS Order operations
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  deleteOrder: (orderId: string) => void;
  resendEmailNotification: (orderId: string) => void;

  // Contact operations
  submitContact: (contact: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>) => void;
  toggleContactStatus: (id: string) => void;

  // Reset
  resetDataToDefaults: () => void;
}

const FashionContext = createContext<FashionContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRODUCTS: 'viava_products_v2',
  ORDERS: 'viava_orders_v2',
  CONTACTS: 'viava_contacts_v2',
  NOTIFICATIONS: 'viava_notifications_v2',
  CART: 'viava_cart_v2'
};

export const FashionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from localStorage or initial datasets
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return stored ? JSON.parse(stored) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [lookbook] = useState<LookbookItem[]>(INITIAL_LOOKBOOK);

  const [orders, setOrders] = useState<OrderRequest[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return stored ? JSON.parse(stored) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [contacts, setContacts] = useState<ContactMessage[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CONTACTS);
      return stored ? JSON.parse(stored) : INITIAL_CONTACTS;
    } catch {
      return INITIAL_CONTACTS;
    }
  });

  const [notificationsLog, setNotificationsLog] = useState<NotificationLog[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
      if (stored) return JSON.parse(stored);
      // Pre-seed notification logs corresponding to initial orders
      return [
        {
          id: 'notif-1',
          orderNumber: 'VIA-2026-4019',
          recipientEmail: 'liya.tadesse@example.com',
          subject: 'Order Request Confirmed: VIA-2026-4019 | Viava Fashion Addis Ababa',
          sentAt: '2026-03-14T11:20:05Z',
          previewBody: 'Dear Liya Tadesse, thank you for selecting Viava Fashion. Your order request for Contemporary Habesha Couture Gown (Size S) has been logged with our Bole boutique atelier.'
        },
        {
          id: 'notif-2',
          orderNumber: 'VIA-2026-4020',
          recipientEmail: 'yared.bekele@addisbiz.et',
          subject: 'Order Request Confirmed: VIA-2026-4020 | Viava Fashion Addis Ababa',
          sentAt: '2026-03-15T09:45:08Z',
          previewBody: 'Dear Yared Bekele, your order for The Addis Sovereign Emerald Tailored Suit is now being prepared for dispatch.'
        }
      ];
    } catch {
      return [];
    }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CART);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<'storefront' | 'lookbook' | 'boutique' | 'admin' | 'contact'>('storefront');
  const [adminTab, setAdminTab] = useState<'inventory' | 'orders' | 'analytics' | 'inquiries' | 'notifications'>('inventory');
  const [lastSubmittedOrder, setLastSubmittedOrder] = useState<OrderRequest | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notificationsLog));
  }, [notificationsLog]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  // Derived calculations
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotalBirr = cart.reduce((sum, item) => sum + item.priceBirr * item.quantity, 0);

  // Cart operations
  const addToCart = (newItem: CartItem) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(
        item =>
          item.productId === newItem.productId &&
          item.selectedSize === newItem.selectedSize &&
          item.selectedColor === newItem.selectedColor
      );

      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += newItem.quantity;
        return copy;
      }
      return [...prev, newItem];
    });
  };

  const removeFromCart = (productId: string, size: string, color: string) => {
    setCart(prev =>
      prev.filter(
        item =>
          !(item.productId === productId && item.selectedSize === size && item.selectedColor === color)
      )
    );
  };

  const updateCartQuantity = (productId: string, size: string, color: string, delta: number) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.productId === productId && item.selectedSize === size && item.selectedColor === color) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Order Submission & Real-time Stock Deduction & Automated Email Notification
  const submitOrderRequest = (orderData: {
    customerName: string;
    phone: string;
    email: string;
    city: string;
    subCity: string;
    deliveryAddress: string;
    paymentMethod: OrderRequest['paymentMethod'];
    notes?: string;
  }) => {
    if (cart.length === 0) {
      return { success: false, error: 'Your order request bag is empty.' };
    }

    // Verify stock availability
    for (const cartItem of cart) {
      const prod = products.find(p => p.id === cartItem.productId);
      if (!prod) {
        return { success: false, error: `Product "${cartItem.title}" is no longer available.` };
      }
      const sizeVariant = prod.sizes.find(s => s.size === cartItem.selectedSize);
      if (!sizeVariant || sizeVariant.stock < cartItem.quantity) {
        return {
          success: false,
          error: `Insufficient stock for "${prod.title}" in size ${cartItem.selectedSize}. Only ${sizeVariant?.stock || 0} unit(s) remaining in Addis boutique.`
        };
      }
    }

    const orderNumber = `VIA-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const nowIso = new Date().toISOString();

    const orderItems: OrderItem[] = cart.map(item => ({
      productId: item.productId,
      title: item.title,
      priceBirr: item.priceBirr,
      selectedSize: item.selectedSize,
      selectedColor: item.selectedColor,
      quantity: item.quantity,
      image: item.image
    }));

    // Free delivery in Addis Ababa over 5,000 Birr; otherwise 200 Birr courier
    const deliveryFeeBirr = cartSubtotalBirr >= 5000 ? 0 : 200;
    const totalBirr = cartSubtotalBirr + deliveryFeeBirr;

    const newOrder: OrderRequest = {
      id: `ord-${Date.now()}`,
      orderNumber,
      customerName: orderData.customerName,
      phone: orderData.phone,
      email: orderData.email,
      city: orderData.city || 'Addis Ababa',
      subCity: orderData.subCity,
      deliveryAddress: orderData.deliveryAddress,
      paymentMethod: orderData.paymentMethod,
      notes: orderData.notes,
      items: orderItems,
      subtotalBirr: cartSubtotalBirr,
      deliveryFeeBirr,
      totalBirr,
      status: 'New',
      createdAt: nowIso,
      emailNotificationSent: true,
      emailNotificationTimestamp: nowIso
    };

    // Deduct stock in real time
    setProducts(prevProducts =>
      prevProducts.map(prod => {
        const itemsToDeduct = cart.filter(ci => ci.productId === prod.id);
        if (itemsToDeduct.length === 0) return prod;

        const updatedSizes = prod.sizes.map(s => {
          const matchedItem = itemsToDeduct.find(ci => ci.selectedSize === s.size);
          if (matchedItem) {
            return { ...s, stock: Math.max(0, s.stock - matchedItem.quantity) };
          }
          return s;
        });

        return {
          ...prod,
          sizes: updatedSizes
        };
      })
    );

    // Save order
    setOrders(prev => [newOrder, ...prev]);

    // Create automatic email notification log
    const notification: NotificationLog = {
      id: `notif-${Date.now()}`,
      orderNumber,
      recipientEmail: orderData.email,
      subject: `Order Request Received: ${orderNumber} | Viava Fashion Addis Ababa`,
      sentAt: nowIso,
      previewBody: `Dear ${orderData.customerName},\n\nThank you for choosing Viava Fashion! We have received your order request ${orderNumber} for delivery in ${orderData.subCity}, Addis Ababa.\n\nItems:\n${orderItems
        .map(i => `• ${i.title} (${i.selectedSize}, ${i.selectedColor}) x ${i.quantity} - ${i.priceBirr.toLocaleString()} Birr`)
        .join('\n')}\n\nTotal: ${totalBirr.toLocaleString()} Birr (Payment: ${orderData.paymentMethod})\n\nOur Bole boutique concierge will contact you shortly on ${orderData.phone} to coordinate delivery.`
    };
    setNotificationsLog(prev => [notification, ...prev]);

    // Clear cart and show confirmation
    clearCart();
    setIsCartOpen(false);
    setLastSubmittedOrder(newOrder);

    return { success: true, order: newOrder };
  };

  // CMS Operations
  const addProduct = (newProdData: Omit<Product, 'id' | 'createdAt'>) => {
    const id = `prod-${Date.now()}`;
    const newProduct: Product = {
      ...newProdData,
      id,
      createdAt: new Date().toISOString()
    };
    setProducts(prev => [newProduct, ...prev]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const adjustStock = (productId: string, sizeName: string, newStock: number) => {
    setProducts(prev =>
      prev.map(p => {
        if (p.id !== productId) return p;
        const updatedSizes = p.sizes.map(s =>
          s.size === sizeName ? { ...s, stock: Math.max(0, newStock) } : s
        );
        return { ...p, sizes: updatedSizes };
      })
    );
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, status } : o))
    );
  };

  const deleteOrder = (orderId: string) => {
    setOrders(prev => prev.filter(o => o.id !== orderId));
  };

  const resendEmailNotification = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    const nowIso = new Date().toISOString();
    const newNotif: NotificationLog = {
      id: `notif-${Date.now()}`,
      orderNumber: order.orderNumber,
      recipientEmail: order.email,
      subject: `Update on Order ${order.orderNumber} | Viava Fashion Addis Ababa`,
      sentAt: nowIso,
      previewBody: `Dear ${order.customerName},\n\nThis is an automated status update for your order ${order.orderNumber}. Current status: ${order.status}.\n\nViava Fashion Boutique, Cameroon St, Bole, Addis Ababa.`
    };
    setNotificationsLog(prev => [newNotif, ...prev]);
  };

  const submitContact = (contactData: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>) => {
    const newContact: ContactMessage = {
      ...contactData,
      id: `msg-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'Unread'
    };
    setContacts(prev => [newContact, ...prev]);
  };

  const toggleContactStatus = (id: string) => {
    setContacts(prev =>
      prev.map(c =>
        c.id === id ? { ...c, status: c.status === 'Unread' ? 'Replied' : 'Unread' } : c
      )
    );
  };

  const resetDataToDefaults = () => {
    setProducts(INITIAL_PRODUCTS);
    setOrders(INITIAL_ORDERS);
    setContacts(INITIAL_CONTACTS);
    setCart([]);
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.ORDERS);
    localStorage.removeItem(STORAGE_KEYS.CONTACTS);
    localStorage.removeItem(STORAGE_KEYS.CART);
    localStorage.removeItem(STORAGE_KEYS.NOTIFICATIONS);
  };

  return (
    <FashionContext.Provider
      value={{
        products,
        lookbook,
        orders,
        contacts,
        notificationsLog,
        cart,
        cartCount,
        cartSubtotalBirr,
        isCartOpen,
        setIsCartOpen,
        selectedProductId,
        setSelectedProductId,
        activeView,
        setActiveView,
        adminTab,
        setAdminTab,
        lastSubmittedOrder,
        setLastSubmittedOrder,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        submitOrderRequest,
        addProduct,
        updateProduct,
        deleteProduct,
        adjustStock,
        updateOrderStatus,
        deleteOrder,
        resendEmailNotification,
        submitContact,
        toggleContactStatus,
        resetDataToDefaults
      }}
    >
      {children}
    </FashionContext.Provider>
  );
};

export const useFashion = () => {
  const context = useContext(FashionContext);
  if (!context) {
    throw new Error('useFashion must be used within a FashionProvider');
  }
  return context;
};
