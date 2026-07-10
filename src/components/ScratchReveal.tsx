import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, RefreshCw } from 'lucide-react';
import { invitationData } from '../data/invitationData';
import { useApp } from '../context/AppContext';

export default function ScratchReveal() {
  const { t, language, isDateRevealed, revealDate, triggerRoseShower } = useApp();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  const [isRevealed, setIsRevealed] = useState(isDateRevealed);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isDevMode, setIsDevMode] = useState(false);

  // Synchronize initial reveal state from context
  useEffect(() => {
    setIsRevealed(isDateRevealed);
  }, [isDateRevealed]);

  // Detect development mode
  useEffect(() => {
    if (window.location.hostname === 'localhost' || window.location.hostname.includes('127.0.0.1') || window.location.hostname.includes('run.app')) {
      setIsDevMode(true);
    }
  }, []);

  const initializeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Get exact pixel size based on container
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Clear and draw golden scratch coating
    ctx.globalCompositeOperation = 'source-over';
    
    // Create gold linear gradient for card coating
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, '#C7A35A');
    grad.addColorStop(0.3, '#E4CC91');
    grad.addColorStop(0.5, '#F2E3C6');
    grad.addColorStop(0.7, '#E4CC91');
    grad.addColorStop(1, '#C7A35A');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add subtle texture or dots to gold leaf
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const r = Math.random() * 2;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw an ornamental border on the scratch layer
    ctx.strokeStyle = 'rgba(9, 45, 37, 0.2)';
    ctx.lineWidth = 1;
    ctx.strokeRect(6, 6, canvas.width - 12, canvas.height - 12);

    // Draw scratch instructions directly on the scratch layer based on current language
    ctx.fillStyle = '#061F1A';
    ctx.font = '600 13px "Montserrat", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(
      language === 'en' ? 'SCRATCH TO REVEAL' : 'तारीख के लिए स्क्रैच करें', 
      canvas.width / 2, 
      canvas.height / 2 - 8
    );
    ctx.font = 'italic 500 10px "Cormorant Garamond", serif';
    ctx.fillText(
      language === 'en' ? 'Our Special Date' : 'निकाह की मुबारक तारीख', 
      canvas.width / 2, 
      canvas.height / 2 + 10
    );
  };

  // Adjust on window resize and language change
  useEffect(() => {
    if (!isRevealed) {
      initializeCanvas();
    }
    
    const handleResize = () => {
      // Re-initialize only if not already scratched
      if (!isRevealed) {
        initializeCanvas();
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isRevealed, language]);

  // Handle scratch movement
  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2); // Scratch radius of 20px
    ctx.fill();

    checkScratchPercentage();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDrawing(true);
    scratch(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseUpOrLeave = () => {
    setIsDrawing(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDrawing(true);
    if (e.touches[0]) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDrawing) return;
    if (e.touches[0]) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchEnd = () => {
    setIsDrawing(false);
  };

  // Check how much is scratched
  const checkScratchPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imgData.data;
    let transparentCount = 0;

    for (let i = 0; i < pixels.length; i += 40) { // Subsample every 10 pixels for speed
      if (pixels[i + 3] === 0) {
        transparentCount++;
      }
    }

    const percentage = (transparentCount / (pixels.length / 40)) * 100;

    // If scratched above 55%, auto-reveal the whole card
    if (percentage > 55) {
      revealFullCard();
    }
  };

  const revealFullCard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setIsRevealed(true);
    revealDate(); // Triggers global date reveal state
    setShowCelebration(true);
    triggerRoseShower(); // Shower gorgeous rose petals & rose leaves from top to bottom

    // Silence celebration after 4 seconds
    setTimeout(() => {
      setShowCelebration(false);
    }, 4000);
  };

  const handleReset = () => {
    setIsRevealed(false);
    setTimeout(() => {
      initializeCanvas();
    }, 50);
  };

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-[#050807] to-emerald-deep/20 flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Outer elegant borders */}
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-gold-antique/35 to-transparent" />

      {/* Decorative floral element */}
      <div className="absolute -right-20 top-0 opacity-10 pointer-events-none w-64 select-none">
        <svg viewBox="0 0 100 100" fill="currentColor" className="text-gold-antique">
          <path d="M50 0 C45 30, 20 45, 0 50 C20 55, 45 70, 50 100 C55 70, 80 55, 100 50 C80 45, 55 30, 50 0" />
        </svg>
      </div>

      <div className="text-center mb-8 max-w-sm">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-gold-antique font-sans uppercase tracking-[0.2em] text-[10px] md:text-xs font-semibold block mb-2"
        >
          {t("An Interactive Surprise", "एक ख़ूबसूरत सा पैग़ाम")}
        </motion.span>
        <motion.h3
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-xl md:text-2xl text-gold-champagne font-medium tracking-wide uppercase px-4"
        >
          {t("Scratch to Reveal Our Date", "निकाह की मुक़द्दस तारीख देखने के लिए यहाँ स्क्रैच करें")}
        </motion.h3>
      </div>

      {/* Scratch Ticket Container */}
      <div 
        ref={containerRef} 
        onClick={isRevealed ? triggerRoseShower : undefined}
        title={isRevealed ? t("Click to shower rose leaves", "गुलाब की पत्तियों की बौछार के लिए क्लिक करें") : undefined}
        className={`relative w-full max-w-sm h-48 md:h-52 bg-gradient-to-b from-[#092D25] to-[#041511] border border-gold-antique/30 rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.05)] overflow-hidden flex flex-col items-center justify-center p-6 text-center select-none ${isRevealed ? 'cursor-pointer hover:shadow-[0_15px_45px_rgba(199,163,90,0.15)] transition-all active:scale-98' : ''}`}
      >
        
        {/* Underneath Content (Actual wedding date revealed) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 z-10 pointer-events-none">
          <AnimatePresence>
            {isRevealed && (
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={{ type: "spring", stiffness: 120, damping: 14 }}
                className="flex flex-col items-center"
              >
                <Sparkles className="w-6 h-6 text-gold-antique mb-2 animate-pulse" />
                <p className="font-sans text-[10px] text-gold-antique/70 tracking-[0.25em] uppercase mb-1">
                  {t("SAVE THE DATE", "तारीख याद रखें")}
                </p>
                <h4 className="font-display text-2xl md:text-3xl font-semibold text-gold-champagne tracking-wider uppercase shimmer-gold">
                  {t(invitationData.scratchDate, invitationData.scratchDateHi || "")}
                </h4>
                <p className="font-serif italic text-xs text-gold-antique/80 mt-2">
                  {t("Chhindwara & Chandameta, MP", "छिंदवाड़ा और चांदामेटा, मध्य प्रदेश")}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Scratch Canvas Overlay */}
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={`absolute inset-0 w-full h-full z-20 cursor-crosshair rounded-xl touch-none transition-opacity duration-500 ${isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        />

        {/* Floating Confetti / Particle bursts on successful reveal */}
        <AnimatePresence>
          {showCelebration && (
            <div className="absolute inset-0 z-35 pointer-events-none overflow-hidden">
              {Array.from({ length: 30 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    x: "50%", 
                    y: "50%", 
                    scale: Math.random() * 0.4 + 0.3,
                    opacity: 1
                  }}
                  animate={{ 
                    x: `${Math.random() * 100}%`, 
                    y: `${Math.random() * 100}%`,
                    opacity: [1, 1, 0],
                    rotate: Math.random() * 360
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="absolute w-2 h-2 rounded-full bg-gradient-to-tr from-gold-antique via-gold-champagne to-white shadow-[0_0_4px_#E4CC91]"
                />
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Dev Mode Reset Button */}
      {isDevMode && (
        <motion.button
          onClick={handleReset}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 flex items-center gap-2 px-4 py-2 bg-emerald-deep/80 hover:bg-emerald-deep border border-gold-antique/20 text-[10px] md:text-xs text-gold-antique uppercase tracking-widest rounded-full cursor-pointer transition-colors"
        >
          <RefreshCw className="w-3 h-3" />
          Reset Scratch Card
        </motion.button>
      )}
    </section>
  );
}
