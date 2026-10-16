import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, Phone, Mail, MapPin, CreditCard, Sparkles, AlertCircle } from 'lucide-react';
import { useFashion } from '../context/FashionContext';
import { PaymentMethod } from '../types';

const ADDIS_SUBCITIES = [
  'Bole',
  'Kazanchis / Kirkos',
  'Sarbet / Old Airport',
  'Piassa / Arada',
  'CMC / Ayat',
  'Mexico / Lideta',
  'Gurd Shola / Yeka',
  'Summit / Safari',
  'Gerji / Jackros',
  'Gotera / Kera',
  'Megenagna / Signal',
  'Kolfe Keranio',
  'Akaki Kality'
];

export const OrderDrawer: React.FC = () => {
  const {
    cart,
    cartCount,
    cartSubtotalBirr,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    submitOrderRequest
  } = useFashion();

  // Form fields
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('+251 ');
  const [email, setEmail] = useState('');
  const [subCity, setSubCity] = useState('Bole');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Telebirr');
  const [notes, setNotes] = useState('');

  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCartOpen) return null;

  const deliveryFee = cartSubtotalBirr >= 5000 || cartSubtotalBirr === 0 ? 0 : 200;
  const grandTotalBirr = cartSubtotalBirr + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!customerName.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    if (!phone.trim() || phone.trim() === '+251') {
      setFormError('Please enter a valid Ethiopian contact phone number (e.g. +251 91 123 4567).');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setFormError('Please enter a valid email address to receive your order request confirmation.');
      return;
    }
    if (!deliveryAddress.trim()) {
      setFormError('Please specify your delivery address or landmark in Addis Ababa.');
      return;
    }

    setIsSubmitting(true);

    const result = submitOrderRequest({
      customerName: customerName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      city: 'Addis Ababa',
      subCity,
      deliveryAddress: deliveryAddress.trim(),
      paymentMethod,
      notes: notes.trim() || undefined
    });

    setIsSubmitting(false);

    if (!result.success) {
      setFormError(result.error || 'Failed to submit order request. Please review stock.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/70 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div
        className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              Your Order Request
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Review selected garments & send directly to the Addis Ababa atelier dashboard
            </p>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-200/60 transition-colors"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <p className="font-serif text-lg font-medium text-stone-700">
                Your order request bag is empty
              </p>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Explore our collections to choose garments, customize sizing, and submit an order request.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-3 px-5 py-2 text-xs font-semibold text-white bg-stone-900 rounded-md hover:bg-stone-800"
              >
                Browse Current Collections
              </button>
            </div>
          ) : (
            <>
              {/* Item List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono uppercase text-stone-500 border-b border-stone-100 pb-2">
                  <span>Selected Pieces ({cartCount})</span>
                  <span>Unit Price</span>
                </div>

                {cart.map((item, idx) => (
                  <div
                    key={`${item.productId}-${item.selectedSize}-${item.selectedColor}-${idx}`}
                    className="flex items-center gap-3 py-3 border-b border-stone-100"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded object-cover border border-stone-200 shrink-0 bg-stone-100"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-sm font-semibold text-stone-900 truncate">
                        {item.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-stone-500 mt-0.5">
                        <span className="font-medium text-stone-700">Size: {item.selectedSize}</span>
                        <span aria-hidden="true">·</span>
                        <span className="truncate">{item.selectedColor}</span>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center border border-stone-300 rounded text-xs bg-stone-50">
                          <button
                            onClick={() =>
                              updateCartQuantity(item.productId, item.selectedSize, item.selectedColor, -1)
                            }
                            className="px-2 py-0.5 text-stone-600 hover:bg-stone-200"
                          >
                            -
                          </button>
                          <span className="px-2 font-mono font-bold tabular-nums text-stone-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateCartQuantity(item.productId, item.selectedSize, item.selectedColor, 1)
                            }
                            className="px-2 py-0.5 text-stone-600 hover:bg-stone-200"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() =>
                            removeFromCart(item.productId, item.selectedSize, item.selectedColor)
                          }
                          className="text-stone-400 hover:text-rose-600 p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="font-mono text-sm font-bold text-stone-900 tabular-nums">
                        {(item.priceBirr * item.quantity).toLocaleString()} Birr
                      </div>
                      <div className="text-[11px] text-stone-400 font-mono">
                        {item.priceBirr.toLocaleString()} Birr each
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Request Details Form */}
              <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                <div className="text-xs font-mono uppercase tracking-wider text-amber-900 font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Customer & Delivery Details (Addis Ababa)</span>
                </div>

                {formError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-md text-xs text-rose-800 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>{formError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Liya Tadesse"
                      value={customerName}
                      onChange={e => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-md text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1 flex items-center justify-between">
                      <span>Phone Number *</span>
                      <span className="text-[10px] text-stone-400">Ethiopian mobile</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                      <input
                        type="text"
                        required
                        placeholder="+251 91 123 4567"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 border border-stone-300 rounded-md text-xs sm:text-sm font-mono text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                      />
                    </div>
                  </div>
                </div>

                {/* Email for automated notifications */}
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1 flex items-center justify-between">
                    <span>Email Address *</span>
                    <span className="text-[10px] text-amber-800">For automated receipt & order tracking</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      type="email"
                      required
                      placeholder="e.g. liya@example.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 border border-stone-300 rounded-md text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>
                </div>

                {/* Sub-city & Address */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Addis Ababa Sub-City *
                    </label>
                    <select
                      value={subCity}
                      onChange={e => setSubCity(e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-md text-xs sm:text-sm text-stone-900 bg-white focus:outline-none focus:ring-1 focus:ring-stone-900"
                    >
                      {ADDIS_SUBCITIES.map(sc => (
                        <option key={sc} value={sc}>
                          {sc}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      disabled
                      value="Addis Ababa, Ethiopia"
                      className="w-full px-3 py-2 border border-stone-200 bg-stone-100 rounded-md text-xs sm:text-sm text-stone-500 font-sans cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1 flex items-center justify-between">
                    <span>Delivery Address / Landmark *</span>
                    <span className="text-[10px] text-stone-400">Street, house no. or nearby hotel</span>
                  </label>
                  <div className="relative">
                    <MapPin className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Cameroon St, Next to Ramada Hotel, House 3B"
                      value={deliveryAddress}
                      onChange={e => setDeliveryAddress(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 border border-stone-300 rounded-md text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>
                </div>

                {/* Payment Method on Delivery */}
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1.5 flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-stone-500" />
                    <span>Preferred Payment Method (Upon Delivery) *</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {(
                      [
                        'Telebirr',
                        'CBE Birr (Commercial Bank of Ethiopia)',
                        'Cash on Delivery (Addis Ababa)',
                        'Bank Transfer (Awash / Dashen)'
                      ] as PaymentMethod[]
                    ).map(method => (
                      <label
                        key={method}
                        className={`flex items-center gap-2 p-2.5 rounded border cursor-pointer transition-all ${
                          paymentMethod === method
                            ? 'bg-amber-50/70 border-amber-900/60 font-semibold text-stone-900'
                            : 'bg-white border-stone-200 text-stone-600 hover:border-stone-400'
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={paymentMethod === method}
                          onChange={() => setPaymentMethod(method)}
                          className="text-amber-900 focus:ring-0"
                        />
                        <span className="truncate">{method}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Additional Notes / Tailoring requests */}
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Special Atelier Notes / Fitting Requests (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Preferred delivery time between 2 PM - 5 PM; please bring custom hem tape."
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-md text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>

                {/* Price Breakdown */}
                <div className="pt-4 border-t border-stone-200 space-y-2 text-xs">
                  <div className="flex justify-between text-stone-600">
                    <span>Garments Subtotal:</span>
                    <span className="font-mono tabular-nums text-stone-900 font-medium">
                      {cartSubtotalBirr.toLocaleString()} Birr
                    </span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>Addis Courier Delivery:</span>
                    <span className="font-mono tabular-nums text-stone-900 font-medium">
                      {deliveryFee === 0 ? (
                        <span className="text-emerald-700 font-semibold">Free (Orders 5,000+ Birr)</span>
                      ) : (
                        `${deliveryFee} Birr`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-stone-950 pt-2 border-t border-stone-200">
                    <span>Total Amount (Birr):</span>
                    <span className="font-mono tabular-nums text-lg text-amber-950">
                      {grandTotalBirr.toLocaleString()} Birr
                    </span>
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-4 bg-stone-900 text-white rounded-md text-sm font-semibold tracking-wide hover:bg-stone-800 transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Routing to Admin Dashboard...</span>
                  ) : (
                    <>
                      <span>Send Order Request to Boutique</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-[11px] text-stone-400 text-center leading-normal">
                  Your request is sent instantly to our Bole atelier CMS. An automated email receipt will be sent to your email address, and our concierge will phone you to confirm delivery.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
