import { Check, X, Leaf, Sparkles, Activity } from 'lucide-react';
import { DrinkVariant } from '../types';

interface IngredientsSectionProps {
  currentVariant: DrinkVariant;
  isDark: boolean;
}

const INGREDIENT_CARDS = [
  {
    name: 'Chicory Root Inulin',
    type: 'Prebiotic Soluble Fiber',
    description: 'Feeds beneficial bifidobacteria in your lower digestive tract, fostering a diverse microbial biome.',
    icon: '🌱',
  },
  {
    name: 'Cassava Root Fiber',
    type: 'Clean Plant Prebiotic',
    description: 'Extracted from whole cassava root to provide clean prebiotic carbohydrates that support intestinal cell integrity.',
    icon: '🌾',
  },
  {
    name: 'Nopal Cactus Extract',
    type: 'Bioactive Botanical',
    description: 'Known for rich polyphenol and antioxidant content, traditional in Mexican wellness practices for metabolic harmony.',
    icon: '🌵',
  },
  {
    name: 'Marshmallow Root',
    type: 'Mucilaginous Herb',
    description: 'Revered in herbal medicine for gentle, natural demulcent properties that soothe the stomach lining.',
    icon: '🌸',
  },
  {
    name: 'Calendula Flower',
    type: 'Targeted Botanical',
    description: 'Hand-harvested botanical petals delivering flavonoids and protective carotenoids to daily wellness.',
    icon: '🌼',
  },
  {
    name: 'Pure Fruit Juices & Stevia',
    type: 'Natural Sweetness',
    description: 'Cold-pressed real juices paired with pure stevia rebaudiana leaf for bright fountain sweetness with 0 sugar crash.',
    icon: '🍒',
  },
];

