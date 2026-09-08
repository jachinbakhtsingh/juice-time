import { MouseEvent } from 'react';
import { Twitter, Instagram, Facebook, ArrowUp } from 'lucide-react';
import { DrinkVariant } from '../types';

interface FooterProps {
  currentVariant: DrinkVariant;
}

export function Footer({ currentVariant }: FooterProps) {
  const scrollToTop = (e: MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black text-white border-t border-neutral-800/80 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-12 sm:pt-20 pb-10 sm:pb-12">
        {/* Top Footer Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8 pb-10 sm:pb-16 border-b border-neutral-800/60">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span
                className="text-3xl sm:text-5xl font-black uppercase font-['Syne'] tracking-tighter"
                style={{ letterSpacing: '-0.04em' }}
              >
                OLIPOP
              </span>
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: currentVariant.themeColor }}
              />
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-medium max-w-sm">
              A modern functional soda brand inspired by classic flavors but made with better ingredients.
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-5 py-3 rounded-full border border-neutral-800 hover:border-neutral-600 text-xs font-bold uppercase tracking-widest text-neutral-300 hover:text-white transition-all duration-200 min-h-[44px]"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Links & Newsletter */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 py-10 sm:py-12 border-b border-neutral-800/60 text-xs">
          <div>
            <h4 className="font-bold uppercase tracking-wider text-neutral-300 mb-3 sm:mb-4 font-mono">
              Explore
            </h4>
            <ul className="space-y-2.5 text-neutral-400">
              <li>
                <a href="#product" className="hover:text-white transition-colors">
                  Product & Flavors
                </a>
              </li>
              <li>
                <a href="#ingredients" className="hover:text-white transition-colors">
                  The OLISMART® Blend
                </a>
              </li>
              <li>
                <a href="#nutrition" className="hover:text-white transition-colors">
                  Nutrition Facts
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">
                  Verified Reviews
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-wider text-neutral-300 mb-3 sm:mb-4 font-mono">
              Company
            </h4>
            <ul className="space-y-2.5 text-neutral-400">
              <li>
                <a href="#product" className="hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#cta" className="hover:text-white transition-colors">
                  Store Locator
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Wholesale & Foodservice
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-wider text-neutral-300 mb-3 sm:mb-4 font-mono">
              Legal
            </h4>
            <ul className="space-y-2.5 text-neutral-400">
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Accessibility Statement
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Do Not Sell My Info
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-wider text-neutral-300 mb-3 sm:mb-4 font-mono">
              Community
            </h4>
            <p className="text-neutral-400 mb-4 text-[11px] leading-relaxed">
              Get $5 off your first 12-pack and digestive wellness tips.
            </p>
            <div className="flex items-stretch gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white/40 min-h-[44px]"
              />
              <button
                type="button"
                className="px-4 py-2 bg-white text-black font-bold rounded-lg text-xs hover:bg-neutral-200 transition-colors uppercase tracking-wider min-h-[44px] shrink-0"
              >
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright and minimal monochrome socials */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400 font-mono text-center sm:text-left">
          <p>© {new Date().getFullYear()} OLIPOP Inc. All rights reserved. Functional soda crafted for human joy.</p>

          <div className="flex items-center gap-6 text-neutral-400">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter / X"
              className="p-2 hover:text-white transition-colors"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="p-2 hover:text-white transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="p-2 hover:text-white transition-colors"
            >
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
