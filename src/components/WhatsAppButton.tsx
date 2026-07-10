import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { invitationData } from '../data/invitationData';
import { generateWhatsAppInquiryLink } from '../utils/whatsapp';

export default function WhatsAppButton() {
  const whatsappUrl = generateWhatsAppInquiryLink(invitationData.brand.whatsapp);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2, duration: 0.5 }}
      className="fixed bottom-6 right-6 z-40"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        referrerPolicy="no-referrer"
        rel="noopener noreferrer"
        className="flex items-center justify-center p-3.5 bg-gradient-to-r from-emerald-forest to-[#0C5144] hover:from-gold-antique hover:to-gold-champagne border border-gold-antique/30 hover:border-gold-antique text-gold-champagne hover:text-emerald-deep rounded-full shadow-[0_8px_25px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.05)] backdrop-blur-md cursor-pointer transition-all duration-300 group"
        aria-label="Contact Wedding Hub on WhatsApp"
        style={{ minWidth: '44px', minHeight: '44px' }}
      >
        <MessageCircle className="w-5.5 h-5.5 transition-transform duration-300 group-hover:rotate-12" />
        
        {/* Hover tag indicating Brand context */}
        <span className="absolute right-14 bg-emerald-deep/90 border border-gold-antique/20 text-gold-champagne font-sans text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-md">
          Chat With Us
        </span>
      </a>
    </motion.div>
  );
}
