import React from 'react';
import { MapPin, Clock, Phone, Mail, Award, CheckCircle2, Calendar } from 'lucide-react';
import { useFashion } from '../context/FashionContext';

export const BoutiqueSection: React.FC = () => {
  const { setActiveView } = useFashion();

  return (
    <section className="py-16 sm:py-24 bg-[#FAF8F5] border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Story & Atelier Details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-amber-800 font-semibold">
              Bole Medhanialem Atelier · Addis Ababa
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 leading-tight">
              An Addis Ababa Flagship Built for Exceptional Craft
            </h2>
            <p className="text-base text-stone-600 leading-relaxed font-sans">
              Located in the heart of Bole, Viava Fashion houses both our contemporary ready-to-wear showroom and our bespoke tailoring atelier. Here, our master tailors craft custom bridal wear, bespoke evening gowns, and power suits using authentic Ethiopian handwoven cotton (Shemma), raw silks, and imported Italian wools.
            </p>

            {/* Key Boutique Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-white rounded-md border border-stone-200 space-y-1.5">
                <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm">
                  <MapPin className="w-4 h-4 text-amber-700" />
                  <span>Prime Bole Location</span>
                </div>
                <p className="text-xs text-stone-500">
                  Cameroon Street, Next to Edna Mall, Bole Sub-City, Addis Ababa, Ethiopia.
                </p>
              </div>

              <div className="p-4 bg-white rounded-md border border-stone-200 space-y-1.5">
                <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm">
                  <Clock className="w-4 h-4 text-amber-700" />
                  <span>Showroom Hours</span>
                </div>
                <p className="text-xs text-stone-500">
                  Mon – Sat: 9:30 AM – 7:30 PM<br />
                  Sun: 11:00 AM – 5:00 PM
                </p>
              </div>

              <div className="p-4 bg-white rounded-md border border-stone-200 space-y-1.5">
                <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm">
                  <Phone className="w-4 h-4 text-amber-700" />
                  <span>Direct Hotline & Telegram</span>
                </div>
                <p className="text-xs text-stone-500 font-mono">
                  +251 911 234 567 / +251 922 890 123<br />
                  Telegram: @viavafashion_addis
                </p>
              </div>

              <div className="p-4 bg-white rounded-md border border-stone-200 space-y-1.5">
                <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm">
                  <Award className="w-4 h-4 text-amber-700" />
                  <span>Bespoke Fitting Service</span>
                </div>
                <p className="text-xs text-stone-500">
                  Complimentary hem and waist adjustments on all purchased garments.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-2">
              <button
                onClick={() => {
                  setActiveView('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3 bg-stone-900 text-white rounded-md text-xs font-semibold tracking-wider uppercase hover:bg-stone-800 transition-colors inline-flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a Private Tailoring Appointment</span>
              </button>
            </div>
          </div>

          {/* Right Column: Visual Showroom Card & Map preview */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-lg overflow-hidden border border-stone-200 shadow-xl bg-stone-900">
              <img
                src="/src/assets/images/gallery_addis_lifestyle_1792167761891.jpg"
                alt="Viava Fashion Bole Showroom Addis Ababa"
                referrerPolicy="no-referrer"
                className="w-full h-80 object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 text-white space-y-2">
                <div className="text-[11px] font-mono uppercase tracking-widest text-amber-300">
                  Addis Ababa Flagship
                </div>
                <h3 className="font-serif text-xl font-bold">
                  Bole Medhanialem Atelier & Boutique
                </h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Experience the drape of authentic highland textiles in person, with private fitting suites and dedicated style advisors.
                </p>
              </div>
            </div>

            {/* Sub-city Delivery Coverage Map Notice */}
            <div className="p-4 bg-stone-100/80 rounded-md border border-stone-200 text-xs text-stone-700 space-y-2">
              <div className="font-semibold text-stone-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Same-Day Courier Delivery Across Addis Ababa</span>
              </div>
              <p className="text-[11px] text-stone-600 leading-normal">
                Serving Bole, Kazanchis, Sarbet, Piassa, Old Airport, CMC, Mexico, Gurd Shola, Summit, and Megenagna. Drivers carry mobile Telebirr and CBE Birr POS devices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
