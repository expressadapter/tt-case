'use client';

import { useState, useEffect, useTransition, useCallback } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { useTransitionRouter } from 'next-view-transitions';
import { setUserLocale } from '@/services/locale';
import useSessionStorage from '@/hooks/use-session-storage';
import { Locale } from '@/i18n/config';

type Language = {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  enjoyMeal: string;
};

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', enjoyMeal: 'Enjoy your meal!' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷', enjoyMeal: 'Afiyet olsun!' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', enjoyMeal: '¡Buen provecho!' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', enjoyMeal: 'Bon appétit!' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', enjoyMeal: 'Guten Appetit!' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', enjoyMeal: 'Buon appetito!' },
  {
    code: 'pt',
    name: 'Portuguese',
    nativeName: 'Português',
    flag: '🇵🇹',
    enjoyMeal: 'Bom apetite!',
  },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱', enjoyMeal: 'Eet smakelijk!' },
  {
    code: 'ru',
    name: 'Russian',
    nativeName: 'Русский',
    flag: '🇷🇺',
    enjoyMeal: 'Приятного аппетита!',
  },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳', enjoyMeal: '祝您用餐愉快！' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', enjoyMeal: 'いただきます！' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷', enjoyMeal: '맛있게 드세요!' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', enjoyMeal: 'بالهناء والشفاء!' },
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    flag: '🇮🇳',
    enjoyMeal: 'खाना का मज़ा लीजिये!',
  },
];

export default function LanguageSelectorCard() {
  const [, startTransition] = useTransition();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [, setSessionLanguage] = useSessionStorage('language');

  const t = useTranslations('LanguageSelection');
  const router = useTransitionRouter();

  useEffect(() => {
    if (!selectedLanguage) {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % languages.length);
      }, 1250);

      return () => clearInterval(timer);
    }
  }, [selectedLanguage]);

  const handleLanguageSelection = useCallback(
    (language: Language) => {
      setSelectedLanguage(language);
      setSessionLanguage(language);

      startTransition(() => {
        setUserLocale(language.code as Locale);
      });
    },
    [setSelectedLanguage, setSessionLanguage],
  );

  return (
    <div>
      <div className="relative mb-2 mt-2 h-14 overflow-hidden">
        {languages.map((lang, index) => (
          <div
            key={lang.code}
            className={`absolute w-full text-center text-3xl font-bold leading-snug transition-all duration-500 ${
              (selectedLanguage ? lang.code === selectedLanguage.code : index === currentIndex)
                ? 'top-0 opacity-100'
                : 'top-16 opacity-0'
            }`}
          >
            {lang.enjoyMeal}
          </div>
        ))}
      </div>
      <div className="mb-4 grid grid-cols-4 gap-2 sm:grid-cols-4 sm:gap-4 md:grid-cols-5 lg:grid-cols-7">
        {languages.map((language) => (
          <Button
            key={language.code}
            variant={language.code === selectedLanguage?.code ? 'default' : 'outline'}
            className="flex h-20 w-full flex-col items-center justify-center text-xl sm:h-24 sm:text-2xl"
            onClick={() => handleLanguageSelection(language)}
          >
            <span>{language.flag}</span>
            <span className="mt-1 text-sm sm:text-base">{language.nativeName}</span>
            {language.code === selectedLanguage?.code && (
              <Check className="absolute bottom-1 right-1 h-3 w-3 text-primary-foreground sm:bottom-2 sm:right-2 sm:h-4 sm:w-4" />
            )}
          </Button>
        ))}
      </div>
      <div className="flex flex-col items-center">
        <Button
          onClick={() => router.push(`menu-upload`)}
          disabled={!selectedLanguage}
          className="h-12 w-full transition-all duration-300 sm:w-auto"
        >
          {selectedLanguage ? (
            <>
              {t('continue')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          ) : (
            'Please select a language'
          )}
        </Button>
      </div>
    </div>
  );
}
