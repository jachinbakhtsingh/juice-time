import { useState } from 'react';
import { ShoppingBag, Truck, RotateCcw, Check, Sparkles } from 'lucide-react';
import { DrinkVariant, CartItem } from '../types';

interface CtaSectionProps {
  currentVariant: DrinkVariant;
  onAddToCart: (variant: DrinkVariant, packSize?: '12-Pack' | '24-Pack' | 'Variety 12-Pack') => void;
  isDark: boolean;
}

export function CtaSection({ currentVariant, onAddToCart, isDark }: CtaSectionProps) {
  const [selectedPack, setSelectedPack] = useState<'12-Pack' | '24-Pack' | 'Variety 12-Pack'>('12-Pack');
  const [isSubscribe, setIsSubscribe] = useState<boolean>(true);

  const basePrice = selectedPack === '12-Pack' ? 35.99 : selectedPack === '24-Pack' ? 65.99 : 37.99;
  const finalPrice = isSubscribe ? (basePrice * 0.85).toFixed(2) : basePrice.toFixed(2);

  return (
    <section
      id="cta"
      className="py-16 sm:py-24 lg:py-28 px-4 sm:px-8 lg:px-12 bg-black text-white relative overflow-hidden border-t border-neutral-800"
    >
      {/* Background subtle radial glow */}
      <div
        className="pointer-events-none absolute -bottom-24 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full blur-[120px] sm:blur-[160px] opacity-20"
        style={{ backgroundColor: currentVariant.themeColor }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT: Square CTA Product Packshot (Olipop Grape Soda Can + Glossy Grapes) */}
          <div className="lg:col-span-6 flex justify-center">
            <div
              id="cta-product-packshot"
              className="relative w-full max-w-[340px] sm:max-w-[440px] aspect-square rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-purple-500/20 flex flex-col justify-between select-none"
              style={{
                background: 'linear-gradient(135deg, #7e22ce 0%, #6b21a8 50%, #4c1d95 100%)',
                boxShadow: '0 25px 60px -15px rgba(126, 34, 206, 0.45)',
              }}
            >
              {/* Studio Key Light Highlights on background */}
              <div className="absolute inset-0 bg-radial from-white/20 via-transparent to-black/30 pointer-events-none" />
              <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-purple-300/20 blur-3xl pointer-events-none" />

              {/* Minimal Top Brand Tag */}
              <div className="relative z-10 p-3.5 sm:p-6 flex justify-between items-start">
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] sm:tracking-[0.25em] px-2.5 sm:px-3 py-1 rounded-full bg-white/15 text-white backdrop-blur-md border border-white/20">
                  CLASSIC CONCORD
                </span>
                <span className="text-[10px] sm:text-xs font-mono font-bold text-white/80">
                  35 CAL • 9G FIBER
                </span>
              </div>

              {/* CENTER: Upright Grape Soda Can with realistic metallic surface & condensation */}
              <div className="relative z-10 flex-1 flex items-center justify-center -my-1 sm:-my-2">
                <div className="relative w-28 sm:w-36 md:w-44 h-48 sm:h-64 md:h-76 flex flex-col items-center">
                  
                  {/* Soft Floor Shadow */}
                  <div className="absolute -bottom-3 sm:-bottom-4 w-32 sm:w-40 h-6 sm:h-8 bg-black/60 rounded-full blur-md" />

                  {/* Can Top Bevel & Rim */}
                  <div className="w-[88%] h-4 sm:h-5 bg-gradient-to-r from-neutral-400 via-neutral-100 to-neutral-500 rounded-t-xl border-t border-white/70 shadow-inner flex items-center justify-center">
                    <div className="w-[72%] h-1.5 sm:h-2 bg-gradient-to-r from-neutral-600 via-neutral-300 to-neutral-700 rounded-full shadow-inner" />
                  </div>

                  {/* Main Can Cylinder Body */}
                  <div className="relative w-full flex-1 bg-gradient-to-r from-purple-900 via-purple-700 to-purple-950 rounded-b-xl border-x border-purple-400/40 shadow-2xl flex flex-col justify-between p-4 overflow-hidden">
                    {/* Metallic Glare highlight bar across can */}
                    <div className="absolute top-0 left-5 bottom-0 w-3 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none transform -skew-x-6" />
                    <div className="absolute top-0 right-7 bottom-0 w-1.5 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

                    {/* Can Top Brand */}
                    <div className="text-center pt-2">
                      <span className="text-[9px] uppercase tracking-[0.3em] font-extrabold text-purple-200 block">
                        OLIPOP
                      </span>
                      <span className="text-[7px] uppercase tracking-[0.15em] text-purple-300">
                        FUNCTIONAL SODA
                      </span>
                    </div>

                    {/* Can Center Flavor Graphics */}
                    <div className="my-auto text-center relative z-10">
                      <div className="w-10 h-10 mx-auto rounded-full bg-purple-950/80 border border-purple-400/40 flex items-center justify-center mb-1 shadow-lg">
                        <span className="text-lg">🍇</span>
                      </div>
                      <h4 className="text-2xl sm:text-3xl font-black font-['Syne'] uppercase tracking-tight text-white drop-shadow">
                        GRAPE
                      </h4>
                      <p className="text-[8px] uppercase tracking-[0.2em] font-bold text-purple-200">
                        CLASSIC SODA
                      </p>
                    </div>

                    {/* Can Bottom Badge */}
                    <div className="text-center pb-1 border-t border-purple-400/30 pt-1.5">
                      <span className="text-[8px] font-mono tracking-wider font-semibold text-purple-200">
                        9G PREBIOTIC FIBER • 3G SUGAR
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* BOTTOM: Glossy grapes piled across the full width */}
              <div className="relative z-20 -mt-10 px-2 pb-2">
                <div className="relative w-full h-16 flex items-end justify-center">
                  {/* Piled Grapes SVG Layer with glossy highlights and realistic depth */}
                  <svg
                    viewBox="0 0 400 90"
                    className="w-full h-full drop-shadow-xl overflow-visible"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Definitions for glossy grape gradients */}
                    <defs>
                      <radialGradient id="grapeGrad1" cx="35%" cy="30%" r="70%">
                        <stop offset="0%" stopColor="#c084fc" />
                        <stop offset="40%" stopColor="#7e22ce" />
                        <stop offset="90%" stopColor="#3b0764" />
                      </radialGradient>
                      <radialGradient id="grapeGrad2" cx="30%" cy="25%" r="75%">
                        <stop offset="0%" stopColor="#e9d5ff" />
                        <stop offset="30%" stopColor="#9333ea" />
                        <stop offset="85%" stopColor="#2e1065" />
                      </radialGradient>
                      <radialGradient id="grapeGrad3" cx="40%" cy="35%" r="65%">
                        <stop offset="0%" stopColor="#d8b4fe" />
                        <stop offset="50%" stopColor="#6b21a8" />
                        <stop offset="100%" stopColor="#1e1b4b" />
                      </radialGradient>
                    </defs>

                    {/* Back Row Grapes */}
                    <circle cx="45" cy="55" r="22" fill="url(#grapeGrad3)" opacity="0.9" />
                    <circle cx="95" cy="50" r="23" fill="url(#grapeGrad1)" />
                    <circle cx="145" cy="58" r="21" fill="url(#grapeGrad3)" />
                    <circle cx="200" cy="52" r="24" fill="url(#grapeGrad2)" />
                    <circle cx="255" cy="56" r="22" fill="url(#grapeGrad1)" />
                    <circle cx="305" cy="48" r="23" fill="url(#grapeGrad3)" />
                    <circle cx="355" cy="54" r="21" fill="url(#grapeGrad2)" />

                    {/* Front Row Glossy Plump Grapes across width */}
                    <circle cx="25" cy="68" r="20" fill="url(#grapeGrad1)" />
                    <circle cx="68" cy="66" r="23" fill="url(#grapeGrad2)" />
                    <circle cx="118" cy="65" r="24" fill="url(#grapeGrad1)" />
                    <circle cx="168" cy="67" r="22" fill="url(#grapeGrad2)" />
                    <circle cx="225" cy="64" r="25" fill="url(#grapeGrad1)" />
                    <circle cx="280" cy="66" r="23" fill="url(#grapeGrad2)" />
                    <circle cx="330" cy="68" r="22" fill="url(#grapeGrad1)" />
                    <circle cx="375" cy="70" r="19" fill="url(#grapeGrad3)" />

                    {/* Gloss highlights on selected front grapes */}
                    <ellipse cx="62" cy="58" rx="5" ry="3" fill="#ffffff" opacity="0.6" transform="rotate(-20 62 58)" />
                    <ellipse cx="112" cy="57" rx="6" ry="3" fill="#ffffff" opacity="0.7" transform="rotate(-25 112 57)" />
                    <ellipse cx="218" cy="55" rx="7" ry="4" fill="#ffffff" opacity="0.8" transform="rotate(-20 218 55)" />
                    <ellipse cx="274" cy="58" rx="6" ry="3" fill="#ffffff" opacity="0.7" transform="rotate(-20 274 58)" />
                    <ellipse cx="324" cy="60" rx="5" ry="3" fill="#ffffff" opacity="0.6" transform="rotate(-25 324 60)" />

                    {/* Green vine leaf accent */}
                    <path
                      d="M175 42 C160 30, 140 38, 145 52 C150 60, 170 55, 175 42 Z"
                      fill="#15803d"
                      stroke="#166534"
                      strokeWidth="1"
                    />
                    <path
                      d="M245 40 C260 28, 280 36, 275 50 C270 58, 250 53, 245 40 Z"
                      fill="#16a34a"
                      stroke="#15803d"
                      strokeWidth="1"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: High-Impact Purchase Panel & CTA */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 mb-3">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: currentVariant.themeColor }}
              />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-neutral-400">
                Fresh Batch Ready to Ship
              </span>
            </div>

            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight font-['Syne'] mb-4"
              style={{ letterSpacing: '-0.03em' }}
            >
              Order Olipop Today
            </h2>

            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed mb-6 sm:mb-8">
              Swap sugar crashes for gut vitality. Choose your favorite flavor or build a variety bundle delivered straight to your door with cold-pack insulation.
            </p>

            {/* Pack Size Selectors */}
            <div className="w-full mb-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                Select Bundle Size:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                {(['12-Pack', '24-Pack', 'Variety 12-Pack'] as const).map((pack) => {
                  const isPackSelected = selectedPack === pack;
                  return (
                    <button
                      key={pack}
                      onClick={() => setSelectedPack(pack)}
                      className={`min-h-[44px] py-2.5 sm:py-3 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border text-center flex flex-col items-center justify-center ${
                        isPackSelected
                          ? 'bg-white text-black border-white shadow-md'
                          : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-neutral-700'
                      }`}
                    >
                      <span>{pack}</span>
                      {pack === '24-Pack' && (
                        <span className="block text-[9px] font-mono text-emerald-400 mt-0.5">
                          Save $6
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Subscribe & Save Toggle */}
            <div className="w-full p-3.5 sm:p-4 rounded-xl bg-neutral-900 border border-neutral-800 mb-6 sm:mb-8 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="sub-toggle"
                  checked={isSubscribe}
                  onChange={(e) => setIsSubscribe(e.target.checked)}
                  className="w-4 h-4 rounded text-white bg-neutral-800 border-neutral-700 focus:ring-0 cursor-pointer"
                />
                <label htmlFor="sub-toggle" className="cursor-pointer text-sm font-medium">
                  <span className="font-bold text-white block sm:inline">Subscribe & Save 15%</span>
                  <span className="block text-xs text-neutral-400">Cancel or swap flavors anytime in 1 click</span>
                </label>
              </div>
              <span className="text-xs font-bold text-emerald-400 font-mono shrink-0">
                15% OFF
              </span>
            </div>

            {/* Price & Action Buttons */}
            <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <div className="flex items-baseline sm:flex-col sm:items-start justify-between sm:justify-start">
                <span className="text-xs uppercase tracking-wider text-neutral-500 font-bold">Total</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-black font-['Syne'] text-white">
                    ${finalPrice}
                  </span>
                  {isSubscribe && (
                    <span className="text-xs sm:text-sm line-through text-neutral-500 font-mono">
                      ${basePrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex-1 w-full flex items-center gap-3">
                {/* Add to Cart button */}
                <button
                  id="cta-add-to-cart-btn"
                  onClick={() => onAddToCart(currentVariant, selectedPack)}
                  className="min-h-[48px] flex-1 py-3.5 sm:py-4 px-6 rounded-full bg-white text-black font-bold text-xs uppercase tracking-[0.18em] transition-all duration-200 hover:bg-neutral-200 active:scale-95 shadow-xl flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>ADD TO CART</span>
                </button>
              </div>
            </div>

            {/* Guarantees */}
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-neutral-400 border-t border-neutral-800/80 pt-6 w-full">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-neutral-300 shrink-0" />
                <span>Free Carbon-Neutral Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-neutral-300 shrink-0" />
                <span>100% Happiness Guarantee</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
