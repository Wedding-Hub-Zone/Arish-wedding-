import React from 'react';
import { motion } from 'motion/react';
import { Heart, MapPin, User } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { invitationData } from '../data/invitationData';
import { useApp } from '../context/AppContext';

export default function CoupleDetails() {
  const { t } = useApp();

  return (
    <section id="couple" className="relative py-16 md:py-24 bg-[#050807] px-4 overflow-hidden">
      {/* Symmetrical Dividers */}
      <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-gold-antique/20 to-transparent" />

      {/* Decorative backdrop glow */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-emerald-forest/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-emerald-forest/5 blur-[120px] pointer-events-none" />

      <SectionHeading 
        title={t("The Happy Couple", "दूल्हा और दुल्हन")} 
        subtitle={t("Meet the Bride & Groom", "दूल्हा-दुल्हन का तारुफ़")} 
      />

      <div className="max-w-4xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-12 items-stretch">
        
        {/* 1. Groom Profile Card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative bg-gradient-to-b from-[#092D25]/80 to-[#041511]/95 border border-gold-antique/20 rounded-2xl p-6 md:p-8 flex flex-col justify-between overflow-hidden group shadow-[0_15px_35px_rgba(0,0,0,0.5)]"
        >
          {/* Accent borders */}
          <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-gold-antique/20" />
          <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t border-r border-gold-antique/20" />
          <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b border-l border-gold-antique/20" />
          <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r border-gold-antique/20" />

          {/* Symmetrical profile header */}
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-[#03100D] border-2 border-gold-antique/45 flex items-center justify-center mb-4 shadow-[0_8px_20px_rgba(0,0,0,0.4)]">
              <User className="w-8 h-8 text-gold-antique opacity-85" />
            </div>

            <span className="text-[10px] md:text-xs font-sans font-semibold text-gold-antique uppercase tracking-[0.25em] mb-1">
              {t("THE GROOM", "दूल्हा (नौशा)")}
            </span>
            <h4 className="font-serif italic text-2xl md:text-3xl text-gold-champagne font-medium tracking-wide">
              {t(invitationData.groom.fullName, invitationData.groom.fullNameHi || "")}
            </h4>
            
            {/* Elegant tiny line */}
            <div className="w-12 h-[1px] bg-gold-antique/25 my-4" />

            {/* Parents detail */}
            <div className="space-y-1.5 text-center mb-6">
              <p className="text-[10px] uppercase tracking-wider text-gold-antique/60 font-sans">{t("Son of", "ख़लफ़-ए-रशीद (साहबज़ादे):")}</p>
              <p className="font-sans text-xs md:text-sm font-semibold text-gold-glow/95">
                {t(invitationData.groom.parents.father, invitationData.groom.parents.fatherHi || "")}
              </p>
              <p className="font-sans text-xs md:text-sm font-semibold text-gold-glow/95">
                {t(invitationData.groom.parents.mother, invitationData.groom.parents.motherHi || "")}
              </p>
            </div>
          </div>

          {/* Groom location details */}
          <div className="mt-auto border-t border-gold-antique/10 pt-4 flex items-center justify-center gap-2 text-gold-antique/75">
            <MapPin className="w-3.5 h-3.5 text-gold-antique flex-shrink-0" />
            <span className="font-sans text-xs uppercase tracking-widest font-medium">
              {t(invitationData.groom.address, invitationData.groom.addressHi || "")}
            </span>
          </div>
        </motion.div>

        {/* 2. Bride Profile Card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative bg-gradient-to-b from-[#092D25]/80 to-[#041511]/95 border border-gold-antique/20 rounded-2xl p-6 md:p-8 flex flex-col justify-between overflow-hidden group shadow-[0_15px_35px_rgba(0,0,0,0.5)]"
        >
          {/* Accent borders */}
          <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-gold-antique/20" />
          <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t border-r border-gold-antique/20" />
          <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b border-l border-gold-antique/20" />
          <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r border-gold-antique/20" />

          {/* Symmetrical profile header */}
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-[#03100D] border-2 border-gold-antique/45 flex items-center justify-center mb-4 shadow-[0_8px_20px_rgba(0,0,0,0.4)]">
              <User className="w-8 h-8 text-gold-antique opacity-85" />
            </div>

            <span className="text-[10px] md:text-xs font-sans font-semibold text-gold-antique uppercase tracking-[0.25em] mb-1">
              {t("THE BRIDE", "दुल्हन")}
            </span>
            <h4 className="font-serif italic text-2xl md:text-3xl text-gold-champagne font-medium tracking-wide">
              {t(invitationData.bride.fullName, invitationData.bride.fullNameHi || "")}
            </h4>

            {/* Elegant tiny line */}
            <div className="w-12 h-[1px] bg-gold-antique/25 my-4" />

            {/* Parents detail */}
            <div className="space-y-1.5 text-center mb-6">
              <p className="text-[10px] uppercase tracking-wider text-gold-antique/60 font-sans">{t("Daughter of", "दुख़्तर-ए-नेक (साहबज़ादी):")}</p>
              <p className="font-sans text-xs md:text-sm font-semibold text-gold-glow/95">
                {t(invitationData.bride.parents.father, invitationData.bride.parents.fatherHi || "")}
              </p>
              <p className="font-sans text-xs md:text-sm font-semibold text-gold-glow/95">
                {t(invitationData.bride.parents.mother, invitationData.bride.parents.motherHi || "")}
              </p>
            </div>
          </div>

          {/* Bride location details */}
          <div className="mt-auto border-t border-gold-antique/10 pt-4 flex items-center justify-center gap-2 text-gold-antique/75">
            <MapPin className="w-3.5 h-3.5 text-gold-antique flex-shrink-0" />
            <span className="font-sans text-xs uppercase tracking-widest font-medium">
              {t(invitationData.bride.address, invitationData.bride.addressHi || "")}
            </span>
          </div>
        </motion.div>

      </div>

      {/* Decorative Floating Heart Connection Icon in center bottom */}
      <div className="flex justify-center mt-12 relative z-10">
        <div className="w-12 h-12 rounded-full bg-emerald-deep border border-gold-antique/40 flex items-center justify-center shadow-lg">
          <Heart className="w-5 h-5 text-gold-antique fill-gold-antique animate-pulse" />
        </div>
      </div>
    </section>
  );
}
