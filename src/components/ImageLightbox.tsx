import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageLightboxProps {
  isOpen: boolean;
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function ImageLightbox({
  isOpen,
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: ImageLightboxProps) {
  const touchStartXRef = useRef<number | null>(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      // Prevent body scrolling when open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose, onPrev, onNext]);

  // Touch handlers for swipe support on mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      touchStartXRef.current = e.touches[0].clientX;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    if (e.changedTouches[0]) {
      const touchEndX = e.changedTouches[0].clientX;
      const difference = touchStartXRef.current - touchEndX;

      // Threshold of 50 pixels to trigger swipe
      if (difference > 50) {
        onNext(); // Swiped left, show next
      } else if (difference < -50) {
        onPrev(); // Swiped right, show previous
      }
    }
    touchStartXRef.current = null;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-[#050807]/95 backdrop-blur-md flex flex-col justify-between p-4"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top Bar (Close and counter) */}
          <div className="flex items-center justify-between w-full max-w-5xl mx-auto py-2 z-10">
            <span className="font-sans text-xs md:text-sm text-gold-antique/80 tracking-widest uppercase">
              PHOTO {currentIndex + 1} OF {images.length}
            </span>
            <button
              onClick={onClose}
              className="p-2 bg-emerald-deep/40 hover:bg-emerald-deep/80 border border-gold-antique/20 rounded-full text-gold-champagne cursor-pointer transition-colors"
              aria-label="Close Lightbox"
              style={{ minWidth: '44px', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Core Image Area with layout transitions */}
          <div className="relative flex-grow flex items-center justify-center w-full max-w-5xl mx-auto my-4">
            
            {/* Left Desktop Arrow */}
            <button
              onClick={onPrev}
              className="hidden md:flex absolute left-4 p-3 bg-emerald-deep/60 hover:bg-emerald-deep border border-gold-antique/20 hover:border-gold-antique text-gold-champagne rounded-full cursor-pointer transition-all z-10"
              aria-label="Previous Image"
              style={{ minWidth: '44px', minHeight: '44px' }}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Central Image Container */}
            <motion.div
              key={currentIndex}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="max-h-[75vh] md:max-h-[80vh] max-w-full flex items-center justify-center"
            >
              {/* Fallback to elegant placeholder gradient if image is not loaded */}
              <img
                src={images[currentIndex]}
                referrerPolicy="no-referrer"
                alt={`Wedding Gallery Photo ${currentIndex + 1}`}
                className="max-h-[75vh] md:max-h-[80vh] max-w-full object-contain rounded-lg border border-gold-antique/20 shadow-2xl"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  // If image fails, replace with a stylish gold/emerald abstract gradient
                  target.style.display = 'none';
                  const placeholder = target.parentElement?.querySelector('.fallback-gradient');
                  if (placeholder) {
                    placeholder.classList.remove('hidden');
                  }
                }}
              />
              <div className="fallback-gradient hidden w-80 h-80 md:w-[450px] md:h-[450px] rounded-xl bg-gradient-to-tr from-emerald-dark via-emerald-deep to-gold-antique/20 border border-gold-antique/30 flex flex-col items-center justify-center text-center p-6 shadow-xl">
                <p className="font-display text-lg text-gold-champagne uppercase tracking-widest mb-2 font-semibold">
                  A Beautiful Memory
                </p>
                <p className="font-serif italic text-sm text-gold-antique/60">
                  Arish & Shaba
                </p>
              </div>
            </motion.div>

            {/* Right Desktop Arrow */}
            <button
              onClick={onNext}
              className="hidden md:flex absolute right-4 p-3 bg-emerald-deep/60 hover:bg-emerald-deep border border-gold-antique/20 hover:border-gold-antique text-gold-champagne rounded-full cursor-pointer transition-all z-10"
              aria-label="Next Image"
              style={{ minWidth: '44px', minHeight: '44px' }}
            >
              <ChevronRight className="w-6 h-6" />
            </button>

          </div>

          {/* Swipe Indicator (Visible on Mobile) */}
          <div className="text-center py-2 z-10 md:hidden">
            <span className="font-sans text-[10px] text-gold-antique/50 uppercase tracking-[0.2em]">
              ← Swipe to view memories →
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
