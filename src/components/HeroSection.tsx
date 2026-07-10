import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { invitationData } from '../data/invitationData';
import GoldParticles from './GoldParticles';
import { useApp } from '../context/AppContext';

export default function HeroSection() {
  const { t, isDateRevealed } = useApp();

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between items-center px-4 py-12 overflow-hidden bg-[#050807]">
      {/* Background radial gradient with Emerald colors */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(9,45,37,0.5)_0%,rgba(5,8,7,1)_100%)] pointer-events-none" />

      {/* Floating Gold Dust */}
      <GoldParticles />

      {/* Frame border */}
      <div className="absolute inset-4 border border-gold-antique/15 pointer-events-none rounded-md">
        {/* Subtle inner corner lines */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-gold-antique/30" />
        <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-gold-antique/30" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-gold-antique/30" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-gold-antique/30" />
      </div>

      {/* Top Header decoration with full Arabic, English and Hindi Bismillah */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full text-center z-10 pt-6 px-4"
      >
        {/* Arabic Calligraphy Style Text */}
        <p className="font-serif text-xl md:text-2xl text-gold-champagne font-medium tracking-wide mb-1.5 select-none opacity-95">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>
        
        {/* Multilingual English and Hindi Subtitles */}
        <div className="flex flex-col items-center justify-center gap-0.5">
          <span className="text-[9px] md:text-[10px] font-sans uppercase tracking-[0.3em] text-gold-antique font-semibold">
            Bismillah-ir-Rahman-ir-Rahim
          </span>
          <span className="text-[9px] md:text-[10px] font-sans tracking-[0.25em] text-gold-antique/80">
            बिस्मिल्लाह-हिर-रहमान-निर-रहीम
          </span>
        </div>
        <div className="w-20 h-[1.2px] bg-gradient-to-r from-transparent via-gold-antique/40 to-transparent mx-auto mt-3" />
      </motion.div>

      {/* Core Names Panel */}
      <div className="w-full max-w-xl text-center z-10 flex flex-col items-center justify-center py-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-sans text-[11px] md:text-xs tracking-[0.3em] uppercase text-gold-champagne/80 mb-6 font-medium"
        >
          {t("Together with their families", "अल्लाह के फ़ज़्ल-ओ-करम से, अहले ख़ानदान की जानिब से")}
        </motion.p>

        {/* Groom Name Calligraphy */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="font-serif italic text-6xl md:text-8xl text-gold-champagne tracking-normal font-normal select-none mb-1 text-center font-display leading-tight"
          style={{ fontFamily: "'Great Vibes', cursive" }}
        >
          {t(invitationData.groom.fullName.split(' ')[0], invitationData.groom.fullNameHi?.split(' ')[0] || "")}
        </motion.h1>

        {/* Dynamic golden spacer symbol */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="my-3 flex items-center justify-center gap-4 w-full"
        >
          <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-gold-antique" />
          <span className="font-serif italic text-2xl md:text-4xl text-gold-antique select-none font-light">&</span>
          <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-gold-antique" />
        </motion.div>

        {/* Bride Name Calligraphy */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.1, ease: "easeOut" }}
          className="font-serif italic text-6xl md:text-8xl text-gold-champagne tracking-normal font-normal select-none leading-tight"
          style={{ fontFamily: "'Great Vibes', cursive" }}
        >
          {t(invitationData.bride.fullName.split(' ')[0], invitationData.bride.fullNameHi?.split(' ')[0] || "")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-sans text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-gold-antique/80 mt-8 mb-4 max-w-sm leading-relaxed"
        >
          {t(
            "Request the pleasure of your company on this auspicious occasion",
            "निकाह की इस बा-बरकत तक़रीब में आपकी तशरीफ़-आवरी बाइस-ए-मसर्रत होगी"
          )}
        </motion.p>
      </div>

      {/* Date block with elegant border */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.7 }}
        className="text-center z-10 w-full"
      >
        <div className="inline-block px-8 py-3 border-y border-gold-antique/30">
          <p className="font-display text-xs md:text-sm text-gold-champagne font-semibold tracking-[0.2em] uppercase">
            {isDateRevealed 
              ? t(invitationData.weddingDate, invitationData.weddingDateHi || "") 
              : t("Date Revealed on Scratch Card Below", "तारीख़ नीचे स्क्रैच कार्ड पर मुलाहिजा फरमाएं")
            }
          </p>
        </div>

        {/* Animated Chevron Down Scroll Down indicator */}
        <div className="flex flex-col items-center justify-center mt-12 text-gold-antique/60 hover:text-gold-antique transition-colors duration-300">
          <span className="font-sans text-[9px] uppercase tracking-[0.2em] mb-1">
            {t("Scroll to begin", "आगे बढ़ने के लिए स्क्रॉल करें")}
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4 text-gold-antique" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
