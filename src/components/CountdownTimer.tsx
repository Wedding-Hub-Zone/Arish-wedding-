import React from 'react';
import { motion } from 'motion/react';
import { useCountdown } from '../hooks/useCountdown';
import { invitationData } from '../data/invitationData';
import { useApp } from '../context/AppContext';

export default function CountdownTimer() {
  const { t } = useApp();
  const { days, hours, minutes, seconds, isCompleted } = useCountdown(invitationData.weddingCountdownTarget);

  const timeUnits = [
    { label: t('Days', 'दिन'), value: days },
    { label: t('Hours', 'घंटे'), value: hours },
    { label: t('Minutes', 'मिनट'), value: minutes },
    { label: t('Seconds', 'सेकंड'), value: seconds },
  ];

  return (
    <section className="relative py-16 md:py-24 bg-[#050807] overflow-hidden flex flex-col items-center justify-center px-4">
      {/* Subtle emerald soft light radial glow behind countdown */}
      <div className="absolute w-[250px] h-[250px] rounded-full bg-emerald-forest/15 blur-[80px] pointer-events-none" />

      {/* Outer border decoration */}
      <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-gold-antique/30 to-transparent" />

      <div className="relative z-10 max-w-lg w-full text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-gold-antique font-sans uppercase tracking-[0.2em] text-[10px] md:text-xs font-semibold mb-6"
        >
          {t("Counting Down to the Sacred Union", "मुक़द्दस निकाह तक़रीब की उल्टी गिनती")}
        </motion.p>

        {isCompleted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block p-6 md:p-8 rounded-lg bg-emerald-deep/60 border border-gold-antique/30 backdrop-blur-md shadow-[0_15px_30px_rgba(0,0,0,0.5)]"
          >
            <h3 className="font-display text-xl md:text-2xl text-gold-champagne font-bold tracking-widest uppercase shimmer-gold">
              {t("The Celebration Has Begun", "जश्नो-मसर्रत का आग़ाज़ हो चुका है")}
            </h3>
            <p className="text-sm text-gold-antique/80 mt-2 font-sans">
              {t("Thank you for sharing in our joy and blessings!", "हमारी ख़ुशियों और दुआओं में शरीक होने के लिए आपका बेहद शुक्रिया!")}
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-4 gap-2 md:gap-4 max-w-sm md:max-w-md mx-auto">
            {timeUnits.map((unit, index) => (
              <motion.div
                key={unit.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex flex-col items-center"
              >
                {/* Counter Card */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-gradient-to-b from-[#092D25] to-[#041511] border border-gold-antique/20 rounded-lg shadow-[0_10px_20px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.05)] overflow-hidden">
                  {/* Glass sheen */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0" />
                  
                  {/* Top-down split aesthetic of modern timers */}
                  <div className="absolute inset-x-0 top-0 h-[1px] bg-white/10" />
                  <div className="absolute inset-x-0 bottom-1/2 h-[1px] bg-black/40" />

                  {/* Number text */}
                  <span className="font-display text-xl sm:text-2xl md:text-3xl font-semibold text-gold-champagne tracking-normal">
                    {String(unit.value).padStart(2, '0')}
                  </span>
                </div>

                {/* Metric label */}
                <span className="text-[10px] md:text-xs font-sans tracking-widest uppercase text-gold-antique/70 font-medium mt-3">
                  {unit.label}
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <div className="absolute inset-x-8 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-gold-antique/30 to-transparent" />
    </section>
  );
}