export function IngredientsSection({ currentVariant, isDark }: IngredientsSectionProps) {
  return (
    <section
      id="ingredients"
      className={`py-16 sm:py-24 lg:py-28 px-4 sm:px-8 lg:px-12 border-t transition-colors duration-300 ${
        isDark
          ? 'bg-neutral-900/60 text-white border-neutral-800'
          : 'bg-neutral-100 text-neutral-900 border-neutral-200'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: currentVariant.themeColor }}
            />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-neutral-400">
              The OLISMART® Blend
            </span>
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight font-['Syne'] mb-3 sm:mb-4"
            style={{ letterSpacing: '-0.03em' }}
          >
            Functional Botanicals & Fiber
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-neutral-400 leading-relaxed max-w-xl mx-auto">
            Formulated alongside world-class gastroenterology and nutritional microbiome researchers to support gut diversity with every can.
          </p>
        </div>

        {/* 6 Ingredient Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-20">
          {INGREDIENT_CARDS.map((item) => (
            <div
              key={item.name}
              className={`p-5 sm:p-7 rounded-2xl border transition-all duration-300 ${
                isDark
                  ? 'bg-neutral-950/80 border-neutral-800 hover:border-neutral-700'
                  : 'bg-white border-neutral-200 hover:border-neutral-300 shadow-sm'
              }`}
            >
              <div className="text-2xl sm:text-3xl mb-3 sm:mb-4 select-none">{item.icon}</div>
              <h3 className="text-base sm:text-lg font-bold mb-1 text-white">{item.name}</h3>
              <p
                className="text-xs font-mono uppercase tracking-wider mb-2.5 font-semibold"
                style={{ color: currentVariant.themeColor }}
              >
                {item.type}
              </p>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Soda Comparison Card */}
        <div
          className={`p-4 sm:p-8 lg:p-12 rounded-2xl sm:rounded-3xl border ${
            isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-white border-neutral-200 shadow-md'
          }`}
        >
          <div className="text-center max-w-xl mx-auto mb-6 sm:mb-10">
            <h3 className="text-xl sm:text-3xl font-black uppercase font-['Syne'] tracking-tight mb-2">
              Side-By-Side Truth
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400">
              See what makes our prebiotic formulation a generation ahead of traditional big soda.
            </p>
          </div>

          <div className="block sm:hidden text-right text-[10px] text-neutral-400 font-mono mb-2">
            ← Swipe to compare →
          </div>

          <div className="overflow-x-auto -mx-2 sm:mx-0">
            <table className="w-full text-left text-xs sm:text-sm min-w-[500px]">
              <thead>
                <tr className="border-b border-neutral-800 text-[10px] sm:text-xs uppercase tracking-widest text-neutral-400">
                  <th className="py-3 sm:py-4 px-3 sm:px-4 font-semibold">Nutritional Metric</th>
                  <th
                    className="py-3 sm:py-4 px-3 sm:px-4 font-bold text-sm sm:text-base"
                    style={{ color: currentVariant.themeColor }}
                  >
                    OLIPOP {currentVariant.name}
                  </th>
                  <th className="py-3 sm:py-4 px-3 sm:px-4 font-semibold text-neutral-500">
                    Traditional Big Soda
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60 font-mono text-xs sm:text-sm">
                <tr>
                  <td className="py-3.5 sm:py-4 px-3 sm:px-4 text-neutral-300 font-sans font-medium">Prebiotic Dietary Fiber</td>
                  <td className="py-3.5 sm:py-4 px-3 sm:px-4 font-bold text-white flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>9g (32% Daily Value)</span>
                  </td>
                  <td className="py-3.5 sm:py-4 px-3 sm:px-4 text-neutral-500 flex items-center gap-2">
                    <X className="w-4 h-4 text-rose-500 shrink-0" />
                    <span>0g</span>
                  </td>
                </tr>

                <tr>
                  <td className="py-3.5 sm:py-4 px-3 sm:px-4 text-neutral-300 font-sans font-medium">Total Sugars</td>
                  <td className="py-3.5 sm:py-4 px-3 sm:px-4 font-bold text-white flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{currentVariant.sugars} (from real fruit)</span>
                  </td>
                  <td className="py-3.5 sm:py-4 px-3 sm:px-4 text-neutral-500 flex items-center gap-2">
                    <X className="w-4 h-4 text-rose-500 shrink-0" />
                    <span>39g - 42g (Corn Syrup)</span>
                  </td>
                </tr>

                <tr>
                  <td className="py-3.5 sm:py-4 px-3 sm:px-4 text-neutral-300 font-sans font-medium">Calories Per Can</td>
                  <td className="py-3.5 sm:py-4 px-3 sm:px-4 font-bold text-white">
                    {currentVariant.calories} Calories
                  </td>
                  <td className="py-3.5 sm:py-4 px-3 sm:px-4 text-neutral-500">
                    140 - 160 Calories
                  </td>
                </tr>

                <tr>
                  <td className="py-3.5 sm:py-4 px-3 sm:px-4 text-neutral-300 font-sans font-medium">Microbiome Health Impact</td>
                  <td className="py-3.5 sm:py-4 px-3 sm:px-4 text-emerald-400 font-sans font-semibold">
                    Cultivates short-chain fatty acids & microbiome diversity
                  </td>
                  <td className="py-3.5 sm:py-4 px-3 sm:px-4 text-neutral-500 font-sans">
                    Spikes blood glucose, promotes systemic inflammation
                  </td>
                </tr>

                <tr>
                  <td className="py-3.5 sm:py-4 px-3 sm:px-4 text-neutral-300 font-sans font-medium">Artificial Sweeteners & Dyes</td>
                  <td className="py-3.5 sm:py-4 px-3 sm:px-4 font-bold text-emerald-400 font-sans">
                    None. Zero synthetic dyes, Red 40, or aspartame
                  </td>
                  <td className="py-3.5 sm:py-4 px-3 sm:px-4 text-neutral-500 font-sans">
                    Caramel color, phosphoric acid, artificial flavors
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
