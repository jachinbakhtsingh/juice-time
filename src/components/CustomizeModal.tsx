import { useState } from 'react';
import { X, Sliders, Check, RotateCcw, Plus, Trash2, Moon, Sun, Image as ImageIcon } from 'lucide-react';
import { DrinkVariant } from '../types';

interface CustomizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  variants: DrinkVariant[];
  currentIndex: number;
  onUpdateVariant: (index: number, updated: Partial<DrinkVariant>) => void;
  onAddVariant: (newVariant: DrinkVariant) => void;
  onDeleteVariant: (index: number) => void;
  onResetDefaults: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

const PRESET_COLORS = [
  { name: 'Ruby Cherry', hex: '#E11D48' },
  { name: 'Royal Grape', hex: '#9333EA' },
  { name: 'Citrus Lemon', hex: '#EAB308' },
  { name: 'Electric Lime', hex: '#10B981' },
  { name: 'Sunset Orange', hex: '#F97316' },
  { name: 'Ocean Blue', hex: '#0EA5E9' },
  { name: 'Midnight Charcoal', hex: '#52525B' },
  { name: 'Pure White', hex: '#FFFFFF' },
];

export function CustomizeModal({
  isOpen,
  onClose,
  variants,
  currentIndex,
  onUpdateVariant,
  onAddVariant,
  onDeleteVariant,
  onResetDefaults,
  isDark,
  onToggleTheme,
}: CustomizeModalProps) {
  const [selectedEditIndex, setSelectedEditIndex] = useState<number>(currentIndex);

  if (!isOpen) return null;

  const current = variants[selectedEditIndex] || variants[0];

  const handleAddNew = () => {
    const newVariant: DrinkVariant = {
      id: `custom-${Date.now()}`,
      name: 'CLASSIC COLA',
      subtitle: 'HERITAGE RECIPE',
      description: 'A rich and sparkling herbal soda with notes of ceylon cinnamon, real vanilla bean, and organic prebiotic fiber.',
      themeColor: '#DC2626',
      mode: 'dark',
      sequencePattern: 'https://raw.githubusercontent.com/jachinbakhtsingh/website-images/main/images/frame_{index}_delay-0.1s.webp',
      frameCount: 80,
      padLength: 2,
      startIndex: 0,
      calories: 35,
      sugars: '2g',
      fiber: '9g',
      tastingNotes: ['Real Vanilla', 'Ceylon Cinnamon', 'Nutmeg', 'Botanical Caramel'],
    };
    onAddVariant(newVariant);
    setSelectedEditIndex(variants.length);
  };

  return (
    <div
      id="customizer-modal-overlay"
      className="fixed inset-0 z-[80] flex items-center justify-center p-2 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
    >
      <div
        className={`w-full max-w-2xl rounded-2xl sm:rounded-3xl border shadow-2xl overflow-hidden my-4 sm:my-8 transition-all ${
          isDark ? 'bg-neutral-950 text-white border-neutral-800' : 'bg-white text-neutral-900 border-neutral-200'
        }`}
      >
        {/* Header */}
        <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div
              className="w-3 h-3 rounded-full shrink-0"
              style={{ backgroundColor: current?.themeColor || '#E11D48' }}
            />
            <h3 className="text-base sm:text-xl font-bold font-['Syne'] tracking-tight truncate">
              Brand & Parallax Customizer
            </h3>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={onResetDefaults}
              className="flex items-center gap-1 text-xs text-neutral-400 hover:text-white px-2 sm:px-2.5 py-1.5 rounded-lg border border-neutral-800 hover:border-neutral-700 transition-colors min-h-[36px]"
              title="Reset to initial Olipop specs"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden sm:inline">Reset</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-full hover:bg-neutral-800/60 text-neutral-400 hover:text-white transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
              aria-label="Close customizer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Variant Tabs */}
        <div className="px-4 sm:px-6 pt-3 sm:pt-4 pb-2 border-b border-neutral-800/60 flex items-center gap-2 overflow-x-auto">
          {variants.map((v, i) => (
            <button
              key={v.id}
              onClick={() => setSelectedEditIndex(i)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all shrink-0 border min-h-[36px] ${
                selectedEditIndex === i
                  ? 'bg-neutral-800 text-white border-neutral-600'
                  : 'bg-neutral-900/50 text-neutral-400 border-neutral-800/80 hover:text-white'
              }`}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: v.themeColor }} />
              <span>{v.name || `Variant ${i + 1}`}</span>
            </button>
          ))}

          <button
            onClick={handleAddNew}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border border-dashed border-neutral-700 hover:border-neutral-500 text-neutral-400 hover:text-white transition-all shrink-0 min-h-[36px]"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Drink</span>
          </button>
        </div>

        {/* Form Body */}
        {current && (
          <div className="p-4 sm:p-6 space-y-5 sm:space-y-6 max-h-[72vh] sm:max-h-[70vh] overflow-y-auto text-sm">
            
            {/* Global Theme Mode Toggle */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800">
              <div>
                <span className="font-semibold block text-white">Display Theme Mode</span>
                <span className="text-xs text-neutral-400">Cinematic dark mode or clean light mode</span>
              </div>
              <button
                onClick={onToggleTheme}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-xs font-bold uppercase tracking-wider text-white"
              >
                {isDark ? (
                  <>
                    <Moon className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Dark Mode</span>
                  </>
                ) : (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    <span>Light Mode</span>
                  </>
                )}
              </button>
            </div>

            {/* Drink Name & Subtitle */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                  Drink Name (Large Display)
                </label>
                <input
                  type="text"
                  value={current.name}
                  onChange={(e) =>
                    onUpdateVariant(selectedEditIndex, { name: e.target.value.toUpperCase() })
                  }
                  placeholder="e.g. CHERRY, COCA COLA"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-white font-bold placeholder-neutral-500 focus:outline-none focus:border-white/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                  Drink Subtitle (Light Weight)
                </label>
                <input
                  type="text"
                  value={current.subtitle}
                  onChange={(e) =>
                    onUpdateVariant(selectedEditIndex, { subtitle: e.target.value.toUpperCase() })
                  }
                  placeholder="e.g. SODA, VINTAGE COLA"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-white font-light placeholder-neutral-500 focus:outline-none focus:border-white/50"
                />
              </div>
            </div>

            {/* Drink Description */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                Drink Description (1-3 sentences)
              </label>
              <textarea
                rows={3}
                value={current.description}
                onChange={(e) =>
                  onUpdateVariant(selectedEditIndex, { description: e.target.value })
                }
                placeholder="A modern take on a classic soda with a perfect blend of sweet and tart..."
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-white/50 leading-relaxed text-xs sm:text-sm"
              />
            </div>

            {/* Theme Color (Brand Accent) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                Theme Color (Brand Accent)
              </label>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {PRESET_COLORS.map((preset) => (
                  <button
                    key={preset.hex}
                    onClick={() =>
                      onUpdateVariant(selectedEditIndex, { themeColor: preset.hex })
                    }
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-neutral-800 hover:border-neutral-600 text-xs text-neutral-300"
                  >
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: preset.hex }}
                    />
                    <span>{preset.name}</span>
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={current.themeColor}
                  onChange={(e) =>
                    onUpdateVariant(selectedEditIndex, { themeColor: e.target.value })
                  }
                  className="w-10 h-10 rounded-xl cursor-pointer bg-neutral-900 border border-neutral-800 p-1"
                />
                <input
                  type="text"
                  value={current.themeColor}
                  onChange={(e) =>
                    onUpdateVariant(selectedEditIndex, { themeColor: e.target.value })
                  }
                  className="bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-white font-mono text-xs w-32 focus:outline-none focus:border-white/50 uppercase"
                />
                <span className="text-xs text-neutral-400">
                  Controls buttons, glows, indicators, and highlights.
                </span>
              </div>
            </div>

            {/* WebP Background Parallax Sequence Pattern & Frame Count */}
            <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-neutral-400" />
                <span className="font-bold text-white text-xs uppercase tracking-wider">
                  WebP Parallax Image Sequence
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-400 mb-1">
                  Sequence Path URL Pattern (supports {'{index}'} or frame_00 format):
                </label>
                <input
                  type="text"
                  value={current.sequencePattern}
                  onChange={(e) =>
                    onUpdateVariant(selectedEditIndex, { sequencePattern: e.target.value })
                  }
                  placeholder="https://raw.githubusercontent.com/.../frame_{index}_delay-0.1s.webp"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white font-mono text-xs placeholder-neutral-600 focus:outline-none focus:border-white/50"
                />
                <span className="text-[11px] text-neutral-500 mt-1 block">
                  e.g. GitHub raw or CDN URL. Automatically converts github.com/blob to raw.
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-400 mb-1">
                    Frame Count:
                  </label>
                  <input
                    type="number"
                    min={10}
                    max={300}
                    value={current.frameCount}
                    onChange={(e) =>
                      onUpdateVariant(selectedEditIndex, {
                        frameCount: Math.max(10, parseInt(e.target.value) || 80),
                      })
                    }
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-white/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-400 mb-1">
                    Index Padding (digits):
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={4}
                    value={current.padLength}
                    onChange={(e) =>
                      onUpdateVariant(selectedEditIndex, {
                        padLength: Math.max(1, parseInt(e.target.value) || 2),
                      })
                    }
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-white/50"
                  />
                </div>
              </div>
            </div>

            {/* Delete button if more than 1 variant */}
            {variants.length > 1 && (
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => {
                    onDeleteVariant(selectedEditIndex);
                    setSelectedEditIndex(Math.max(0, selectedEditIndex - 1));
                  }}
                  className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 py-1 px-3 rounded-lg border border-rose-900/50 hover:bg-rose-950/40 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Drink Variant</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="px-6 py-4 border-t border-neutral-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors"
          >
            Apply & View Hero
          </button>
        </div>
      </div>
    </div>
  );
}
