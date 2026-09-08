import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface PreloaderProps {
  progress: number;
  isLoaded: boolean;
  themeColor: string;
  drinkName: string;
}

export function Preloader({ progress, isLoaded, themeColor, drinkName }: PreloaderProps) {
  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          id="olipop-initial-preloader"
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-neutral-950 px-6 text-white select-none"
        >
          {/* Subtle background ambient radial glow */}
          <div
            className="pointer-events-none absolute h-96 w-96 rounded-full opacity-20 blur-[120px] transition-all duration-700"
            style={{ backgroundColor: themeColor }}
          />

          <div className="relative flex flex-col items-center max-w-sm w-full">
            {/* Minimal brand insignia */}
            <div className="flex items-center gap-2 mb-3">
              <span
                className="inline-block w-2.5 h-2.5 rounded-full animate-pulse"
                style={{ backgroundColor: themeColor }}
              />
              <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-neutral-400">
                A New Kind of Soda
              </span>
            </div>

            {/* Brand Logo */}
            <h1
              className="text-5xl md:text-6xl font-black tracking-tighter uppercase mb-1 text-white font-['Syne']"
              style={{ letterSpacing: '-0.04em' }}
            >
              OLIPOP
            </h1>

            <p className="text-xs uppercase tracking-[0.25em] text-neutral-500 font-medium mb-10">
              {drinkName} • Parallax Experience
            </p>

            {/* Horizontal Loading Bar */}
            <div className="w-full bg-neutral-900 border border-neutral-800/80 rounded-full h-2 overflow-hidden relative mb-4 p-[1px]">
              <motion.div
                className="h-full rounded-full transition-all duration-150 ease-out"
                style={{
                  width: `${Math.min(100, Math.max(0, progress))}%`,
                  backgroundColor: themeColor,
                  boxShadow: `0 0 12px ${themeColor}88`,
                }}
              />
            </div>

            {/* Progress Percentage & Status */}
            <div className="w-full flex items-center justify-between text-xs text-neutral-400 font-mono">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-neutral-500 animate-spin" style={{ animationDuration: '4s' }} />
                <span>Buffering 30FPS WebP</span>
              </span>
              <span className="font-semibold text-white">
                {Math.round(progress)}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
