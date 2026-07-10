import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Languages } from 'lucide-react';
import RoseShower from './components/RoseShower';
import InteractiveStars from './components/InteractiveStars';
import MusicPlayer from './components/MusicPlayer';
import HeroSection from './components/HeroSection';
import CountdownTimer from './components/CountdownTimer';
import ScratchReveal from './components/ScratchReveal';
import CoupleDetails from './components/CoupleDetails';
import LoveStory from './components/LoveStory';
import EventTimeline from './components/EventTimeline';
import InvitationMessage from './components/InvitationMessage';
import ShareInvitation from './components/ShareInvitation';
import WhatsAppButton from '././components/WhatsAppButton';
import InstagramButton from './components/InstagramButton';
import Footer from './components/Footer';
import { useAudio } from './hooks/useAudio';
import { invitationData } from './data/invitationData';
import { AppProvider, useApp } from './context/AppContext';

function AppContent() {
  const [isInvitationOpen] = useState(true);
  const { isPlaying, play, toggle } = useAudio(invitationData.musicPath);
  const { language, toggleLanguage } = useApp();

  // Sync language with document lang attribute and custom class
  useEffect(() => {
    document.documentElement.lang = language;
    if (language === 'hi') {
      document.documentElement.classList.add('lang-hi');
      document.documentElement.classList.remove('lang-en');
    } else {
      document.documentElement.classList.add('lang-en');
      document.documentElement.classList.remove('lang-hi');
    }
  }, [language]);

  // Try to autoplay background music on first user interaction (click, scroll, touch)
  useEffect(() => {
    const handleFirstInteraction = () => {
      play();
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
    };
    
    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('touchstart', handleFirstInteraction);
    window.addEventListener('scroll', handleFirstInteraction);
    
    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
    };
  }, [play]);

  return (
    <div className="relative min-h-screen bg-[#050807] text-[#F6F0E3] font-sans overflow-x-hidden selection:bg-gold-antique/30 selection:text-gold-champagne">
      
      {/* Rose Shower overlay */}
      <RoseShower />

      {/* Interactive touch/click star particles overlay */}
      <InteractiveStars />

      {/* Floating Language Translation Toggle (Always accessible in the top corner) */}
      <motion.button
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        onClick={toggleLanguage}
        className="fixed top-4 right-4 z-50 flex items-center gap-1.5 px-3 py-2 bg-emerald-deep/95 hover:bg-gold-antique/20 border border-gold-antique/40 rounded-full text-gold-champagne text-[11px] font-semibold uppercase tracking-wider shadow-[0_4px_15px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all duration-300 select-none cursor-pointer active:scale-95"
        style={{ minHeight: '40px' }}
      >
        <Languages className="w-3.5 h-3.5 text-gold-antique" />
        <span>{language === 'en' ? 'हिन्दी' : 'English'}</span>
      </motion.button>

      {/* 2. Primary Invitation Page Content */}
      <AnimatePresence>
        {isInvitationOpen && (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative w-full flex flex-col"
          >
            {/* Cinematic Entrance Accent Line */}
            <div className="w-full h-[1.5px] bg-gradient-to-r from-transparent via-gold-antique to-transparent absolute top-0 left-0 z-10" />

            {/* Hero Banner Section */}
            <HeroSection />

            {/* Countdown Clock Panel */}
            <CountdownTimer />

            {/* Symmetrical Romantic Intro Message */}
            <InvitationMessage />

            {/* Symmetrical Profiles of Groom & Bride */}
            <CoupleDetails />

            {/* Scratch to Reveal Card Feature */}
            <ScratchReveal />

            {/* Love Story Chapter Block */}
            <LoveStory />

            {/* Ceremonies Timeline */}
            <EventTimeline />

            {/* Share Invitation Widget */}
            <ShareInvitation />

            {/* Luxury Brand Footer */}
            <Footer />

            {/* 3. Global Floating Action Widgets */}
            {/* Background Sound wave player bottom-left */}
            <MusicPlayer 
              isPlaying={isPlaying} 
              onToggle={toggle} 
              show={isInvitationOpen} 
            />

            {/* Contact Inquiry button bottom-right */}
            <WhatsAppButton />

            {/* Instagram link button bottom-right */}
            <InstagramButton />

          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
