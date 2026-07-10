import React from 'react';
import { motion } from 'motion/react';
import { Quote } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { useApp } from '../context/AppContext';

export default function LoveStory() {
  const { t } = useApp();

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-emerald-deep/10 to-[#050807] px-4 overflow-hidden">
      {/* Decorative background lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-emerald-forest/5 blur-[120px] pointer-events-none" />
      
      {/* Divider */}
      <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-gold-antique/20 to-transparent" />

      <SectionHeading 
        title={t("Our Love Story", "मोहब्बत का पाक सफ़र")} 
        subtitle={t("Two Hearts, One Journey", "दो रूहें, एक मुक़द्दस सफ़र")} 
      />

      <div className="max-w-2xl mx-auto relative z-10 text-center mt-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative bg-gradient-to-b from-emerald-deep/40 to-emerald-dark/60 border border-gold-antique/20 rounded-2xl p-8 md:p-12 shadow-[0_15px_35px_rgba(0,0,0,0.5)]"
        >
          {/* Symmetrical Corner Border Lines */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-gold-antique/30" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-gold-antique/30" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-gold-antique/30" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-gold-antique/30" />

          {/* Golden Quote icon */}
          <div className="flex justify-center mb-6">
            <Quote className="w-8 h-8 text-gold-antique rotate-180 opacity-80" />
          </div>

          <p className="font-serif italic text-base md:text-xl text-gold-champagne leading-relaxed font-light mb-6">
            {t(
              "\"Once in a while, right in the middle of an ordinary life, love gives us a fairy tale. Under Allah’s divine guidance, our paths crossed, our souls aligned, and we began writing a beautiful chapter of friendship, faith, and eternal love.\"",
              "\"कभी-कभी, हमारे साधारण जीवन के बीच, मोहब्बत हमें एक ख़ूबसूरत सी दास्तान तोहफ़े में देती है। अल्लाह के पाक रहमो-करम और फ़ज़्ल से, हमारे रास्ते एक हुए, हमारी रूहों का पाक मिलाप हुआ, और हमने उल्फ़त, ईमान और पाक मोहब्बत का एक हसीन सफ़र शुरू किया।\""
            )}
          </p>

          <p className="font-sans text-[10px] md:text-xs text-gold-antique uppercase tracking-[0.3em] font-semibold">
            {t("— Arish & Shaba", "— आरिश और शबा")}
          </p>

          {/* Tiny floral emblem inside bottom */}
          <div className="flex justify-center items-center gap-2 mt-8">
            <span className="w-6 h-[1px] bg-gold-antique/30" />
            <span className="w-1.5 h-1.5 rounded-full bg-gold-antique" />
            <span className="w-6 h-[1px] bg-gold-antique/30" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
