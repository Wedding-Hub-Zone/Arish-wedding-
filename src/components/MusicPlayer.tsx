import React from 'react';
import { Play, Pause } from 'lucide-react';
import { motion } from 'motion/react';

interface MusicPlayerProps {
  isPlaying: boolean;
  onToggle: () => void;
  show: boolean;
}

export default function MusicPlayer({ isPlaying, onToggle, show }: MusicPlayerProps) {
  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed bottom-6 left-6 z-40"
    >
      <motion.button
        onClick={onToggle}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2.5 bg-emerald-deep/95 border border-gold-antique/40 p-2.5 px-4 rounded-full shadow-[0_8px_25px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.05)] backdrop-blur-md cursor-pointer group"
        aria-label={isPlaying ? "Mute Background Music" : "Play Background Music"}
      >
        {/* Animated Music Waves */}
        <div className="flex items-end gap-[2px] h-4 w-4 px-0.5">
          {isPlaying ? (
            <>
              <span className="w-[2px] bg-gold-antique rounded-full h-full origin-bottom animate-wave-1" />
              <span className="w-[2px] bg-gold-champagne rounded-full h-2/3 origin-bottom animate-wave-2" />
              <span className="w-[2px] bg-gold-antique rounded-full h-full origin-bottom animate-wave-3" />
              <span className="w-[2px] bg-gold-champagne rounded-full h-1/2 origin-bottom animate-wave-4" />
            </>
          ) : (
            <>
              <span className="w-[2px] bg-gold-antique/40 rounded-full h-1/3 origin-bottom" />
              <span className="w-[2px] bg-gold-antique/40 rounded-full h-1/3 origin-bottom" />
              <span className="w-[2px] bg-gold-antique/40 rounded-full h-1/3 origin-bottom" />
              <span className="w-[2px] bg-gold-antique/40 rounded-full h-1/3 origin-bottom" />
            </>
          )}
        </div>

        {/* Track Title info */}
        <div className="flex flex-col items-start text-left select-none pr-1">
          <span className="text-[9px] font-semibold text-gold-champagne uppercase tracking-wider leading-none">
            Bismillah
          </span>
          <span className="text-[7.5px] text-gold-antique/70 font-sans tracking-wide mt-0.5 whitespace-nowrap">
            Tere Naam Se Shuru...
          </span>
        </div>

        {/* Music Player Button Icon */}
        <div className="bg-gradient-to-r from-gold-antique to-gold-champagne text-emerald-deep p-1.5 rounded-full transition-transform duration-300">
          {isPlaying ? (
            <Pause className="w-3 h-3 fill-current" />
          ) : (
            <Play className="w-3 h-3 fill-current" />
          )}
        </div>
      </motion.button>

      {/* Embedded CSS for custom music waves animation */}
      <style>{`
        @keyframes wave-bounce {
          0% { transform: scaleY(0.3); }
          100% { transform: scaleY(1); }
        }
        .animate-wave-1 {
          animation: wave-bounce 0.6s ease-in-out infinite alternate;
        }
        .animate-wave-2 {
          animation: wave-bounce 0.8s ease-in-out infinite alternate;
          animation-delay: 0.15s;
        }
        .animate-wave-3 {
          animation: wave-bounce 0.5s ease-in-out infinite alternate;
          animation-delay: 0.3s;
        }
        .animate-wave-4 {
          animation: wave-bounce 0.7s ease-in-out infinite alternate;
          animation-delay: 0.45s;
        }
      `}</style>
    </motion.div>
  );
}
