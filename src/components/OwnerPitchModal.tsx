import React from 'react';
import { X, TrendingUp, CheckCircle2, ShieldCheck, Zap, Phone, Sparkles, Smartphone, Users, DollarSign, ArrowRight } from 'lucide-react';
import { useFashion } from '../context/FashionContext';

export const OwnerPitchModal: React.FC = () => {
  const { isPitchModalOpen, setIsPitchModalOpen, setActiveView } = useFashion();

  if (!isPitchModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="w-full max-w-3xl bg-white rounded-xl shadow-2xl border border-stone-200 overflow-hidden relative my-auto max-h-[92vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsPitchModalOpen(false)}
          className="absolute top-4 right-4 z-20 p-2 text-stone-400 hover:text-stone-900 rounded-full hover:bg-stone-100 transition-colors"
          aria-label="Close pitch deck"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="bg-stone-900 text-white p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex items-center gap-2 text-amber-300 font-mono text-xs uppercase tracking-widest font-semibold mb-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Viava Fashion · Boutique Growth & ROI Brief</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-tight">
            Why This Website Will Skyrocket Your Boutique Sales in Addis Ababa
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 mt-2 max-w-2xl leading-relaxed">
            Prepared for the boutique leadership. See how moving from manual Instagram & Telegram DMs to this bespoke digital storefront puts Viava 10 steps ahead of competitors in Bole, Kazanchis, and diaspora markets.
          </p>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-6 sm:p-8 space-y-8 text-xs sm:text-sm text-stone-700">
          {/* Key Advantages Grid */}
          <div>
            <h3 className="font-serif text-lg font-bold text-stone-900 mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-700" />
              <span>The 4 Big Advantages for Viava Fashion</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-stone-50 rounded-lg border border-stone-200 space-y-2">
                <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                  <span>Zero Lost Sales from Slow Replies</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Instead of losing shoppers who ask &ldquo;how much?&rdquo; in Instagram DMs while you sleep, customers instantly view prices in Birr, select their size, and send a complete order request 24/7.
                </p>
              </div>

              <div className="p-4 bg-stone-50 rounded-lg border border-stone-200 space-y-2">
                <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
                  <Smartphone className="w-4 h-4 text-amber-600" />
                  <span>Real-Time Bole Inventory Sync</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Never accidentally double-sell a unique couture dress or size M suit. As orders come in, stock automatically updates, with instant low-stock alerts before items run out.
                </p>
              </div>

              <div className="p-4 bg-stone-50 rounded-lg border border-stone-200 space-y-2">
                <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <span>Structured Addis Sub-City Deliveries</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Every order includes the customer&apos;s exact sub-city (Bole, Sarbet, CMC, Mexico, Piassa), street landmark, phone number, and selected payment (Telebirr, CBE Birr, or Cash).
                </p>
              </div>

              <div className="p-4 bg-stone-50 rounded-lg border border-stone-200 space-y-2">
                <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
                  <Users className="w-4 h-4 text-purple-600" />
                  <span>Automated Professional Receipts</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Customers instantly receive high-touch branded email notifications with order reference numbers, establishing trust and giving your boutique the prestige of a global luxury house.
                </p>
              </div>
            </div>
          </div>

          {/* Competitor Comparison Table */}
          <div>
            <h3 className="font-serif text-lg font-bold text-stone-900 mb-3">
              Competitor Boutique vs. Viava Fashion
            </h3>
            <div className="overflow-x-auto border border-stone-200 rounded-lg">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-100 text-stone-700 font-mono uppercase">
                  <tr>
                    <th className="p-3">Feature</th>
                    <th className="p-3 text-rose-800">Typical Addis Boutiques</th>
                    <th className="p-3 text-emerald-800 font-bold">Viava Fashion Website</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  <tr>
                    <td className="p-3 font-semibold text-stone-900">Ordering Method</td>
                    <td className="p-3 text-stone-500">Messy Instagram & Telegram DMs</td>
                    <td className="p-3 text-emerald-700 font-semibold">1-Click Order Bag + Telegram sync</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-stone-900">Pricing Transparency</td>
                    <td className="p-3 text-stone-500">&ldquo;Check DM for price&rdquo; (frustrates 70% of shoppers)</td>
                    <td className="p-3 text-emerald-700 font-semibold">Clear Ethiopian Birr with VAT included</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-stone-900">Inventory Control</td>
                    <td className="p-3 text-stone-500">Manual paper book, frequent stock errors</td>
                    <td className="p-3 text-emerald-700 font-semibold">Real-time CMS stock steppers per size</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-stone-900">Mobile Experience</td>
                    <td className="p-3 text-stone-500">None (only social media grid)</td>
                    <td className="p-3 text-emerald-700 font-semibold">Ultra-fast mobile PWA-optimized storefront</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-stone-900">Order Receipts</td>
                    <td className="p-3 text-stone-500">Screenshots of chat messages</td>
                    <td className="p-3 text-emerald-700 font-semibold">Automated email receipts + reference IDs</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Backend Roadmap Note */}
          <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-lg text-xs space-y-2">
            <div className="font-bold text-amber-950 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-700" />
              <span>Phase 2 Backend Architecture (Ready for Supabase)</span>
            </div>
            <p className="text-stone-700 leading-relaxed">
              This preview already contains the complete interactive UI, live inventory tracking, order dispatch hub, and dynamic CMS. In Phase 2, we can plug in PostgreSQL database storage via Supabase with secure multi-staff roles, SMS notifications via Ethio Telecom API, and automated Telebirr checkout.
            </p>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-stone-100 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-stone-500 font-mono">
            Bole Medhanialem Atelier · Addis Ababa
          </span>
          <button
            onClick={() => setIsPitchModalOpen(false)}
            className="w-full sm:w-auto px-6 py-2.5 bg-stone-900 text-white rounded-md text-xs font-semibold hover:bg-stone-800 transition-colors flex items-center justify-center gap-2"
          >
            <span>Explore Live Website & CMS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
