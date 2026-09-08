import { useState, useEffect, MouseEvent } from 'react';
import { Moon, Sun, ShoppingBag, Sliders, Menu, X } from 'lucide-react';
import { DrinkVariant } from '../types';

interface NavbarProps {
  currentVariant: DrinkVariant;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenCustomizer: () => void;
  cartCount: number;
  onOpenCart: () => void;
}

const NAV_LINKS = [
  { label: 'Product', href: '#product' },
  { label: 'Ingredients', href: '#ingredients' },
  { label: 'Nutrition', href: '#nutrition' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Order', href: '#cta' },
];

export function Navbar({
  currentVariant,
  isDark,
  onToggleTheme,
  onOpenCustomizer,
  cartCount,
  onOpenCart,
}: NavbarProps) {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = ['product', 'ingredients', 'nutrition', 'reviews', 'faq', 'cta'];
      const scrollPosition = window.scrollY + 180;

      let found = 'hero';
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            found = sectionId;
            break;
          }
        }
      }
      setActiveSection(found);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-sticky-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? isDark
            ? 'bg-neutral-950/85 backdrop-blur-md border-b border-neutral-800/60 shadow-lg shadow-black/20'
            : 'bg-white/85 backdrop-blur-md border-b border-neutral-200/80 shadow-md shadow-neutral-200/40'
          : 'bg-gradient-to-b from-black/60 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left: Brand Logo & Tagline */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 group"
          >
            <span
              className="text-3xl sm:text-4xl font-black tracking-tighter uppercase font-['Syne'] transition-transform duration-300 group-hover:scale-105"
              style={{
                color: isDark ? '#FFFFFF' : '#111827',
                letterSpacing: '-0.04em',
              }}
            >
              OLIPOP
            </span>
            <span
              className="hidden sm:inline-block text-[10px] tracking-[0.2em] font-semibold uppercase px-2 py-0.5 rounded-full border transition-colors duration-300"
              style={{
                borderColor: `${currentVariant.themeColor}55`,
                color: currentVariant.themeColor,
                backgroundColor: `${currentVariant.themeColor}15`,
              }}
            >
              Functional Soda
            </span>
          </a>
        </div>

        {/* Right Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`text-sm font-medium tracking-wide transition-all duration-200 relative py-1 ${
                  isActive
                    ? isDark
                      ? 'text-white font-semibold'
                      : 'text-neutral-900 font-semibold'
                    : isDark
                    ? 'text-neutral-400 hover:text-neutral-200'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {link.label}
                {isActive && (
                  <span
                    className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full transition-all duration-300"
                    style={{ backgroundColor: currentVariant.themeColor }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Action Controls: Theme Toggle, Customizer, Bag */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Live Customizer Button */}
          <button
            id="open-customizer-btn"
            onClick={onOpenCustomizer}
            title="Customize drink, colors & WebP sequences"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 border ${
              isDark
                ? 'bg-neutral-900/90 hover:bg-neutral-800 text-neutral-200 border-neutral-700 hover:border-neutral-500'
                : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-800 border-neutral-300 hover:border-neutral-400'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" style={{ color: currentVariant.themeColor }} />
            <span className="hidden md:inline">Customize</span>
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            id="theme-mode-toggle-btn"
            onClick={onToggleTheme}
            aria-label="Toggle dark and light mode"
            className={`p-2 rounded-full transition-colors border ${
              isDark
                ? 'bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 border-neutral-800'
                : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700 border-neutral-300'
            }`}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-700" />}
          </button>

          {/* Cart Bag Button */}
          <button
            id="header-cart-btn"
            onClick={onOpenCart}
            aria-label="View Shopping Cart"
            className="relative p-2 rounded-full transition-colors bg-white text-neutral-950 hover:bg-neutral-200"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center text-white"
                style={{ backgroundColor: currentVariant.themeColor }}
              >
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            id="mobile-nav-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-full border ${
              isDark
                ? 'bg-neutral-900 text-white border-neutral-800'
                : 'bg-neutral-100 text-neutral-900 border-neutral-300'
            }`}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden border-b px-6 py-6 transition-all ${
            isDark ? 'bg-neutral-950/95 border-neutral-800 text-white' : 'bg-white/95 border-neutral-200 text-neutral-900'
          }`}
        >
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-lg font-medium py-1 text-neutral-300 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
