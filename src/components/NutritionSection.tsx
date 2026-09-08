import { DrinkVariant } from '../types';
import { Info, Sparkles } from 'lucide-react';

interface NutritionSectionProps {
  currentVariant: DrinkVariant;
  isDark: boolean;
}

export function NutritionSection({ currentVariant, isDark }: NutritionSectionProps) {
  return (
    <section
      id="nutrition"
      className={`py-28 px-6 sm:px-8 lg:px-12 border-t transition-colors duration-300 ${
        isDark
          ? 'bg-neutral-950 text-white border-neutral-800'
          : 'bg-neutral-50 text-neutral-900 border-neutral-200'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Description */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 mb-3">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: currentVariant.themeColor }}
              />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-neutral-400">
                Transparent Nutrition
              </span>
            </div>

            <h2
              className="text-4xl sm:text-5xl font-black uppercase tracking-tight font-['Syne'] mb-6"
              style={{ letterSpacing: '-0.03em' }}
            >
              Every Sip Counts
            </h2>

            <p className="text-base text-neutral-400 leading-relaxed mb-8">
              We believe in radical transparency. Unlike traditional soda brands that conceal artificial sweeteners and high fructose syrups, every Olipop nutrition label is a testament to honest, clinically studied plant fiber and real botanicals.
            </p>

            <div className="space-y-4 w-full max-w-md">
              <div
                className={`p-4 rounded-xl border flex items-start gap-3.5 ${
                  isDark ? 'bg-neutral-900/60 border-neutral-800' : 'bg-white border-neutral-200'
                }`}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: `${currentVariant.themeColor}20`,
                    color: currentVariant.themeColor,
                  }}
                >
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-0.5">32% Daily Fiber in One Can</h4>
                  <p className="text-xs text-neutral-400">
                    Supports digestive transit, satiety, and a balanced metabolic response without sugar spikes.
                  </p>
                </div>
              </div>

              <div
                className={`p-4 rounded-xl border flex items-start gap-3.5 ${
                  isDark ? 'bg-neutral-900/60 border-neutral-800' : 'bg-white border-neutral-200'
                }`}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: `${currentVariant.themeColor}20`,
                    color: currentVariant.themeColor,
                  }}
                >
                  <Info className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-0.5">Low Net Carbs</h4>
                  <p className="text-xs text-neutral-400">
                    With 16g total carbs minus 9g indigestible prebiotic fiber, net active carbs are only 7g per can.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Authentic FDA Nutrition Facts Label Card */}
          <div className="lg:col-span-6 flex justify-center">
            <div
              className="w-full max-w-sm bg-white text-black p-6 sm:p-8 rounded-xl shadow-2xl border-4 border-black font-sans select-none"
              style={{
                boxShadow: `0 20px 40px -10px ${currentVariant.themeColor}33`,
              }}
            >
              {/* Top Nutrition Facts Header */}
              <h3 className="text-4xl font-black tracking-tight leading-none uppercase border-b-8 border-black pb-1 font-['Plus_Jakarta_Sans']">
                Nutrition Facts
              </h3>

              <div className="border-b border-black py-1.5 flex justify-between text-xs font-semibold">
                <span>1 serving per container</span>
              </div>

              <div className="border-b-4 border-black py-1 flex justify-between items-baseline">
                <span className="font-black text-sm">Serving size</span>
                <span className="font-black text-sm">1 can (355 mL / 12 fl oz)</span>
              </div>

              <div className="border-b-8 border-black py-2 flex justify-between items-baseline">
                <div>
                  <span className="text-[11px] font-bold block uppercase">Amount per serving</span>
                  <span className="text-4xl font-black leading-none">Calories</span>
                </div>
                <span className="text-4xl font-black leading-none">
                  {currentVariant.calories}
                </span>
              </div>

              <div className="text-right text-[10px] font-bold py-1 border-b border-black">
                % Daily Value*
              </div>

              {/* Nutrition lines */}
              <div className="divide-y divide-black/80 text-xs">
                <div className="py-1 flex justify-between">
                  <span>
                    <strong className="font-black">Total Fat</strong> 0g
                  </span>
                  <span className="font-bold">0%</span>
                </div>

                <div className="py-1 flex justify-between">
                  <span>
                    <strong className="font-black">Sodium</strong> 25mg
                  </span>
                  <span className="font-bold">1%</span>
                </div>

                <div className="py-1 flex justify-between">
                  <span>
                    <strong className="font-black">Total Carbohydrate</strong> 16g
                  </span>
                  <span className="font-bold">6%</span>
                </div>

                <div className="py-1 pl-4 flex justify-between">
                  <span>
                    Dietary Fiber <strong className="font-bold">{currentVariant.fiber}</strong>
                  </span>
                  <span className="font-black">32%</span>
                </div>

                <div className="py-1 pl-4 flex justify-between">
                  <span>Total Sugars {currentVariant.sugars}</span>
                  <span className="font-normal text-neutral-600"></span>
                </div>

                <div className="py-1 pl-8 flex justify-between text-[11px]">
                  <span>Includes 0g Added Sugars</span>
                  <span className="font-bold">0%</span>
                </div>

                <div className="py-1 flex justify-between">
                  <span>
                    <strong className="font-black">Protein</strong> 0g
                  </span>
                  <span className="font-bold">0%</span>
                </div>
              </div>

              <div className="border-t-4 border-black pt-2 text-[9px] leading-tight text-neutral-700">
                * The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000 calories a day is used for general nutrition advice.
              </div>

              <div className="mt-3 pt-2 border-t border-black/40 text-[9px] uppercase font-bold text-neutral-600 tracking-wider flex justify-between">
                <span>OLIPOP {currentVariant.name} SODA</span>
                <span
                  className="px-1.5 py-0.5 rounded text-white font-mono"
                  style={{ backgroundColor: currentVariant.themeColor }}
                >
                  VERIFIED
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
