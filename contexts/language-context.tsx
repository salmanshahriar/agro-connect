"use client"

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react"
import { translations, type Language } from "@/lib/i18n"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageLang] = useState<Language>("bn")

  useEffect(() => {
    const savedLanguage = localStorage.getItem(
      "agroconnect_language"
    ) as Language | null
    if (savedLanguage) {
      setLanguageLang(savedLanguage)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageLang(lang)
    localStorage.setItem("agroconnect_language", lang)
  }

  const t = (key: string): string => {
    const keys = key.split(".")
    let value: any = (translations as any)[language]

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k]
      } else {
        const direct = (translations as any)[language]?.[key]
        if (typeof direct === "string") return direct
        return key
      }
    }

    return typeof value === "string" ? value : key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
