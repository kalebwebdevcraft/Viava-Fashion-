import React, { useState } from 'react';
import { Send, CheckCircle2, Phone, Mail, MapPin, Calendar, Sparkles } from 'lucide-react';
import { useFashion } from '../context/FashionContext';
import { ContactMessage } from '../types';

export const ContactSection: React.FC = () => {
  const { submitContact } = useFashion();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+251 ');
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState<ContactMessage['inquiryType']>(
    'Custom Fitting & Tailoring Appointment'
  );
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    submitContact({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      inquiryType,
      message: message.trim()
    });

    setIsSuccess(true);
    setName('');
    setPhone('+251 ');
    setEmail('');
    setMessage('');

    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <section className="py-16 sm:py-24 bg-white border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Contact Info & Boutique Concierge */}
          <div className="lg:col-span-5 space-y-6">
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-amber-800 font-semibold">
              Get in Touch · Bole Showroom
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
              Schedule a Fitting or Contact Our Stylists
            </h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-sans">
              Whether you wish to commission a bespoke modern Habesha wedding dress, request tailored power suits for executive styling, or schedule a fitting at our Bole atelier, our concierge team is at your disposal.
            </p>

            <div className="space-y-4 pt-4 border-t border-stone-100 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-stone-900">Atelier & Boutique Location</div>
                  <div className="text-stone-600 text-xs mt-0.5">
                    Cameroon St, Next to Edna Mall & Bole Medhanialem<br />
                    Addis Ababa, Ethiopia
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-stone-900">Telephone & Telegram</div>
                  <div className="text-stone-600 text-xs font-mono mt-0.5">
                    +251 911 234 567 / +251 922 890 123<br />
                    Telegram: @viavafashion_addis
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-stone-900">Electronic Mail</div>
                  <div className="text-stone-600 text-xs font-mono mt-0.5">
                    concierge@viavafashion.et / atelier@viavafashion.et
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-stone-900">Hours of Operation</div>
                  <div className="text-stone-600 text-xs mt-0.5">
                    Monday to Saturday: 9:30 AM – 7:30 PM (East Africa Time)<br />
                    Sunday: 11:00 AM – 5:00 PM
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Interactive Contact & Appointment Form */}
          <div className="lg:col-span-7 bg-[#FAF8F5] p-6 sm:p-8 rounded-lg border border-stone-200 shadow-sm">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 mb-1">
              Send an Inquiry or Book an Appointment
            </h3>
            <p className="text-xs text-stone-500 mb-6">
              Inquiries are synced directly to our store manager dashboard with immediate SMS/Telegram routing.
            </p>

            {isSuccess && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-300 rounded-md text-emerald-900 text-xs flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <span className="font-bold">Message logged successfully!</span>
                  <p className="text-emerald-800 mt-0.5">
                    Our Bole boutique concierge will review your message and contact you via phone or email shortly.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bethlehem Mengistu"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-md text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Phone Number (Mobile) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="+251 91 123 4567"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-md text-xs sm:text-sm font-mono text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. name@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-md text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Inquiry Type *
                  </label>
                  <select
                    value={inquiryType}
                    onChange={e => setInquiryType(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-md text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                  >
                    <option value="Custom Fitting & Tailoring Appointment">
                      Custom Fitting & Tailoring Appointment
                    </option>
                    <option value="VIP Stylist Consultation">VIP Stylist Consultation</option>
                    <option value="Bole Boutique Private Visit">Bole Boutique Private Visit</option>
                    <option value="General Inquiry">General Garment Inquiry</option>
                    <option value="Wholesale / Bridal Order">Wholesale / Bridal Party Order</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  How can we assist you? *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Share details regarding your preferred styling, event date, measurements, or questions..."
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-md text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 bg-stone-900 text-white rounded-md text-xs font-semibold tracking-wider uppercase hover:bg-stone-800 transition-colors flex items-center justify-center gap-2 shadow"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
