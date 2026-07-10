import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Share2, Check } from 'lucide-react';
import { invitationData } from '../data/invitationData';
import { shareInvitation } from '../utils/share';
import { useApp } from '../context/AppContext';

export default function ShareInvitation() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const { t } = useApp();

  const handleShare = async () => {
    const shareText = t(
      `You are cordially invited to celebrate the wedding of Arish and Shaba on ${invitationData.weddingDate}.`,
      `आपको आरिश और शबा के मुक़द्दस निकाह समारोह में शरीक होने की बा-अदब गुज़ारिश की जाती है। निकाह की मुबारक तारीख: ${invitationData.weddingDateHi || invitationData.weddingDate}.`
    );
    const shareUrl = window.location.origin + window.location.pathname;

    const result = await shareInvitation({
      title: t('Arish & Shaba Wedding Invitation', 'आरिश और शबा निकाह का दावतनामा'),
      text: shareText,
      url: shareUrl,
    });

    if (result.success) {
      if (result.method === 'copy') {
        showToast(t('Invitation link copied successfully', 'दावतनामा लिंक सफलतापूर्वक कॉपी किया गया'));
      }
    } else {
      if (result.method === 'error') {
        showToast(t('Failed to share invitation. Please copy the link manually.', 'दावतनामा साझा करने में असमर्थ। कृपया लिंक कॉपी करें।'));
      }
    }
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  return (
    <section className="relative py-12 md:py-16 bg-[#050807] px-4 overflow-hidden text-center flex flex-col items-center">
      
      {/* Symmetrical divider line */}
      <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-gold-antique/20 to-transparent" />

      <div className="max-w-md w-full relative z-10 px-4">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-sans text-[10px] md:text-xs text-gold-antique uppercase tracking-[0.2em] mb-4"
        >
          {t("Spread the Joy", "ख़ुशियाँ बाँटें")}
        </motion.p>
        
        <h4 className="font-display text-lg md:text-xl text-gold-champagne font-semibold tracking-wider uppercase mb-6">
          {t("Share This Invitation", "इस दावतनामे को शेयर करें")}
        </h4>

        {/* Share Button with glowing effect */}
        <motion.button
          onClick={handleShare}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-gradient-to-r from-emerald-forest to-emerald-deep text-gold-champagne hover:text-emerald-deep border border-gold-antique/30 hover:bg-gradient-to-r hover:from-gold-antique hover:to-gold-champagne hover:border-gold-antique font-sans font-semibold tracking-widest text-xs uppercase rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_10px_25px_rgba(199,163,90,0.25)] transition-all duration-300 cursor-pointer"
          style={{ minHeight: '44px' }}
        >
          <Share2 className="w-4 h-4" />
          {t("Share Invitation", "दावतनामा शेयर करें")}
        </motion.button>
      </div>

      {/* Luxury Float Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-[#092D25] border border-gold-antique text-gold-champagne font-sans text-xs uppercase tracking-widest font-semibold rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.6)] flex items-center gap-2"
          >
            <Check className="w-4 h-4 text-gold-antique" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
