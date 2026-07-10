import React from 'react';
import SectionHeading from './SectionHeading';
import EventCard from './EventCard';
import { invitationData } from '../data/invitationData';
import { useApp } from '../context/AppContext';

export default function EventTimeline() {
  const { t } = useApp();

  return (
    <section id="itinerary" className="relative py-16 md:py-24 bg-gradient-to-b from-[#050807] to-emerald-deep/15 px-4 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-forest/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-forest/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Symmetrical Dividers */}
      <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-gold-antique/20 to-transparent" />

      <SectionHeading 
        title={t("Wedding Itinerary", "तक़रीबात-ए-शादी")} 
        subtitle={t("Ceremony Timeline", "तफ़्सीलात-ए-तक़रीबात")} 
      />

      <div className="max-w-3xl mx-auto relative z-10 mt-8">
        {/* Timeline Line (Visible only on medium screens and up to show continuity) */}
        <div className="absolute left-[23px] top-4 bottom-4 w-[1px] bg-gradient-to-b from-gold-antique/40 via-emerald-forest/20 to-gold-antique/40 hidden md:block" />

        <div className="space-y-8 md:space-y-12 pl-0 md:pl-12 relative">
          {invitationData.events.map((event, index) => (
            <div key={event.id} className="relative">
              {/* Timeline Indicator Dot (Visible on desktop/md+) */}
              <div className="absolute -left-[32px] top-6 w-4.5 h-4.5 rounded-full bg-emerald-deep border-2 border-gold-antique flex items-center justify-center z-10 shadow-md hidden md:flex">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-champagne animate-pulse" />
              </div>

              {/* Event Card Component */}
              <EventCard event={event} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
