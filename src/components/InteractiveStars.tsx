import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Star } from 'lucide-react';

interface StarParticle {
  id: string;
  x: number;
  y: number;
  angle: number;
  distance: number;
  size: number;
  delay: number;
  duration: number;
  color: string;
  type: 'star' | 'sparkle';
  rotation: number;
}

export default function InteractiveStars() {
  const [particles, setParticles] = useState<StarParticle[]>([]);

  useEffect(() => {
    const handleInteraction = (e: MouseEvent | TouchEvent) => {
      // Get click/touch position
      let x = 0;
      let y = 0;
      if ('touches' in e) {
        if (e.touches.length === 0) return;
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
      } else {
        x = e.clientX;
        y = e.clientY;
      }

      // Avoid creating stars inside scrollbars or elements we don't want
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'BUTTON' || target.closest('button') || target.tagName === 'A' || target.closest('a'))) {
        // We can still trigger particles but maybe slightly less, or just normal.
      }

      // Create 8 gorgeous sparkling stars moving in a radial burst
      const count = 7 + Math.floor(Math.random() * 4); // 7 to 10 stars per tap
      const newParticles: StarParticle[] = [];
      const timestamp = Date.now();

      const colors = [
        'text-gold-champagne shadow-gold-champagne/40',
        'text-gold-antique shadow-gold-antique/30',
        'text-gold-glow shadow-gold-glow/50',
        'text-ivory shadow-ivory/30'
      ];

      for (let i = 0; i < count; i++) {
        const id = `${timestamp}-${i}-${Math.random()}`;
        const angle = (i * (360 / count)) + (Math.random() * 30 - 15); // distribute evenly with a little jitter
        const distance = 40 + Math.random() * 90; // flight distance in pixels
        const size = 10 + Math.random() * 16; // 10px to 26px
        const delay = Math.random() * 0.05;
        const duration = 0.6 + Math.random() * 0.5; // 0.6s to 1.1s
        const color = colors[Math.floor(Math.random() * colors.length)];
        const type = Math.random() > 0.4 ? 'sparkle' : 'star';
        const rotation = Math.random() * 360;

        newParticles.push({
          id,
          x,
          y,
          angle,
          distance,
          size,
          delay,
          duration,
          color,
          type,
          rotation
        });
      }

      setParticles((prev) => [...prev, ...newParticles]);

      // Prune particles that have finished animating to keep DOM lightweight
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => !newParticles.find((np) => np.id === p.id)));
      }, 1500);
    };

    window.addEventListener('click', handleInteraction, { passive: true });
    window.addEventListener('touchstart', handleInteraction, { passive: true });

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => {
          // Calculate destination coordinates relative to the start position
          const radians = (p.angle * Math.PI) / 180;
          const destX = Math.cos(radians) * p.distance;
          const destY = Math.sin(radians) * p.distance;

          return (
            <motion.div
              key={p.id}
              initial={{ 
                x: p.x - p.size / 2, 
                y: p.y - p.size / 2, 
                opacity: 1, 
                scale: 0.1,
                rotate: p.rotation
              }}
              animate={{ 
                x: p.x + destX - p.size / 2, 
                y: p.y + destY - p.size / 2, 
                opacity: [1, 1, 0.8, 0],
                scale: [0.1, 1.2, 0.9, 0],
                rotate: p.rotation + (p.angle > 180 ? 180 : -180)
              }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: p.duration, 
                ease: "easeOut",
                delay: p.delay
              }}
              className="absolute pointer-events-none"
              style={{ width: p.size, height: p.size }}
            >
              {p.type === 'sparkle' ? (
                <Sparkles 
                  className={`${p.color} w-full h-full filter drop-shadow-[0_0_4px_rgba(228,204,145,0.6)]`} 
                />
              ) : (
                <Star 
                  className={`${p.color} w-full h-full fill-current filter drop-shadow-[0_0_4px_rgba(199,163,90,0.6)]`} 
                />
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
