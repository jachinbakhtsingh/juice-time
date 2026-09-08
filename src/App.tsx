import { useState, useEffect, useCallback, useTransition } from 'react';
import { INITIAL_DRINK_VARIANTS, resolveFrameUrl } from './data/drinkVariants';
import { DrinkVariant, CartItem } from './types';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { HeroSequence } from './components/HeroSequence';
import { ProductSection } from './components/ProductSection';
import { IngredientsSection } from './components/IngredientsSection';
import { NutritionSection } from './components/NutritionSection';
import { ReviewsSection } from './components/ReviewsSection';
import { FaqSection } from './components/FaqSection';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';
import { CustomizeModal } from './components/CustomizeModal';
import { CartDrawer } from './components/CartDrawer';

export default function App() {
  const [variants, setVariants] = useState<DrinkVariant[]>(INITIAL_DRINK_VARIANTS);
  const [currentVariantIndex, setCurrentVariantIndex] = useState<number>(0);
  const [isDark, setIsDark] = useState<boolean>(true);

  // Preloader State
  const [preloadProgress, setPreloadProgress] = useState<number>(0);
  const [isInitialLoaded, setIsInitialLoaded] = useState<boolean>(false);
  const [isVariantLoading, setIsVariantLoading] = useState<boolean>(false);

  // UI Modals / Drawers
  const [customizerOpen, setCustomizerOpen] = useState<boolean>(false);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      variantId: 'cherry',
      name: 'CHERRY',
      subtitle: 'VINTAGE SODA',
      packSize: '12-Pack',
      price: 35.99,
      quantity: 1,
      themeColor: '#E11D48',
    },
  ]);

  const currentVariant = variants[currentVariantIndex] || variants[0];

  // Initial sequence loading before unveiling the hero
  useEffect(() => {
    let mounted = true;
    const initialVariant = variants[0];
    const totalFramesToSample = Math.min(initialVariant.frameCount, 40); // Preload first 40 frames for snappy entrance
    let loadedCount = 0;

    const interval = setInterval(() => {
      // Simulate minimum progressive visual bar
      setPreloadProgress((prev) => {
        if (prev >= 98) return prev;
        return prev + 2.5;
      });
    }, 40);

    for (let i = 0; i < totalFramesToSample; i++) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = resolveFrameUrl(initialVariant.sequencePattern, i, initialVariant.padLength);
      const onLoadOrError = () => {
        if (!mounted) return;
        loadedCount++;
        const calculated = Math.min(100, Math.round((loadedCount / totalFramesToSample) * 100));
        setPreloadProgress((prev) => Math.max(prev, calculated));

        if (loadedCount >= totalFramesToSample) {
          clearInterval(interval);
          setPreloadProgress(100);
          setTimeout(() => {
            if (mounted) setIsInitialLoaded(true);
          }, 400);
        }
      };
      img.onload = onLoadOrError;
      img.onerror = onLoadOrError;
    }

    // Safety fallback timeout after 3.5s so user is never blocked if network stalls
    const timeout = setTimeout(() => {
      if (mounted) {
        clearInterval(interval);
        setPreloadProgress(100);
        setIsInitialLoaded(true);
      }
    }, 3500);

    return () => {
      mounted = false;
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  // Preload a few frames when switching variant
  const switchVariant = useCallback(
    (newIndex: number) => {
      if (newIndex === currentVariantIndex) return;
      setIsVariantLoading(true);
      const targetVariant = variants[newIndex];

      // Quick frame check
      const sampleImg = new Image();
      sampleImg.crossOrigin = 'anonymous';
      sampleImg.src = resolveFrameUrl(targetVariant.sequencePattern, 0, targetVariant.padLength);
      
      const finalizeSwitch = () => {
        setCurrentVariantIndex(newIndex);
        if (targetVariant.mode) {
          setIsDark(targetVariant.mode === 'dark');
        }
        setTimeout(() => {
          setIsVariantLoading(false);
        }, 300);
      };

      sampleImg.onload = finalizeSwitch;
      sampleImg.onerror = finalizeSwitch;
      setTimeout(finalizeSwitch, 500);
    },
    [currentVariantIndex, variants]
  );

  const handlePrevVariant = () => {
    const nextIdx = (currentVariantIndex - 1 + variants.length) % variants.length;
    switchVariant(nextIdx);
  };

  const handleNextVariant = () => {
    const nextIdx = (currentVariantIndex + 1) % variants.length;
    switchVariant(nextIdx);
  };

  // Add to Cart handler
  const handleAddToCart = (variant: DrinkVariant, packSize: '12-Pack' | '24-Pack' | 'Variety 12-Pack' = '12-Pack') => {
    const price = packSize === '12-Pack' ? 35.99 : packSize === '24-Pack' ? 65.99 : 37.99;
    setCartItems((prev) => {
      const existingIdx = prev.findIndex((item) => item.variantId === variant.id && item.packSize === packSize);
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx].quantity += 1;
        return updated;
      }
      return [
        ...prev,
        {
          variantId: variant.id,
          name: variant.name,
          subtitle: variant.subtitle,
          packSize,
          price,
          quantity: 1,
          themeColor: variant.themeColor,
        },
      ];
    });
    setCartOpen(true);
  };

  // Cart quantity controls
  const handleUpdateCartQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(index);
      return;
    }
    setCartItems((prev) => {
      const next = [...prev];
      next[index].quantity = newQty;
      return next;
    });
  };

  const handleRemoveCartItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  // Customizer actions
  const handleUpdateVariant = (index: number, updated: Partial<DrinkVariant>) => {
    setVariants((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], ...updated };
      return next;
    });
  };

  const handleAddVariant = (newVariant: DrinkVariant) => {
    setVariants((prev) => [...prev, newVariant]);
    setCurrentVariantIndex(variants.length);
  };

  const handleDeleteVariant = (index: number) => {
    if (variants.length <= 1) return;
    setVariants((prev) => prev.filter((_, i) => i !== index));
    setCurrentVariantIndex(0);
  };

  const handleResetDefaults = () => {
    setVariants(INITIAL_DRINK_VARIANTS);
    setCurrentVariantIndex(0);
    setIsDark(true);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div
      className={`min-h-screen font-['Plus_Jakarta_Sans'] antialiased transition-colors duration-300 ${
        isDark ? 'bg-neutral-950 text-white' : 'bg-neutral-50 text-neutral-900'
      }`}
      style={{
        ['--brand-accent' as string]: currentVariant.themeColor,
      }}
    >
      {/* 1. Full-Screen Loading Overlay */}
      <Preloader
        progress={preloadProgress}
        isLoaded={isInitialLoaded}
        themeColor={currentVariant.themeColor}
        drinkName={currentVariant.name}
      />

      {/* 2. Sticky Top Navigation Bar */}
      <Navbar
        currentVariant={currentVariant}
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
        onOpenCustomizer={() => setCustomizerOpen(true)}
        cartCount={totalCartCount}
        onOpenCart={() => setCartOpen(true)}
      />

      {/* 3. Hero Section with Scroll-Tied WebP Canvas Sequence */}
      <main>
        <HeroSequence
          currentVariant={currentVariant}
          variantIndex={currentVariantIndex}
          totalVariants={variants.length}
          onPrevVariant={handlePrevVariant}
          onNextVariant={handleNextVariant}
          onAddToCart={handleAddToCart}
          isDark={isDark}
          isVariantLoading={isVariantLoading}
        />

        {/* 4. Product / About the Drink */}
        <ProductSection
          currentVariant={currentVariant}
          allVariants={variants}
          onSelectVariant={switchVariant}
          isDark={isDark}
        />

        {/* 5. Ingredients & Benefits */}
        <IngredientsSection
          currentVariant={currentVariant}
          isDark={isDark}
        />

        {/* 6. Nutrition Facts Card */}
        <NutritionSection
          currentVariant={currentVariant}
          isDark={isDark}
        />

        {/* 7. Reviews & Social Proof */}
        <ReviewsSection
          currentVariant={currentVariant}
          isDark={isDark}
        />

        {/* 8. FAQ Accordion */}
        <FaqSection
          currentVariant={currentVariant}
          isDark={isDark}
        />

        {/* 9. Final Call-to-Action with Studio Grape Soda Can Packshot */}
        <CtaSection
          currentVariant={currentVariant}
          onAddToCart={handleAddToCart}
          isDark={isDark}
        />
      </main>

      {/* 10. Footer */}
      <Footer currentVariant={currentVariant} />

      {/* 11. Live Drink & Parallax Customizer Modal */}
      <CustomizeModal
        isOpen={customizerOpen}
        onClose={() => setCustomizerOpen(false)}
        variants={variants}
        currentIndex={currentVariantIndex}
        onUpdateVariant={handleUpdateVariant}
        onAddVariant={handleAddVariant}
        onDeleteVariant={handleDeleteVariant}
        onResetDefaults={handleResetDefaults}
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
      />

      {/* 12. Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        isDark={isDark}
      />
    </div>
  );
}
