import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { invitationData } from '../data/invitationData';
import { useApp } from '../context/AppContext';

export default function InvitationMessage() {
  const { t } = useApp();

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-emerald-deep/10 to-[#050807] px-4 overflow-hidden text-center">
      {/* Decorative backdrop glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-emerald-forest/5 blur-[90px] pointer-events-none" />

      {/* Symmetrical Dividers */}
      <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-gold-antique/20 to-transparent" />

      <div className="max-w-2xl mx-auto relative z-10 px-4">
        
        {/* Top miniature visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex justify-center items-center gap-2 mb-6"
        >
          <span className="w-8 h-[1px] bg-gold-antique/30" />
          <Sparkles className="w-5 h-5 text-gold-antique animate-spin" style={{ animationDuration: '8s' }} />
          <span className="w-8 h-[1px] bg-gold-antique/30" />
        </motion.div>

        {/* Elegant Headline */}
        <motion.h3
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-display text-xl md:text-3xl text-gold-champagne tracking-wider uppercase font-semibold mb-6"
        >
          {t("An Invitation to Love", "दावतनामा-ए-निकाह")}
        </motion.h3>

        {/* Core Message block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="relative max-w-xl mx-auto"
        >
          {/* Symmetrical quotes background */}
          <span className="absolute -top-12 -left-4 text-gold-antique/10 font-serif text-8xl pointer-events-none select-none">“</span>
          
          <p className="font-serif italic text-base md:text-lg text-gold-glow/90 leading-relaxed font-light mb-8 relative z-10 px-6">
            {t(invitationData.personalMessage, invitationData.personalMessageHi || "")}
          </p>
          
          <span className="absolute -bottom-16 -right-4 text-gold-antique/10 font-serif text-8xl pointer-events-none select-none">”</span>
        </motion.div>

        {/* Botanical leaf emblem outline (CSS) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.3 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="inline-flex flex-col items-center gap-1 mt-2 text-gold-antique"
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" className="animate-pulse">
            <path d="M20 2v36M20 10c4 0 10 3 10 8s-6 8-10 8M20 18c-4 0-10 3-10 8s6 8 10 8" />
          </svg>
        </motion.div>

      </div>
    </section>
  );
}
