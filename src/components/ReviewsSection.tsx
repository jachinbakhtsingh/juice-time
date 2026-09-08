import { Star, CheckCircle2, Quote } from 'lucide-react';
import { DrinkVariant, ReviewItem } from '../types';
import { REVIEWS_DATA } from '../data/drinkVariants';

interface ReviewsSectionProps {
  currentVariant: DrinkVariant;
  isDark: boolean;
}

const PRESS_LOGOS = [
  { name: 'VOGUE', quote: 'The healthy soda taking over America.' },
  { name: 'FORBES', quote: 'Disrupting a $40B soda industry with microbiome science.' },
  { name: 'NEW YORK TIMES', quote: 'Tastes startlingly close to the classics.' },
  { name: 'BON APPÉTIT', quote: 'Our editors are officially converted.' },
];

export function ReviewsSection({ currentVariant, isDark }: ReviewsSectionProps) {
  return (
    <section
      id="reviews"
      className={`py-28 px-6 sm:px-8 lg:px-12 border-t transition-colors duration-300 ${
        isDark
          ? 'bg-neutral-900/40 text-white border-neutral-800'
          : 'bg-white text-neutral-900 border-neutral-200'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header with overall rating */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: currentVariant.themeColor }}
              />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-neutral-400">
                Loved by 500,000+ Drinkers
              </span>
            </div>
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight font-['Syne']"
              style={{ letterSpacing: '-0.03em' }}
            >
              Real Flavor. Real Love.
            </h2>
          </div>

          <div className="flex items-center gap-5">
            <div className="flex flex-col">
              <div className="flex items-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-sm font-bold">4.9 / 5.0 Average Rating</span>
              <span className="text-xs text-neutral-400">Based on 42,800+ verified customer reviews</span>
            </div>
          </div>
        </div>

        {/* Press Quotes Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {PRESS_LOGOS.map((press) => (
            <div
              key={press.name}
              className={`p-6 rounded-2xl border text-center flex flex-col justify-center items-center ${
                isDark ? 'bg-neutral-950/70 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
              }`}
            >
              <span className="font-['Syne'] font-black tracking-widest text-base sm:text-lg mb-2 text-white">
                {press.name}
              </span>
              <p className="text-xs text-neutral-400 italic">
                "{press.quote}"
              </p>
            </div>
          ))}
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REVIEWS_DATA.map((rev) => (
            <div
              key={rev.id}
              className={`p-8 rounded-2xl border transition-all duration-300 relative ${
                isDark
                  ? 'bg-neutral-950/90 border-neutral-800/80 hover:border-neutral-700'
                  : 'bg-white border-neutral-200 hover:border-neutral-300 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-mono text-neutral-500">{rev.date}</span>
              </div>

              <h4 className="text-lg font-bold mb-2 text-white">"{rev.title}"</h4>
              <p className="text-sm text-neutral-400 leading-relaxed mb-6">
                {rev.content}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-neutral-800/60 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">{rev.author}</span>
                  {rev.verified && (
                    <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Verified Buyer</span>
                    </span>
                  )}
                </div>
                <span
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold"
                  style={{
                    backgroundColor: `${currentVariant.themeColor}15`,
                    color: currentVariant.themeColor,
                  }}
                >
                  {rev.flavor} Soda
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
