import React, { useState } from 'react';
import {
  Package,
  ShoppingBag,
  TrendingUp,
  Mail,
  MessageSquare,
  Plus,
  Edit2,
  Trash2,
  Search,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Eye,
  Send,
  X,
  Phone,
  MapPin,
  ExternalLink,
  ChevronDown,
  Layers
} from 'lucide-react';
import { useFashion } from '../context/FashionContext';
import { Product, ProductCategory, CollectionName, OrderStatus, OrderRequest, NotificationLog, ProductVariantSize } from '../types';
import { FASHION_IMAGES } from '../assets/images';

export const AdminCMS: React.FC = () => {
  const {
    products,
    orders,
    contacts,
    notificationsLog,
    adminTab,
    setAdminTab,
    addProduct,
    updateProduct,
    deleteProduct,
    adjustStock,
    updateOrderStatus,
    deleteOrder,
    resendEmailNotification,
    toggleContactStatus,
    resetDataToDefaults,
    setActiveView
  } = useFashion();

  // Search & filter in CMS
  const [productSearch, setProductSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<'All' | OrderStatus>('All');
  const [selectedOrderForEmailModal, setSelectedOrderForEmailModal] = useState<OrderRequest | null>(null);

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form state for adding/editing product
  const [formTitle, setFormTitle] = useState('');
  const [formPriceBirr, setFormPriceBirr] = useState<number>(5500);
  const [formCategory, setFormCategory] = useState<ProductCategory>('Contemporary Habesha');
  const [formCollection, setFormCollection] = useState<CollectionName>('Heritage Modern');
  const [formDescription, setFormDescription] = useState('');
  const [formBadge, setFormBadge] = useState('');
  const [formImageUrl, setFormImageUrl] = useState(FASHION_IMAGES.habesha);
  const [formSizes, setFormSizes] = useState<ProductVariantSize[]>([
    { size: 'XS', stock: 2 },
    { size: 'S', stock: 4 },
    { size: 'M', stock: 3 },
    { size: 'L', stock: 2 },
    { size: 'XL', stock: 1 }
  ]);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Preset images for easy uploading/posting
  const PRESET_IMAGES = [
    { label: 'Contemporary Habesha Gown', url: FASHION_IMAGES.habesha },
    { label: 'Tailored Power Suit', url: FASHION_IMAGES.tailored },
    { label: 'Pleated Gala Silk Dress', url: FASHION_IMAGES.evening },
    { label: 'Addis Urban Coat & Set', url: FASHION_IMAGES.lifestyle },
    { label: 'Bole Architectural Trench', url: FASHION_IMAGES.hero }
  ];

  const openAddModal = () => {
    setFormTitle('');
    setFormPriceBirr(5500);
    setFormCategory('Contemporary Habesha');
    setFormCollection('Heritage Modern');
    setFormDescription('Artisanal luxury piece crafted in our Addis Ababa atelier with premium hand-loomed textiles.');
    setFormBadge('New Arrival');
    setFormImageUrl(PRESET_IMAGES[0].url);
    setFormSizes([
      { size: 'XS', stock: 2 },
      { size: 'S', stock: 4 },
      { size: 'M', stock: 3 },
      { size: 'L', stock: 2 },
      { size: 'XL', stock: 1 }
    ]);
    setIsAddModalOpen(true);
  };

  const openEditModal = (prod: Product) => {
    setEditingProduct(prod);
    setFormTitle(prod.title);
    setFormPriceBirr(prod.priceBirr);
    setFormCategory(prod.category);
    setFormCollection(prod.collection);
    setFormDescription(prod.description);
    setFormBadge(prod.badge || '');
    setFormImageUrl(prod.images[0] || PRESET_IMAGES[0].url);
    setFormSizes(prod.sizes);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        title: formTitle.trim(),
        priceBirr: Number(formPriceBirr),
        category: formCategory,
        collection: formCollection,
        description: formDescription.trim(),
        badge: formBadge.trim() || undefined,
        images: [formImageUrl, ...editingProduct.images.slice(1)],
        sizes: formSizes
      });
      showToast(`Updated "${formTitle}" successfully!`);
      setEditingProduct(null);
    } else {
      addProduct({
        sku: `VF-NEW-${Math.floor(100 + Math.random() * 900)}`,
        title: formTitle.trim(),
        slug: formTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        priceBirr: Number(formPriceBirr),
        category: formCategory,
        collection: formCollection,
        description: formDescription.trim(),
        details: [
          'Handcrafted in Addis Ababa atelier',
          'Premium natural fibers and breathable highland weave',
          'Tailored fit check complimentary at Bole boutique'
        ],
        fabricCare: ['Dry clean or delicate hand wash recommended.'],
        badge: formBadge.trim() || undefined,
        images: [formImageUrl],
        sizes: formSizes,
        colors: [{ name: 'Atelier Ivory', hex: '#FAF5EB' }, { name: 'Highland Obsidian', hex: '#161616' }]
      });
      showToast(`Posted new product "${formTitle}" to storefront!`);
      setIsAddModalOpen(false);
    }
  };

  // Analytics metrics
  const totalRevenueBirr = orders.reduce((sum, o) => sum + o.totalBirr, 0);
  const pendingOrdersCount = orders.filter(o => o.status === 'New').length;
  const lowStockProductsCount = products.filter(p => {
    const total = p.sizes.reduce((sum, s) => sum + s.stock, 0);
    return total <= 3;
  }).length;
  const totalGarmentsInStock = products.reduce(
    (sum, p) => sum + p.sizes.reduce((acc, s) => acc + s.stock, 0),
    0
  );

  return (
    <div className="min-h-screen bg-[#F5F2ED] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-5 py-3 rounded-md shadow-2xl text-xs font-semibold flex items-center gap-2 animate-in slide-in-from-bottom-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* CMS Top Header */}
        <div className="bg-white p-6 sm:p-8 rounded-lg border border-stone-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-800 font-bold mb-1">
              <span>Viava Fashion · Bole Flagship Atelier</span>
              <span aria-hidden="true">·</span>
              <span>Addis Ababa, Ethiopia</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              Boutique CMS & Inventory Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Manage product listings, track real-time boutique stock, and process customer order requests with automatic email dispatches.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveView('storefront')}
              className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-md transition-colors"
            >
              View Live Storefront &rarr;
            </button>
            <button
              onClick={openAddModal}
              className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-md transition-all flex items-center gap-2 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Post New Product</span>
            </button>
          </div>
        </div>

        {/* Quick KPI Ribbon */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-md border border-stone-200 shadow-sm">
            <div className="text-xs text-stone-500 font-mono uppercase">Order Requests</div>
            <div className="font-serif text-2xl font-bold text-stone-900 mt-1">
              {orders.length}
            </div>
            <div className="text-[11px] text-amber-800 mt-0.5 font-medium">
              {pendingOrdersCount} pending dispatch
            </div>
          </div>

          <div className="bg-white p-4 rounded-md border border-stone-200 shadow-sm">
            <div className="text-xs text-stone-500 font-mono uppercase">Total Order Value</div>
            <div className="font-mono text-2xl font-bold text-stone-900 mt-1 tabular-nums">
              {totalRevenueBirr.toLocaleString()} Birr
            </div>
            <div className="text-[11px] text-stone-500 mt-0.5">
              Avg {(orders.length > 0 ? Math.round(totalRevenueBirr / orders.length) : 0).toLocaleString()} Birr / order
            </div>
          </div>

          <div className="bg-white p-4 rounded-md border border-stone-200 shadow-sm">
            <div className="text-xs text-stone-500 font-mono uppercase">Total Atelier Units</div>
            <div className="font-serif text-2xl font-bold text-stone-900 mt-1">
              {totalGarmentsInStock}
            </div>
            <div className="text-[11px] text-emerald-700 mt-0.5">Across {products.length} garments</div>
          </div>

          <div className="bg-white p-4 rounded-md border border-stone-200 shadow-sm">
            <div className="text-xs text-stone-500 font-mono uppercase">Low Stock Alerts</div>
            <div className="font-serif text-2xl font-bold text-stone-900 mt-1">
              {lowStockProductsCount}
            </div>
            <div className="text-[11px] text-amber-700 mt-0.5">Under 3 units remaining</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-stone-300 overflow-x-auto pb-0.5 scrollbar-none text-xs sm:text-sm font-medium">
          <button
            onClick={() => setAdminTab('inventory')}
            className={`pb-3 px-3 transition-colors flex items-center gap-2 whitespace-nowrap ${
              adminTab === 'inventory'
                ? 'border-b-2 border-stone-900 font-bold text-stone-950'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Products & Real-time Inventory ({products.length})</span>
          </button>

          <button
            onClick={() => setAdminTab('orders')}
            className={`pb-3 px-3 transition-colors flex items-center gap-2 whitespace-nowrap ${
              adminTab === 'orders'
                ? 'border-b-2 border-stone-900 font-bold text-stone-950'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Order Requests ({orders.length})</span>
            {pendingOrdersCount > 0 && (
              <span className="bg-amber-600 text-white text-[10px] px-1.5 py-0.2 rounded-full font-mono">
                {pendingOrdersCount} new
              </span>
            )}
          </button>

          <button
            onClick={() => setAdminTab('notifications')}
            className={`pb-3 px-3 transition-colors flex items-center gap-2 whitespace-nowrap ${
              adminTab === 'notifications'
                ? 'border-b-2 border-stone-900 font-bold text-stone-950'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Email Notification Logs ({notificationsLog.length})</span>
          </button>

          <button
            onClick={() => setAdminTab('inquiries')}
            className={`pb-3 px-3 transition-colors flex items-center gap-2 whitespace-nowrap ${
              adminTab === 'inquiries'
                ? 'border-b-2 border-stone-900 font-bold text-stone-950'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Customer Inquiries ({contacts.length})</span>
          </button>
        </div>

        {/* TAB 1: INVENTORY & PRODUCT MANAGEMENT */}
        {adminTab === 'inventory' && (
          <div className="space-y-4">
            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-md border border-stone-200">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  placeholder="Filter by product name, SKU, or category..."
                  value={productSearch}
                  onChange={e => setProductSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 border border-stone-300 rounded text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={resetDataToDefaults}
                  className="px-3 py-1.5 text-xs text-stone-500 hover:text-stone-800 border border-stone-200 rounded flex items-center gap-1.5 hover:bg-stone-50"
                  title="Reset sample data back to default preset catalog"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Demo Data</span>
                </button>
                <button
                  onClick={openAddModal}
                  className="px-3.5 py-1.5 bg-stone-900 text-white rounded text-xs font-medium flex items-center gap-1.5 hover:bg-stone-800"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Product</span>
                </button>
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-md border border-stone-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-100/75 text-stone-700 uppercase font-mono border-b border-stone-200">
                    <tr>
                      <th className="p-3.5">Garment Details</th>
                      <th className="p-3.5">Category & Collection</th>
                      <th className="p-3.5">Price (Birr)</th>
                      <th className="p-3.5">Real-time Stock by Size</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {products
                      .filter(p =>
                        p.title.toLowerCase().includes(productSearch.toLowerCase()) ||
                        p.sku.toLowerCase().includes(productSearch.toLowerCase()) ||
                        p.category.toLowerCase().includes(productSearch.toLowerCase())
                      )
                      .map(product => {
                        const totalStock = product.sizes.reduce((acc, s) => acc + s.stock, 0);

                        return (
                          <tr key={product.id} className="hover:bg-stone-50/80 transition-colors">
                            {/* Product Info */}
                            <td className="p-3.5">
                              <div className="flex items-center gap-3">
                                <img
                                  src={product.images[0]}
                                  alt={product.title}
                                  referrerPolicy="no-referrer"
                                  className="w-12 h-12 rounded object-cover border border-stone-200 shrink-0 bg-stone-100"
                                />
                                <div className="min-w-0">
                                  <div className="font-serif font-bold text-stone-900 text-sm truncate max-w-xs">
                                    {product.title}
                                  </div>
                                  <div className="font-mono text-[11px] text-stone-400">
                                    {product.sku}
                                    {product.badge && (
                                      <span className="ml-2 text-amber-800 font-sans font-medium">
                                        · {product.badge}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* Category & Collection */}
                            <td className="p-3.5 text-stone-600">
                              <div className="font-medium text-stone-800">{product.category}</div>
                              <div className="text-[11px] text-stone-400">{product.collection}</div>
                            </td>

                            {/* Price in Birr */}
                            <td className="p-3.5 font-mono font-bold text-stone-900 tabular-nums">
                              {product.priceBirr.toLocaleString()} Birr
                            </td>

                            {/* Real-time Stock per Size with increment/decrement steppers */}
                            <td className="p-3.5">
                              <div className="space-y-1.5">
                                <div className="flex items-center gap-2">
                                  <span className="text-[11px] text-stone-500">Total:</span>
                                  <span
                                    className={`font-mono font-bold px-1.5 py-0.2 rounded text-[11px] ${
                                      totalStock === 0
                                        ? 'bg-rose-100 text-rose-800'
                                        : totalStock <= 3
                                        ? 'bg-amber-100 text-amber-800'
                                        : 'bg-emerald-100 text-emerald-800'
                                    }`}
                                  >
                                    {totalStock} units
                                  </span>
                                </div>

                                <div className="flex flex-wrap gap-1.5">
                                  {product.sizes.map(s => (
                                    <div
                                      key={s.size}
                                      className="flex items-center border border-stone-200 rounded px-1.5 py-0.5 bg-stone-50 text-[11px]"
                                    >
                                      <span className="font-bold text-stone-700 mr-1">{s.size}:</span>
                                      <span className="font-mono font-semibold mr-1.5 tabular-nums text-stone-900">
                                        {s.stock}
                                      </span>
                                      <div className="flex items-center gap-0.5">
                                        <button
                                          onClick={() => adjustStock(product.id, s.size, s.stock - 1)}
                                          disabled={s.stock <= 0}
                                          className="w-4 h-4 rounded bg-stone-200 hover:bg-stone-300 text-stone-700 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed text-[10px]"
                                          title="Decrease stock"
                                        >
                                          -
                                        </button>
                                        <button
                                          onClick={() => adjustStock(product.id, s.size, s.stock + 1)}
                                          className="w-4 h-4 rounded bg-stone-200 hover:bg-stone-300 text-stone-700 flex items-center justify-center text-[10px]"
                                          title="Increase stock"
                                        >
                                          +
                                        </button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </td>

                            {/* Actions */}
                            <td className="p-3.5 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => openEditModal(product)}
                                  className="p-1.5 text-stone-600 hover:text-stone-950 hover:bg-stone-100 rounded"
                                  title="Edit Product Info"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => {
                                    if (confirm(`Are you sure you want to delete "${product.title}"?`)) {
                                      deleteProduct(product.id);
                                      showToast(`Deleted ${product.title}`);
                                    }
                                  }}
                                  className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-stone-100 rounded"
                                  title="Delete Product"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ORDER REQUESTS */}
        {adminTab === 'orders' && (
          <div className="space-y-4">
            {/* Filter controls */}
            <div className="bg-white p-4 rounded-md border border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-stone-700">Filter Status:</span>
                {(['All', 'New', 'Confirmed', 'In Atelier', 'Out for Delivery', 'Completed', 'Cancelled'] as Array<'All' | OrderStatus>).map(status => (
                  <button
                    key={status}
                    onClick={() => setOrderStatusFilter(status)}
                    className={`px-3 py-1 rounded text-xs transition-colors ${
                      orderStatusFilter === status
                        ? 'bg-stone-900 text-white font-semibold'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>

              <div className="text-stone-500">
                {orders.length} total customer request{orders.length > 1 ? 's' : ''} logged
              </div>
            </div>

            {/* Orders List */}
            {orders.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-md border border-stone-200">
                <ShoppingBag className="w-10 h-10 mx-auto text-stone-300 mb-2" />
                <div className="font-serif text-lg font-medium text-stone-700">No order requests yet</div>
                <p className="text-xs text-stone-500 mt-1">
                  Orders submitted by customers on the storefront will appear here instantly.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders
                  .filter(o => orderStatusFilter === 'All' || o.status === orderStatusFilter)
                  .map(order => (
                    <div
                      key={order.id}
                      className="bg-white p-5 rounded-md border border-stone-200 shadow-sm space-y-4 hover:border-stone-300 transition-colors"
                    >
                      {/* Top Bar of Order Card */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-100">
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-stone-950 text-sm bg-stone-100 px-2.5 py-1 rounded">
                            {order.orderNumber}
                          </span>
                          <span className="text-xs text-stone-400 font-mono">
                            {new Date(order.createdAt).toLocaleString()}
                          </span>
                          {order.emailNotificationSent && (
                            <span className="text-[11px] text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded flex items-center gap-1">
                              <Mail className="w-3 h-3 text-emerald-600" />
                              <span>Auto-Email Sent</span>
                            </span>
                          )}
                        </div>

                        {/* Status Dropdown */}
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-stone-500 font-medium">Status:</span>
                          <select
                            value={order.status}
                            onChange={e => {
                              updateOrderStatus(order.id, e.target.value as OrderStatus);
                              showToast(`Updated ${order.orderNumber} to "${e.target.value}"`);
                            }}
                            className={`text-xs font-semibold px-3 py-1.5 rounded border focus:outline-none focus:ring-1 focus:ring-stone-900 ${
                              order.status === 'New'
                                ? 'bg-amber-50 text-amber-900 border-amber-300 font-bold'
                                : order.status === 'Confirmed'
                                ? 'bg-blue-50 text-blue-900 border-blue-300'
                                : order.status === 'In Atelier'
                                ? 'bg-purple-50 text-purple-900 border-purple-300'
                                : order.status === 'Out for Delivery'
                                ? 'bg-orange-50 text-orange-900 border-orange-300'
                                : order.status === 'Completed'
                                ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                                : 'bg-stone-100 text-stone-600 border-stone-300'
                            }`}
                          >
                            <option value="New">New</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="In Atelier">In Atelier</option>
                            <option value="Out for Delivery">Out for Delivery</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </div>
                      </div>

                      {/* Customer Info & Delivery Details */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                        <div className="space-y-1">
                          <div className="font-semibold text-stone-900 text-sm">
                            {order.customerName}
                          </div>
                          <div className="flex items-center gap-1.5 text-stone-600 font-mono">
                            <Phone className="w-3.5 h-3.5 text-stone-400" />
                            <span>{order.phone}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-stone-600">
                            <Mail className="w-3.5 h-3.5 text-stone-400" />
                            <span>{order.email}</span>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="font-semibold text-stone-900 flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-amber-700" />
                            <span>
                              {order.subCity}, {order.city}
                            </span>
                          </div>
                          <div className="text-stone-600">{order.deliveryAddress}</div>
                          {order.notes && (
                            <div className="text-stone-500 italic bg-stone-50 p-1.5 rounded mt-1 border border-stone-100">
                              &ldquo;{order.notes}&rdquo;
                            </div>
                          )}
                        </div>

                        <div className="space-y-1 md:text-right">
                          <div className="text-stone-500">Payment on Delivery:</div>
                          <div className="font-semibold text-stone-900">{order.paymentMethod}</div>
                          <div className="font-mono text-base font-bold text-amber-950 tabular-nums">
                            {order.totalBirr.toLocaleString()} Birr
                          </div>
                        </div>
                      </div>

                      {/* Itemized Garments */}
                      <div className="bg-stone-50 p-3 rounded border border-stone-200/80 space-y-2">
                        <div className="text-[11px] font-mono uppercase text-stone-500">
                          Requested Garments:
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2.5 bg-white p-2 rounded border border-stone-200">
                              <img
                                src={item.image}
                                alt={item.title}
                                referrerPolicy="no-referrer"
                                className="w-10 h-10 rounded object-cover border border-stone-200 shrink-0"
                              />
                              <div className="min-w-0 text-xs">
                                <div className="font-medium text-stone-900 truncate">
                                  {item.title}
                                </div>
                                <div className="text-[11px] text-stone-500">
                                  Size {item.selectedSize} · Qty {item.quantity}
                                </div>
                                <div className="font-mono text-stone-800 font-semibold tabular-nums text-[11px]">
                                  {(item.priceBirr * item.quantity).toLocaleString()} Birr
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Order Footer Actions */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-100 text-xs">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setSelectedOrderForEmailModal(order)}
                            className="text-stone-700 hover:text-stone-950 font-medium underline underline-offset-4 flex items-center gap-1"
                          >
                            <Mail className="w-3.5 h-3.5 text-stone-500" />
                            <span>View Dispatched Email Notification</span>
                          </button>

                          <button
                            onClick={() => {
                              resendEmailNotification(order.id);
                              showToast(`Resent notification to ${order.email}`);
                            }}
                            className="text-amber-800 hover:text-amber-950 font-medium flex items-center gap-1"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>Resend Email</span>
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          <a
                            href={`tel:${order.phone.replace(/[^0-9+]/g, '')}`}
                            className="px-3 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded font-medium flex items-center gap-1"
                          >
                            <Phone className="w-3 h-3" />
                            <span>Call Customer</span>
                          </a>
                          <button
                            onClick={() => {
                              if (confirm(`Remove order ${order.orderNumber} permanently?`)) {
                                deleteOrder(order.id);
                                showToast(`Deleted order ${order.orderNumber}`);
                              }
                            }}
                            className="p-1 text-stone-400 hover:text-rose-600 rounded"
                            title="Delete order"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: AUTOMATIC EMAIL NOTIFICATION LOGS */}
        {adminTab === 'notifications' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-md border border-stone-200 text-xs text-stone-600 space-y-1">
              <div className="font-bold text-stone-900 text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Automatic Order Email Dispatcher</span>
              </div>
              <p>
                Every time a customer submits an order request on Viava Fashion, an automated notification is instantaneously rendered and sent to both the customer and the Bole dispatch concierge. Below is the historical audit trail.
              </p>
            </div>

            <div className="space-y-3">
              {notificationsLog.map(notif => (
                <div
                  key={notif.id}
                  className="bg-white p-4 rounded-md border border-stone-200 shadow-sm space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between text-stone-400 font-mono text-[11px] pb-1 border-b border-stone-100">
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5" />
                      Status: Dispatched via Mailer
                    </span>
                    <span>{new Date(notif.sentAt).toLocaleString()}</span>
                  </div>

                  <div className="font-semibold text-stone-900 text-sm">
                    {notif.subject}
                  </div>
                  <div className="text-stone-600">
                    <span className="font-medium text-stone-800">To:</span> {notif.recipientEmail} · <span className="font-mono text-stone-500">Ref: {notif.orderNumber}</span>
                  </div>

                  <div className="p-3 bg-stone-50 rounded border border-stone-200/80 font-mono text-[11px] whitespace-pre-wrap text-stone-700">
                    {notif.previewBody}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: CUSTOMER INQUIRIES */}
        {adminTab === 'inquiries' && (
          <div className="space-y-4">
            <div className="space-y-3">
              {contacts.map(msg => (
                <div
                  key={msg.id}
                  className="bg-white p-5 rounded-md border border-stone-200 shadow-sm space-y-3 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-stone-900 text-sm mr-2">{msg.name}</span>
                      <span className="text-amber-800 bg-amber-50 px-2 py-0.5 rounded font-medium">
                        {msg.inquiryType}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        toggleContactStatus(msg.id);
                        showToast(`Status toggled for inquiry by ${msg.name}`);
                      }}
                      className={`px-2.5 py-1 rounded font-medium transition-colors ${
                        msg.status === 'Replied'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
                      }`}
                    >
                      {msg.status}
                    </button>
                  </div>

                  <div className="text-stone-500 flex items-center gap-4">
                    <span>Phone: {msg.phone}</span>
                    <span>Email: {msg.email}</span>
                    <span>Received: {new Date(msg.createdAt).toLocaleDateString()}</span>
                  </div>

                  <div className="p-3 bg-stone-50 rounded border border-stone-200 text-stone-700 leading-relaxed font-sans">
                    {msg.message}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* MODAL: POST NEW PRODUCT / EDIT PRODUCT */}
      {(isAddModalOpen || editingProduct) && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div
            className="w-full max-w-2xl bg-white rounded-lg shadow-2xl border border-stone-200 p-6 sm:p-8 space-y-6 my-auto max-h-[92vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-stone-200 pb-4">
              <div>
                <h3 className="font-serif text-2xl font-bold text-stone-900">
                  {editingProduct ? 'Edit Garment Details' : 'Post New Product to Viava Catalog'}
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Update pricing in Birr, garment photography, and initial size stock counts.
                </p>
              </div>
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingProduct(null);
                }}
                className="p-2 text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-stone-700 mb-1">
                  Product Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Asymmetrical Habesha Raw Silk Gown"
                  value={formTitle}
                  onChange={e => setFormTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded text-sm text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-medium text-stone-700 mb-1">
                    Price in Birr (ETB) *
                  </label>
                  <input
                    type="number"
                    required
                    min={100}
                    step={50}
                    value={formPriceBirr}
                    onChange={e => setFormPriceBirr(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-stone-300 rounded text-sm font-mono text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>

                <div>
                  <label className="block font-medium text-stone-700 mb-1">Category *</label>
                  <select
                    value={formCategory}
                    onChange={e => setFormCategory(e.target.value as ProductCategory)}
                    className="w-full px-3 py-2 border border-stone-300 rounded text-xs text-stone-900 bg-white"
                  >
                    <option value="Contemporary Habesha">Contemporary Habesha</option>
                    <option value="Tailored Suits">Tailored Suits</option>
                    <option value="Dresses & Gowns">Dresses & Gowns</option>
                    <option value="Urban Streetwear">Urban Streetwear</option>
                    <option value="Silk & Linens">Silk & Linens</option>
                    <option value="Accessories & Bags">Accessories & Bags</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-stone-700 mb-1">Collection *</label>
                  <select
                    value={formCollection}
                    onChange={e => setFormCollection(e.target.value as CollectionName)}
                    className="w-full px-3 py-2 border border-stone-300 rounded text-xs text-stone-900 bg-white"
                  >
                    <option value="Heritage Modern">Heritage Modern</option>
                    <option value="Addis Haute 2026">Addis Haute 2026</option>
                    <option value="Bole Nocturne">Bole Nocturne</option>
                    <option value="Entoto Linens">Entoto Linens</option>
                  </select>
                </div>
              </div>

              {/* Garment Image Selection */}
              <div>
                <label className="block font-medium text-stone-700 mb-1.5">
                  Garment Photography (Select Curated Editorial Shot or Enter URL)
                </label>
                <div className="grid grid-cols-5 gap-2 mb-2">
                  {PRESET_IMAGES.map((img, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setFormImageUrl(img.url)}
                      className={`relative aspect-square rounded border-2 overflow-hidden ${
                        formImageUrl === img.url
                          ? 'border-stone-900 shadow-md ring-2 ring-stone-900/20'
                          : 'border-stone-200 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img.url}
                        alt={img.label}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={formImageUrl}
                  onChange={e => setFormImageUrl(e.target.value)}
                  placeholder="Or enter custom image path or URL..."
                  className="w-full px-3 py-1.5 border border-stone-300 rounded font-mono text-[11px] text-stone-700"
                />
              </div>

              {/* Sizes and stock configuration */}
              <div>
                <label className="block font-medium text-stone-700 mb-1.5">
                  Initial Inventory by Size (Addis Ababa Boutique Stock)
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {formSizes.map((s, idx) => (
                    <div key={s.size} className="p-2 border border-stone-200 rounded text-center bg-stone-50">
                      <div className="font-bold text-stone-800 text-xs mb-1">{s.size}</div>
                      <input
                        type="number"
                        min={0}
                        value={s.stock}
                        onChange={e => {
                          const val = Math.max(0, parseInt(e.target.value) || 0);
                          const updated = [...formSizes];
                          updated[idx] = { ...updated[idx], stock: val };
                          setFormSizes(updated);
                        }}
                        className="w-full py-1 text-center font-mono font-bold text-xs border border-stone-300 rounded bg-white"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Badge & Description */}
              <div>
                <label className="block font-medium text-stone-700 mb-1">
                  Tag / Badge (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. New Arrival, Atelier Signature, Limited Run"
                  value={formBadge}
                  onChange={e => setFormBadge(e.target.value)}
                  className="w-full px-3 py-1.5 border border-stone-300 rounded text-xs"
                />
              </div>

              <div>
                <label className="block font-medium text-stone-700 mb-1">
                  Garment Description & Atelier Story *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formDescription}
                  onChange={e => setFormDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded text-xs leading-relaxed"
                />
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-stone-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingProduct(null);
                  }}
                  className="px-4 py-2 border border-stone-300 rounded text-stone-700 hover:bg-stone-100 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-stone-900 text-white rounded font-medium hover:bg-stone-800 shadow"
                >
                  {editingProduct ? 'Save Changes' : 'Publish Product to Store'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: VIEW DISPATCHED EMAIL NOTIFICATION */}
      {selectedOrderForEmailModal && (
        <div
          className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setSelectedOrderForEmailModal(null)}
        >
          <div
            className="w-full max-w-xl bg-white rounded-lg shadow-2xl border border-stone-200 overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="bg-stone-900 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-amber-400" />
                <span className="font-serif font-bold text-lg">
                  Automated Order Receipt Notification
                </span>
              </div>
              <button
                onClick={() => setSelectedOrderForEmailModal(null)}
                className="text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs font-sans">
              <div className="bg-stone-100 p-3 rounded space-y-1 text-stone-600 font-mono text-[11px]">
                <div>
                  <span className="font-bold text-stone-900">From:</span> concierge@viavafashion.et
                </div>
                <div>
                  <span className="font-bold text-stone-900">To:</span>{' '}
                  {selectedOrderForEmailModal.email}
                </div>
                <div>
                  <span className="font-bold text-stone-900">BCC Dispatch:</span>{' '}
                  orders@viavafashion.et
                </div>
                <div>
                  <span className="font-bold text-stone-900">Subject:</span> Order Request{' '}
                  {selectedOrderForEmailModal.orderNumber} Confirmed | Viava Fashion Addis Ababa
                </div>
              </div>

              {/* Rendered Email Body */}
              <div className="border border-stone-200 rounded p-5 space-y-4 text-stone-800 bg-[#FAF8F5]">
                <div className="font-serif text-xl font-bold tracking-widest text-stone-900 border-b border-stone-200 pb-2">
                  VIAVA FASHION · ADDIS ABABA
                </div>

                <p>
                  Dear <strong>{selectedOrderForEmailModal.customerName}</strong>,
                </p>
                <p>
                  Thank you for submitting your order request with Viava Fashion. Our Bole Medhanialem atelier has received your reservation.
                </p>

                <div className="bg-white p-3 rounded border border-stone-200 space-y-1.5 font-mono text-[11px]">
                  <div className="font-bold text-stone-900 pb-1 border-b border-stone-100">
                    Order Reference: {selectedOrderForEmailModal.orderNumber}
                  </div>
                  {selectedOrderForEmailModal.items.map((i, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span>
                        • {i.title} ({i.selectedSize}, {i.selectedColor}) &times; {i.quantity}
                      </span>
                      <span>{(i.priceBirr * i.quantity).toLocaleString()} Birr</span>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-stone-100 flex justify-between font-bold text-stone-950 text-xs">
                    <span>Total Amount Payable:</span>
                    <span>{selectedOrderForEmailModal.totalBirr.toLocaleString()} Birr</span>
                  </div>
                </div>

                <div className="text-stone-600 text-[11px]">
                  <strong>Delivery Zone:</strong> {selectedOrderForEmailModal.subCity}, Addis Ababa (
                  {selectedOrderForEmailModal.deliveryAddress})<br />
                  <strong>Payment Method:</strong> {selectedOrderForEmailModal.paymentMethod}
                </div>

                <p className="text-stone-500 text-[11px] pt-2 border-t border-stone-200">
                  Our boutique dispatch will contact you on {selectedOrderForEmailModal.phone} prior to driver arrival.
                </p>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => {
                    resendEmailNotification(selectedOrderForEmailModal.id);
                    showToast(`Dispatched simulated email to ${selectedOrderForEmailModal.email}`);
                    setSelectedOrderForEmailModal(null);
                  }}
                  className="px-4 py-2 bg-stone-900 text-white rounded text-xs font-semibold hover:bg-stone-800 flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Resend Email Confirmation</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
