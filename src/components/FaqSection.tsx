import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { DrinkVariant } from '../types';
import { FAQ_DATA } from '../data/drinkVariants';

interface FaqSectionProps {
  currentVariant: DrinkVariant;
  isDark: boolean;
}

export function FaqSection({ currentVariant, isDark }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className={`py-16 sm:py-24 lg:py-28 px-4 sm:px-8 lg:px-12 border-t transition-colors duration-300 ${
        isDark
          ? 'bg-neutral-950 text-white border-neutral-800'
          : 'bg-neutral-50 text-neutral-900 border-neutral-200'
      }`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: currentVariant.themeColor }}
            />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-neutral-400">
              Clear Answers
            </span>
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight font-['Syne'] mb-3 sm:mb-4"
            style={{ letterSpacing: '-0.03em' }}
          >
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-neutral-400 max-w-lg mx-auto">
            Everything you need to know about our functional botanicals, microbiome fiber, storage, and subscription.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-3 sm:space-y-4">
          {FAQ_DATA.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.question}
                className={`rounded-xl sm:rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isDark
                    ? isOpen
                      ? 'bg-neutral-900/90 border-neutral-700'
                      : 'bg-neutral-900/40 border-neutral-800/80 hover:border-neutral-700'
                    : isOpen
                    ? 'bg-white border-neutral-300 shadow-sm'
                    : 'bg-white/60 border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full min-h-[48px] py-4 sm:py-6 px-4 sm:px-8 text-left flex items-center justify-between gap-4 select-none focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <span
                      className="text-xs font-mono uppercase tracking-wider font-semibold shrink-0"
                      style={{ color: currentVariant.themeColor }}
                    >
                      0{index + 1}
                    </span>
                    <span className="text-sm sm:text-base md:text-lg font-bold text-white font-['Plus_Jakarta_Sans']">
                      {item.question}
                    </span>
                  </div>

                  <div
                    className={`p-1.5 rounded-full border transition-transform duration-300 shrink-0 ${
                      isOpen
                        ? 'rotate-180 bg-white/10 border-white/20'
                        : 'bg-neutral-800/40 border-neutral-700'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4 text-neutral-300" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-8 pb-5 sm:pb-6 pt-1 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-neutral-800/40">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
