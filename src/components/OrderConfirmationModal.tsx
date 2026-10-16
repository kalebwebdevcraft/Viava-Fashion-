import React from 'react';
import { CheckCircle2, Mail, Send, ExternalLink, ArrowRight, X, ShieldAlert } from 'lucide-react';
import { useFashion } from '../context/FashionContext';

export const OrderConfirmationModal: React.FC = () => {
  const { lastSubmittedOrder, setLastSubmittedOrder, setActiveView, setAdminTab } = useFashion();

  if (!lastSubmittedOrder) return null;

  const telegramShareText = encodeURIComponent(
    `Hello Viava Fashion Addis Ababa! I just submitted an order request (${lastSubmittedOrder.orderNumber}) on your website for ${lastSubmittedOrder.totalBirr.toLocaleString()} Birr.\nCustomer: ${lastSubmittedOrder.customerName} (${lastSubmittedOrder.phone})\nDelivery to: ${lastSubmittedOrder.subCity}, Addis Ababa.\nPayment method: ${lastSubmittedOrder.paymentMethod}.`
  );

  const telegramUrl = `https://t.me/share/url?url=https://viavafashion.et&text=${telegramShareText}`;

  const handleOpenAdminOrders = () => {
    setLastSubmittedOrder(null);
    setActiveView('admin');
    setAdminTab('orders');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-white rounded-lg shadow-2xl border border-stone-200 overflow-hidden relative"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={() => setLastSubmittedOrder(null)}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full"
          aria-label="Close confirmation"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Header */}
        <div className="bg-stone-900 text-white p-6 sm:p-8 text-center space-y-3">
          <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="text-xs font-mono tracking-widest uppercase text-amber-300">
            Order Request Dispatched
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold">
            Thank you, {lastSubmittedOrder.customerName}
          </h2>
          <div className="font-mono text-stone-300 text-sm bg-stone-800/80 px-3 py-1.5 rounded inline-block">
            Order Reference: <span className="text-white font-bold">{lastSubmittedOrder.orderNumber}</span>
          </div>
        </div>

        {/* Details & Real-Time Notifications Proof */}
        <div className="p-6 space-y-5 text-sm text-stone-700">
          {/* Automated Email notification notice */}
          <div className="p-3.5 bg-emerald-50/80 border border-emerald-200 rounded-md space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-900">
              <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Automatic Email Notification Sent</span>
            </div>
            <p className="text-xs text-emerald-800 pl-6">
              A detailed confirmation email has been dispatched to{' '}
              <span className="font-medium font-mono text-emerald-950">{lastSubmittedOrder.email}</span>{' '}
              and synced with the boutique dispatch dashboard.
            </p>
          </div>

          {/* Items Summary */}
          <div>
            <div className="text-xs font-mono uppercase text-stone-500 mb-2">Order Summary</div>
            <div className="space-y-2 border-t border-b border-stone-100 py-3">
              {lastSubmittedOrder.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs">
                  <span className="text-stone-800">
                    {item.title} ({item.selectedSize}, {item.selectedColor}) &times; {item.quantity}
                  </span>
                  <span className="font-mono tabular-nums text-stone-900 font-medium">
                    {(item.priceBirr * item.quantity).toLocaleString()} Birr
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-2 font-bold text-stone-900">
              <span>Total Payable on Delivery:</span>
              <span className="font-mono text-amber-900 text-base tabular-nums">
                {lastSubmittedOrder.totalBirr.toLocaleString()} Birr
              </span>
            </div>
          </div>

          {/* Delivery & Payment note */}
          <div className="text-xs text-stone-600 space-y-1 bg-stone-50 p-3 rounded border border-stone-200">
            <div>
              <span className="font-semibold text-stone-900">Delivery Location:</span>{' '}
              {lastSubmittedOrder.deliveryAddress}, {lastSubmittedOrder.subCity}, Addis Ababa
            </div>
            <div>
              <span className="font-semibold text-stone-900">Payment Method:</span>{' '}
              {lastSubmittedOrder.paymentMethod}
            </div>
            <div>
              <span className="font-semibold text-stone-900">Contact:</span>{' '}
              {lastSubmittedOrder.phone}
            </div>
          </div>

          {/* Direct Telegram / WhatsApp share action */}
          <div className="space-y-2">
            <a
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-md text-xs font-semibold bg-[#229ED9] text-white hover:bg-[#1E8CC0] transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Share Request on Telegram / WhatsApp with Viava Concierge</span>
            </a>

            <button
              onClick={handleOpenAdminOrders}
              className="w-full py-2.5 px-4 rounded-md text-xs font-semibold bg-stone-100 text-stone-800 hover:bg-stone-200 transition-colors flex items-center justify-center gap-2 border border-stone-300"
            >
              <span>View this Order in Admin CMS Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={() => setLastSubmittedOrder(null)}
            className="w-full text-center text-xs text-stone-500 hover:text-stone-900 py-1"
          >
            Close and return to boutique
          </button>
        </div>
      </div>
    </div>
  );
};
