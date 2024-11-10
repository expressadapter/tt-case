"use client"

import { useState, useEffect } from "react"
import { Check, ArrowRight } from "lucide-react"
import Image from 'next/image';
import { useTransitionRouter } from 'next-view-transitions'

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type Language = {
  code: string
  name: string
  nativeName: string
  flag: string
  enjoyMeal: string
}

const languages: Language[] = [
  { code: "en", name: "English", nativeName: "English", flag: "🇺🇸", enjoyMeal: "Enjoy your meal!" },
  { code: "tr", name: "Turkish", nativeName: "Türkçe", flag: "🇹🇷", enjoyMeal: "Afiyet olsun!" },
  { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸", enjoyMeal: "¡Buen provecho!" },
  { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷", enjoyMeal: "Bon appétit!" },
  { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪", enjoyMeal: "Guten Appetit!" },
  { code: "it", name: "Italian", nativeName: "Italiano", flag: "🇮🇹", enjoyMeal: "Buon appetito!" },
  { code: "pt", name: "Portuguese", nativeName: "Português", flag: "🇵🇹", enjoyMeal: "Bom apetite!" },
  { code: "nl", name: "Dutch", nativeName: "Nederlands", flag: "🇳🇱", enjoyMeal: "Eet smakelijk!" },
  { code: "ru", name: "Russian", nativeName: "Русский", flag: "🇷🇺", enjoyMeal: "Приятного аппетита!" },
  { code: "zh", name: "Chinese", nativeName: "中文", flag: "🇨🇳", enjoyMeal: "祝您用餐愉快！" },
  { code: "ja", name: "Japanese", nativeName: "日本語", flag: "🇯🇵", enjoyMeal: "いただきます！" },
  { code: "ko", name: "Korean", nativeName: "한국어", flag: "🇰🇷", enjoyMeal: "맛있게 드세요!" },
  { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇸🇦", enjoyMeal: "بالهناء والشفاء!" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳", enjoyMeal: "खाना का मज़ा लीजिये!" },
]

export default function LanguageSelectorCard() {
  const router = useTransitionRouter()

  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (!selectedLanguage) {
      timer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % languages.length)
      }, 2000)
    }
    return () => {
      if (timer) clearInterval(timer)
    }
  }, [selectedLanguage])

  const handleContinue = () => {
    if (selectedLanguage) {
      console.log(`Continuing with selected language: ${selectedLanguage.name}`)
      // Add your logic here for what should happen when the user clicks "Continue"
    }
    router.push('menu-upload')
  }

  return (
    <div>
      <div className="mt-4 mb-4 h-14 sm:h-16 overflow-hidden relative">
        {languages.map((lang, index) => (
          <div
            key={lang.code}
            className={`absolute w-full text-3xl font-bold text-center transition-all duration-500 ${(selectedLanguage ? lang.code === selectedLanguage.code : index === currentIndex)
              ? "top-0 opacity-100"
              : "top-16 sm:top-20 opacity-0"
              }`}
          >
            {lang.enjoyMeal}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2 sm:gap-4 mb-4">
        {languages.map((language) => (
          <Button
            key={language.code}
            variant={language.code === selectedLanguage?.code ? "default" : "outline"}
            className="w-full h-20 sm:h-24 text-xl sm:text-2xl flex flex-col justify-center items-center"
            onClick={() => setSelectedLanguage(language)}
          >
            <span>{language.flag}</span>
            <span className="text-sm sm:text-base mt-1">{language.nativeName}</span>
            {language.code === selectedLanguage?.code && (
              <Check className="h-3 w-3 sm:h-4 sm:w-4 absolute bottom-1 right-1 sm:bottom-2 sm:right-2 text-primary-foreground" />
            )}
          </Button>
        ))}
      </div>
      <div className="flex flex-col items-center">
        <Button
          onClick={handleContinue}
          disabled={!selectedLanguage}
          className="h-12 w-full sm:w-auto transition-all duration-300"
        >
          {selectedLanguage ? (
            <>
              Continue <ArrowRight className="ml-2 h-4 w-4" />
            </>
          ) : (
            "Please select a language"
          )}
        </Button>
      </div>


    </div>



  )
}