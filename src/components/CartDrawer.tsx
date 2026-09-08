import { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  isDark: boolean;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  isDark,
}: CartDrawerProps) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const freeShippingThreshold = 50;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-[90] flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`relative w-full max-w-md h-full shadow-2xl flex flex-col z-10 transition-transform ${
          isDark ? 'bg-neutral-950 text-white border-l border-neutral-800' : 'bg-white text-neutral-900 border-l border-neutral-200'
        }`}
      >
        {/* Top Header */}
        <div className="p-4 sm:p-6 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            <h3 className="text-lg sm:text-xl font-bold font-['Syne'] uppercase">Your Bag</h3>
            <span className="text-xs font-mono text-neutral-400">
              ({items.reduce((sum, i) => sum + i.quantity, 0)} items)
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-neutral-800/60 text-neutral-400 hover:text-white transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center"
            aria-label="Close bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="px-4 sm:px-6 py-2.5 sm:py-3 bg-neutral-900/60 border-b border-neutral-800/60 text-xs">
          <div className="flex justify-between font-medium mb-1.5 text-neutral-300">
            {subtotal >= freeShippingThreshold ? (
              <span className="text-emerald-400 font-bold">You unlocked FREE shipping!</span>
            ) : (
              <span>
                Add <strong>${(freeShippingThreshold - subtotal).toFixed(2)}</strong> more for FREE shipping
              </span>
            )}
            <span className="font-mono">{Math.round(progressToFreeShipping)}%</span>
          </div>
          <div className="w-full bg-neutral-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="h-full bg-emerald-400 transition-all duration-300 rounded-full"
              style={{ width: `${progressToFreeShipping}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-neutral-400 py-12">
              <ShoppingBag className="w-12 h-12 stroke-1 text-neutral-600 mb-3" />
              <p className="text-base font-semibold text-white mb-1">Your bag is empty</p>
              <p className="text-xs text-neutral-500 max-w-xs">
                Explore our prebiotic flavors and add your favorite cold-pressed craft sodas.
              </p>
            </div>
          ) : (
            items.map((item, index) => (
              <div
                key={`${item.variantId}-${item.packSize}-${index}`}
                className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-neutral-900/50 border border-neutral-800/80 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white uppercase text-xs shrink-0"
                    style={{ backgroundColor: item.themeColor }}
                  >
                    🥫
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs sm:text-sm uppercase leading-tight">
                      OLIPOP {item.name}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-neutral-400">{item.packSize}</p>
                    <span className="text-xs font-mono font-bold text-white mt-0.5 block">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="flex items-center border border-neutral-700 rounded-lg overflow-hidden bg-neutral-950">
                    <button
                      onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center text-xs text-neutral-400 hover:text-white"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="w-6 text-center text-xs font-mono font-bold text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-xs text-neutral-400 hover:text-white"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => onRemoveItem(index)}
                    className="p-2 text-neutral-500 hover:text-rose-400 transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout */}
        {items.length > 0 && (
          <div className="p-4 sm:p-6 border-t border-neutral-800 bg-neutral-950 space-y-3.5 sm:space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-neutral-400">Subtotal</span>
              <span className="font-bold text-white font-mono text-base">
                ${subtotal.toFixed(2)}
              </span>
            </div>

            {isCheckingOut ? (
              <div className="w-full min-h-[48px] py-3.5 rounded-full bg-emerald-500 text-black font-bold text-xs uppercase tracking-[0.18em] flex items-center justify-center gap-2">
                <Check className="w-4 h-4" />
                <span>Redirecting to Checkout...</span>
              </div>
            ) : (
              <button
                onClick={handleCheckout}
                className="w-full min-h-[48px] py-3.5 sm:py-4 rounded-full bg-white text-black font-bold text-xs uppercase tracking-[0.18em] hover:bg-neutral-200 transition-all active:scale-95 shadow-xl flex items-center justify-center gap-2"
              >
                <span>CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            <div className="flex items-center justify-center gap-2 text-[10px] sm:text-[11px] text-neutral-400 text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Cold-pack insulated • 100% Satisfaction Guarantee</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
