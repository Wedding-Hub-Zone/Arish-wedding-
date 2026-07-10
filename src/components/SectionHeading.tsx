import React from 'react';
import { motion } from 'motion/react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  id?: string;
}

export default function SectionHeading({ title, subtitle, id }: SectionHeadingProps) {
  return (
    <div id={id} className="flex flex-col items-center text-center px-4 my-8 md:my-12">
      {subtitle && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-gold-antique font-sans uppercase tracking-[0.25em] text-[10px] md:text-xs font-medium mb-2 block"
        >
          {subtitle}
        </motion.span>
      )}
      
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="font-display text-2xl md:text-4xl text-gold-champagne tracking-wider font-semibold uppercase relative pb-5"
      >
        {title}
        
        {/* Elegant Gold Divider */}
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center justify-center w-32 h-[1px] bg-gradient-to-r from-transparent via-gold-antique to-transparent">
          <span className="w-2 h-2 rotate-45 bg-[#050807] border border-gold-antique z-10" />
        </span>
      </motion.h2>
    </div>
  );
}
