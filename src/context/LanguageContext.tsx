import { createContext, useContext, useState, useMemo } from 'react';
import type { ReactNode } from 'react';

import { translations as enTranslations } from '../locales/en';
import { translationsPT as ptTranslations } from '../locales/pt';

type Language = 'en' | 'pt';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: typeof enTranslations; 
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'pt' : 'en'));
  };

  const t = useMemo(() => {
    // Agora o 't' recebe direto o conteúdo, sem precisar de .en ou .pt
    return language === 'en' ? enTranslations : ptTranslations;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
}