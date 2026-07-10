import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';

interface Particle {
  id: number;
  x: number;             // Horizontal starting position (0 - 100%)
  size: number;          // Visual scale in pixels (14 - 28px)
  delay: number;         // Animation trigger delay in seconds
  fallDuration: number;  // Time to reach bottom in seconds
  swayDuration: number;  // Horizontal sway frequency in seconds
  swayDistance: number;  // Pixels of horizontal movement
  initRotation: number;  // Initial 2D rotation angle
  finalRotationX: number;// Final 3D X rotation
  finalRotationY: number;// Final 3D Y rotation
  finalRotationZ: number;// Final 3D Z rotation
  type: 'petal' | 'leaf';
  colorStart: string;
  colorEnd: string;
}

export default function RoseShower() {
  const { isRoseShowerActive, stopRoseShower } = useApp();
  const [particles, setParticles] = useState<Particle[]>([]);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isRoseShowerActive) {
      // Generate a beautiful assortment of rose petals and green leaves
      const generated: Particle[] = [];
      const particleCount = 70; // Rich but highly performant density

      // Diverse premium color gradients for organic variations
      const petalColors = [
        { start: '#8B0000', end: '#4A0000' }, // Dark Crimson
        { start: '#B22222', end: '#5C0E0E' }, // Firebrick Rose
        { start: '#C71585', end: '#700947' }, // Deep Rose Pink
        { start: '#DC143C', end: '#800A20' }, // Velvet Ruby
        { start: '#FF1493', end: '#9E0854' }, // Bright Persian Rose
      ];

      const leafColors = [
        { start: '#10B981', end: '#064E3B' }, // Rich Emerald Green
        { start: '#059669', end: '#022C22' }, // Dark Jade Leaf
        { start: '#34D399', end: '#047857' }, // Minty Fresh Green
      ];

      for (let i = 0; i < particleCount; i++) {
        // 75% Rose petals, 25% Green rose leaves
        const isLeaf = Math.random() < 0.25;
        const colors = isLeaf 
          ? leafColors[Math.floor(Math.random() * leafColors.length)]
          : petalColors[Math.floor(Math.random() * petalColors.length)];

        // Distribute delays so some particles start falling immediately (0s delay)
        // while the remaining cascade beautifully shortly after (up to 3.5s delay)
        let delay = 0;
        if (i >= 15) {
          if (i < 40) {
            delay = Math.random() * 1.2; // Quick follow-ups
          } else {
            delay = 1.2 + Math.random() * 2.3; // Beautiful trailing cascade
          }
        }

        generated.push({
          id: i,
          x: Math.random() * 100, // Spread across screen width
          size: Math.random() * 14 + 14, // Sizes ranging from 14px to 28px
          delay,
          fallDuration: Math.random() * 4 + 5.5, // Faster, livelier fall duration between 5.5s and 9.5s
          swayDuration: Math.random() * 2 + 2, // Sway frequency between 2s and 4s
          swayDistance: Math.random() * 40 + 20, // Sway distance from 20px to 60px
          initRotation: Math.random() * 360,
          finalRotationX: Math.random() * 720 + 360,
          finalRotationY: Math.random() * 720 + 360,
          finalRotationZ: Math.random() * 720 + 360,
          type: isLeaf ? 'leaf' : 'petal',
          colorStart: colors.start,
          colorEnd: colors.end,
        });
      }

      setParticles(generated);
      setShouldRender(true);

      // Gracefully terminate generator and unmount component after 12 seconds
      const timer = setTimeout(() => {
        setShouldRender(false);
        // Delay resetting the context state slightly to let AnimatePresence fade-out complete
        setTimeout(() => {
          stopRoseShower();
        }, 1000);
      }, 12000);

      return () => clearTimeout(timer);
    } else {
      setShouldRender(false);
    }
  }, [isRoseShowerActive]);

  return (
    <AnimatePresence>
      {shouldRender && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1 } }}
          className="fixed inset-0 w-full h-full pointer-events-none z-50 overflow-hidden"
          id="rose-shower-container"
        >
          {/* Inject embedded CSS animations optimized for GPU rendering */}
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes rose-fall {
              0% {
                transform: translateY(-50px) rotateX(0deg) rotateY(0deg) rotateZ(var(--init-rotation));
                opacity: 0;
              }
              5% {
                opacity: 0.95;
              }
              90% {
                opacity: 0.95;
              }
              100% {
                transform: translateY(105vh) rotateX(var(--final-rotation-x)) rotateY(var(--final-rotation-y)) rotateZ(var(--final-rotation-z));
                opacity: 0;
              }
            }

            @keyframes rose-sway {
              0% {
                transform: translateX(0px);
              }
              100% {
                transform: translateX(var(--sway-distance));
              }
            }
          `}} />

          {/* Render each individual leaf/petal particle */}
          {particles.map((p) => (
            <div
              key={p.id}
              className="absolute top-0"
              style={{
                left: `${p.x}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
              }}
            >
              {/* Swaying container (creates side-to-side drift) */}
              <div
                style={{
                  animation: `rose-sway ${p.swayDuration}s ease-in-out infinite alternate`,
                  // @ts-ignore custom CSS properties
                  '--sway-distance': `${p.swayDistance}px`,
                }}
              >
                {/* Spinning & falling container */}
                <div
                  style={{
                    animation: `rose-fall ${p.fallDuration}s linear forwards`,
                    animationDelay: `${p.delay}s`,
                    // @ts-ignore custom CSS properties
                    '--init-rotation': `${p.initRotation}deg`,
                    '--final-rotation-x': `${p.finalRotationX}deg`,
                    '--final-rotation-y': `${p.finalRotationY}deg`,
                    '--final-rotation-z': `${p.finalRotationZ}deg`,
                  }}
                  className="w-full h-full"
                >
                  {p.type === 'petal' ? (
                    /* Elegant curved rose petal SVG design */
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)]">
                      <defs>
                        <linearGradient id={`petal-grad-${p.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor={p.colorStart} />
                          <stop offset="60%" stopColor={p.colorStart} />
                          <stop offset="100%" stopColor={p.colorEnd} />
                        </linearGradient>
                      </defs>
                      <path
                        d="M12 2C16 3 22 7.5 22 13C22 18 17 22 12 22C7 22 2 18 2 13C2 7.5 8 3 12 2Z"
                        fill={`url(#petal-grad-${p.id})`}
                      />
                      {/* Subtle organic shine accent */}
                      <path
                        d="M12 4C14 4.8 19 8.2 19 12.5"
                        stroke="rgba(255, 255, 255, 0.25)"
                        strokeWidth="0.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  ) : (
                    /* Detailed organic rose leaf SVG design */
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_4px_6px_rgba(0,0,0,0.25)]">
                      <defs>
                        <linearGradient id={`leaf-grad-${p.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor={p.colorStart} />
                          <stop offset="100%" stopColor={p.colorEnd} />
                        </linearGradient>
                      </defs>
                      <path
                        d="M12 2C17 6 19 12 15 18C11 21.5 7 21 4 17C2.2 13 4 7 12 2Z"
                        fill={`url(#leaf-grad-${p.id})`}
                      />
                      {/* Leaf vein lines */}
                      <path
                        d="M12 3C12 9 10 16.5 6.5 18.5"
                        stroke="rgba(255, 255, 255, 0.18)"
                        strokeWidth="0.6"
                      />
                      <path
                        d="M11.5 8.5C13 8.5 15.5 7.5 16.5 6.5"
                        stroke="rgba(255, 255, 255, 0.15)"
                        strokeWidth="0.5"
                      />
                      <path
                        d="M11 12.5C12.5 12.5 14.5 12 15.5 11"
                        stroke="rgba(255, 255, 255, 0.15)"
                        strokeWidth="0.5"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
