import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronUp, ChevronDown, Loader2, Twitter, Instagram, Facebook, Sparkles } from 'lucide-react';
import { DrinkVariant } from '../types';
import { resolveFrameUrl } from '../data/drinkVariants';

interface HeroSequenceProps {
  currentVariant: DrinkVariant;
  variantIndex: number;
  totalVariants: number;
  onPrevVariant: () => void;
  onNextVariant: () => void;
  onAddToCart: (variant: DrinkVariant) => void;
  isDark: boolean;
  isVariantLoading: boolean;
}

export function HeroSequence({
  currentVariant,
  variantIndex,
  totalVariants,
  onPrevVariant,
  onNextVariant,
  onAddToCart,
  isDark,
  isVariantLoading,
}: HeroSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Loaded images cache: url -> HTMLImageElement
  const imagesCacheRef = useRef<Map<string, HTMLImageElement>>(new Map());
  const currentFrameRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  const [currentFrameIndex, setCurrentFrameIndex] = useState<number>(0);
  const [isCanvasReady, setIsCanvasReady] = useState<boolean>(false);

  // Format flavor index e.g. "01", "02", "03"
  const formattedIndex = String(variantIndex + 1).padStart(2, '0');

  // Render a specific frame onto the canvas with cover scaling
  const drawFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const frameUrl = resolveFrameUrl(
      currentVariant.sequencePattern,
      frameIdx,
      currentVariant.padLength
    );

    let img = imagesCacheRef.current.get(frameUrl);

    // If exact frame isn't loaded yet, find the nearest cached frame
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let delta = 1; delta < currentVariant.frameCount; delta++) {
        const prevUrl = resolveFrameUrl(
          currentVariant.sequencePattern,
          Math.max(0, frameIdx - delta),
          currentVariant.padLength
        );
        const nextUrl = resolveFrameUrl(
          currentVariant.sequencePattern,
          Math.min(currentVariant.frameCount - 1, frameIdx + delta),
          currentVariant.padLength
        );

        if (imagesCacheRef.current.has(prevUrl)) {
          img = imagesCacheRef.current.get(prevUrl);
          break;
        }
        if (imagesCacheRef.current.has(nextUrl)) {
          img = imagesCacheRef.current.get(nextUrl);
          break;
        }
      }
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (img && img.complete && img.naturalWidth > 0) {
      const hRatio = canvas.width / img.naturalWidth;
      const vRatio = canvas.height / img.naturalHeight;
      const ratio = Math.max(hRatio, vRatio);
      const centerShiftX = (canvas.width - img.naturalWidth * ratio) / 2;
      const centerShiftY = (canvas.height - img.naturalHeight * ratio) / 2;

      ctx.save();
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(
        img,
        0,
        0,
        img.naturalWidth,
        img.naturalHeight,
        centerShiftX,
        centerShiftY,
        img.naturalWidth * ratio,
        img.naturalHeight * ratio
      );
      ctx.restore();
    } else {
      // Atmospheric fallback while sequence initializes
      ctx.save();
      const grad = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        20,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 1.5
      );
      grad.addColorStop(0, `${currentVariant.themeColor}33`);
      grad.addColorStop(1, '#050505');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
    }
  }, [currentVariant]);

  // Handle ResizeObserver for crisp HiDPI canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      drawFrame(currentFrameRef.current);
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, [drawFrame]);

  // Preload frames for the current variant
  useEffect(() => {
    let isCancelled = false;

    const preloadSequence = async () => {
      const count = currentVariant.frameCount;
      const promises: Promise<void>[] = [];

      for (let i = 0; i < count; i++) {
        const url = resolveFrameUrl(currentVariant.sequencePattern, i, currentVariant.padLength);
        if (!imagesCacheRef.current.has(url)) {
          const p = new Promise<void>((resolve) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.src = url;
            img.onload = () => {
              imagesCacheRef.current.set(url, img);
              resolve();
            };
            img.onerror = () => {
              resolve();
            };
          });
          promises.push(p);
        }
      }

      await Promise.all(promises);
      if (!isCancelled) {
        setIsCanvasReady(true);
        drawFrame(currentFrameRef.current);
      }
    };

    preloadSequence();

    return () => {
      isCancelled = true;
    };
  }, [currentVariant, drawFrame]);

  // Parallax Scroll calculation
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;

      if (totalScrollable <= 0) return;

      // When container top is 0, progress = 0. When container bottom hits window bottom, progress = 1.
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));

      const frameIndex = Math.min(
        currentVariant.frameCount - 1,
        Math.max(0, Math.floor(progress * (currentVariant.frameCount - 1)))
      );

      if (frameIndex !== currentFrameRef.current) {
        currentFrameRef.current = frameIndex;
        setCurrentFrameIndex(frameIndex);

        if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = requestAnimationFrame(() => {
          drawFrame(frameIndex);
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [currentVariant, drawFrame]);

  return (
    <section
      id="hero-track-container"
      ref={containerRef}
      className="relative w-full h-[250vh] select-none"
    >
      {/* Sticky Fullscreen Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        
        {/* Background Parallax Canvas Sequence */}
        <div className="absolute inset-0 z-0 bg-neutral-950">
          <canvas
            id="hero-sequence-canvas"
            ref={canvasRef}
            className="w-full h-full object-cover transition-opacity duration-500"
            style={{ opacity: isCanvasReady ? 1 : 0.9 }}
          />

          {/* Cinematic Vignette & Ambient Color Gradients */}
          <div
            className="pointer-events-none absolute inset-0 bg-radial from-transparent via-neutral-950/40 to-neutral-950/90"
            style={{
              background: `radial-gradient(circle at 50% 50%, transparent 40%, rgba(5,5,5,0.7) 85%, #050505 100%)`,
            }}
          />

          {/* Dynamic Flavor Accent Glow behind can */}
          <div
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35vw] h-[35vw] max-w-[500px] max-h-[500px] rounded-full blur-[140px] opacity-25 transition-all duration-700"
            style={{ backgroundColor: currentVariant.themeColor }}
          />
        </div>

        {/* Top Spacer for sticky navbar */}
        <div className="h-24 pointer-events-none" />

        {/* Main Hero Grid Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex-1 flex items-center justify-between">
          
          {/* OVERLAY TEXT BLOCK (Left Side) */}
          <div className="w-full max-w-lg lg:max-w-xl flex flex-col items-start z-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentVariant.id + currentVariant.name}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-start"
              >
                {/* Brand Category Tag */}
                <div className="inline-flex items-center gap-2 mb-3">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: currentVariant.themeColor }}
                  />
                  <span className="text-xs uppercase tracking-[0.25em] font-semibold text-neutral-300">
                    Microbiome Functional Soda
                  </span>
                </div>

                {/* Large Bold Uppercase Drink Name */}
                <h1
                  id="hero-drink-name"
                  className="text-6xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-white font-['Syne'] leading-[0.9] mb-2 drop-shadow-2xl"
                  style={{ letterSpacing: '-0.04em' }}
                >
                  {currentVariant.name}
                </h1>

                {/* Smaller Subtitle Line, Light Font Weight */}
                <h2
                  id="hero-drink-subtitle"
                  className="text-xl sm:text-2xl lg:text-3xl font-light tracking-[0.2em] uppercase text-neutral-300 mb-6 font-['Plus_Jakarta_Sans']"
                >
                  {currentVariant.subtitle}
                </h2>

                {/* Short Descriptive Paragraph */}
                <p
                  id="hero-drink-description"
                  className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal mb-8 max-w-md backdrop-blur-xs drop-shadow-md"
                >
                  {currentVariant.description}
                </p>

                {/* Two Full Rounded CTA Buttons Side-by-Side */}
                <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                  {/* Left Button: Transparent background and white text */}
                  <button
                    id="hero-add-to-btn"
                    onClick={() => onAddToCart(currentVariant)}
                    className="px-7 py-3.5 rounded-full border border-white/80 text-white font-bold text-xs uppercase tracking-[0.18em] transition-all duration-200 hover:bg-white/10 hover:border-white active:scale-95 flex items-center gap-2"
                  >
                    <span>ADD TO</span>
                  </button>

                  {/* Right Button: White background with black text */}
                  <button
                    id="hero-cart-btn"
                    onClick={() => onAddToCart(currentVariant)}
                    className="px-8 py-3.5 rounded-full bg-white text-black font-bold text-xs uppercase tracking-[0.18em] transition-all duration-200 hover:bg-neutral-200 active:scale-95 shadow-xl flex items-center gap-2"
                    style={{
                      boxShadow: `0 8px 24px -4px ${currentVariant.themeColor}55`,
                    }}
                  >
                    <span>CART</span>
                    <span
                      className="w-1.5 h-1.5 rounded-full ml-0.5"
                      style={{ backgroundColor: currentVariant.themeColor }}
                    />
                  </button>
                </div>

                {/* Quick Flavor Nutrition Badges */}
                <div className="mt-8 flex items-center gap-4 text-[11px] font-mono tracking-wider uppercase text-neutral-400">
                  <span className="flex items-center gap-1.5">
                    <strong className="text-white">{currentVariant.calories}</strong> CALS
                  </span>
                  <span className="text-neutral-600">•</span>
                  <span className="flex items-center gap-1.5">
                    <strong className="text-white">{currentVariant.fiber}</strong> PREBIOTIC FIBER
                  </span>
                  <span className="text-neutral-600">•</span>
                  <span className="flex items-center gap-1.5">
                    <strong className="text-white">{currentVariant.sugars}</strong> TOTAL SUGAR
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* CENTER AREA: Kept visually clean and mostly empty to showcase the parallax sequence */}
          <div className="hidden lg:block flex-1 min-w-[200px] pointer-events-none" />

          {/* RIGHT SIDE VARIANT NAVIGATION */}
          <div className="relative z-20 flex items-center gap-5 sm:gap-7 select-none">
            
            {/* Huge Flavor Index Number (01, 02, 03...) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={formattedIndex}
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.05, y: -10 }}
                transition={{ duration: 0.35 }}
                className="text-right"
              >
                <span
                  id="flavor-index-display"
                  className="text-6xl sm:text-7xl lg:text-8xl font-black font-['Syne'] tracking-tighter text-white drop-shadow-2xl select-none"
                  style={{
                    WebkitTextStroke: '1px rgba(255,255,255,0.2)',
                  }}
                >
                  {formattedIndex}
                </span>
                <span className="block text-[11px] font-mono uppercase tracking-[0.25em] text-neutral-400 text-right mt-1">
                  / {String(totalVariants).padStart(2, '0')}
                </span>
              </motion.div>
            </AnimatePresence>

            {/* Slim Vertical Navigation Strip */}
            <div className="flex flex-col items-center py-2 px-1">
              
              {/* PREV Label & Arrow */}
              <button
                id="variant-prev-btn"
                onClick={onPrevVariant}
                aria-label="Previous drink flavor"
                disabled={isVariantLoading}
                className="group flex flex-col items-center gap-1 text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400 hover:text-white transition-colors duration-200 disabled:opacity-50 py-1"
              >
                <ChevronUp className="w-4 h-4 transition-transform duration-200 group-hover:-translate-y-1 text-neutral-300" />
                <span>PREV</span>
              </button>

              {/* Thin Vertical Divider Line */}
              <div className="relative my-2 w-[1px] h-12 bg-neutral-700/80 overflow-hidden">
                {isVariantLoading ? (
                  <motion.div
                    className="w-full h-1/2 rounded-full"
                    style={{ backgroundColor: currentVariant.themeColor }}
                    animate={{ y: [0, 48, 0] }}
                    transition={{ repeat: Infinity, duration: 0.9, ease: 'easeInOut' }}
                  />
                ) : (
                  <div
                    className="w-full h-full transition-colors duration-300"
                    style={{ backgroundColor: `${currentVariant.themeColor}aa` }}
                  />
                )}
              </div>

              {/* NEXT Label & Arrow */}
              <button
                id="variant-next-btn"
                onClick={onNextVariant}
                aria-label="Next drink flavor"
                disabled={isVariantLoading}
                className="group flex flex-col items-center gap-1 text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400 hover:text-white transition-colors duration-200 disabled:opacity-50 py-1"
              >
                <span>NEXT</span>
                <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:translate-y-1 text-neutral-300" />
              </button>

              {/* Variant Switching Loading Indicator */}
              {isVariantLoading && (
                <div className="mt-2" title="Preloading sequence frames...">
                  <Loader2
                    className="w-3.5 h-3.5 animate-spin"
                    style={{ color: currentVariant.themeColor }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* BOTTOM BAR: Scroll indicator on left, minimal monochrome social icons center */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6 flex items-center justify-between">
          
          {/* Scroll instruction & current frame progress */}
          <div className="flex items-center gap-3 text-[11px] font-mono tracking-widest uppercase text-neutral-400">
            <span
              className="w-1.5 h-1.5 rounded-full animate-ping"
              style={{ backgroundColor: currentVariant.themeColor }}
            />
            <span className="hidden sm:inline">Scroll to reverse / advance</span>
            <span className="text-neutral-500 font-normal">
              [{currentFrameIndex + 1}/{currentVariant.frameCount}]
            </span>
          </div>

          {/* BOTTOM CENTER: Minimal and monochrome row of social icons */}
          <div className="flex items-center gap-5">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter / X"
              className="text-neutral-400 hover:text-white transition-colors duration-200"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="text-neutral-400 hover:text-white transition-colors duration-200"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="text-neutral-400 hover:text-white transition-colors duration-200"
            >
              <Facebook className="w-4 h-4" />
            </a>
          </div>

          {/* Current Mode & Accent Indicator */}
          <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono uppercase text-neutral-500">
            <span>Palette:</span>
            <span
              className="w-3 h-3 rounded-full border border-white/30"
              style={{ backgroundColor: currentVariant.themeColor }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
