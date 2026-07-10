import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Clock, Calendar, Sparkles, Flame, Heart, Utensils, Award } from 'lucide-react';
import { WeddingEvent } from '../data/invitationData';
import { useApp } from '../context/AppContext';

interface EventCardProps {
  event: WeddingEvent;
  index: number;
}

export default function EventCard({ event, index }: EventCardProps) {
  const { t, language } = useApp();

  // Dynamically select Lucide icon based on name
  const renderIcon = () => {
    switch (event.iconName) {
      case 'milad':
        return <Sparkles className="w-6 h-6 text-gold-antique" />;
      case 'mehndi':
        return <Flame className="w-6 h-6 text-gold-antique" />; // Flame representing warmth & light
      case 'barat':
        return <Award className="w-6 h-6 text-gold-antique" />; // Scepter/procession
      case 'nikah':
        return <Heart className="w-6 h-6 text-gold-antique" />;
      case 'walima':
        return <Utensils className="w-6 h-6 text-gold-antique" />;
      default:
        return <Sparkles className="w-6 h-6 text-gold-antique" />;
    }
  };

  // Unique styling theme classes for event-specific cards while maintaining emerald palette
  const getCardThemeClass = () => {
    switch (event.iconName) {
      case 'nikah':
        return 'border-gold-antique/50 bg-gradient-to-b from-emerald-deep to-[#03100D] shadow-[0_15px_30px_rgba(199,163,90,0.15)]';
      case 'mehndi':
        return 'border-gold-antique/20 bg-gradient-to-b from-[#092D25] to-[#041511]';
      default:
        return 'border-gold-antique/25 bg-gradient-to-b from-emerald-deep/80 to-emerald-dark/95';
    }
  };

  // Determine active local values based on selected language
  const eventName = t(event.name, event.nameHi || event.name);
  const eventDate = t(event.date, event.dateHi || event.date);
  const eventTime = t(event.time, event.timeHi || event.time);
  const eventVenue = t(event.venue, event.venueHi || event.venue);
  const eventDesc = t(event.description, event.descriptionHi || event.description);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
      className={`relative w-full border rounded-2xl p-6 md:p-8 flex flex-col justify-between overflow-hidden transition-all duration-300 ${getCardThemeClass()}`}
    >
      {/* Symmetrical Corner Border Lines */}
      <div className="absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t border-l border-gold-antique/20" />
      <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t border-r border-gold-antique/20" />
      <div className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 border-b border-l border-gold-antique/20" />
      <div className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b border-r border-gold-antique/20" />

      {/* Decorative gradient light inside card */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gold-antique/5 rounded-full blur-3xl pointer-events-none" />

      <div>
        {/* Event Header with Icon */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-emerald-forest/60 border border-gold-antique/30 flex items-center justify-center shadow-inner">
            {renderIcon()}
          </div>
          <div>
            {event.iconName === 'nikah' && (
              <span className="text-[9px] uppercase tracking-widest text-gold-antique font-semibold block mb-0.5">
                {t("★ Sacred Ceremony", "★ मुक़द्दस तक़रीब")}
              </span>
            )}
            <h4 className="font-display text-lg md:text-xl text-gold-champagne font-semibold tracking-wide uppercase">
              {eventName}
            </h4>
          </div>
        </div>

        {/* Date, Time, Venue lines */}
        <div className="space-y-3 my-4">
          <div className="flex items-center gap-3 text-gold-glow/90">
            <Calendar className="w-4 h-4 text-gold-antique flex-shrink-0" />
            <span className="font-sans text-xs md:text-sm font-medium tracking-wide">
              {eventDate}
            </span>
          </div>

          {/* Render time ONLY if specified */}
          {eventTime && (
            <div className="flex items-center gap-3 text-gold-glow/90">
              <Clock className="w-4 h-4 text-gold-antique flex-shrink-0" />
              <span className="font-sans text-xs md:text-sm">
                {eventTime}
              </span>
            </div>
          )}

          <div className="flex items-start gap-3 text-gold-glow/85">
            <MapPin className="w-4 h-4 text-gold-antique flex-shrink-0 mt-0.5" />
            <span className="font-sans text-xs md:text-sm leading-relaxed">
              {eventVenue}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gold-antique/70 font-sans text-xs leading-relaxed border-t border-gold-antique/10 pt-4 mt-2">
          {eventDesc}
        </p>
      </div>

      {/* Get Directions Button */}
      <div className="mt-6 pt-2">
        <a
          href={event.googleMapsUrl}
          target="_blank"
          referrerPolicy="no-referrer"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-gradient-to-r from-emerald-forest to-emerald-deep hover:from-gold-antique hover:to-gold-champagne text-gold-champagne hover:text-emerald-deep border border-gold-antique/30 hover:border-gold-antique font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
          style={{ minHeight: '44px' }}
        >
          <MapPin className="w-3.5 h-3.5" />
          {t("Get Directions", "नक़्शा (लोकेशन) देखें")}
        </a>
      </div>
    </motion.div>
  );
}
