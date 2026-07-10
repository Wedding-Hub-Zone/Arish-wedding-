import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'hi';

interface AppContextType {
  language: Language;
  toggleLanguage: () => void;
  isDateRevealed: boolean;
  revealDate: () => void;
  t: (en: string, hi: string) => string;
  isRoseShowerActive: boolean;
  triggerRoseShower: () => void;
  stopRoseShower: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [isDateRevealed, setIsDateRevealed] = useState<boolean>(false);
  const [isRoseShowerActive, setIsRoseShowerActive] = useState<boolean>(false);

  // Load state from localStorage on mount if available (excellent for persistence on refreshes)
  useEffect(() => {
    const savedLang = localStorage.getItem('wedding_lang') as Language;
    if (savedLang === 'en' || savedLang === 'hi') {
      setLanguage(savedLang);
    }
    const savedRevealed = localStorage.getItem('wedding_date_revealed');
    if (savedRevealed === 'true') {
      setIsDateRevealed(true);
    }
  }, []);

  const toggleLanguage = () => {
    setLanguage((prev) => {
      const next = prev === 'en' ? 'hi' : 'en';
      localStorage.setItem('wedding_lang', next);
      return next;
    });
  };

  const revealDate = () => {
    setIsDateRevealed(true);
    localStorage.setItem('wedding_date_revealed', 'true');
  };

  const triggerRoseShower = () => {
    setIsRoseShowerActive(true);
  };

  const stopRoseShower = () => {
    setIsRoseShowerActive(false);
  };

  const t = (en: string, hi: string) => {
    return language === 'en' ? en : hi;
  };

  return (
    <AppContext.Provider value={{ 
      language, 
      toggleLanguage, 
      isDateRevealed, 
      revealDate, 
      t,
      isRoseShowerActive,
      triggerRoseShower,
      stopRoseShower
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
