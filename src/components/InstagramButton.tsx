import React from 'react';
import { Instagram } from 'lucide-react';
import { motion } from 'motion/react';
import { invitationData } from '../data/invitationData';

export default function InstagramButton() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.1, duration: 0.5 }}
      className="fixed bottom-[5.5rem] right-6 z-40"
    >
      <a
        href={invitationData.brand.instagramUrl}
        target="_blank"
        referrerPolicy="no-referrer"
        rel="noopener noreferrer"
        className="flex items-center justify-center p-3.5 bg-gradient-to-r from-purple-900 to-[#1D0C31] hover:from-gold-antique hover:to-gold-champagne border border-gold-antique/30 hover:border-gold-antique text-gold-champagne hover:text-purple-900 rounded-full shadow-[0_8px_25px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.05)] backdrop-blur-md cursor-pointer transition-all duration-300 group animate-pulse-subtle"
        aria-label="Follow Wedding Hub on Instagram"
        style={{ minWidth: '44px', minHeight: '44px' }}
      >
        <Instagram className="w-5.5 h-5.5 transition-transform duration-300 group-hover:rotate-12" />
        
        {/* Hover tag indicating Brand context */}
        <span className="absolute right-14 bg-[#1D0C31]/95 border border-gold-antique/20 text-gold-champagne font-sans text-[9.5px] uppercase tracking-widest px-2.5 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-md">
          {invitationData.brand.instagram}
        </span>
      </a>
    </motion.div>
  );
}
