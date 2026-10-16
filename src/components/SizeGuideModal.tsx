import React, { useState } from 'react';
import { X, Ruler, Sparkles, Check } from 'lucide-react';
import { useFashion } from '../context/FashionContext';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useFashion();
  const [unit, setUnit] = useState<'cm' | 'inches'>('cm');

  if (!isSizeGuideOpen) return null;

  const WOMEN_SIZES = [
    { size: 'XS', bustCm: '82 - 85', waistCm: '63 - 66', hipsCm: '89 - 92', bustIn: '32 - 33.5', waistIn: '25 - 26', hipsIn: '35 - 36' },
    { size: 'S', bustCm: '86 - 89', waistCm: '67 - 70', hipsCm: '93 - 96', bustIn: '34 - 35', waistIn: '26.5 - 27.5', hipsIn: '36.5 - 38' },
    { size: 'M', bustCm: '90 - 94', waistCm: '71 - 75', hipsCm: '97 - 101', bustIn: '35.5 - 37', waistIn: '28 - 29.5', hipsIn: '38.5 - 40' },
    { size: 'L', bustCm: '95 - 99', waistCm: '76 - 80', hipsCm: '102 - 106', bustIn: '37.5 - 39', waistIn: '30 - 31.5', hipsIn: '40.5 - 42' },
    { size: 'XL', bustCm: '100 - 106', waistCm: '81 - 87', hipsCm: '107 - 113', bustIn: '39.5 - 41.5', waistIn: '32 - 34', hipsIn: '42.5 - 44.5' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div
        className="w-full max-w-2xl bg-white rounded-lg shadow-2xl border border-stone-200 overflow-hidden relative my-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-stone-900 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Ruler className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="font-serif text-xl font-bold">Viava Atelier Size & Tailoring Guide</h3>
              <p className="text-xs text-stone-300">Habesha Couture & Tailored Ready-to-Wear</p>
            </div>
          </div>
          <button
            onClick={() => setIsSizeGuideOpen(false)}
            className="p-1.5 text-stone-400 hover:text-white rounded-full"
            aria-label="Close size guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 text-xs text-stone-700">
          {/* Unit Switcher */}
          <div className="flex items-center justify-between">
            <span className="font-medium text-stone-800">Standard Sizing Specifications:</span>
            <div className="flex items-center bg-stone-100 p-0.5 rounded border border-stone-200">
              <button
                onClick={() => setUnit('cm')}
                className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                  unit === 'cm' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                Centimeters (cm)
              </button>
              <button
                onClick={() => setUnit('inches')}
                className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                  unit === 'inches' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                Inches (in)
              </button>
            </div>
          </div>

          {/* Sizing Table */}
          <div className="overflow-x-auto border border-stone-200 rounded-md">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-100 text-stone-700 font-mono uppercase">
                <tr>
                  <th className="p-3">Size</th>
                  <th className="p-3">Bust ({unit})</th>
                  <th className="p-3">Waist ({unit})</th>
                  <th className="p-3">Hips ({unit})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 font-mono">
                {WOMEN_SIZES.map(row => (
                  <tr key={row.size} className="hover:bg-stone-50">
                    <td className="p-3 font-bold text-stone-900">{row.size}</td>
                    <td className="p-3 text-stone-600">{unit === 'cm' ? row.bustCm : row.bustIn}</td>
                    <td className="p-3 text-stone-600">{unit === 'cm' ? row.waistCm : row.waistIn}</td>
                    <td className="p-3 text-stone-600">{unit === 'cm' ? row.hipsCm : row.hipsIn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Complimentary Tailoring Guarantee */}
          <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-md space-y-2">
            <div className="font-bold text-amber-950 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span>Complimentary Atelier Fitting in Bole</span>
            </div>
            <p className="text-stone-700 leading-relaxed">
              Every garment ordered from Viava includes complimentary length and waist fitting at our Bole Medhanialem showroom. You may also request custom measurements in your order notes.
            </p>
          </div>
        </div>

        <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
          <button
            onClick={() => setIsSizeGuideOpen(false)}
            className="px-5 py-2 bg-stone-900 text-white rounded text-xs font-semibold hover:bg-stone-800"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
