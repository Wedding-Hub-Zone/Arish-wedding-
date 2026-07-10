import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle, Instagram } from 'lucide-react';
import { invitationData } from '../data/invitationData';
import { generateWhatsAppInquiryLink } from '../utils/whatsapp';
import { useApp } from '../context/AppContext';

export default function Footer() {
  const { t } = useApp();
  const whatsappUrl = generateWhatsAppInquiryLink(invitationData.brand.whatsapp);

  return (
    <footer className="relative bg-[#03100D] py-16 px-4 text-center overflow-hidden">
      {/* Soft divider */}
      <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-gold-antique/25 to-transparent" />

      {/* Decorative floral element */}
      <div className="absolute left-1/2 -translate-x-1/2 -top-10 opacity-5 pointer-events-none w-48">
        <svg viewBox="0 0 100 100" fill="currentColor" className="text-gold-antique">
          <path d="M50 0 C45 30, 20 45, 0 50 C20 55, 45 70, 50 100 C55 70, 80 55, 100 50 C80 45, 55 30, 50 0" />
        </svg>
      </div>

      <div className="max-w-2xl mx-auto relative z-10 flex flex-col items-center">
        
        {/* Subtle Brand Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-4"
        >
          <span className="font-display text-lg md:text-xl text-gold-champagne tracking-[0.2em] font-semibold uppercase">
            {invitationData.brand.name}
          </span>
          <p className="font-sans text-[10px] md:text-xs text-gold-antique/70 uppercase tracking-[0.25em] mt-1">
            {t("Premium Digital Wedding Invitations", "प्रीमियम डिजिटल निकाह दावतनामा")}
          </p>
        </motion.div>

        {/* Small spacer ornament */}
        <div className="w-12 h-[1px] bg-gold-antique/20 my-4" />

        {/* Brand Description */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-sans text-[11px] md:text-xs text-gold-glow/50 max-w-sm leading-relaxed mb-6 px-4"
        >
          {t(
            "Designed with love and devotion for your most sacred beginnings. Elegant invitations that keep your loved ones connected.",
            "आपके नए और मुक़द्दस सफ़र के पाक आग़ाज़ के लिए बेहद प्यार और अक़ीदत से तैयार किया गया।"
          )}
        </motion.p>

        {/* Clickable Social and contact channels */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-4 mb-8"
        >
          {/* WhatsApp Link */}
          <a
            href={whatsappUrl}
            target="_blank"
            referrerPolicy="no-referrer"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-emerald-deep/60 hover:bg-gold-antique/15 border border-gold-antique/25 hover:border-gold-antique rounded-full text-gold-champagne text-xs uppercase tracking-widest font-medium transition-all duration-300"
            style={{ minHeight: '44px' }}
          >
            <MessageCircle className="w-4 h-4 text-gold-antique" />
            {t("WhatsApp", "व्हाट्सएप")}
          </a>

          {/* Instagram Link */}
          <a
            href={invitationData.brand.instagramUrl}
            target="_blank"
            referrerPolicy="no-referrer"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-emerald-deep/60 hover:bg-gold-antique/15 border border-gold-antique/25 hover:border-gold-antique rounded-full text-gold-champagne text-xs uppercase tracking-widest font-medium transition-all duration-300"
            style={{ minHeight: '44px' }}
          >
            <Instagram className="w-4 h-4 text-gold-antique" />
            {t("Instagram", "इंस्टाग्राम")}
          </a>
        </motion.div>

        {/* Legal copyrights details */}
        <div className="w-full border-t border-gold-antique/10 pt-6 mt-2">
          <p className="font-sans text-[9px] md:text-[10px] text-gold-antique/45 uppercase tracking-[0.2em]">
            &copy; 2026 {invitationData.brand.name}. {t("All Rights Reserved.", "सभी अधिकार सुरक्षित।")}
          </p>
          <p className="font-sans text-[8px] text-gold-antique/30 uppercase tracking-[0.15em] mt-1.5">
            {t("Designed with Love by", "मोहब्बत और अक़ीदत के साथ:")} {invitationData.brand.name}
          </p>
        </div>

      </div>
    </footer>
  );
}
