import { motion } from 'motion/react';
import { Sparkles, ShieldCheck, HeartPulse, RefreshCw } from 'lucide-react';
import { DrinkVariant } from '../types';

interface ProductSectionProps {
  currentVariant: DrinkVariant;
  allVariants: DrinkVariant[];
  onSelectVariant: (index: number) => void;
  isDark: boolean;
}

export function ProductSection({
  currentVariant,
  allVariants,
  onSelectVariant,
  isDark,
}: ProductSectionProps) {
  return (
    <section
      id="product"
      className={`py-28 px-6 sm:px-8 lg:px-12 border-t transition-colors duration-300 ${
        isDark
          ? 'bg-neutral-950 text-white border-neutral-800/80'
          : 'bg-neutral-50 text-neutral-900 border-neutral-200'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: currentVariant.themeColor }}
              />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-neutral-400">
                The New Classic
              </span>
            </div>
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight font-['Syne']"
              style={{ letterSpacing: '-0.03em' }}
            >
              Real Soda. Real Joy.
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base text-neutral-400 leading-relaxed">
            We spent years collaborating with microbiome researchers to pioneer a soda that tastes like nostalgic favorites while actively fueling digestive wellness.
          </p>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <div
            className={`p-8 rounded-2xl border transition-all duration-300 ${
              isDark
                ? 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700'
                : 'bg-white border-neutral-200 hover:border-neutral-300 shadow-sm'
            }`}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
              style={{
                backgroundColor: `${currentVariant.themeColor}1a`,
                color: currentVariant.themeColor,
              }}
            >
              <HeartPulse className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Microbiome Nourishment</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Every single can delivers 9g of soluble prebiotic plant fiber from chicory, cassava, and calendula to cultivate healthy gut flora.
            </p>
          </div>

          <div
            className={`p-8 rounded-2xl border transition-all duration-300 ${
              isDark
                ? 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700'
                : 'bg-white border-neutral-200 hover:border-neutral-300 shadow-sm'
            }`}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
              style={{
                backgroundColor: `${currentVariant.themeColor}1a`,
                color: currentVariant.themeColor,
              }}
            >
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Only 2-5g Natural Sugar</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Real fruit juices and organic stevia leaf extract deliver classic fountain taste without corn syrup, spike-and-crash sugar spikes, or artificial colors.
            </p>
          </div>

          <div
            className={`p-8 rounded-2xl border transition-all duration-300 ${
              isDark
                ? 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700'
                : 'bg-white border-neutral-200 hover:border-neutral-300 shadow-sm'
            }`}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
              style={{
                backgroundColor: `${currentVariant.themeColor}1a`,
                color: currentVariant.themeColor,
              }}
            >
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Clean Certified</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Non-GMO Project Verified, Gluten-Free, Vegan, Paleo-friendly, and meticulously lab-tested for purity and prebiotic density.
            </p>
          </div>
        </div>

        {/* Flavor Selector Matrix */}
        <div
          className={`p-8 sm:p-12 rounded-3xl border ${
            isDark ? 'bg-neutral-900/40 border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-semibold block mb-1">
                Flavor Profiles
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-['Syne']">
                Explore the Functional Lineup
              </h3>
            </div>
            <span className="text-xs font-mono text-neutral-500 uppercase">
              Click to preview flavor in hero
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {allVariants.map((variant, idx) => {
              const isSelected = variant.id === currentVariant.id;
              return (
                <button
                  key={variant.id}
                  onClick={() => onSelectVariant(idx)}
                  className={`text-left p-6 rounded-2xl border transition-all duration-300 relative group ${
                    isSelected
                      ? isDark
                        ? 'bg-neutral-800/90 border-white/40 shadow-xl'
                        : 'bg-neutral-100 border-neutral-400 shadow-md'
                      : isDark
                      ? 'bg-neutral-950/60 border-neutral-800/80 hover:border-neutral-700'
                      : 'bg-neutral-50 border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="w-3.5 h-3.5 rounded-full"
                      style={{ backgroundColor: variant.themeColor }}
                    />
                    <span className="text-xs font-mono tracking-widest text-neutral-400">
                      0{idx + 1}
                    </span>
                  </div>

                  <h4 className="text-2xl font-black uppercase font-['Syne'] tracking-tight mb-1 text-white group-hover:text-white">
                    {variant.name}
                  </h4>
                  <p className="text-xs font-medium uppercase tracking-wider text-neutral-400 mb-4">
                    {variant.subtitle}
                  </p>

                  <p className="text-xs text-neutral-300 line-clamp-2 mb-4 leading-relaxed">
                    {variant.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-neutral-800">
                    {variant.tastingNotes.map((note) => (
                      <span
                        key={note}
                        className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-neutral-800/80 text-neutral-300"
                      >
                        {note}
                      </span>
                    ))}
                  </div>

                  {isSelected && (
                    <div
                      className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
                      style={{ backgroundColor: variant.themeColor }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
